const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupname: {type: String, required: true},
    groupAdmin: {type: Array, required: true},
    groupAssis: {type: Array, required: true}
    
});

module.exports = mongoose.model('Groups', groupSchema);