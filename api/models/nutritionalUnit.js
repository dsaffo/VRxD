const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionalUnitSchema = new Schema({
'id': {type: String, required: true}, 
'name': {type: String, required: true}, 
'abbreviation': {type: String, required: true}, 
'plural': {type: String, required: true}, 
'pluralAbbreviation': {type: String, required: true}, 
'decimal': {type: Boolean, required: true}, 
});

module.exports = mongoose.model("NutritionalUnit", nutritionalUnitSchema);
