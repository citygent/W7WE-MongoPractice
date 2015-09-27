var mongoose = require('mongoose')

var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  dob: Date,
  gender: String,
  species: String,
  status: String
})

var Animal = mongoose.model ('Animal', animalSchema)
module.exports = Animal;