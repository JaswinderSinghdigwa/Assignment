const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    heading: String,
    description: String,
    completed:Boolean,
    comments:String
}, {
    timestamps: true
});

module.exports = mongoose.model('form', formSchema);