# ng-ts-js-codemod
JSCodemod transforms specifically for angular/typescript based on jscodeshift.

Currently contains mods to fix 
- @typescript-eslint/member-ordering and prefer-arrow/prefer-arrow-functions ESLint errors, as well as omitting block statements when the arrow function body is a single line.
- Members are ordered by Input, Output and other decorators, and lifecycle hooks are ordered in the sequence in which they are executed.
- Deprecated RxJS subscribe signature with 2 - 3 function arguments
