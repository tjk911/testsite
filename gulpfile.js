var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'static/bower_components/foundation-sites/scss',
  'static/bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('static/css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});


var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/test', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(80, 'localhost')
