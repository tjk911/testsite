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
  , port = process.env.PORT || 8000
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  // , http = require('http')
  // , httpProxy = require('http-proxy')
  , bodyParser = require('body-parser')
  , fs = require("fs")
  , obj = require('./file.json')
  // , stringify = JSON.stringify(obj)



app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

// Tell app to use jade
app.set('view engine', 'jade');

// Set up grabbing data properly with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }

  console.log(obj);
  console.log(stringify);
})

app.get('/fake', function (req, res, next) {
  try {
    // var html = template({ title: 'Fake' })
    // res.send(html)
    // var parsed = JSON.stringify(obj)
    res.render('fake', { title : 'Fake', json: obj });
  } catch (e) {
    next(e)
  }
})

app.post('/', function(req, res){
  // var myJson = JSON.stringify(req.body);
  obj.push(req.body);
  var newJSON = JSON.stringify(obj);
  fs.writeFile('file.json', newJSON, function (err) {
    console.log(err);
  });
  // fs.appendFile( "file.json", JSON.stringify( myJson ), "utf8" );
})


// myJson = require("./file.json");


app.listen(port, "localhost")

