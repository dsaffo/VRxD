const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Flavor = require('./flavor').schema;
const Attribute = require('./attribute').schema;
const NutritionEstimate = require('./nutritionEstimates').schema;

const recipeSchema = new Schema({
    'sourceDisplayName': {type: String, required: true},
    'ingredients': {type: [String], required: true},
    'id': {type: String, required: true},
    'smallImageUrls': {type: [String], required: false},
    'recipeName': {type: String, required: true},
    'totalTimeInSeconds': {type: Number, required: true},
    'imageUrlsBySize': {'90': { 
        type : String, 
        required : true
    }, required: false},
    'attributes': {type: Attribute, required: true},
    'flavor': {type: Flavor, required: true},
    'rating': {type: Number, required: true},
    'nutritionEstimates': {type: [NutritionEstimate], required: true},
    'culture': {type: [String], required: true},
});

module.exports = mongoose.model("Recipe", recipeSchema );
