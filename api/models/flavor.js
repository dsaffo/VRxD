const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flavorSchema = new Schema({
'piquant': {type: Number, required: true}, 
'meaty': {type: Number, required: true}, 
'bitter': {type: Number, required: true}, 
'sweet': {type: Number, required: true}, 
'sour': {type: Number, required: true}, 
'salty': {type: Number, required: true}, 
});

module.exports = mongoose.model("Flavor", flavorSchema );
