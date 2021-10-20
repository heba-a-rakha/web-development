// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
//const bodyParser = require('body-parser');
//used express instead because body-parser is now deprecated
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


//Adding a GET route that returns the projectData object in the server code 
app.get('/getendpoint' ,(req , res)=>{
    res.send(projectData);
});

app.post('/savedata' , (req,res)=>{
     projectData={...req.body};
     res.end();
});
/*
//posting added data to the projectData endpoint
app.post('/postdata' ,(req , res)=>{
    let projectData={
        Tempreature : request.body.main.temp ,
        city :request.body.name , 
        Date :request.body.date ,
        Feeling : request.body.feeling ,
        zipCode: document.getElementById('zip').value
    }
    res.send(projectData);
    console.log(request.body);
});

app.use((req , res , next)=>{
console.log(new Date())
next()
});
*/
//Setup Server
const port = 3000;
const server = app.listen(port,listening);
function listening(){
     console.log('server running on localhost http://localhost:' + port );
    }