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

app.use(require('./middlewares/flash.js'));

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', function(req, res) {
    res.render('pages/index', {messages: "RAS"});
});

app.post('/add_one', function(req, res) {
    let query = `UPDATE Habits SET Quantite = Quantite + 1 WHERE NOM = ? AND Taille = ?;`;
    let userName = "75A12";
    let userAddress = "1";
    connection.query(query, [userName, userAddress], (err, rows) => {
        if (err) throw err;
        console.log("Ajouté !");
    });
    res.redirect('/');
});

app.post('/del_one', function(req, res) {
    let query = `UPDATE Habits SET Quantite = Quantite - 1 WHERE NOM = ? AND Taille = ?;`;
    let userName = "75A12";
    let userAddress = "1";
    connection.query(query, [userName, userAddress], (err, rows) => {
        if (err) throw err;
        console.log("Enlevé !");
    });
    res.redirect('/');
});

app.post('/search', function(req, res) {
    let name = req.body.name;
	let size = req.body.size;
    if (name) {
        if (isNaN(size) == false) {
            connection.query('SELECT * FROM Habits WHERE Nom = ?', [name], function(error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    let tab = [];
                    let a = 0;
                    res.render('pages/result.ejs', {results: results, number: results.length, article: name});
                } else {
                    req.session.error = "Il y a une erreur";
                    req.flash('error', 'Article introuvable !');
                    res.redirect('/');
                }
            });
        } else {
            req.session.error = "Il y a une erreur";
            req.flash('error', "Merci de rentrer une taille valide");
            res.redirect('/');
        }
    } else {
        req.session.error = "Il y a une erreur";
        req.flash('error', "Merci de rentrer le nom d'un article");
        res.redirect('/');
    }
});

app.listen(3000);