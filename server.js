const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// const MenuItem= require('./models/menu');


app.get('/home', function(req, res) {
    res.send("Welcome to our hotel.");
});



const personroutes = require('./routes/personroutes');
app.use('/person' ,personroutes);

const menuitemroutes =require('./routes/menuitems');
app.use('/menu',menuitemroutes);

app.listen(5000, () => {
    console.log("Server is running on port 3500");
});
