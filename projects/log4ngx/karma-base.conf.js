// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      // These plugins are required by all configurations, but extra ones, i.e. launchers, will need to be added
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      // Base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: require('path').join(__dirname, '../../coverage/log4ngx/instanbul'),
      // Reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly'],
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
      // Omit files with no statements, no functions and no branches from the report
      skipFilesWithNoCoverage: true,
      // Most reporters accept additional config options. You can pass these through the `report-config` option
      // 'report-config': {
      //   // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
      //   html: {
      //     // outputs the report in ./coverage/html
      //     subdir: 'html'
      //   }
      // },
      // Enforce percentage thresholds - anything under these percentages will cause karma to fail with an exit
      // code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        global: {   // Thresholds for all files
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        }
        // each: {     // Thresholds per file
        //   statements: 100,
        //   lines: 100,
        //   branches: 100,
        //   functions: 100,
        //   overrides: {
        //     'src/lib/foo.ts': {
        //       statements: 100
        //     }
        //   }
        // }
      },
      // verbose: true // output config used by istanbul for debugging
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true
  });
};
