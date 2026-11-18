/// template.angular
// @ts-check -- make sure this file valid too
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import ngeslint from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

/* NOTE
  Not sure if it's just started with the upgrade to Ng22, but we're getting a number of linting
  errors that shouldn't be happening:

  @typescript-eslint/no-unnecessary-boolean-literal-compare
  @typescript-eslint/no-unnecessary-condition
  @typescript-eslint/no-useless-default-assignment
  @typescript-eslint/prefer-nullish-coalescing

  These are resulting in two types of errors:

  1. "This rule requires the `strictNullChecks` compiler option to be turned on to function correctly"
    This *is* turned on (as is the `strict` compiler option, which should make setting `strictNullChecks`
    redundant), so for some reason, the compiler option isn't being recognized.
  2. " Unnecessary conditional, expected left-hand side of `??` operator to be possibly null or undefined"
    and "Unnecessary optional chain on a non-nullish value"
    Again, these shouldn't be happening as the values being flagged should be nullish.

  So, for now, while these rules are not turned off in this config, the errors are being ignored.
*/

export default defineConfig([
  {
    languageOptions: {
      parserOptions: {
// TODO: using `projectService: true` with workspaces containing multiple projects works
// fine for linting from the commandline, but breaks compatibility with the VSCode ESLint
// extension, preventing linting warnings/errors appearing in the editor (see issue
// https://github.com/Microsoft/vscode-eslint/issues/1911).  So for now, use the 'old'
// syntax.
        projectService: true
        // project: [
        //   './tsconfig.json',
        //   './projects/*/tsconfig.app.json',
        //   './projects/*/tsconfig.lib.json',
        //   './projects/*/tsconfig.spec.json'
        // ],
        // tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    /* Directory ignores can only be specified in a global section (see
      https://github.com/eslint/eslint/discussions/17429), so this *must* be
      in a section on its own.
    */
    ignores: [
      '**/*.unused/',
      '**/.unused/',
      '**/*.unused.ts'
    ]
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,                       // https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
      stylistic.configs.recommended,                    // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
      tseslint.configs.strictTypeChecked,               // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/flat/strict-type-checked.ts
      tseslint.configs.stylisticTypeChecked,            // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/flat/stylistic-type-checked.ts
      ngeslint.configs.tsRecommended,                   // https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.json
      unicorn.configs.recommended,                      // https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules
      jsdoc.configs['flat/recommended-typescript']
    ],
    processor: ngeslint.processInlineTemplates,
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
/* eslint.configs.recommended *-/
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-unassigned-vars': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': 'error',
      'no-useless-assignment': 'error',
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'preserve-caught-error': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
*/
/* stylistic.configs.recommended *-/
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      '@stylistic/arrow-spacing': ['error', { after: true, before: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      // '@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      // '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { after: true, before: false }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': 'error',
      '@stylistic/generator-star-spacing': ['error', { after: true, before: false }],
      // '@stylistic/indent': ['error', 2, {
      //   ArrayExpression: 1,
      //   CallExpression: { arguments: 1 },
      //   flatTernaryExpressions: false,
      //   FunctionDeclaration: { body: 1, parameters: 1 },
      //   FunctionExpression: { body: 1, parameters: 1 },
      //   ignoreComments: false,
      //   ignoredNodes: [
      //     'TSUnionType',
      //     'TSIntersectionType',
      //     'TSTypeParameterInstantiation',
      //     'FunctionExpression > .params[decorators.length > 0]',
      //     'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
      //   ],
      //   ImportDeclaration: 1,
      //   MemberExpression: 1,
      //   ObjectExpression: 1,
      //   offsetTernaryExpressions: true,
      //   outerIIFEBody: 1,
      //   SwitchCase: 1,
      //   tabLength: 2,
      //   VariableDeclarator: 1,
      // }],
      // '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/key-spacing': ['error', { afterColon: true, beforeColon: false }],
      '@stylistic/keyword-spacing': ['error', { after: true, before: true }],
      // '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      // '@stylistic/member-delimiter-style': ['error', {
      //   multiline: {
      //     delimiter: 'none',
      //     requireLast: false,
      //   },
      //   multilineDetection: 'brackets',
      //   overrides: {
      //     interface: {
      //       multiline: {
      //         delimiter: 'none',
      //         requireLast: false,
      //       },
      //     },
      //   },
      //   singleline: {
      //     delimiter: 'comma',
      //   },
      // }],
      // '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-extra-parens': ['error', 'functions'],
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': ['error', {
        allowSamePrecedence: true,
        groups: [
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      }],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      // '@stylistic/no-multi-spaces': 'error',
      // '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/no-tabs': 'error',
      // '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/operator-linebreak': ['error', 'before'],
      // '@stylistic/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
      // '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      // '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true, avoidEscape: false }],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      // '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-spacing': ['error', { after: true, before: false }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],
      // '@stylistic/spaced-comment': ['error', 'always', {
      //   block: {
      //     balanced: true,
      //     exceptions: ['*'],
      //     markers: ['!'],
      //   },
      //   line: {
      //     exceptions: ['/', '#'],
      //     markers: ['/'],
      //   },
      // }],
      '@stylistic/template-curly-spacing': 'error',
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/type-annotation-spacing': ['error', {}],
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',
      '@stylistic/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
      '@stylistic/yield-star-spacing': ['error', { after: true, before: false }],
*/
/* tseslint.configs.strictTypeChecked *-/
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { minimumDescriptionLength: 10 },
      ],
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      // '@typescript-eslint/no-confusing-void-expression': 'error',
      // '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      // '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      // '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      'no-implied-eval': 'off',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-misused-spread': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      // '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      // '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      'no-unused-expressions': 'off',
      // '@typescript-eslint/no-unused-expressions': 'error',
      'no-unused-vars': 'off',
      // '@typescript-eslint/no-unused-vars': 'error',
      'no-useless-constructor': 'off',
      // '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      'no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      'prefer-promise-reject-errors': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/related-getter-setter-pairs': 'error',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: false,
          allowRegExp: false,
        },
      ],
      'no-return-await': 'off',
      '@typescript-eslint/return-await': [
        'error',
        'error-handling-correctness-only',
      ],
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/unbound-method': 'error',
      // '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
*/
/* tseslint.configs.stylisticTypeChecked *-/
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      'dot-notation': 'off',
      // '@typescript-eslint/dot-notation': 'error',
      // '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      // '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-find': 'error',
      // '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      // '@typescript-eslint/prefer-nullish-coalescing': 'error',
      // '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
*/
/* ngeslint.configs.tsRecommended *-/
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      // '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn'
*/
/* unicorn.configs.recommended (no easy way to list default values) *-/
new      'unicorn/better-dom-traversing',                  // Prefer better DOM traversal APIs.
      // 'unicorn/catch-error-name',                       // Enforce a specific parameter name in catch clauses.
      // 'unicorn/class-reference-in-static-methods',      // Enforce consistent class references in static methods.
      'unicorn/consistent-assert',                      // Enforce consistent assertion style with node:assert.
      // 'unicorn/consistent-boolean-name',                // Enforce consistent naming for boolean names.
      // 'unicorn/consistent-class-member-order',          // Enforce consistent class member order.
new      'unicorn/consistent-compound-words',              // Enforce consistent spelling of compound words in identifiers.
new      'unicorn/consistent-conditional-object-spread',         // Enforce consistent conditional object spread style.
      'unicorn/consistent-date-clone',                  // Prefer passing Date directly to the constructor when cloning.
      'unicorn/consistent-empty-array-spread',          // Prefer consistent types when spreading a ternary in an array literal.
      'unicorn/consistent-existence-index-check',         // Enforce consistent style for element existence checks with indexOf(), lastIndexOf(), findIndex(), and findLastIndex().
new      'unicorn/consistent-export-decorator-position',         // Enforce consistent decorator position on exported classes.
      'unicorn/consistent-function-scoping',            // Move function definitions to the highest possible scope.
new      'unicorn/consistent-json-file-read',              // Enforce consistent JSON file reads before JSON.parse().
new      'unicorn/consistent-optional-chaining',           // Enforce consistent optional chaining for same-base member access.
new      'unicorn/consistent-template-literal-escape',         // Enforce consistent style for escaping ${ in template literals.
new      'unicorn/consistent-tuple-labels',                // Enforce consistent labels on tuple type elements.
new      'unicorn/default-export-style',                   // Enforce consistent default export declarations.
new      'unicorn/dom-node-dataset',                       // Enforce consistent style for DOM element dataset access.
      'unicorn/empty-brace-spaces',                     // Enforce no spaces between braces.
      'unicorn/error-message',                          // Enforce passing a message value when creating a built-in error.
      'unicorn/escape-case',                            // Require escape sequences to use uppercase or lowercase values.
      'unicorn/expiring-todo-comments',         // Add expiration conditions to TODO comments.
      'unicorn/explicit-length-check',          // Enforce explicitly comparing the length or size property of a value.
new      'unicorn/explicit-timer-delay',         // Enforce or disallow explicit delay argument for setTimeout() and setInterval().
      'unicorn/filename-case',          // Enforce a case style for filenames and directory names.
      'unicorn/import-style',         // Enforce specific import styles per module.
new      'unicorn/isolated-functions',         // Prevent usage of variables from outside the scope of isolated functions.
new      'unicorn/logical-assignment-operators',         // Require or disallow logical assignment operator shorthand
new      'unicorn/max-nested-calls',         // Limit the depth of nested calls.
      // 'unicorn/name-replacements',          // Enforce replacements for variable, property, and filenames.
      'unicorn/new-for-builtins',         // Enforce correct use of new for builtin constructors.
      'unicorn/no-abusive-eslint-disable',          // Enforce specifying rules to disable in eslint-disable comments.
      'unicorn/no-accessor-recursion',          // Disallow recursive access to this within getters and setters.
new      'unicorn/no-accidental-bitwise-operator',         // Disallow bitwise operators where a logical operator was likely intended.
      'unicorn/no-anonymous-default-export',          // Disallow anonymous functions and classes as the default export.
      'unicorn/no-array-callback-reference',          // Prevent passing a function reference directly to iterator methods.
new      'unicorn/no-array-concat-in-loop',          // Disallow array accumulation with Array#concat() in loops.
new      'unicorn/no-array-fill-with-reference-type',          // Disallow using reference values as Array#fill() values.
new      'unicorn/no-array-from-fill',         // Disallow .fill() after Array.from({length: …}).
      'unicorn/no-array-method-this-argument',          // Disallow using the this argument in array methods.
      'unicorn/no-array-reduce',          // Disallow Array#reduce() and Array#reduceRight().
new      'unicorn/no-array-reverse',         // Prefer Array#toReversed() over Array#reverse().
      // 'unicorn/no-array-sort',          // Prefer Array#toSorted() over Array#sort().
new      'unicorn/no-array-sort-for-min-max',          // Disallow sorting arrays to get the minimum or maximum value.
new      'unicorn/no-array-splice',          // Prefer Array#toSpliced() over Array#splice().
      // 'unicorn/no-asterisk-prefix-in-documentation-comments',
new      'unicorn/no-async-promise-finally',         // Disallow async functions as Promise#finally() callbacks.
      'unicorn/no-await-expression-member',         // Disallow member access from await expression.
      'unicorn/no-await-in-promise-methods',          // Disallow using await in Promise method parameters.
new      'unicorn/no-blob-to-file',          // Disallow unnecessary Blob to File conversion.
new      'unicorn/no-boolean-sort-comparator',         // Disallow boolean-returning sort comparators.
new      'unicorn/no-break-in-nested-loop',          // Disallow break and continue in nested loops and switches inside loops.
new      'unicorn/no-canvas-to-image',         // Prefer drawing canvases directly instead of converting them to images.
new      'unicorn/no-chained-comparison',          // Disallow chained comparisons such as a < b < c.
new      'unicorn/no-collection-bracket-access',         // Disallow accessing Map, Set, WeakMap, and WeakSet entries with bracket notation.
new      'unicorn/no-computed-property-existence-check',         // Disallow dynamic object property existence checks.
new      'unicorn/no-confusing-array-splice',          // Disallow confusing uses of Array#{splice,toSpliced}().
new      'unicorn/no-confusing-array-with',          // Disallow confusing uses of Array#with().
      'unicorn/no-console-spaces',          // Do not use leading/trailing space between console.log parameters.
new      'unicorn/no-constant-zero-expression',          // Disallow arithmetic and bitwise operations that always evaluate to 0.
new      'unicorn/no-declarations-before-early-exit',          // Disallow declarations before conditional early exits when they are only used after the exit.
      'unicorn/no-document-cookie',         // Do not use document.cookie directly.
new      'unicorn/no-double-comparison',         // Disallow two comparisons of the same operands that can be combined into one.
new      'unicorn/no-duplicate-if-branches',         // Disallow duplicate adjacent branches in if chains.
new      'unicorn/no-duplicate-logical-operands',          // Disallow adjacent duplicate operands in logical expressions.
new      'unicorn/no-duplicate-loops',         // Disallow .map() and .filter() in for…of and for await…of loop headers.
new      'unicorn/no-duplicate-set-values',          // Disallow duplicate values in Set constructor array literals.
      'unicorn/no-empty-file',          // Disallow empty files.
new      'unicorn/no-error-property-assignment',         // Disallow assigning to built-in error properties.
new      'unicorn/no-exports-in-scripts',          // Disallow exports in scripts.
new      'unicorn/no-for-each',          // Prefer for…of over the forEach method.
      'unicorn/no-for-loop',          // Do not use a for loop that can be replaced with a for-of loop.
new      'unicorn/no-global-object-property-assignment',         // Disallow assigning properties on the global object.
      // 'unicorn/no-immediate-mutation',          // Disallow immediate mutation after variable assignment.
new      'unicorn/no-impossible-length-comparison',          // Disallow impossible comparisons against .length or .size.
new      'unicorn/no-incorrect-query-selector',          // Disallow incorrect querySelector() and querySelectorAll() usage.
new      'unicorn/no-incorrect-template-string-interpolation',         // Disallow incorrect template literal interpolation syntax.
      'unicorn/no-instanceof-builtins',         // Disallow instanceof with built-in objects
new      'unicorn/no-invalid-argument-count',          // Disallow calling functions and constructors with an invalid number of arguments.
new      'unicorn/no-invalid-character-comparison',          // Disallow comparing a single character from a string to a multi-character string.
      'unicorn/no-invalid-fetch-options',         // Disallow invalid options in fetch() and new Request().
      'unicorn/no-invalid-remove-event-listener',         // Prevent calling EventTarget#removeEventListener() with the result of an expression.
new      'unicorn/no-invalid-well-known-symbol-methods',         // Disallow invalid implementations of well-known symbol methods.
new      'unicorn/no-late-current-target-access',          // Disallow accessing event.currentTarget after the synchronous event dispatch has finished.
new      'unicorn/no-late-event-control',          // Disallow event-control method calls after the synchronous event dispatch has finished.
      // 'unicorn/no-lonely-if',         // Disallow if statements as the only statement in if blocks without else.
new      'unicorn/no-loop-iterable-mutation',          // Disallow mutating a loop iterable during iteration.
      'unicorn/no-magic-array-flat-depth',          // Disallow a magic number as the depth argument in Array#flat(…).
new      'unicorn/no-mismatched-map-key',          // Disallow checking a Map key before accessing a different key.
new      'unicorn/no-misrefactored-assignment',          // Disallow misrefactored compound assignments where the target is duplicated in the right-hand side.
new      'unicorn/no-multiple-promise-resolver-calls',         // Disallow calling Promise executor resolver functions more than once on the same execution path.
      'unicorn/no-named-default',         // Disallow named usage of default import and export.
new      'unicorn/no-negated-array-predicate',         // Disallow negated array predicate calls.
new      'unicorn/no-negated-comparison',          // Disallow negated comparisons.
      // 'unicorn/no-negated-condition',         // Disallow negated conditions.
      'unicorn/no-negation-in-equality-check',          // Disallow negated expression in equality check.
      'unicorn/no-nested-ternary',          // Disallow nested ternary expressions.
      'unicorn/no-new-array',         // Disallow new Array().
      'unicorn/no-new-buffer',          // Enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer().
new      'unicorn/no-non-function-verb-prefix',          // Disallow non-function values with function-style verb prefixes.
new      'unicorn/no-nonstandard-builtin-properties',          // Disallow non-standard properties on built-in objects.
      'unicorn/no-null',          // Disallow the use of the null literal.
      'unicorn/no-object-as-default-parameter',         // Disallow the use of objects as default parameters.
new      'unicorn/no-object-methods-with-collections',         // Disallow Object methods with Map or Set.
new      'unicorn/no-optional-chaining-on-undeclared-variable',          // Disallow optional chaining on undeclared variables.
      'unicorn/no-process-exit',          // Disallow process.exit().
new      'unicorn/no-redundant-comparison',          // Disallow comparisons made redundant by an equality check in the same logical AND.
new      'unicorn/no-return-array-push',         // Disallow using the return value of Array#push() and Array#unshift().
new      'unicorn/no-selector-as-dom-name',          // Disallow selector syntax in DOM names.
new      'unicorn/no-shorthand-property-overrides',          // Disallow shorthand properties that override related longhand properties.
      'unicorn/no-single-promise-in-promise-methods',         // Disallow passing single-element arrays to Promise methods.
      'unicorn/no-static-only-class',         // Disallow classes that only have static members.
new      'unicorn/no-subtraction-comparison',          // Prefer comparing values directly over subtracting and comparing to 0.
      'unicorn/no-thenable',          // Disallow then property.
      'unicorn/no-this-assignment',         // Disallow assigning this to a variable.
new      'unicorn/no-this-outside-of-class',         // Disallow this outside of classes.
new      'unicorn/no-top-level-assignment-in-function',          // Disallow assigning to top-level variables from inside functions.
new      'unicorn/no-top-level-side-effects',          // Disallow top-level side effects in exported modules.
new      'unicorn/no-transition-all',          // Disallow all as a transition property.
      'unicorn/no-typeof-undefined',          // Disallow comparing undefined using typeof.
new      'unicorn/no-uncalled-method',         // Disallow referencing methods without calling them.
new      'unicorn/no-undeclared-class-members',          // Require class members to be declared.
      'unicorn/no-unnecessary-array-flat-depth',          // Disallow using 1 as the depth argument of Array#flat().
map      'unicorn/no-unnecessary-array-flat-map',          // Disallow Array#flatMap() callbacks that only wrap a single item.
      'unicorn/no-unnecessary-array-splice-count',          // Disallow using .length or Infinity as the deleteCount or skipCount argument of Array#{splice,toSpliced}().
      'unicorn/no-unnecessary-await',         // Disallow awaiting non-promise values.
new      'unicorn/no-unnecessary-boolean-comparison',          // Disallow unnecessary comparisons against boolean literals.
new      'unicorn/no-unnecessary-fetch-options',         // Disallow unnecessary options in fetch() and new Request().
new      'unicorn/no-unnecessary-global-this',         // Disallow unnecessary globalThis references.
new      'unicorn/no-unnecessary-nested-ternary',          // Disallow unnecessary nested ternary expressions.
      'unicorn/no-unnecessary-polyfills',         // Enforce the use of built-in methods instead of unnecessary polyfills.
      'unicorn/no-unnecessary-slice-end',         // Disallow using .length or Infinity as the end argument of {Array,String,TypedArray}#slice().
new      'unicorn/no-unnecessary-splice',          // Disallow Array#splice() when simpler alternatives exist.
new      'unicorn/no-unnecessary-string-trim',         // Disallow String#trim() before String#startsWith() or String#endsWith().
      'unicorn/no-unreadable-array-destructuring',          // Disallow unreadable array destructuring.
new      'unicorn/no-unreadable-for-of-expression',          // Disallow unreadable iterable expressions in for…of and for await…of loop headers.
      'unicorn/no-unreadable-iife',         // Disallow unreadable IIFEs.
new      'unicorn/no-unreadable-object-destructuring',         // Disallow unreadable object destructuring.
new      'unicorn/no-unsafe-buffer-conversion',          // Prevent unsafe use of ArrayBuffer view .buffer.
new      'unicorn/no-unsafe-promise-all-settled-values',         // Disallow reading .value from Promise.allSettled() results without a fulfilled status guard.
new      'unicorn/no-unsafe-property-key',         // Disallow unsafe values as property keys.
new      'unicorn/no-unsafe-sqlite-interpolation',         // Disallow interpolation into SQL strings passed to Node’s node:sqlite APIs.
new      'unicorn/no-unsafe-string-replacement',         // Disallow non-literal replacement values in String#replace() and String#replaceAll().
new      'unicorn/no-unused-array-method-return',          // Disallow ignoring the return value of selected array methods.
new      'unicorn/no-useless-boolean-cast',          // Disallow unnecessary Boolean() casts in array predicate callbacks.
new      'unicorn/no-useless-coercion',          // Disallow useless type coercions of values that are already of the target type.
new      'unicorn/no-useless-collection-argument',         // Disallow useless values or fallbacks in Set, Map, WeakSet, or WeakMap.
new      'unicorn/no-useless-compound-assignment',         // Disallow useless compound assignments such as x += 0.
new      'unicorn/no-useless-concat',          // Disallow useless concatenation of literals.
new      'unicorn/no-useless-continue',          // Disallow useless continue statements.
new      'unicorn/no-useless-delete-check',          // Disallow unnecessary existence checks before deletion.
new      'unicorn/no-useless-else',          // Disallow else after a statement that exits.
      'unicorn/no-useless-error-capture-stack-trace',         // Disallow unnecessary Error.captureStackTrace(…).
      'unicorn/no-useless-fallback-in-spread',          // Disallow useless fallback when spreading in object literals.
new      'unicorn/no-useless-iterator-to-array',         // Disallow unnecessary .toArray() on iterators.
      'unicorn/no-useless-length-check',          // Disallow useless array length check.
new      'unicorn/no-useless-logical-operand',         // Disallow unnecessary operands in logical expressions involving boolean literals.
new      'unicorn/no-useless-override',          // Disallow useless overrides of class methods.
      'unicorn/no-useless-promise-resolve-reject',          // Disallow returning/yielding Promise.resolve/reject() in async functions or promise callbacks
ne      'unicorn/no-useless-re-export',         // Disallow redundant re-exports.
ne      'unicorn/no-useless-recursion',         // Disallow simple recursive function calls that can be replaced with a loop.
      'unicorn/no-useless-spread',          // Disallow unnecessary spread.
      // 'unicorn/no-useless-switch-case',         // Disallow useless case in switch statements.
new      'unicorn/no-useless-template-literals',         // Disallow useless template literal expressions.
      // 'unicorn/no-useless-undefined',         // Disallow useless undefined.
new      'unicorn/no-xor-as-exponentiation',         // Disallow the bitwise XOR operator where exponentiation was likely intended.
      'unicorn/no-zero-fractions',          // Disallow number literals with zero fractions or dangling dots.
      'unicorn/number-literal-case',          // Enforce proper case for numeric literals.
      // 'unicorn/numeric-separators-style',         // Enforce the style of numeric separators by correctly grouping digits.
new      'unicorn/operator-assignment',          // Require assignment operator shorthand where possible.
new      'unicorn/prefer-abort-signal-any',          // Prefer AbortSignal.any() over manually forwarding abort events between signals.
new      'unicorn/prefer-abort-signal-timeout',          // Prefer AbortSignal.timeout() over manually aborting an AbortController with setTimeout().
      'unicorn/prefer-add-event-listener',          // Prefer .addEventListener() and .removeEventListener() over on-functions.
new      'unicorn/prefer-add-event-listener-options',          // Prefer an options object over a boolean in .addEventListener().
new      'unicorn/prefer-aggregate-error',         // Prefer AggregateError when throwing collected errors.
      'unicorn/prefer-array-find',          // Prefer .find(…) and .findLast(…) over the first or last element from .filter(…).
      'unicorn/prefer-array-flat',          // Prefer Array#flat() over legacy techniques to flatten arrays.
      'unicorn/prefer-array-flat-map',          // Prefer .flatMap(…) over .map(…).flat() and .filter(…).flatMap(…).
new      'unicorn/prefer-array-from-async',          // Prefer Array.fromAsync() over for await…of array accumulation.
new      'unicorn/prefer-array-from-map',          // Prefer using the Array.from() mapping function argument.
new      'unicorn/prefer-array-from-range',          // Prefer Array.from({length}, …) when creating range arrays.
      'unicorn/prefer-array-index-of',          // Prefer Array#{indexOf,lastIndexOf}() over Array#{findIndex,findLastIndex}() when looking for the index of an item.
new      'unicorn/prefer-array-iterable-methods',          // Prefer iterating an array directly or with Array#keys() over Array#entries() when the index or value is unused.
new      'unicorn/prefer-array-last-methods',          // Prefer last-oriented array methods over Array#reverse() or Array#toReversed() followed by a method.
new      'unicorn/prefer-array-slice',         // Prefer Array#slice() over Array#splice() when reading from the returned array.
      'unicorn/prefer-array-some',          // Prefer .some(…) over .filter(…).length check and .{find,findLast,findIndex,findLastIndex}(…).
      'unicorn/prefer-at',          // Prefer .at() method for index access and String#charAt().
      // 'unicorn/prefer-await',         // Prefer await over promise chaining.
new      'unicorn/prefer-bigint-literals',         // Prefer BigInt literals over the constructor.
      'unicorn/prefer-blob-reading-methods',          // Prefer Blob#arrayBuffer() over FileReader#readAsArrayBuffer(…) and Blob#text() over FileReader#readAsText(…).
new      'unicorn/prefer-block-statement-over-iife',         // Prefer block statements over IIFEs used only for scoping.
new      'unicorn/prefer-boolean-return',          // Prefer directly returning boolean expressions over if statements.
      'unicorn/prefer-class-fields',          // Prefer class field declarations over this assignments in constructors.
new      'unicorn/prefer-classlist-toggle',          // Prefer using Element#classList.toggle() to toggle class names.
      'unicorn/prefer-code-point',          // Prefer String#codePointAt(…) over String#charCodeAt(…) and String.fromCodePoint(…) over String.fromCharCode(…).
      //'unicorn/prefer-continue',          // Prefer early continues over whole-loop conditional wrapping.
      'unicorn/prefer-date-now',          // Prefer Date.now() to get the number of milliseconds since the Unix Epoch.
      'unicorn/prefer-default-parameters',          // Prefer default parameters over reassignment.
new      'unicorn/prefer-direct-iteration',          // Prefer direct iteration over default iterator method calls.
      'unicorn/prefer-dom-node-append',         // Prefer Element#append() over Node#appendChild().
new      'unicorn/prefer-dom-node-html-methods',         // Prefer .getHTML() and .setHTML() over .innerHTML.
      'unicorn/prefer-dom-node-remove',         // Prefer childNode.remove() over parentNode.removeChild(childNode).
new      'unicorn/prefer-dom-node-replace-children',         // Prefer .replaceChildren() when emptying DOM children.
      'unicorn/prefer-dom-node-text-content',         // Prefer .textContent over .innerText.
      // 'unicorn/prefer-early-return',          // Prefer early returns over full-function conditional wrapping.
new      'unicorn/prefer-else-if',         // Prefer else if over adjacent if statements with related conditions.
      'unicorn/prefer-event-target',          // Prefer EventTarget over EventEmitter.
      'unicorn/prefer-export-from',         // Prefer export…from when re-exporting.
new      'unicorn/prefer-flat-math-min-max',         // Prefer flat Math.min() and Math.max() calls over nested calls.
new      'unicorn/prefer-get-or-insert-computed',          // Prefer .getOrInsertComputed() when the default value has side effects.
new      'unicorn/prefer-global-number-constants',         // Prefer global numeric constants over Number static properties.
      'unicorn/prefer-global-this',         // Prefer globalThis over window, self, and global.
new      'unicorn/prefer-group-by',          // Prefer Object.groupBy() or Map.groupBy() over reduce-based grouping.
new      'unicorn/prefer-has-check',         // Prefer .has() when checking existence.
new      'unicorn/prefer-hoisting-branch-code',          // Prefer moving code shared by all branches of an if statement out of the branches.
new      'unicorn/prefer-https',         // Prefer HTTPS over HTTP.
new      'unicorn/prefer-identifier-import-export-specifiers',         // Prefer identifiers over string literals in import and export specifiers.
      'unicorn/prefer-includes',          // Prefer .includes() over .indexOf(), .lastIndexOf(), and Array#some() when checking for existence or non-existence.
new      'unicorn/prefer-includes-over-repeated-comparisons',          // Prefer .includes() over repeated equality comparisons.
new      'unicorn/prefer-iterable-in-constructor',         // Prefer passing iterables directly to constructors instead of filling empty collections.
new      'unicorn/prefer-iterator-helpers',          // Prefer iterator helpers over temporary arrays from iterators.
new      'unicorn/prefer-iterator-to-array',         // Prefer Iterator#toArray() over temporary arrays from iterator spreads.
new      'unicorn/prefer-iterator-to-array-at-end',          // Prefer moving .toArray() to the end of iterator helper chains.
      'unicorn/prefer-keyboard-event-key',          // Prefer KeyboardEvent#key over deprecated keyboard event properties.
new      'unicorn/prefer-location-assign',         // Prefer location.assign() over assigning to location.href.
      'unicorn/prefer-logical-operator-over-ternary',         // Prefer using a logical operator over a ternary.
new      'unicorn/prefer-map-from-entries',          // Prefer new Map() over Object.fromEntries() when using the result as a map.
new      'unicorn/prefer-math-abs',          // Prefer Math.abs() over manual absolute value expressions and symmetric range checks.
new      'unicorn/prefer-math-constants',          // Prefer Math constants over their approximate numeric values.
      'unicorn/prefer-math-min-max',          // Prefer Math.min() and Math.max() over ternaries for simple comparisons.
      'unicorn/prefer-math-trunc',          // Prefer Math.trunc() for truncating numbers.
new      'unicorn/prefer-minimal-ternary',         // Prefer moving ternaries into the minimal varying part of an expression.
      'unicorn/prefer-modern-dom-apis',         // Prefer modern DOM APIs.
      'unicorn/prefer-modern-math-apis',          // Prefer modern Math APIs over legacy patterns.
      'unicorn/prefer-module',          // Prefer JavaScript modules (ESM) over CommonJS.
      'unicorn/prefer-native-coercion-functions',         // Prefer using String, Number, BigInt, Boolean, and Symbol directly.
      'unicorn/prefer-negative-index',          // Prefer negative index over .length - index when possible.
      'unicorn/prefer-node-protocol',         // Prefer using the node: protocol when importing Node.js builtin modules.
new      'unicorn/prefer-number-coercion',         // Prefer Number() over parseFloat() and base-10 parseInt().
new      'unicorn/prefer-number-is-safe-integer',          // Prefer Number.isSafeInteger() over integer checks.
      'unicorn/prefer-number-properties',         // Prefer Number static methods over global functions and optionally static properties over global constants.
new      'unicorn/prefer-object-define-properties',          // Prefer Object.defineProperties() over multiple Object.defineProperty() calls.
new      'unicorn/prefer-object-destructuring-defaults',         // Prefer object destructuring defaults over default object literals with spread.
      'unicorn/prefer-object-from-entries',         // Prefer using Object.fromEntries(…) to transform a list of key-value pairs into an object.
new      'unicorn/prefer-object-iterable-methods',         // Prefer the most specific Object iterable method.
new      'unicorn/prefer-observer-apis',         // Prefer observer APIs over resize and scroll listeners with layout reads.
      'unicorn/prefer-optional-catch-binding',          // Prefer omitting the catch binding parameter.
new      'unicorn/prefer-path2d',          // Prefer Path2D for repeatedly drawn canvas paths.
new      'unicorn/prefer-private-class-fields',          // Prefer private class fields over the underscore-prefix convention.
new      'unicorn/prefer-promise-try',         // Prefer Promise.try() over promise-wrapping boilerplate.
new      'unicorn/prefer-promise-with-resolvers',          // Prefer Promise.withResolvers() when extracting resolver functions from new Promise().
      'unicorn/prefer-prototype-methods',         // Prefer borrowing methods from the prototype instead of the instance.
      'unicorn/prefer-query-selector',          // Prefer .querySelector() and .querySelectorAll() over older DOM query methods.
new      'unicorn/prefer-queue-microtask',         // Prefer queueMicrotask() over process.nextTick(), setImmediate(), and setTimeout(…, 0).
      'unicorn/prefer-reflect-apply',         // Prefer Reflect.apply() over Function#apply().
      'unicorn/prefer-regexp-test',         // Prefer RegExp#test() over String#match(), String#search(), and RegExp#exec().
new      'unicorn/prefer-response-static-json',          // Prefer Response.json() over new Response(JSON.stringify()).
new      'unicorn/prefer-scoped-selector',         // Prefer :scope when using element query selector methods.
      'unicorn/prefer-set-has',         // Prefer Set#has() over Array#includes() when checking for existence or non-existence.
new      'unicorn/prefer-set-methods',         // Prefer Set methods for Set operations.
      'unicorn/prefer-set-size',          // Prefer using Set#size instead of Array#length.
      // 'unicorn/prefer-simple-condition-first',          // Prefer simple conditions first in logical expressions.
new      'unicorn/prefer-simple-sort-comparator',          // Prefer a simple comparison function for Array#sort().
new      'unicorn/prefer-simplified-conditions',         // Prefer simplified conditions.
new      'unicorn/prefer-single-array-predicate',          // Prefer a single Array#some() or Array#every() with a combined predicate.
      'unicorn/prefer-single-call',         // Enforce combining multiple Array#{push,unshift}(), Element#classList.{add,remove}(), and importScripts() into one call.
new      'unicorn/prefer-single-object-destructuring',         // Prefer a single object destructuring declaration per local const source.
new      'unicorn/prefer-single-replace',          // Enforce combining multiple single-character replacements into a single String#replaceAll() with a regular expression.
new      'unicorn/prefer-smaller-scope',         // Prefer declaring variables in the smallest possible scope.
new      'unicorn/prefer-split-limit',         // Prefer String#split() with a limit.
      // 'unicorn/prefer-spread',          // Prefer the spread operator over Array.from(…), Array#concat(…), Array#{slice,toSpliced}(), and trivial for…of copies.
new      'unicorn/prefer-string-match-all',          // Prefer String#matchAll() over RegExp#exec() loops.
new      'unicorn/prefer-string-pad-start-end',          // Prefer String#padStart() and String#padEnd() over manual string padding.
      // 'unicorn/prefer-string-raw',          // Prefer using the String.raw tag to avoid escaping \.
      // 'unicorn/prefer-string-repeat',         // Prefer String#repeat() for repeated whitespace.
      'unicorn/prefer-string-replace-all',          // Prefer String#replaceAll() over regex searches with the global flag and String#split().join().
      // 'unicorn/prefer-string-slice',          // Prefer String#slice() over String#substr() and String#substring().
      'unicorn/prefer-string-starts-ends-with',         // Prefer String#startsWith() & String#endsWith() over regexes, String#indexOf() === 0, and slice checks.
      'unicorn/prefer-string-trim-start-end',         // Prefer String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight().
      'unicorn/prefer-structured-clone',          // Prefer using structuredClone to create a deep clone.
      'unicorn/prefer-switch',          // Prefer switch over multiple else-if.
      // 'unicorn/prefer-ternary',         // Prefer ternary expressions over simple if statements that return or assign values.
      // 'unicorn/prefer-then-catch',          // Prefer .then().catch() over .then(…, …) for error handling.
new      'unicorn/prefer-toggle-attribute',          // Prefer using Element#toggleAttribute() to toggle attributes.
      'unicorn/prefer-top-level-await',         // Prefer top-level await over top-level promises and async function calls.
      'unicorn/prefer-type-error',          // Enforce throwing TypeError in type checking conditions.
      // 'unicorn/prefer-type-literal-last',         // Require type literals to be last in union types.
      // 'unicorn/prefer-unary-minus',         // Prefer the unary minus operator over multiplying or dividing by -1.
      // 'unicorn/prefer-unicode-code-point-escapes',          // Prefer Unicode code point escapes over legacy escape sequences.
      // 'unicorn/prefer-url-can-parse',         // Prefer URL.canParse() over constructing a URL in a try/catch for validation.
      // 'unicorn/prefer-url-href',          // Prefer URL#href over stringifying a URL.
      // 'unicorn/prefer-url-search-parameters',         // Prefer URLSearchParams over manually splitting query strings.
      // 'unicorn/prefer-while-loop-condition',          // Prefer putting the condition in the while statement.
      'unicorn/relative-url-style',         // Enforce consistent relative URL style.
      'unicorn/require-array-join-separator',         // Enforce using the separator argument with Array#join().
new      'unicorn/require-array-sort-compare',         // Require a compare function when calling Array#sort() or Array#toSorted().
new      'unicorn/require-css-escape',         // Require CSS.escape() for interpolated values in CSS selectors.
new      'unicorn/require-module-attributes',          // Require non-empty module attributes for imports and exports
new      'unicorn/require-module-specifiers',          // Require non-empty specifier list in import and export statements.
      'unicorn/require-number-to-fixed-digits-argument',          // Enforce using the digits argument with Number#toFixed().
new      'unicorn/require-passive-events',         // Require passive event listeners for high-frequency events.
new      'unicorn/require-proxy-trap-boolean-return',          // Require boolean-returning Proxy traps to return booleans.
      // 'unicorn/single-line-block-comment-style',          // Enforce a consistent style for single-line block comments.
      'unicorn/switch-case-braces',         // Enforce consistent brace style for case clauses.
new      'unicorn/switch-case-break-position',         // Enforce consistent break/return/continue/throw position in case clauses.
      'unicorn/template-indent',          // Fix whitespace-insensitive template indentation.
      'unicorn/text-encoding-identifier-case',          // Enforce consistent case for text encoding identifiers.
      'unicorn/throw-new-error',          // Require new when creating an error.
*/
/* jsdoc.configs['flat/recommended-typescript'] (not sure if this is complete/correct) *-/
      'jsdoc/check-access': 1, // Recommended
      'jsdoc/check-alignment': 1, // Recommended
      'jsdoc/check-examples': 1,
      'jsdoc/check-indentation': 1,
      'jsdoc/check-line-alignment': 1,
      'jsdoc/check-param-names': 1, // Recommended
      'jsdoc/check-template-names': 1,
      'jsdoc/check-property-names': 1, // Recommended
      'jsdoc/check-syntax': 1,
      'jsdoc/check-tag-names': 1, // Recommended
      'jsdoc/check-types': 1, // Recommended
      'jsdoc/check-values': 1, // Recommended
      'jsdoc/empty-tags': 1, // Recommended
      'jsdoc/implements-on-classes': 1, // Recommended
      'jsdoc/informative-docs': 1,
      'jsdoc/match-description': 1,
      'jsdoc/multiline-blocks': 1, // Recommended
      'jsdoc/no-bad-blocks': 1,
      'jsdoc/no-blank-block-descriptions': 1,
      'jsdoc/no-defaults': 1,
      'jsdoc/no-missing-syntax': 1,
      'jsdoc/no-multi-asterisks': 1, // Recommended
      'jsdoc/no-restricted-syntax': 1,
      'jsdoc/no-types': 1,
      'jsdoc/require-asterisk-prefix': 1,
      'jsdoc/require-description': 1,
      'jsdoc/require-description-complete-sentence': 1,
      'jsdoc/require-example': 1,
      'jsdoc/require-file-overview': 1,
      'jsdoc/require-hyphen-before-param-description': 1,
      // 'jsdoc/require-jsdoc': 1, // Recommended
      // 'jsdoc/require-param': 1, // Recommended
      'jsdoc/require-param-description': 1, // Recommended
      'jsdoc/require-param-name': 1, // Recommended
      'jsdoc/require-property': 1, // Recommended
      'jsdoc/require-property-description': 1, // Recommended
      'jsdoc/require-property-name': 1, // Recommended
      // 'jsdoc/require-returns': 1, // Recommended
      'jsdoc/require-returns-check': 1, // Recommended
      'jsdoc/require-returns-description': 1, // Recommended
      'jsdoc/require-template': 1,
      'jsdoc/require-throws': 1,
      'jsdoc/require-yields': 1, // Recommended
      'jsdoc/require-yields-check': 1, // Recommended
      'jsdoc/sort-tags': 1,
      // 'jsdoc/tag-lines': 1, // Recommended
      'jsdoc/valid-types': 1 // Recommended
*/
      'arrow-body-style': 'off',
      '@stylistic/brace-style': [    /* Overrides the 'recommended' setting */
        'error',
        '1tbs',
        {
          allowSingleLine: true
        }
      ],
      'unicorn/catch-error-name': [    /* Overrides the 'recommended' setting */
        'error',
        {
          ignore: ['^ex$']
        }
      ],
      'unicorn/class-reference-in-static-methods': [    /* Overrides the 'recommended' setting */
        'warn',
        {
          preferThis: false,
          preferSuper: false
        }
      ],
      '@stylistic/comma-dangle': [    /* Overrides the 'recommended' setting */
        'warn',
        'only-multiline'
      ],
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: [
            'Page',
            'Component'
          ]
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      'unicorn/consistent-boolean-name': 'off',       /* Overrides the 'recommended' setting */
      'unicorn/consistent-class-member-order': 'off', /* Overrides the 'recommended' setting - already handled by @typescript-eslint/member-ordering */
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@typescript-eslint/dot-notation': 'off',    /* Overrides the 'recommended' setting */
      'eqeqeq': [
        'error',
        'always'
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public'
          }
        }
      ],
      '@stylistic/indent': 'off',                         /* Overrides the 'recommended' setting */
      '@stylistic/indent-binary-ops': 'off',              /* Overrides the 'recommended' setting */
      '@stylistic/lines-between-class-members': 'off',    /* Overrides the 'recommended' setting */
      'max-classes-per-file': [
        'error',
        1
      ],
      '@stylistic/list-style': 'off',           /* Overrides the 'recommended' setting */
      '@stylistic/max-len': [
        'warn',
        {
          code: 140,
          ignoreComments: true,
          ignorePattern: '^import ',
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      '@stylistic/member-delimiter-style': [    /* Overrides the 'recommended' setting */
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          multilineDetection: 'brackets',
          overrides: {
            interface: {
              multiline: {
                delimiter: 'semi',
                requireLast: true,
              },
            },
          },
          singleline: {
            delimiter: 'semi'
          }
        }
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            // Index signature
            'signature',

            // // Fields
            // 'public-static-field',
            // 'protected-static-field',
            // 'private-static-field',

            // 'public-decorated-field',
            // 'protected-decorated-field',
            // 'private-decorated-field',

            'static-field',

// TODO: TASK - consider ordering by access
            'instance-field',
            // 'public-instance-field',
            // 'protected-instance-field',
            // 'private-instance-field',

            // 'public-abstract-field',
            // 'protected-abstract-field',
            // 'private-abstract-field',

            // 'public-field',
            // 'protected-field',
            // 'private-field',

            // 'abstract-field',

            // 'decorated-field',

            // 'field',

            // // Constructors
            // 'public-constructor',
            // 'protected-constructor',
            // 'private-constructor',

            'constructor',

            // // Methods
            // 'public-static-method',
            // 'protected-static-method',
            // 'private-static-method',

            // 'public-decorated-method',
            // 'protected-decorated-method',
            // 'private-decorated-method',

            // 'public-instance-method',
            // 'protected-instance-method',
            // 'private-instance-method',

            // 'public-abstract-method',
            // 'protected-abstract-method',
            // 'private-abstract-method',

            // 'public-method',
            // 'protected-method',
            // 'private-method',

            // 'instance-method',
            'abstract-method',
            'static-method',

            // 'decorated-method',

            'method'
          ]
        }
      ],
      '@stylistic/multiline-ternary': 'off',    /* Overrides the 'recommended' setting */
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'enumMember',
          format: [
            'StrictPascalCase'
          ]
        }
      ],
      'unicorn/name-replacements': 'off',             /* Overrides the 'recommended' setting */
      'unicorn/no-array-for-each': 'off',             /* Overrides the 'recommended' setting */
