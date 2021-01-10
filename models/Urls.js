db = require("../util/database.js");
class Urls {
	static fetchAll() {
		return db.execute("SELECT * from urls").then(([rows, fieldData]) => {
			return rows;
		});
    }
    
	static save(long_url, short_url) {
		return db.execute(
			"INSERT INTO urls (long_url,short_url) VALUES (?, ?)",
			[long_url, short_url]
		);
	}

	static query(short_url) {
		return db
			.execute("SELECT * FROM urls WHERE urls.short_url = ?", [short_url])
			.then((result) => {
				return result[0][0].long_url;
			})
			.catch((err) => {
				if (err instanceof TypeError) {
					return null;
				} else {
					throw err;
				}
			});
	}
}
module.exports = Urls;
