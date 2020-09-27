const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');
const Group = require('./models/group');
const Channel = require('./models/channel');
const GroupDetails = require('./models/groupdetails');
const { response } = require('express');
const { db } = require('./models/user');
const { group } = require('console');
// const { response } = require('express');
// const { group } = require('console');

mongoose.connect("mongodb+srv://chalanaViraj:FSXoYOyECGRBwYWv@cluster0.cjzr7.mongodb.net/test?retryWrites=true&w=majority")
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
})

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
        userID: req.body.deleteuser
    });

    User.findOneAndDelete({userID: deleteUser.userID}).
    then(documents => {
        res.status(202).json({message: 'User Deleted Successfully'});
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
    // MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
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

// add a new user to a group
app.post('/addgrouptotheuser', (req,res) =>{
    const addingUser = req.body.username;
    const groupname = req.body.groupname;
    const query = {username: addingUser.username}
        User.findOneAndUpdate(query, { $push: {groups: groupname}}).then
        (documents => {
        });
});


// remove a new user to a group
app.post('/removegrouptotheuser', (req,res) =>{
    const removingUser = req.body.username;
    const groupname = req.body.groupname;
    const query = {username: removingUser.username}
        User.findOneAndUpdate(query, { $pull: {groups: groupname}}).then
        (documents => {
            console.log(documents);
        });
});


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


// fetching groups from database
app.post('/getgroups', (req,res) =>
{   
    var groupList = [];
    const loggeduser = req.body.loggeduser;
    Group.find()
    .then(groups => {
        groups.forEach(group => {
            group.groupAdmin.forEach(groupAdmin => {
                if (groupAdmin == loggeduser)
                {
                    groupList.push(group);
                }
            }); 
        });
        res.status(202).json({message: 'Groups fetched Successfully', groupList: groupList},)  
    });
});


// delete group from database
app.post('/deletegroups', (req,res) => {
        const deletegroup = new Group({
            groupname: req.body.groupname
        });

        Group.findOneAndDelete({groupname: deletegroup.groupname}).
        then(documents => {
            res.status(202).json({message: 'Group Deleted Successfully'});
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
    const newChannel = new Channel({
        groupname: req.body.groupname,
        channelname: req.body.channelname
    });
    newChannel.save();
    res.status(204).json({message: 'Channel Added Successfully'});
});


// fetching channels from database
app.get('/getchannels', (req,res) =>
{   
    Channel.find()
    .then(documents => {
        res.status(202).json({message: 'Channels fetched Successfully',
        channels: documents
        });
    });

});

//user login validation
app.post('/userlogin', (req,res) =>{

    let validuser = false;
    const loggedUser = ({
        username: req.body.username,
        password: req.body.password
    });
    User.find()
    .then(users => {
        users.forEach(user => {
            if (user.username == loggedUser.username && user.password == loggedUser.password)
            {
                validuser = true;
            }  
        });
        res.status(206).json({message: 'User validation success!', validuser: validuser},)  
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


app.listen(3000,() => {
    console.log('App is listing in 3000');
})


// FSXoYOyECGRBwYWv