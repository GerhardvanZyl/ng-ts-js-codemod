import { API, FileInfo } from 'jscodeshift';

const transform = (fileInfo: FileInfo, api: API) => {

    const cs = api.jscodeshift;
    const root = cs(fileInfo.source);

    // First find all the FunctionExpressions.
    // .find will find everything recursively.
    // The class methods are of type MethodDefinition, so these will not be included.
    root.find(cs.FunctionExpression)
        .forEach(fnPath => {

            // Get the function object
            const { value: fn } = fnPath;

            // Use the convenient helper method to convert a
            // Function Expression to an Arrow Function Expression,
            // using the params and body from the existing function expression
            const arrowFn = cs.arrowFunctionExpression(fn.params, fn.body, fn.generator);

            // Replace the existing Function Expression with the Arrow Function Expression
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

            if (fn.body.type === (cs.BlockStatement as any).name
                && (fn.body as any).body.length === 1){

                if ((fn.body as any).body[0].type === (cs.ReturnStatement as any).name) {
                    fn.body = (fn.body as any).body[0].argument;
                } else {
                    fn.body = (fn.body as any).body[0].expression;;
                }
            }
        });

    return root.toSource();
}

export default transform;