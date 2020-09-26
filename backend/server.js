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


// creating new user
app.post('/usersignup',(req,res) =>
{
    const newUser = new User({
        userID: req.body.userID,
        username: req.body.username,
        email: req.body.email,
        userRole: req.body.userRole,
        password: req.body.password
    });
    // console.log(newUser);
    newUser.save();
    res.status(201).json({message: 'User Added Succesfully'});
})

// fetching users from database
app.get('/getusers', (req,res) =>
{   
    User.find()
    .then(documents => {
        res.status(202).json({message: 'Users fetched Succesfully',
        users: documents
        });
    });
});


// creating new group
app.post('/creategroup', (req,res) =>
{
    const newGroup = new Group({
        groupname: req.body.groupname,
        groupAdmin: req.body.groupAdmin
    });
    newGroup.save();
    res.status(203).json({message: 'Group Added Succesfully'});
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
            // if (group.groupAdmin == loggedUser)
            // {
            //     console.log('hi');
            //     // groupList = groupList.push(group)
            // }  
        });
        res.status(202).json({message: 'Groups fetched Succesfully', groupList: groupList},)  
    });


    
    // .then(documents => {
    //     res.status(202).json({message: 'Groups fetched Succesfully',
    //     groups: documents
    //     });
    // });
});


// creating new channel
app.post('/createchannel', (req,res) =>
{
    const newChannel = new Channel({
        groupname: req.body.groupname,
        channelname: req.body.channelname
    });
    newChannel.save();
    res.status(204).json({message: 'Channel Added Succesfully'});
});


// fetching channels from database
app.get('/getchannels', (req,res) =>
{   
    Channel.find()
    .then(documents => {
        res.status(202).json({message: 'Channels fetched Succesfully',
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


// navigating to group page
app.post('/navigategroup', (req,res) => {

    var channelList = [];
    const groupNam = req.body.groupname;
    Channel.find()
    .then(channels => {
        channels.forEach(channel => {
            if (channel.groupname == groupNam)
            {
                channelList.push(channel);
            }
        });
        res.status(202).json({message: 'Channel fetched Succesfully', channelList: channelList},) 
        // res.status(202).json({message: 'Channels fetched Succesfully',
        // channels: documents
        // });
    });
})

app.post('/getusersinGroups', (req,res) => {
    const groupNam = req.body.groupname;
    console.log(groupNam);
})


//save group details to the database
app.post('/setgroupDetails', (req,res) => {
    const groupDetails = new GroupDetails(req.body);

    groupDetails.save();
    res.status(208).json({message: 'GroupDetails Added Succesfully'});

})

app.get('/getgroupDetails', (req,res) => {
    GroupDetails.find()
    .then(documents => {
        res.status(202).json({message: 'Group details fetched Succesfully',
        groupDetails: documents
        });
    });
});

// app.get('/getGroupsUsers', (req,res) => {
//     const users = User.find()
//     .then(users, groupDetails => {
//         res.status(202).json({message: 'Group details fetched Succesfully',
//         groups: document.groupDetails,
//         user: document.users
//         });
//     });
// });


app.listen(3000,() => {
    console.log('App is listing in 3000');
})


// FSXoYOyECGRBwYWv