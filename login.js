const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
    socketPath: '/var/lib/mysql/mysql.sock',
	database : 'Stock'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static( __dirname + '/client' ));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/search', function(req, res) {
    res.json("Hello world!!");
    let name = req.body.name;
	let size = req.body.size;
    console.log(name);
    console.log(size);
    if (name && size) {
        connection.query('SELECT * FROM Habits WHERE Nom = ? AND Taille = ?', [name, size], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
				res.send("TROUVE");
            } else {
				res.send('Incorrect Username and/or Password!');
			}
        });
    }
});

app.listen(3000);