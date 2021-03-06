// server.js
// where your node app starts

// init project
const si = require('systeminformation');




const env = process.env;
const language = env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES;
require('dotenv').config();
let os = require('os');
var networkInterfaces = os.networkInterfaces();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let responseObject = {};


app.get("/api/whoami",(request,response)=>{
  
  responseObject["ipaddress"] = networkInterfaces["lo"][0]["address"];
  responseObject["language"] = language; 
  responseObject["software"] = request.header('User-Agent');
 
   
  console.log(responseObject );
  
 
  response.json(responseObject);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
