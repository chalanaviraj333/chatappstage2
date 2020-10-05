const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');
const Group = require('./models/group');
const Channel = require('./models/channel');
const Chat = require('./models/chat');
const GroupDetails = require('./models/groupdetails');
const { response } = require('express');
const { db } = require('./models/user');
const { group } = require('console');
const { query } = require('express');
// const { response } = require('express');
// const { group } = require('console');

mongoose.connect("mongodb+srv://viraj:yaPIjBvYDCZtmtcD@cluster0.mqa2r.mongodb.net/test?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!')
})
.catch(() => {
    console.log('connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/',(req,res) =>
{
    res.json({"test":"It is working"});
})

// ----- USER FUNTIONS -----

// creating new user 
app.post('/usersignup',(req,res) =>
{
    const newUser = new User({
        userID: req.body.userID,
        username: req.body.username,
        email: req.body.email,
        userRole: req.body.userRole,
        password: req.body.password,
        groups: [],
        channels: []
    });
    newUser.save();
    res.status(202).json({message: 'User Added Successfully'});
});


//user login validation
app.post('/userlogin', (req,res) =>{

    //let validuser = false;
    const loggedUser = ({
        username: req.body.username,
        password: req.body.password
    });
    User.findOne({$and: [{username: loggedUser.username}, {password: loggedUser.password}]})
    .then(documents => {
        res.status(206).json({message: 'User validation success!', validuser: documents},)  
    });
        
});

// fetching users from database
app.get('/getusers', (req,res) =>
{   
    User.find()
    .then(documents => {
        res.status(202).json({message: 'Users fetched Successfully',
        users: documents
        });
    });
});

// delete user from database

app.post('/deleteuser',(req,res) =>
{
    const deleteUser = new User({
        username: req.body.deleteuser
    });

    User.findOneAndDelete({username: deleteUser.username}).
    then(documents => {
        res.status(202).json({message: 'User Deleted Successfully'});
    });
    

});

app.post('/deleteuserfromgroups',(req,res) =>
{
    const deleteUser = new User({
        username: req.body.deleteuser
    });

    console.log(deleteUser.username);

    const query = {groupAdmin: deleteUser.username};
    Group.updateMany(query, {$pull: {groupAdmin: deleteUser.username}}).
    then(documents => {
        res.status(202).json({message: 'User Deleted from Group Admins Successfully'});
    });
    

});


app.post('/deleteuserfromchannels',(req,res) =>
{
    const deleteUser = new User({
        username: req.body.deleteuser
    });

    console.log(deleteUser.username);

    const query = {groupAssis: deleteUser.username};
    Group.updateMany(query, {$pull: {groupAssis: deleteUser.username}}).
    then(documents => {
        res.status(202).json({message: 'User Deleted from Group Channels Successfully'});
    });
    

});


// changing user groups when creating new groups
app.post('/changegroupusers', (req,res) => {
    const groupadmins = req.body.groupadmins;
    const groupname = req.body.groupname;
    groupadmins.forEach(groupadmin => {
        const query = {username: groupadmin}
        User.findOneAndUpdate(query, { $push: {groups: groupname}}).then
        (documents => {
            console.log(documents);
        });
    });
});

// get users who already in the group
app.post('/getGroupUsers', (req,res) => {
    var usersList = [];
    const groupname = req.body.groupname;
    User.find({groups: groupname})
    .then(documents => {
        res.status(202).json({message: 'Users List fetched Successfully',
        usersList : documents
        });
    });
});


//get users not in the group
app.post('/getGroupUsersnotin', (req, res) =>
{
    var usersList = [];
    const groupname = req.body.groupname;
    User.find({groups: {$ne : groupname}})
    .then(documents => {
        res.status(202).json({message: 'Users not in group fetched Successfully',
        usersList : documents
        });
    })

});


// get users who already in the channel
app.post('/getChannelUsers', (req,res) => {
    var usersList = [];
    const channelname = req.body.channel;
    User.find({channels: channelname}, 'username')
    .then(documents => {
        res.status(202).json({message: 'Users List fetched Successfully',
        usersList : documents
        });
    });
});


//get users not in the channel
app.post('/getChannelUsersnotin', (req, res) =>
{
    var usersList = [];
    const channelname = req.body.channel;
    User.find({channels: {$ne : channelname}})
    .then(documents => {
        res.status(202).json({message: 'Users not in group fetched Successfully',
        usersList : documents
        });
    })

});




// add a new user to a group
app.post('/addgrouptotheuser', (req,res) =>{
    const addingUser = req.body.username;
    const groupname = req.body.groupname;
    const query = {username: addingUser.username}
        User.findOneAndUpdate(query, { $push: {groups: groupname}}).then
        (documents => {
        });
});


// add a new user to the channel
app.post('/addusertothechannel', (req,res) =>{
    const addingUser = req.body.username;
    const channelname = req.body.channelname;
    const query = {username: addingUser}
        User.findOneAndUpdate(query, { $push: {channels: channelname}}).then
        (documents => {
            res.status(202).json({message: 'fetched user role successfully',
        userfind: documents
        });
        });
});



// remove a new user from the group
app.post('/removegrouptotheuser', (req,res) =>{
    const removingUser = req.body.username;
    const groupname = req.body.groupname;
    const query = {username: removingUser.username}
        User.findOneAndUpdate(query, { $pull: {groups: groupname}}).then
        (documents => {
            console.log(documents);
        });
});

// remove a new user from the channel
app.post('/removechanneltotheuser', (req,res) =>{
    const removingUser = req.body.username;
    const channelname = req.body.channelname;
    const query = {username: removingUser.username}
        User.findOneAndUpdate(query, {$pull: {channels: channelname}}).then
        (documents => {
        });
});




app.get('/getsuperadmins', (req,res) =>
{   
    User.find({userRole: 'superadmin'})
    .then(documents => {
        res.status(202).json({message: 'Users fetched Successfully',
        superadmins: documents
        });
    });
});

//fetch logged user details
app.post('/getloggeduserdetails', (req,res) =>
{   
    User.findOne({username: req.body.loggeduser})
    .then(documents => {
        res.status(202).json({message: 'Users fetched Successfully',
        loggeduserDetails: documents
        });
    });
});

// check edit user in group or not
app.post('/checkuseringroupornot', (req,res) => {
    User.findOne({$and: [{username: req.body.username},{groups: req.body.groupname}]})
    .then(documents => {
        res.status(202).json({message: 'User fetched successfully', 
        userIn: documents});
    });
});

//edit user
app.post('/getGroupRole', (req,res) => 
{
    Group.findOne({$and: [{groupname: req.body.groupname}, {groupAssis: req.body.username}]}, 'groupAdmin')
    .then(documents =>{
        res.status(202).json({message: 'fetched user role successfully',
        grouprole: documents
        });
    });
});

//add a new super user
app.post('/addallgroupstosuperadmin', (req,res) =>
{
    const groups = req.body.groups;
    const query = {username: req.body.username};

    console.log(groups);
    User.findOneAndUpdate(query,{$set: {groups: groups}}).
    then(documents => {
    });
})

app.post('/addnewsuperusertoallgroupadmins', (req,res) => 
{
    const username = req.body.username;
    Group.updateMany({$push: {groupAdmin: username}}).
    then(documents => {});
})

app.post('/addnewsuperusertoallgroupassis', (req,res) => 
{
    const username = req.body.username;
    Group.updateMany({$push: {groupAssis: username}}).
    then(documents => {});
})

app.post('/changeuserroletosuperadmin', (req,res) => {
    const query = {username: req.body.username};
    User.findOneAndUpdate(query, {$set: {userRole: 'superadmin'}}).
    then(documents => {});
})

// check logged in users user role
app.post('/checkuserrole', (req,res) =>
{
    const username = req.body.selecteduser;
    User.findOne({username: username}, 'userRole').
    then(documents => {
        res.status(202).json({
        userrole: documents
        });
    })
})


app.post('/upgradetoagroupadmin', (req,res) => {
    const username = req.body.username;
    const groupname = req.body.groupname;

    const query = {groupname: groupname};
    Group.findOneAndUpdate(query, {$push: {groupAdmin: username}}, {$push: {groupAssis: username}})
    .then(documents => {
        res.status(202).json({message: 'User added to group admin successfully'});
    });
})


app.post('/upgradetoagroupassis', (req,res) => {
    const username = req.body.username;
    const groupname = req.body.groupname;

    const query = {groupname: groupname};
    Group.findOneAndUpdate(query, {$push: {groupAssis: username}})
    .then(documents => {
        res.status(202).json({message: 'User added to group assis successfully'});
    });
})


app.post('/changeusersroletoadmin', (req,res) => {
    const username = req.body.username;
    const groupname = req.body.groupname;

    const query = {username: username};
    User.findOneAndUpdate(query, {$set: {userRole: 'groupadmin'}})
    .then(documents => {
        res.status(202).json({message: 'User group role changed successfully'});
    });
})


app.post('/changeusersroletoassis', (req,res) => {
    const username = req.body.username;
    const groupname = req.body.groupname;

    const query = {username: username};
    User.findOneAndUpdate(query, {$set: {userRole: 'groupassis'}})
    .then(documents => {
        res.status(202).json({message: 'User group role changed successfully'});
    });
})

app.post('/addnewgrouptouser', (req,res) => {
    const username = req.body.username;
    const groupname = req.body.groupname;

    const query = {username: username};
    User.findOneAndUpdate(query, {$push: {groups: groupname}})
    .then(documents => {
        res.status(202).json({message: 'User group role changed successfully'});
    });
})


// ---- GROUP FUNTIONS -----

// creating new group
app.post('/creategroup', (req,res) =>
{
    const newGroup = new Group({
        groupname: req.body.groupname,
        groupAdmin: req.body.groupAdmin,
        groupAssis: req.body.groupAssis
    });
    //console.log(newGroup);
    newGroup.save();
    res.status(202).json({message: 'Group Added Successfully'});
});


// fetching groups that user added in from database
app.post('/getgroupsofuseradd', (req,res) =>
{   
    var groupList = [];
    const loggeduser = req.body.loggeduser;
    User.findOne({username: loggeduser})
    // Group.find({groupAdmin: loggeduser})
    .then(documents => {
        res.status(202).json({message: 'Groups fetched Successfully', groupList: documents},)  
    });
});


//fecthing groups that user is a assis from the database
app.post('/getgroupsofuserassis', (req,res) =>
{  

    const loggeduser = req.body.loggeduser;
    Group.find({groupAssis: loggeduser}, 'groupname')
    .then(documents => {
        res.status(202).json({message: 'Groups fetched Successfully', groupListofAssis: documents},)  
    });
});


// delete group from database
app.post('/deletegroup', (req,res) => {
        const groupname = req.body.groupname;

        Group.findOneAndDelete({groupname: groupname}).
        then(documents => {
            res.status(202).json({message: 'Group Deleted Successfully'});
        });
});

app.post('/deletegroupfromusers', (req,res) => {
    const groupname = req.body.groupname;

    const query = {groups: groupname}
    User.updateMany(query,{ $pull: {groups: groupname}}).
    then(documents => {
        console.log(documents);
        res.status(202).json({message: 'Group Deleted Successfully'});
    });
});


app.post('/deletegroupfromchannels', (req,res) => {
    const groupname = req.body.groupname;

    const query = {groupname: groupname}
    Channel.find(query)
    Channel.deleteMany(query).
    then(documents => {
        console.log(documents);
        res.status(202).json({message: 'Group Deleted Successfully'});
    });
});


//get all groupsname from the database
app.get('/getallgroupnames', (req,res) => {
    Group.find()
    .then(documents => {
        res.status(202).json({message: 'Groups', groupnameList: documents},)
    });
});


// get users in Group from the database      -------------------------------------
app.post('/usersingroup', (req,res) => {
    const usersingroup = new Group({
        groupname: req.body.groupname
    });

    Group.find()
})

// ---- CHANNEL FUNTIONS -----

// creating new channel
app.post('/createchannel', (req,res) =>
{
    const newchannel = new Channel({
        groupname: req.body.groupname,
        channelname: req.body.channelname
    });
    newchannel.save();
    res.status(202).json({message: 'Channel Added Successfully'});
});


//add new channels to the super admins
app.post('/addnewchanneltosuperadmin', (req,res) =>
{
    const channelname = req.body.channelname;

    const query = {userRole: 'superadmin'};
    User.updateMany(query, {$push: {channels: channelname}}).then
    (documents => {
        res.status(202).json({message: 'Channel Added Successfully'});
    });
    
});



app.post('/addnewchanneltologgeduser', (req,res) =>
{
    const channelname = req.body.channelname;
    const username = req.body.username;

    const query = {username: username};
    User.findOneAndUpdate(query, {$push: {channels: channelname}}).then
    (documents => {
        res.status(202).json({message: 'Channel Added Successfully'});
    });
    
});

//delete channel from the channel list
app.post('/deletechannel', (req,res) =>
{
    const channelname = req.body.channelname;

    Channel.findOneAndDelete({channelname: channelname}).
        then(documents => {
            res.status(202).json({message: 'Channel Deleted Successfully'});
        });
});


//delete channel from the user list
app.post('/deletechannelfromusers', (req,res) =>
{
    const channelname = req.body.channelname;

    const query = {channels: channelname}
    User.updateMany({$pull: {channels: channelname}}).
        then(documents => {
            res.status(202).json({message: 'Channel Deleted Successfully'});
        });
});



// fetching channels from database
app.get('/getallchannels', (req,res) =>
{   
    Channel.find()
    .then(documents => {
        res.status(202).json({message: 'Channel fetched Successfully', channels: documents},) 
    });
});



// get channel list to group page
app.post('/getGroupChannels', (req,res) => {

    var channelsList = [];
    const groupname = req.body.groupname;
    Channel.find()
    .then(channels => {
        channels.forEach(channel => {
            if (channel.groupname == groupname)
            {
                channelsList.push(channel);
            }
        });
        res.status(202).json({message: 'Channel fetched Successfully', channelsList: channelsList},) 
    });
})

app.post('/getusersinGroups', (req,res) => {
    const groupNam = req.body.groupname;
    console.log(groupNam);
})


app.get('/getgroupDetails', (req,res) => {
    GroupDetails.find()
    .then(documents => {
        res.status(202).json({message: 'Group details fetched Successfully',
        groupDetails: documents
        });
    });
});

// ----- CHAT FUNTIONS -----

app.post('/createchat', (req,res) =>
{
    const newchat = new Chat({
        username: req.body.username,
        groupname: req.body.groupname,
        channelname: req.body.channelname,
        chatmessage: req.body.chatmessage
    });
    newchat.save();
    res.status(202).json({message: 'Chat saved Successfully'});
});


app.post('/getchat', (req,res) => {

    const channelname = req.body.channelname;
    const groupname = req.body.groupname;

    Chat.find({$and:[{channelname: channelname},{groupname: groupname}]})
    .then(documents => {
        res.status(202).json({message: 'Chat list fetched Successfully',
        chatList: documents
        });
    });
});

app.listen(3000,() => {
    console.log('App is listing in 3000');
})


// yaPIjBvYDCZtmtcD

//cluser in chalana.viraj@yahoo.com