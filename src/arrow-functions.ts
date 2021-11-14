import { API, FileInfo } from 'jscodeshift';

const transform = (fileInfo: FileInfo, api: API) => {

    const cs = api.jscodeshift;
    const root = cs(fileInfo.source);

    // First convert all the functions to arrow functions
    root.find(cs.FunctionExpression)
        .forEach(fnPath => {
            const { value: fn } = fnPath;
            const arrowFn = cs.arrowFunctionExpression(fn.params, fn.body, fn.generator);

            cs(fnPath).replaceWith(arrowFn);
        });

    // Re-find everything, since we also want to include those which were always arrow functions
    root.find(cs.ArrowFunctionExpression)
        .forEach(fnPath => {
            const { value: fn } = fnPath;

            // If a function body has a block statement with only one statement
            // like this:
            // () => { return a + b;}
            // We can move the statement to directly after the =>, like so:
            // () => a + b;
            if (fn.body.type === cs.BlockStatement.name) {
                if (fn.body.body.length === 1) {
                    if (fn.body.body[0].type === cs.ReturnStatement.name) {
                        fn.body = fn.body.body[0].argument;
                    } else {
                        fn.body = fn.body.body[0].expression;;
                    }
                }
            }
        });

    return root.toSource();
}

export default transform;