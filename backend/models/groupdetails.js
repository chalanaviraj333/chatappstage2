const mongoose = require('mongoose');

const groupDetailsSchema = mongoose.Schema({
    userID: {type: Number, required: true},
    username: {type: String, required: true},
    userRole: {type: String, required: true},
    groupname: {type: String, required: true}
    
});

module.exports = mongoose.model('GroupsDetails', groupDetailsSchema);