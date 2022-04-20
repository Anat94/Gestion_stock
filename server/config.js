const mysql = require ('mysql');
var db = mysql.createConnection({
    database: 'Stock',
    host: "localhost",
    user: "root",
    socketPath: '/var/lib/mysql/mysql.sock.bak',
    password: "password"
  });
  db.connect(function(err) {
    if (err) throw err;
      console.log("Connecté à la base de données MySQL!");
  });