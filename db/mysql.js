var sql = require("mysql");

   // Create a connection to the database
var connection = sql.createConnection({
    host: '168.119.159.183',
    user: 'supergigstemp',
    password: 'FAYFJWWW6T3x3Zwa',
    database: 'supergigstemp'
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  }); 

module.exports = connection;