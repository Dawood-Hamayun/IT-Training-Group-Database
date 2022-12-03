const mysql = require('mysql');

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'pokemon',
    database : 'it_training_group'
});



module.exports = db; 

