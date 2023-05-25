function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(default_case, local) {
    let output = Object.assign({}, default_case);
    if (isObject(default_case) && isObject(local)) {
    Object.keys(local).forEach(key => {
        if (isObject(local[key])) {
        if (!(key in default_case))
            Object.assign(output, { [key]: local[key] });
        else
            output[key] = deepMerge(default_case[key], local[key]);
        } else {
        Object.assign(output, { [key]: local[key] });
        }
    });
    }
    return output;
}

module.exports = {
    deepMerge
}