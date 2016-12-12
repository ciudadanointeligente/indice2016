var gulp = require('gulp');
var child = require('child_process');
var gutil = require('gulp-util');
var Parser = require('./parser/parser.js').parser;
var config = require('./config').config;
var _ = require('lodash');


gulp.task('jekyll', () => {
  var jekyll = child.spawn('jekyll', ['serve',
    '--incremental',
  ]);

  var jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});
gulp.task('parseCsvIntoJsons', function(){
    
    var p = new Parser(config.sourceCSV);
    p.createJsonFiles('', function(countries){
        var keys_ = _.keys(countries);
        _.forEach(keys_,function(country){
            console.log(country);
        });
    });
})
gulp.task('default', ['jekyll']);

