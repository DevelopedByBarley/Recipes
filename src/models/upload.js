const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Upload', uploadSchema)