let express = require('express');
let app = express();
let session = require('express-session');
let connection = require('./config/config.js');

app.use(session({
  secret: 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', function(req, res) {
    res.render('pages/index', {messages: "RAS"});

});

app.post('/search', function(req, res) {
    let name = req.body.name;
	let size = req.body.size;
    // res.render('pages/result.ejs', {article: name});
    console.log(name);
    console.log(size);
    if (name && size) {
        connection.query('SELECT * FROM Habits WHERE Nom = ? AND Taille = ?', [name, size], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.render('pages/result.ejs', {number: results.length, article: name});
            } else {
			}
        });
    }
});

app.listen(3000);