const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function extractor(folder_path, className) {
    // TODO check if it has prop file already generated
    try {
        const prop_info_file = path.join(folder_path, 'dist/propinfo.json');
        fs.accessSync(prop_info_file); // NOTE could probably remove this as its anyway a try-catch and next would crash if no file..
        return JSON.parse(fs.readFileSync(prop_info_file));
    }
    catch {}

    const component_path = path.join(folder_path, 'src/component.ts');
    const component_dist_path = path.join(folder_path, 'dist/src/component.js');
    const componentDIST = fs.readFileSync(component_dist_path, 'utf-8');

    // extracting the properties
    const lines = componentDIST.split('\n');
    const classprop_set = {};
    let classInfo = null;
    let imports = [];

    for (let i=0; i<lines.length;i++) {
        const line = lines[i];
        let _imports = extract_import(line);
        if (_imports)
        {
            imports = imports.concat(_imports);
            continue;
        }

        const classLine = line.match(/class\s(\w+)\sextends\W(\w+)/);
        if (classLine) {
            classInfo = {name: classLine[1], extends: classLine[2] };
        }

        if (/__decorate\(\[/.test(line))
        {
            while (i < lines.length)
            {
                i++;
                const propmatch = lines[i].match(/\.prototype\,\s\"(\w+)/);
                if (propmatch)
                {
                    classprop_set[propmatch[1]] = true;
                    break;
                }
            }
        }
    }

    if (!classInfo)
    {
        throw new Error('could not find class: ' + className);
    }


    let extend_class = null;
    if (classInfo.extends && !["HTMLElement", "BaseTemplate"].includes(classInfo.extends)) {
        for (let imp of imports) {
            if (imp.name === classInfo.extends)
            {
                const super_path = getLocalModule(imp.from);
                
                extend_class = extractor(super_path, imp.name);
            }
        }
    }

    const properties = ts_extractor(component_path, className)
            .filter(info => classprop_set[info.name]);

    return { className, properties, extend_class };
}
function extract_import(line) {
    const import_match_module = line.match(/import\W+\{([^\'\"\}]+)\W+from\W+[\"\']([^\"\']+)[\"\']/);
    if (import_match_module) {
        const imports = [];
        const [_whole, names, from] = import_match_module;
        const namesplit = names.split(",");
        for (const name of namesplit)
        {
            if (name === "") continue;
            imports.push({
                name: name.trim(),
                from, // TODO this should be cleaned
            })
        }
        return imports;
    }
    const import_match_default = line.match(/import\W+(\w+)\W+from\W+[\"\']([^\"\']+)[\"\']/);
    if (import_match_default) {
        const imports = [];
        const [_whole, name, from] = import_match_default;
        imports.push({
            name: name.trim(),
            from, // TODO this should be cleaned
        })
        return imports;
    }

    return null;
}
function getLocalModule(name) {
    if (!name.startsWith('@circular')) return null;

    const data = LOCKFILE.packages[`node_modules/${name}`];
    if (!data) return null;
    if (!data.resolved) return null;

    return path.join(ROOT_DIR, data.resolved);
}


// typescript extractor
function ts_extractor(fileName, className) {
    // Parse a file
    const program = ts.createProgram([fileName], {});
    const checker = program.getTypeChecker();

    // Get source of the file
    const sourceFile = program.getSourceFile(fileName);
    const properties = [];

    if (sourceFile) {
        // Use built-in TypeScript function to visit nodes in the AST (Abstract Syntax Tree)
        ts.forEachChild(sourceFile, (node) => {
            if (ts.isClassDeclaration(node) && node.name.escapedText === className) {
                // If the node is a class declaration
    
                node.members.forEach(member => {
                    if (ts.isPropertyDeclaration(member)) {
                        // If the member is a property declaration
                        const type = member.type;

                        // mostly to eliminate styles
                        if (type && !member.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword || modifier.kind === ts.SyntaxKind.PrivateKeyword))
                        {
                            let default_value = undefined;
                            if (member.initializer) {
                                default_value = getInitialValue(member.initializer);
                            }
    
                            const name = member.name.escapedText;
                            let typeName;
                            let primitive = true;

                            switch (type.kind) {
                                case ts.SyntaxKind.StringKeyword:
                                    typeName = "string";
                                break;
                                case ts.SyntaxKind.NumberKeyword:
                                    typeName = "number";
                                    break;
                                case ts.SyntaxKind.BooleanKeyword:
                                    typeName = "boolean";
                                    break;
                                default:
                                    primitive = false;
                                    typeName = type.typeName?.escapedText;
                                    break;
                            }
    
                            // const type_value = extract_type(checker, program, type);
                            let type_value = null;
                            if (ts.isTypeReferenceNode(member.type)) {
                                const symbol = checker.getSymbolAtLocation(member.type.typeName);
                                if (!symbol) return null;
                                const checknode = checker.getDeclaredTypeOfSymbol(symbol);
    
                                type_value = extract_type(checker, checknode);
                            }
    
                            properties.push({name, type: typeName, default_value, type_value, primitive, conditional: !!member.questionToken})
                        }
                    }
                });
    
            }
        });
    }

    function getInitialValue(initializer) {
        if (ts.isObjectLiteralExpression(initializer)) {
            const result = {};
            for (const property of initializer.properties) {
                if (ts.isPropertyAssignment(property)) {
                    const name = property.name.escapedText;
                    const value = getInitialValue(property.initializer);
                    result[name] = value;
                }
            }
            return result;
        }
        else if (ts.isNumericLiteral(initializer)) {
            return Number(initializer.text);
        } else if (ts.isStringLiteral(initializer)) {
            return initializer.text;
        } else if (ts.isBooleanLiteral(initializer)) {
            return initializer.kind === ts.SyntaxKind.TrueKeyword
        }

        return initializer.text;
    }

    return properties;
}
function extract_type(checker, node) {
    
    if (!node) return null;
    let value = null;

    // check its just a value 
    value = extract_value(checker, node);
    if (value !== null) return value;

    // check if object
    value = extract_object(checker, node);
    if (value !== null) return value;

    // check if array
    value = extract_array(checker, node);
    if (value !== null) return value;

    if (value === null)
    {

        // TODO this whole block is wrong! 
        // console.log(node)
        const symbol = checker.getSymbolAtLocation(node.typeName);
        if (symbol) {
            const declaredType = checker.getDeclaredTypeOfSymbol(symbol);

            if (declaredType.types) 
            {
                return extract_array(checker, declaredType);
            }
        }
        
        else if (!ts.SyntaxKind[node.kind]) {
            if (node.node)
            {
                return extract_type(checker, node.node);
            }
        }
    }
    return value;
}
function extract_value(checker, node) {
    if (node.value)
    {
        return node.value;
    }
    if (node.text)
    {
        return node.text;
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.intrinsicName) return node.intrinsicName === "true";

    if (node.literal) 
    { // Literal type
        return extract_value(checker, node.literal)
    } 

    return null;
}
function extract_object(checker, node) {
    if (node.symbol?.members) {
        const object = {}
        node.symbol.members.forEach(member => {
            object[member.valueDeclaration.name.escapedText] = extract_type(checker, member.valueDeclaration.type);
        })
        return object;
    }

    return null;
}
function extract_array(checker, node) {
    let target_arr = [];
    if (node.types)
    {
        target_arr = node.types;
    }
    else if (node.elements) {
        target_arr = node.elements;
    }
    else 
    {
        return null;
    }

    const array = [];
    target_arr.forEach(child => {
        array.push(extract_type(checker, child))
    });
    return array;
}

// start from here
const ROOT_DIR = process.argv[2];
const CLASSNAME = process.argv[3];
const PACKAGE_DIR = process.argv[4];
const LOCKFILE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package-lock.json')));
const OUTPUT = path.join(PACKAGE_DIR, "dist/propinfo.json");

// remove the output file
try {
    fs.rmSync(OUTPUT)
}
catch {}

const info = extractor(PACKAGE_DIR, CLASSNAME);

// write it to file
fs.writeFileSync(OUTPUT, JSON.stringify(info), "utf-8");
