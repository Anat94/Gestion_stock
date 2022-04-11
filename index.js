const mysql = require('mysql');

window.onload = function() {
    document.getElementById("click").onclick = function() {myFunction()};
    function myFunction() {
        const db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });
        db.connect(function(err) {
            if (err) throw err;
                console.log("Connecté à la base de données MySQL!");
        });
        console.log("JESUISLA");
    }
};
