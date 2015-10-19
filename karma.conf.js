// Karma configuration
// Generated on Sat Oct 03 2015 14:58:21 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'client/assets/libs/jquery/dist/jquery.js',
      'client/assets/libs/jquery-ui/jquery-ui.min.js',
      'client/assets/libs/angular/angular.min.js',
      'client/assets/libs/angular-mocks/angular-mocks.js',
      'client/assets/libs/angular-route/angular-route.min.js',
      'client/assets/libs/angular-resource/angular-resource.min.js',
      'client/assets/libs/angular-dragdrop/src/angular-dragdrop.min.js',
      'client/assets/libs/three.js/build/three.min.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'client/app.module.js',
      'client/components/**/*.module.js',
      'client/components/**/*.js',
      'client/components/**/**/*.js',
      'client/components/**/**/*.service.js',
      'client/components/**/**/*.factory.js',
      'client/components/**/**/*.directive.js',
      'client/components/**/**/*.module.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


});
};
