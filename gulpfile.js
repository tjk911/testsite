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
  // , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  // , http = require('http')
  // , httpProxy = require('http-proxy')
  , bodyParser = require('body-parser')
  , fs = require("fs")
  , obj = require('./file.json')
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema

// Set up mongoose here
mongoose.connect('mongodb://localhost/restaurantdb')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

var restaurantSchema = new Schema({
  name: String,
  description: String,
  detour: String,
  map: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  website: String,
  phone: Number,
  lat: String,
  long: String,
});

restaurantSchema.methods.announce = function () {
  var broadcast = this.name
    ? "Restaurant name is " + this.name
    : "I don't have a name";
  console.log(broadcast);
}

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

// Tell app to use jade
app.set('view engine', 'jade');

// Set up grabbing data properly with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
  try {
    res.render('homepage', { title : 'Restaurant DB | lohud.com' });
  } catch (e) {
    next(e)
  }
})

app.get('/list', function (req, res, next) {
  try {
    res.render('list', { title : 'Restaurant DB | List', json: obj });
  } catch (e) {
    next(e)
  }
})

app.get('/json', function (req, res, next) {
  try {
    res.render('json', { title : 'Restaurant DB | JSON', json: obj });
  } catch (e) {
    next(e)
  }
})

app.get('/data', function (req, res, next) {
  res.json( obj );
})

app.post('/', function(req, res){
  console.log(req.body);
  var content = new Restaurant(req.body);
      content.save(function(err){
          if(err){
              return handleError(err);
          } else {
              console.log('your form has been saved');
          }
      })
  obj.push(req.body);
  var newJSON = JSON.stringify(obj);
  fs.writeFile('./file.json', newJSON, function (err) {
    if(err){
        return handleError(err);
    } else {
        console.log('your json has been saved');
    }
  });
  res.render('homepage', { title : 'Home' });
})

// LISTEN!
app.listen(port, "localhost")

