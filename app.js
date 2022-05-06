/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'html')
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/',function(req,res){
  res.sendFile('index.html');
  //__dirname : It will resolve to your project folder.
});

app.post('/submitContact',function(req,res){
  var name=req.body.txtName
  var email= req.body.txtEmail
  var subject= req.body.txtSubject
  var message= req.body.txtMessage
  var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: 'mmkhann@gmail.com',
      pass: ''
    }
  });

  var mailOptions = {
    from: 'mmkhann@gmail.com',
    to: 'mmkhann@gmail.com',
    subject: subject,
    text: "name:"+name+", "+"email:"+email+", message: "+message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/');
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