// TODO: `toSorted()` is not supported yet in Angular
      'unicorn/no-array-sort': 'off',            /* Overrides the 'recommended' setting */
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'off', /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',  /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-confusing-void-expression': [  /* Overrides the 'recommended' setting */
        'error',
        {
          ignoreArrowShorthand: true
        }
      ],
      'no-console': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',     /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-explicit-any': 'off',    /* Overrides the 'recommended' setting */
// TODO: can we get this to work yet?
      //   'warn',
      //   {
      //     'ignoreRestArgs': true
      //   }
      // ],
      'no-extra-bind': 'error',
      '@typescript-eslint/no-extraneous-class': [     /* Overrides the 'recommended' setting */
        'error',
        {
          allowConstructorOnly: true,
          allowWithDecorator: true
        }
      ],
      'unicorn/no-immediate-mutation': 'off',           /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-inferrable-types': 'off',  /* Overrides the 'recommended' setting */
      'unicorn/no-lonely-if': 'warn',                   /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [ -1, 0, 1 ],
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true
        }
      ],
      '@stylistic/no-multi-spaces': 'off',    /* Overrides the 'recommended' setting */
      '@stylistic/no-multiple-empty-lines': 'warn',    /* Overrides the 'recommended' setting */
      'unicorn/no-negated-condition': 'off',  /* Overrides the 'recommended' setting, since fix can be less readable */
      'no-new-func': 'error',
      'no-restricted-syntax': [
        'error',
        'ForInStatement'
      ],
      'no-sequences': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          ignoreTypeValueShadow: true
        }
      ],
      '@stylistic/no-trailing-spaces': 'warn',    /* Overrides the 'recommended' setting */
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unnecessary-condition': [    /* Overrides the 'recommended' setting */
        'error',
        {
          allowConstantLoopConditions: 'only-allowed-literals'
        }
      ],
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',    /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-unused-expressions': [    /* Overrides the 'recommended' setting */
        'warn',
        {
          allowTernary: true
        }
      ],
      '@typescript-eslint/no-unused-vars': [  /* Overrides the 'recommended' setting */
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-useless-constructor': 'warn',      /* Overrides the 'recommended' setting */
      'unicorn/no-useless-switch-case': 'off',      /* Overrides the 'recommended' setting */
      'unicorn/no-useless-undefined': [             /* Overrides the 'recommended' setting, since fix can be invalid */
        'error',
        {
          checkArguments: false
        }
      ],
      'no-warning-comments': 'warn',
      'unicorn/numeric-separators-style': [         /* Overrides the 'recommended' setting */
        'warn',
        {
          onlyIfContainsSeparator: true
        }
      ],
      '@stylistic/padded-blocks': 'warn',         /* Overrides the 'recommended' setting */
// TODO: is this still useful?
      // 'prefer-arrow/prefer-arrow-functions': [
      //   'warn',
      //   {
      //     singleReturnOnly: true,
      //     allowStandaloneDeclarations: true
      //   }
      // ],
      'unicorn/prefer-await': 'off',                /* Overrides the 'recommended' setting */
      'unicorn/prefer-continue': 'off',             /* Overrides the 'recommended' setting */
      'unicorn/prefer-early-return': 'off',         /* Overrides the 'recommended' setting */
// TODO: now in recommended
      // 'unicorn/prefer-event-target': 'off',      /* Overrides the 'recommended' setting, since `EventEmitter` is std for Angular events */
      '@typescript-eslint/prefer-for-of': 'warn',   /* Overrides the 'recommended' setting */
      '@angular-eslint/prefer-inject': 'warn',      /* Overrides the 'recommended' setting */
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',   /* Overrides the 'recommended' setting */
      '@typescript-eslint/prefer-optional-chain': 'warn',       /* Overrides the 'recommended' setting */
      'unicorn/prefer-simple-condition-first': 'off',           /* Overrides the 'recommended' setting */
      'unicorn/prefer-spread': 'off',               /* Overrides the 'recommended' setting */
      'unicorn/prefer-string-raw': 'off',           /* String.raw`` isn't IMHO more readable than an escaped string */
      'unicorn/prefer-string-repeat': 'off',        /* Overrides the 'recommended' setting */
      'unicorn/prefer-string-replace-all': 'off',   /* string.replaceAll() isn't available for `lib: es2018` */
      'unicorn/prefer-string-slice': 'warn',        /* Overrides the 'recommended' setting */
      'unicorn/prefer-ternary': 'off',              /* Overrides the 'recommended' setting */
      'unicorn/prefer-then-catch': 'off',           /* Overrides the 'recommended' setting */
      'unicorn/prevent-abbreviations': 'off',       /* Stop stupid suggestions about 'db', etc */

      'jsdoc/require-jsdoc': 'off',   /* Don't need to enforce for this project */
      'jsdoc/require-param': 'off',   /* Don't need to enforce for this project */
      'jsdoc/require-returns': 'off',   /* Don't need to enforce for this project */
      // 'jsdoc/require-jsdoc': [        /* Overrides the 'recommended' setting */
      //   'warn',
      //   {
      //     'publicOnly': true
      //   }
      // ],
      // 'jsdoc/require-param': [        /* Overrides the 'recommended' setting */
      //   'warn',
      //   {
      //     'ignoreWhenAllParamsMissing': true
      //   }
      // ],
      // 'jsdoc/require-returns': [        /* Overrides the 'recommended' setting */
      //   'warn',
      //   {
      //     'publicOnly': true,
      //     'checkGetters': false
      //   }
      // ],
      '@typescript-eslint/restrict-template-expressions': [        /* Overrides the 'recommended' setting */
        'warn',
        {
          // allowAny: false,
          allowBoolean: true,
          // allowNever: false,
          // allowNullish: false,
          allowNumber: true
          // allowRegExp: false,
        },
      ],
      '@stylistic/quote-props': [        /* Overrides the 'recommended' setting */
        'warn',
        'as-needed'
      ],
      '@stylistic/quotes': [         /* Overrides the 'recommended' setting */
        'error',
        'single'
      ],
      '@stylistic/semi': [         /* Overrides the 'recommended' setting */
        'error',
        'always',
        {
          omitLastInOneLineBlock: true
        }
      ],
      'unicorn/single-line-block-comment-style': 'off',    /* Overrides the 'recommended' setting */
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true
        }
      ],
      '@stylistic/spaced-comment': [    /* Overrides the 'recommended' setting */
        'warn',
        'always', {
          block: {
            balanced: true,
            exceptions: [
              '*',
              'not const'   /* Used to indicate non-const enums */
            ],
            markers: [
              '!'
            ],
          },
          line: {
            exceptions: [
              '/',
              '#'
            ],
            markers: [
              '/'
            ],
          },
        }
      ],
      'unicorn/switch-case-braces': [   /* Overrides the 'recommended' setting */
        'error',
        'avoid'
      ],
      'jsdoc/tag-lines': [   /* Overrides the 'recommended' setting */
        'warn',
        'any',
        {
          startLines: 1
        }
      ],
// TODO: deprecated but need to find another way of forcing this (`noImplicitAny` in tsconfig.json doesn't seem to work?)
      '@typescript-eslint/typedef': [
        'error',
        {
          // arrowParameter: true,
          variableDeclaration: true
        }
      ],
      '@typescript-eslint/unified-signatures': 'off'   /* Overrides the 'recommended' setting */
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ngeslint.configs.templateRecommended,
      ngeslint.configs.templateAccessibility
    ],
    rules: {}
  }
]);
