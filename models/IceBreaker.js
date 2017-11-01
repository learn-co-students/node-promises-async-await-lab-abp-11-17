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
    const query = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM icebreakers WHERE secret = ?`;

      db.get(sql, secret, (err, row) => {
        const iceBreaker = new IceBreaker(row.question_id);
        iceBreaker.id = row.id;

        resolve(iceBreaker)
      })
    })

    return query;
  }

  static Find(id) {
    const query = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM icebreakers WHERE id = ?`;

      db.get(sql, [ id ], (err, row) => {
        const iceBreaker = new IceBreaker(row.question_id);
        iceBreaker.id = row.id;
        iceBreaker.secret = row.secret;
        resolve(iceBreaker);
      });
    });

    return query;
  }

  constructor(questionID, emails) {
    this.questionID = questionID;
    this.emails = emails;
  }

  save() {
    const IceBreakerResponse = require('./IceBreakerResponse');

    return new Promise((resolve, reject) => {
      const iceBreakerResponses = [];

      db.serialize(() => {
        this.secret = crypto.randomBytes(10).toString('hex');

        db
          .run(`INSERT INTO icebreakers (question_id, secret) VALUES (?, ?)`, [
            this.questionID,
            this.secret
          ])
          .get(`SELECT last_insert_rowid() AS id FROM icebreakers`, (err, row) => {
            this.id = row.id;
            this.emails.forEach(email => {
              const secret = crypto.randomBytes(10).toString('hex')
              const iceBreakerResponse = new IceBreakerResponse(this.id, email, secret)
              iceBreakerResponse.insert()
              iceBreakerResponses.push(iceBreakerResponse)
            });

            resolve(this, iceBreakerResponses);
          });
      });
    });
  }
}

module.exports = IceBreaker;
