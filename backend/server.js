const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/',(req,res) =>
{
    res.json({"test":"It is working"});
})

app.listen(3000,() => {
    console.log('App is listing in 3000');
})