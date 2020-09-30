const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    username: {type: String, required: true},
    groupname: {type: String, required: true},
    channelname: {type: String, required: true},
    chatmessage: {type: String, required: true}
    
});

module.exports = mongoose.model('Chats', chatSchema);