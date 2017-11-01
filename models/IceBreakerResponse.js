'use strict';

const db = require("../config/db");

class IceBreakerResponse {
  static CreateTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS icebreaker_responses (
        id INTEGER PRIMARY KEY,
        icebreaker_id INTEGER,
        email TEXT,
        secret TEXT,
        response_text TEXT,
        response_url TEXT
      )
    `;

    return db.run(sql);
  }

  static FindAllByIceBreakerID(iceBreakerID) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM icebreaker_responses WHERE icebreaker_id = ?`;

      db.all(sql, iceBreakerID, (err, rows) => {
        const results = rows.map(row => {
          const response = new IceBreakerResponse(row.icebreaker_id, row.email, row.secret);
          response.id = row.id;
          response.responseText = row.response_text;
          return response;
        });

        resolve(results);
      });
    });
  }

  static FindBySecret(secret) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM icebreaker_responses WHERE secret = ?`;

      db.get(sql, [ secret ], (err, row) => {
        const response = new IceBreakerResponse(row.icebreaker_id, row.email, row.secret);
        response.id = row.id;

        resolve(response);
      });
    });
  }

  constructor(iceBreakerID, email, secret) {
    this.iceBreakerID = iceBreakerID;
    this.email = email;
    this.secret = secret;
  }

  insert() {
    db.run(`
      INSERT INTO icebreaker_responses (
        icebreaker_id,
        email,
        secret
      )
      VALUES (?, ?, ?)
    `, [
      this.iceBreakerID,
      this.email,
      this.secret
    ]);
  }

  updateResponseText(responseText) {
    this.responseText = responseText;

    db.run("UPDATE icebreaker_responses SET response_text = ? WHERE id = ?", [
      this.responseText,
      this.id
    ]);
  }
}

module.exports = IceBreakerResponse;
