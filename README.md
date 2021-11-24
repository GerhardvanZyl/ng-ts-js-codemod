# ng-ts-js-codemod
JSCodemod transforms specifically for angular/typescript based on jscodeshift.

Currently contains mods to fix 
- Refactors to fix @typescript-eslint/member-ordering and prefer-arrow/prefer-arrow-functions ESLint errors, as well as omitting block statements when the arrow function body is a single line.
- Reorders members by Input, Output and other decorators and lifecycle hooks are ordered in the sequence in which they are executed.
- Refactors the deprecated RxJS subscribe signature with 2 - 3 function arguments to the single object signature.
