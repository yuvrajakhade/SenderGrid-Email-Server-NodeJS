var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
const corsOptions = {
    // origin: 'http://localhost:4200',
    origin: 'http://localhost:8080',
    credentials: true,

}
const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  app.use(forceSSL()); //comment loccally
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: 1024102420,
    type: 'application/json'
}));
var sendMail = require('./app/route/sendMail/sendMail.route')
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });
  app.use(express.static(path.join(__dirname, 'dist')));//comment loccally
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
var sqlinjection = require('sql-injection')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sendMail', sendMail)

app.use(sqlinjection)

var server = app.listen(port);

 

console.log('Server running at http://localhost:' + port);
