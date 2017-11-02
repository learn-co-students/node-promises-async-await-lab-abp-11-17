'use strict';

const db = require("../config/db")

class Question {
  static CreateTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        content TEXT
      )
    `;

    db.run(sql);
  }

  static All() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM questions
      `;

      db.all(sql, [], (err, rows) => {
        const results = rows.map(row => {
          const question = new Question(row.content);
          question.id = row.id;

          return question;
        });

        resolve(results);
      });
    });
  }

  static Find(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM questions
        WHERE id = ?
      `;

      db.get(sql, [ id ], (err, row) => {
        const question = new Question(row.content);
        question.id = row.id;

        resolve(question);
      });
    });
  }

  constructor(content) {
    this.content = content;
  }

  save() {
    db.run(`
      INSERT INTO questions (
        content
      ) VALUES (?)
    `, [
      this.content
    ]);
  }
}

module.exports = Question;
