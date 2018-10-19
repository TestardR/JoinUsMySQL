var mysql = require('mysql');
// var faker = require('faker');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b5da4891320477',
  password: 'e0c6f508',
  database: 'heroku_524390935e0265c',
  //   host: 'localhost',
  //   user: 'root',
  //   password: 'test',
  //   database: 'join_us',
  insecureAuth: true
});

// var q = 'INSERT INTO users (email) VALUES ("rusty@gmail.com")';

// connection.query(q, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// INSERTING DATA
// var person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past()
// };

// connection.query('INSERT INTO users SET ?', person, function(error, result) {
//   if (error) throw error;
//   console.log(result);
// });

// var data = [];
// for (var i = 0; i < 500; i++) {
//   data.push([faker.internet.email(), faker.date.past()]);
// }
// console.log(data);

// var q = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q, [data], function(error, result) {
//   if (error) throw error;
//   console.log(result);
// });

app.get('/', function(req, res) {
  // Find count of users in DB
  var q = 'SELECT COUNT(*) AS count FROM users';
  connection.query(q, function(err, results) {
    if (err) throw err;
    // Respond with that count
    var count = results[0].count;
    // res.send('We have ' + count + ' users in our database');
    res.render('home', { data: count });
  });
});

app.post('/register', function(req, res) {
  var email = req.body.email;
  var person = {
    email: req.body.email
  };

  connection.query('INSERT INTO users SET ?', person, function(error, result) {
    if (error) throw error;
    res.redirect('/');
  });
});

app.listen(process.env.PORT, function() {
  console.log('Server running');
});
