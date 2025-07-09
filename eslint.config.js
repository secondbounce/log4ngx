/// template.angular
// @ts-check -- make sure this file valid too
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import ngeslint from 'angular-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
// TODO: using `projectService: true` with workspaces containing multiple projects works
// fine for linting from the commandline, but breaks compatibility with the VSCode ESLint
// extension, preventing linting warnings/errors appearing in the editor (see issue
// https://github.com/Microsoft/vscode-eslint/issues/1911).  So for now, use the 'old'
// syntax.
        // projectService: true,
        project: [
          './tsconfig.json',
          './projects/*/tsconfig.app.json',
          './projects/*/tsconfig.lib.json',
          './projects/*/tsconfig.spec.json'
        ],
        tsconfigRootDir: import.meta.dirname
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
      tseslint.configs.stylisticTypeChecked,            // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic.ts
      ngeslint.configs.tsRecommended,                   // https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.json
      eslintPluginUnicorn.configs.recommended,          // https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules
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
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': 'error',
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
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
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
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
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn'
*/
/* eslintPluginUnicorn.configs.recommended (no easy way to list default values) *-/
      // 'unicorn/catch-error-name': 'error',
      'unicorn/consistent-assert': 'error',
      'unicorn/consistent-date-clone': 'error',
      'unicorn/consistent-empty-array-spread': 'error',
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/empty-brace-spaces': 'error',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/expiring-todo-comments': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': 'error',
      'unicorn/import-style': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-accessor-recursion': 'error',
      'unicorn/no-anonymous-default-export': 'error',
      'unicorn/no-array-callback-reference': 'error',
      // 'unicorn/no-array-for-each': 'error',
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-array-reduce': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-await-in-promise-methods': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-document-cookie': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-instanceof-builtins': 'error',
      'unicorn/no-invalid-fetch-options': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      // 'unicorn/no-lonely-if': 'error',
      'unicorn/no-magic-array-flat-depth': 'error',
      'unicorn/no-named-default': 'error',
      // 'unicorn/no-negated-condition': 'error',
      'unicorn/no-negation-in-equality-check': 'error',
      'unicorn/no-nested-ternary': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-null': 'error',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-thenable': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-array-flat-depth': 'error',
      'unicorn/no-unnecessary-array-splice-count': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unnecessary-polyfills': 'error',
      'unicorn/no-unnecessary-slice-end': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-unreadable-iife': 'error',
      'unicorn/no-useless-error-capture-stack-trace': 'error',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/no-useless-spread': 'error',
      // 'unicorn/no-useless-switch-case': 'error',
      // 'unicorn/no-useless-undefined': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      // 'unicorn/numeric-separators-style': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-blob-reading-methods': 'error',
      'unicorn/prefer-class-fields': 'error',
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/prefer-default-parameters': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-event-target': 'error',
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-global-this': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-math-min-max': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-native-coercion-functions': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-object-from-entries': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-reflect-apply': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-set-has': 'error',
      'unicorn/prefer-set-size': 'error',
      'unicorn/prefer-single-call': 'error',
      // 'unicorn/prefer-spread': 'error',
      // 'unicorn/prefer-string-raw': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      // 'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-structured-clone': 'error',
      'unicorn/prefer-switch': 'error',
      // 'unicorn/prefer-ternary': 'error',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/prefer-type-error': 'error',
      // 'unicorn/prevent-abbreviations': 'error',
      'unicorn/relative-url-style': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/require-number-to-fixed-digits-argument': 'error',
      // 'unicorn/switch-case-braces': 'error',
      'unicorn/template-indent': 'error',
      'unicorn/text-encoding-identifier-case': 'error',
      'unicorn/throw-new-error': 'error'
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
          'allowSingleLine': true
        }
      ],
      'unicorn/catch-error-name': [    /* Overrides the 'recommended' setting */
        'error',
        {
          'ignore': ['^ex$']
        }
      ],
      '@stylistic/comma-dangle': [    /* Overrides the 'recommended' setting */
        'warn',
        'only-multiline'
      ],
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          'suffixes': [
            'Page',
            'Component'
          ]
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          'type': 'element',
          'prefix': 'app',
          'style': 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          'type': 'attribute',
          'prefix': 'app',
          'style': 'camelCase'
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
          'accessibility': 'explicit',
          'overrides': {
            'accessors': 'explicit',
            'constructors': 'no-public'
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
      '@stylistic/max-len': [
        'warn',
        {
          'code': 140,
          'ignoreComments': true,
          'ignorePattern': '^import ',
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true
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
          'default': [
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
          'selector': 'enumMember',
          'format': [
            'StrictPascalCase'
          ]
        }
      ],
      'unicorn/no-array-for-each': 'off',            /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',  /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-confusing-void-expression': [  /* Overrides the 'recommended' setting */
        'error',
        {
          'ignoreArrowShorthand': true
        }
      ],
      'no-console': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',    /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-explicit-any': 'off',  /* Overrides the 'recommended' setting */
// TODO: can we get this to work yet?
      //   'warn',
      //   {
      //     'ignoreRestArgs': true
      //   }
      // ],
      'no-extra-bind': 'error',
      '@typescript-eslint/no-extraneous-class': [    /* Overrides the 'recommended' setting */
        'error',
        {
          'allowConstructorOnly': true,
          'allowWithDecorator': true
        }
      ],
      '@typescript-eslint/no-inferrable-types': 'off',  /* Overrides the 'recommended' setting */
      'unicorn/no-lonely-if': 'warn',                   /* Overrides the 'recommended' setting */
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          'ignore': [ -1, 0, 1 ],
          'ignoreEnums': true,
          'ignoreReadonlyClassProperties': true
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
          'ignoreTypeValueShadow': true
        }
      ],
      '@stylistic/no-trailing-spaces': 'warn',    /* Overrides the 'recommended' setting */
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unused-expressions': [    /* Overrides the 'recommended' setting */
        'warn',
        {
          'allowTernary': true
        }
      ],
      '@typescript-eslint/no-unused-vars': [  /* Overrides the 'recommended' setting */
        'warn',
        {
          'argsIgnorePattern': '^_'
        }
      ],
      '@typescript-eslint/no-useless-constructor': 'warn',      /* Overrides the 'recommended' setting */
      'unicorn/no-useless-switch-case': 'off',      /* Overrides the 'recommended' setting */
      'unicorn/no-useless-undefined': [             /* Overrides the 'recommended' setting, since fix can be invalid */
        'error',
        {
          'checkArguments': false
        }
      ],
      'no-warning-comments': 'warn',
      'unicorn/numeric-separators-style': [         /* Overrides the 'recommended' setting */
        'warn',
        {
          'onlyIfContainsSeparator': true
        }
      ],
      '@stylistic/padded-blocks': 'warn',         /* Overrides the 'recommended' setting */
