const { Schema, model } = require('mongoose');

const Book = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, required: true },
    favorite: { type: String },
    fileCover: { type: String },
    fileName: { type: String }
})

module.exports = model('Book', Book);