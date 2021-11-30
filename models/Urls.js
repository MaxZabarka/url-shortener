db = require("../util/database.js");
class Urls {
  static printAll() {
    return db.all("SELECT * from urls", [], (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  static save(long_url, short_url) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO urls (long_url,short_url) VALUES (?, ?)",
        [long_url, short_url],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static query(short_url) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM urls WHERE short_url = ?",
        [short_url],
        (err, result) => {
          if (err) {
            throw reject(err);
          }
          if (!result) {
            return resolve(null);
          }
          return resolve(result.long_url);
        }
      );
    });
  }
}
module.exports = Urls;
