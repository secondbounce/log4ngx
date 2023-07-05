// const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  // eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("src/style.css");

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: "src"
      // includes: "_includes",
      // data: "_data",
// TODO: work out how to stop extra folder being created
      // output: "../../docs"
    }
    // passthroughFileCopy: true
    // pathPrefix: "/eleventy-base-blog/"
  };
};
