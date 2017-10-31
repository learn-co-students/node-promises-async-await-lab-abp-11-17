const sqlite3 = require('sqlite3').verbose();

// open the database
var db = new sqlite3.Database('./db/development.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the icebreaker-simple database.');
});

module.exports = db;
