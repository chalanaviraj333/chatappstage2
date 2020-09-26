const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    groupname: {type: String, required: true},
    channelname: {type: String, required: true}
    
});

module.exports = mongoose.model('Channels', channelSchema);