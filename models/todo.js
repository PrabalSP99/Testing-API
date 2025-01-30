const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    TaskName: {
        type: String,
        required: true
    },
    Status:{
        type: Boolean,
        default: false

    },
    description: {
        type: String,
        required: true
    }
    // date: {
    //     type: Date,
    //     required: true
    // }
})

module.exports = mongoose.model('todo', todoSchema)