const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: {type: Number, required: true},
    username: {type: String, required: true},
    email: {type: String, required:true},
    userRole: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Users', userSchema);