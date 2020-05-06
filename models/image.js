const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ImageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    url : { type : String},
    created : { type : Date, default : Date.now }
})

//create model for todo
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;