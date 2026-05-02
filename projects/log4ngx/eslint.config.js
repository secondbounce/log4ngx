// @ts-check
import { defineConfig } from 'eslint/config'
import rootConfig from '../../eslint.config.js';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'log',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'log',
          style: 'kebab-case',
        }
      ]
    }
  }
]);
