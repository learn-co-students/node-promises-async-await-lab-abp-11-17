let db = require("../config/db");

// Turning Either of These On Breaks App.
// const IceBreakerResponse = require('./IceBreakerResponse');
// const IceBreaker = require('./IceBreaker');

class Question {

  static CreateTable(){
    let sql = `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY, 
        content TEXT
      )
    `

    db.run(sql)
  }

  static All(){
    let query = new Promise(function(resolve, reject){
      let sql = `SELECT * FROM questions`;
      let results = [];

      db.all(sql, function(err, rows){
        rows.forEach(function(row){
          let question = new Question(row.content);
          question.id = row.id;
          results.push(question)
        })

        resolve(results)
      })        
    })

    return query;
  }

  static Find(id){
    let query = new Promise(function(resolve, reject){
      let sql = `SELECT * FROM questions WHERE id = ?`;

      db.get(sql, id, function(err, row){
        let question = new Question(row.content);
        question.id = row.id;
        resolve(question)
      })
    })

    return query;
  }

  constructor(content) {
    this.content = content;
  }

  save(){
    db.run(`INSERT INTO questions (content) VALUES (?)`, this.content)
  }
}

module.exports = Question