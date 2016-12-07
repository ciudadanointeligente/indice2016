var gulp = require('gulp');
var child = require('child_process');
var gutil = require('gulp-util');

gulp.task('default', function() {
  console.log('gullp');
});

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
