var mysql = require('mysql');
var connection = mysql.createConnection({
	database:'node_js_crud',
	host     : "localhost",
    user     : "user1",
    password : "user123",
    port     : "3306"
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;