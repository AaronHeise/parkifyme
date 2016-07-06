var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var nodemailer = require('nodemailer')

var app = express();


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app')));

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://parkifyme%40gmail.com:makersquare@smtp.gmail.com');


app.post('/api/spot', function(req, res) {
  console.log('Hit API/SPOT, logging req.body', req.body.email);
  fs.writeFile('server/spot.json', JSON.stringify(req.body), function(err, data) {
    if (err) {
      return console.log('api/spot error: ', err)
    }
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Parking Friends" <parkifyme@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Parkify Test', // Subject line
        text: 'Move your car on', // plaintext body
        html: 'Move your car on' + req.body.date_to_move + '. It is parked on ' + req.body.street + '. Cross is: ' + req.body.cross // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    
  })
})



















module.exports = app;
app.listen(3000);
console.log('App listening on port 3000');


// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/app/index.html');
// });