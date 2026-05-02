// @ts-check
import { defineConfig } from 'eslint/config'
import rootConfig from '../../eslint.config.js';

/* No project-specific rules (yet) */
export default defineConfig([
  ...rootConfig
  // {
  //   files: ['**/*.ts'],
  //   rules: {}
  // },
  // {
  //   files: ['**/*.html'],
  //   rules: {}
  // }
]);
