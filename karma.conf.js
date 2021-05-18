// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const defaultTestThresholds = require('./unit-test-thresholds.json');

const tryRequire = (file) => {
  try {
    return require(file);
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    }
    return undefined;
  }
};

module.exports = function (config) {
  const packagePath = config.buildWebpack.webpackConfig.context;
  const customTestThresholds = tryRequire(require('path').join(
    packagePath, 'unit-test-thresholds.json'));
  const unitTestTreshHolds = customTestThresholds || defaultTestThresholds;

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary', 'json'],
      dir: require('path').join(packagePath, 'coverage'),
      fixWebpackSourcePaths: true,
      thresholds: unitTestTreshHolds,
      'report-config': {  html: { subdir: 'html' } },
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    failOnEmptyTestSuite: false,
  });
};
