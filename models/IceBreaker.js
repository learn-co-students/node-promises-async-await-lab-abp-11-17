'use strict';

const db = require("../config/db");
const crypto = require('crypto');

class IceBreaker {
  static CreateTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS icebreakers (
        id INTEGER PRIMARY KEY,
        question_id INTEGER,
        secret TEXT
      )
    `;

    return db.run(sql);
  }

  static FindBySecret(secret) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM icebreakers
        WHERE secret = ?
      `;

      db.get(sql, [ secret ], (err, row) => {
        const iceBreaker = new IceBreaker(row.question_id);
        iceBreaker.secret = row.secret;
        iceBreaker.id = row.id;

        resolve(iceBreaker);
      });
    });
  }

  static Find(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM icebreakers
        WHERE id = ?
      `;

      db.get(sql, [ id ], (err, row) => {
        const iceBreaker = new IceBreaker(row.question_id);
        iceBreaker.id = row.id;
        iceBreaker.secret = row.secret;
        resolve(iceBreaker);
      });
    });
  }

  constructor(questionID) {
    this.questionID = questionID;
  }

  save() {
    this.secret = crypto.randomBytes(10).toString('hex');

    return new Promise((resolve, reject) => {
      db
        .run(`
          INSERT INTO icebreakers (
            question_id,
            secret
          ) VALUES (?, ?)
        `, [
          this.questionID,
          this.secret
        ])
        .get(`
          SELECT *
          FROM icebreakers
          WHERE id = last_insert_rowid()
        `, [], (err, row) => {
          if (err) reject(err);

          this.id = row.id;

          resolve(this);
        });
    });
  }
}

module.exports = IceBreaker;
