const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/nodejs_study_dev');
        console.log('connect succesfully');
    } catch (error) {
        console.log('connect failure');
    }
}

module.exports = { connect };
