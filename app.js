var express = require('express');
var path = require('path');
var debug = require("debug");
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

//DB Config
var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/animalshelter');

// MODEL-SCHEMA for animals. 
var Animal = require('./models/animals')

// CONFIG
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')) // CSS and JS link.
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//ROUTES

// view
app.get('/', function(req, res){
  res.render('index')
})

// api
app.get('/animals', function (req, res) {
  Animal.find({}, function(error, animals){
    if (error) console.log(error);
    res.json(animals);
  })
})

app.post('/animals', function (req, res){
  var params = req.body;
    console.log(params);
    console.log(params.species);
  var newAnimal = Animal({
    name: params.name,
    breed: params.breed,
    dob: new Date(params.dob),
    gender: params.gender,
    species: params.species,
    status: 'Abandoned'
  })
  newAnimal.save(function(error) {
    if (error) console.log(error)
    console.log('animal created')
  })
  res.json(newAnimal)
})

app.put('/animals/:id', function(req, res){
  animalId = req.params.id;
  Animal.find({ _id: animalId }, function(error, animal) {
    if (error) console.log(error);
    animal.status === "Abandoned" ? console.log("no") : Animal.find(animalId, {$set:{status:"Adopted"}}, function(error, result) {
        res.send((result === 1) ? { msg:''} : {msg:'uh oh!: '+ error});
    });
  })
  res.json(animal)
});

// //SEED/TEST DATA
// var luggage = Animal({
//   name: 'The Luggage',
//   breed: 'Trunk',
//   dob: new Date("1986-May-04"),
//   gender: 'Male',
//   species: 'Sapient Pearwood',
//   status: 'Abandoned'
// })
// luggage.save(function(err) {
//   if (err) console.log(err); 
//   console.log('Abandoned Seed/Test Created&saved');
// })
// var binky = Animal({
//   name: 'Binky',
//   breed: 'TrueWhite',
//   dob: new Date("1887-May-09"),
//   gender: 'Male',
//   species: 'Horse',
//   status: 'Adopted'
// })
// binky.save(function(err) {
//   if (err) console.log(err); 
//   console.log('Adopted Seed/Test Created&saved');
// })


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)