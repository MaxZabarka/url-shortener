
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./urls.db');
db.run("CREATE TABLE IF NOT EXISTS urls (short_url TEXT PRIMARY KEY, long_url TEXT)")
// 	password = fs.readFileSync("./util/db_pass.txt") 
// 	if (!password.toString()) {
// 		console.log("Please enter database password in util/db_pass.txt file");
// 		process.exit()
// 	}
// } catch (e){
// 	console.log("Please enter database password in util/db_pass.txt file");
// 	process.exit()
// }

// const pool = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	database: "node-complete",
// 	password: password
// });
module.exports = db;