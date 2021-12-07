# ng-ts-js-codemod
JSCodemod transforms specifically for angular/typescript based on [jscodeshift](https://github.com/facebook/jscodeshift).

Currently contains mods to fix 
- Refactors to fix @typescript-eslint/member-ordering and prefer-arrow/prefer-arrow-functions ESLint errors, as well as omitting block statements when the arrow function body is a single line.
- Reorders members by Input, Output and other decorators and lifecycle hooks are ordered in the sequence in which they are executed.
- Refactors the deprecated RxJS subscribe signature with 2 - 3 function arguments to the single object signature.

A more detailed description about how I went about creating the codemods can be found in [this article](https://medium.com/@vanzyl.gerhard/speed-up-large-scale-complex-js-ts-refactoring-with-codemods-888e7afbc079).
