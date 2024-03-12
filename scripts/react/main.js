const fs = require('fs');
const path = require('path');

const customelements = JSON.parse(fs.readFileSync(path.join(process.env.PACKAGE_PATH, 'custom-elements.json')));

const declerationsfile = [];
const indexfile = [];

function build(info, sub = false) {

  const props = [];
  const attributes = [];

  info.allproperties.forEach(prop => {
    let type = prop.typeName.toLowerCase();

    if (prop.type_value) {
      if (prop.type_value instanceof Array) {
        type = prop.type_value.map(v => `"${v}"`).join('|');
      }
    }
    if (type === "array") type = "Array<any>"; // TODO need to propperly extract info !

    // actually its always conditional..
    const conditional = true; // prop.conditional || !prop.default_value;
    let comment = "";
    if (prop.default_value) {
      comment = `// default-value: ${prop.default_value}`
    }

    if (prop.conditional) {
      // required we shall add it to comment but since everything is knda not really required we dont want to add
      if (comment === "") comment = "//";
      comment += " [conditional]"
    }

    if (prop.attribute) {
      const attributename = typeof prop.attribute === "string" ? `"${prop.attribute}"` : prop.name;
      attributes.push({ name: attributename, conditional, comment });
    }
    props.push({ name: prop.name, type, conditional, comment });
  });
  info.allevents.forEach(event => {
    props.push({
      name: 'on' + camelCaseEvent(event.name),
      type: `(e: React.SyntheticEvent<${info.className}Element, ${event.type}>) => void`,
      conditional: true,
      comment: event.data ? `// detail: { ${event.data.properties.join(' ')} (note this is early and can be wrong)` : undefined
    })
  });

  const propstring = props
    .map(p => `\t${p.name}${p.conditional ? "?" : ""}: ${p.type};${p.comment ? " " + p.comment : ""}`)
    .join('\n');
  const attrstring = attributes
    .map(a => `\t${a.name}${a.conditional ? "?" : ""}: string;${a.comment ? " " + a.comment : ""}`)
    .join('\n');

  const SRC = `
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { ${info.className} as ${info.className}Element } from "../src";
import "../src/register.js";

// exporting
export { ${info.className} as ${info.className}Element } from "../src";

export type ${sub ? info.className : ""}Props = {
${propstring}
  children?: React.ReactNode;
  className?: string;
};
export type ${sub ? info.className : ""}Attributes = {
${attrstring}
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<${info.className}Element, ${sub ? info.className : ""}Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <${info.html.tagName}
      {...attributes}
      ref={forwardref}
    >
      {children}
    </${info.html.tagName}>
  );
});

export const ${info.className} = papHOC<${info.className}Element, ${sub ? info.className : ""}Props, ${sub ? info.className : ""}Attributes>(Component);`

  fs.writeFileSync(path.join(process.env.PACKAGE_PATH, "react", info.className + ".tsx"), SRC, "utf-8");

  const localpath = info.dist_filepath.split('/src/')[1];
  declerationsfile.push(
    `\t'${info.html.tagName}': React.DetailedHTMLProps<React.HTMLAttributes<import('../src/${localpath}').${info.className}> & import('./${info.className}').${sub ? info.className : ""}Attributes, HTMLElement>;`
  );
  indexfile.push(`export * from './${info.className}';`);
}

// build on cases 
build(customelements.main);

for (let name in customelements.sub) {
  build(customelements.sub[name], true);
}

const declerationcontent = `
declare namespace JSX {
  interface IntrinsicElements {
  ${declerationsfile.join("\n\t")}
  }
}
`;

fs.writeFileSync(path.join(process.env.PACKAGE_PATH, "react", "declerations.d.ts"), declerationcontent, "utf-8");
fs.writeFileSync(path.join(process.env.PACKAGE_PATH, "react", "index.ts"), indexfile.join("\n"), "utf-8");

// helper functions 
function camelCaseEvent(name) {
  const split = name
    .split(/_|-/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  return split;
}