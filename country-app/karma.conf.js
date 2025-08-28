module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['webpack']
    },
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: true
  });
};
