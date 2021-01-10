const mysql = require("mysql2");
const fs = require("fs")

try {
	password = fs.readFileSync("./util/db_pass.txt") 
	if (!password.toString()) {
		console.log("Please enter database password in util/db_pass.txt file");
		process.exit()
	}
} catch (e){
	console.log("Please enter database password in util/db_pass.txt file");
	process.exit()
}

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "node-complete",
	password: password
});
db = pool.promise();
module.exports = db;