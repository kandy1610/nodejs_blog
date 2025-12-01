const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    createAt: { type: String, default: Date.now },
    updateAt: { type: String, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
