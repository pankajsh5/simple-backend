const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    businessEmail : String,
    phoneNumber : String,
    industry : String,
});

module.exports = mongoose.model('Contact',contactSchema);