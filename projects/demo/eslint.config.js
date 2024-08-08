// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig
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
