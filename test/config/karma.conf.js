module.exports = function(config){
  config.set({
    basePath : '../../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'app/lib/jquery/jquery*.js',
      'app/lib/angular/ng-grid*.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
