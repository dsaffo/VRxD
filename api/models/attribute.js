const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attrSchema = new Schema({
'course': {type: [String], required: true}, 
'cuisine': {type: [String], required: true}, 
'holiday': {type: [String], required: false}, 
});

module.exports = mongoose.model("Attribute", attrSchema );
