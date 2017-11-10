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
    return new Promise(function(resolve, reject){
      const sql = `
        SELECT *
        FROM questions
      `;

      db.all(sql, function(err, rows){
        const results = rows.map(function(row){
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
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO questions (
          content
        ) VALUES (?)
      `, [
        this.content
      ]).get(`
        SELECT *
        FROM questions
        WHERE id = last_insert_rowid()
      `, [], (err, row) => {
        if (err) reject(err);

        this.id = row.id;

        resolve(this);
      });
    });
  }
}

module.exports = Question;
