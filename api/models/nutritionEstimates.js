const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NutritionalUnit = require('./nutritionalUnit').schema;

const nutritionEstimateSchema = new Schema({
'attribute': {type: String, required: true}, 
'description': {type: String, required: true}, 
'value': {type: Number, required: true}, 
'unit': {type: NutritionalUnit, required: true}, 
});

module.exports = mongoose.model("NutritionEstimate", nutritionEstimateSchema );
