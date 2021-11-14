import { API, FileInfo } from "jscodeshift";

const transform = (fileInfo: FileInfo, api: API) => {
    const cs = api.jscodeshift;
    const root = cs(fileInfo.source);

    root.find(cs.FunctionExpression)
        .forEach(fnPath => {
            const {value: fn} = fnPath;
            const arrowFn = cs.arrowFunctionExpression(fn.params, fn.body, fn.generator);
            cs(fnPath).replaceWith(arrowFn);
        });
    return root.toSource();
}

export default transform;