// TODO: is this still useful?
      // 'prefer-arrow/prefer-arrow-functions': [
      //   'warn',
      //   {
      //     'singleReturnOnly': true,
      //     'allowStandaloneDeclarations': true
      //   }
      // ],
// TODO: now in recommended
      // 'unicorn/prefer-event-target': 'off',      /* Overrides the 'recommended' setting, since `EventEmitter` is std for Angular events */
      '@typescript-eslint/prefer-for-of': 'warn',   /* Overrides the 'recommended' setting */
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',   /* Overrides the 'recommended' setting */
      '@typescript-eslint/prefer-optional-chain': 'warn',   /* Overrides the 'recommended' setting */
      'unicorn/prefer-spread': 'off',               /* Overrides the 'recommended' setting */
      'unicorn/prefer-string-raw': 'off',           /* String.raw`` isn't IMHO more readable than an escaped string */
// TODO: is this okay to remove?
      // 'unicorn/prefer-string-replace-all': 'off',   /* string.replaceAll() isn't available for `lib: es2018` */
      'unicorn/prefer-string-slice': 'warn',        /* Overrides the 'recommended' setting */
      'unicorn/prefer-ternary': 'off',              /* Overrides the 'recommended' setting */
      'unicorn/prevent-abbreviations': 'off',       /* Stop stupid suggestions about 'db', etc */
      'jsdoc/require-jsdoc': [        /* Overrides the 'recommended' setting */
        'warn',
        {
          'publicOnly': true
        }
      ],
      'jsdoc/require-param': [        /* Overrides the 'recommended' setting */
        'warn',
        {
          'ignoreWhenAllParamsMissing': true
        }
      ],
      'jsdoc/require-returns': [        /* Overrides the 'recommended' setting */
        'warn',
        {
          'publicOnly': true,
          'checkGetters': false
        }
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
          'omitLastInOneLineBlock': true
        }
      ],
      'sort-imports': [
        'warn',
        {
          'ignoreCase': true,
          'ignoreDeclarationSort': true,
          'allowSeparatedGroups': true
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
          'startLines': 1
        }
      ],
// TODO: deprecated but need to find another way of forcing this (`noImplicitAny` in tsconfig.json doesn't seem to work?)
      '@typescript-eslint/typedef': [
        'error',
        {
          // 'arrowParameter': true,
          'variableDeclaration': true
        }
      ],
      '@typescript-eslint/unified-signatures': 'off'   /* Overrides the 'recommended' setting */
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...ngeslint.configs.templateRecommended,
      ...ngeslint.configs.templateAccessibility
    ],
    rules: {}
  }
);
