/// template.angular
// @ts-check
const eslint = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const tseslint = require('typescript-eslint');
const ngeslint = require('angular-eslint');
const eslintPluginUnicorn = require('eslint-plugin-unicorn');

// TODO: this seems to be CommonJS, not ESM (see https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main)
// TODO: see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2324
// TODO: do we still want prefer-arrow plugin??
// TODO: work out why `ignores` for '.unused' isn't working

module.exports = tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true
      },
    },
  },
  {
    files: ['**/*.ts'],
    // ignores: [
    //   'node_modules/',     // don't ever lint node_modules
    //   'dist/',             // don't lint build output
    //   '**/.unused/',          // WRONG? FYI, dot-files and dot-folders are ignored by default
    //   '**/*.unused.ts'
    // ],
    extends: [
      eslint.configs.recommended,         // https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js
      stylistic.configs['recommended-flat'],
      ...tseslint.configs.recommended,    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
      ...tseslint.configs.stylistic,      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic.ts
      ...ngeslint.configs.tsRecommended,  // https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.json
// TODO: doesn't work yet, so we'll just include the recommended rules below
      // ...eslintPluginUnicorn.configs['flat/recommended']    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
    ],
    processor: ngeslint.processInlineTemplates,
    plugins: {
// TODO: work out why we need this (and how to fix it, obvs)
// @ts-ignore
      '@stylistic': stylistic,
      unicorn: eslintPluginUnicorn,
// TODO [eslint-plugin-deprecation@>=3.1]: commented out until eslint 9 supported (see https://github.com/gund/eslint-plugin-deprecation/issues/78)
      // "plugin:deprecation/recommended",         // https://github.com/gund/eslint-plugin-deprecation/blob/master/src/configs/recommended.ts
// TODO [eslint-plugin-import@>=2.30]: commented out until eslint 9 supported (see https://github.com/import-js/eslint-plugin-import/issues/2948)
      // "plugin:import/recommended"
    },
    rules: {
      /* HACK ALERT!  We can't include the 'flat/recommended' config above due to an
        error ("eslintPluginUnicorn.configs.flat/recommended is not iterable"), so
        for now, we'll just explicitly include the rules here.
      */
      'unicorn/better-regex': 'error',
      'unicorn/consistent-destructuring': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/custom-error-definition': 'off',
      'unicorn/empty-brace-spaces': 'error',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/expiring-todo-comments': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': 'error',
      'unicorn/import-style': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-array-reduce': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-document-cookie': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-keyword-prefix': 'off',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'off',
      'unicorn/no-nested-ternary': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-null': 'error',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-thenable': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-unreadable-iife': 'error',
      'unicorn/no-unsafe-regex': 'off',
      'unicorn/no-unused-properties': 'off',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-at': 'off',
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/prefer-default-parameters': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-event-target': 'off',
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-json-parse-buffer': 'off',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
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
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-switch': 'error',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/relative-url-style': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/require-number-to-fixed-digits-argument': 'error',
      'unicorn/require-post-message-target-origin': 'off',
      'unicorn/string-content': 'off',
      'unicorn/template-indent': 'error',
      'unicorn/text-encoding-identifier-case': 'error',
      'unicorn/throw-new-error': 'error',

      'arrow-body-style': 'off',
      'arrow-parens': 'off',        /* Disabled in favour of @stylistic/arrow-parens */
      'brace-style': 'off',         /* Disabled in favour of @stylistic/brace-style */
      '@stylistic/brace-style': [    /* Overrides the 'recommended' setting */
        'error',
        '1tbs',
        {
          'allowSingleLine': true
        }
      ],
      'unicorn/catch-error-name': [
        'error',
        {
          'ignore': ['^ex$']
        }
      ],
      'comma-dangle': 'off',          /* Disabled in favour of @stylistic/comma-dangle */
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
      '@typescript-eslint/dot-notation': 'off',
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
      'max-len': [
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
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',  /* Overrides the 'recommended' setting */
// TODO: can we get this to work yet?
      //   'warn',
      //   {
      //     'ignoreRestArgs': true
      //   }
      // ],
      'no-extra-bind': 'error',
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          'allowConstructorOnly': true,
          'allowWithDecorator': true
        }
      ],
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',  /* Overrides the 'recommended' setting */
      'unicorn/no-lonely-if': 'warn',                   /* Overrides the 'recommended' setting */
      'no-magic-numbers': 'off',                        /* Disabled in favour of @typescript-eslint/no-magic-numbers */
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          'ignore': [ -1, 0, 1 ],
          'ignoreEnums': true,
          'ignoreReadonlyClassProperties': true
        }
      ],
      '@stylistic/no-multi-spaces': 'off',    /* Overrides the 'recommended' setting */
      'no-multiple-empty-lines': 'error',
      'unicorn/no-negated-condition': 'off',  /* Overrides the 'recommended' setting, since fix can be less readable */
      'no-new-func': 'error',
      'no-restricted-syntax': [
        'error',
        'ForInStatement'
      ],
      'no-return-await': 'error',
      'no-sequences': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          'ignoreTypeValueShadow': true
        }
      ],
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unused-vars': [  /* Overrides the 'recommended' setting */
        'warn',
        {
          'argsIgnorePattern': '^_'
        }
      ],
      'no-useless-constructor': 'off',              /* Disabled in favour of @typescript-eslint/no-useless-constructor */
      '@typescript-eslint/no-useless-constructor': 'warn',
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
// TODO: is this still useful?
      // 'prefer-arrow/prefer-arrow-functions': [
      //   'warn',
      //   {
      //     'singleReturnOnly': true,
      //     'allowStandaloneDeclarations': true
      //   }
      // ],
      '@typescript-eslint/prefer-for-of': 'warn',   /* Overrides the 'recommended' setting */
      'prefer-spread': 'warn',                      /* Overrides the 'recommended' setting */
      'unicorn/prefer-spread': 'off',               /* Overrides the 'recommended' setting */
      'unicorn/prefer-string-slice': 'warn',        /* Overrides the 'recommended' setting */
      'unicorn/prefer-ternary': 'off',              /* Overrides the 'recommended' setting */
      'quote-props': [
        'warn',
        'as-needed'
      ],
      'quotes': [
        'error',
        'single'
      ],
      '@typescript-eslint/require-await': 'error',
      '@stylistic/semi': [
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
      '@stylistic/spaced-comment': [
        'error',
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
      '@typescript-eslint/typedef': [
        'error',
        {
          // 'arrowParameter': true,
          'variableDeclaration': true
        }
      ],
      '@typescript-eslint/unbound-method': 'error'
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...ngeslint.configs.templateRecommended,
      ...ngeslint.configs.templateAccessibility,
    ],
    rules: {},
  }
);
