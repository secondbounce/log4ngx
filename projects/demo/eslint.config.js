// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    }
  }
  /* No project-specific rules (yet) */
  // {
  //   files: ["**/*.ts"],
  //   rules: {},
  // },
  // {
  //   files: ["**/*.html"],
  //   rules: {},
  // }
);
