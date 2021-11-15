import { API, ArrowFunctionExpression, FileInfo, FunctionExpression } from 'jscodeshift';

const subscribeMethods = ['next', 'error', 'complete'];

const transform = (fileInfo: FileInfo, api: API) => {

    debugger;

    const cs = api.jscodeshift;
    const root = cs(fileInfo.source);

    root.find(cs.CallExpression, { 
        callee: {
            property: {
                name: 'subscribe'
            }
        }
    }).forEach(path => {
        const {value: fn} = path;

        // Subscriptions with only one argument stays as is.
        if(fn.arguments.length > 1){

            const properties = [];
            for(const [i, arg] of fn.arguments.entries()){

                // Only add those that exist
                if (!arg) continue;

                properties.push(
                    cs.property('init',
                        cs.identifier(subscribeMethods[i]),
                        arg as ArrowFunctionExpression | FunctionExpression
                    )
                );
            }

            fn.arguments = [cs.objectExpression(properties)];
        }
    });

    return root.toSource();
}

export default transform;