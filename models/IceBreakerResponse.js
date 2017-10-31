let db = require("../config/db");

const Question = require('./Question');
const IceBreaker = require('./IceBreaker');

class IceBreakerResponse {
  
  static CreateTable(){
    let sql = `
      CREATE TABLE IF NOT EXISTS icebreaker_responses (
        id INTEGER PRIMARY KEY, 
        icebreakerID INTEGER,
        questionID INTEGER,
        email TEXT,
        secret TEXT,
        response_text TEXT,
        response_url TEXT
      )
    `

    db.run(sql)
  }

  static FindAllByIceBreakerID(icebreakerID){
    let query = new Promise(function(resolve, reject){
      let sql = `SELECT * FROM icebreaker_responses WHERE icebreakerID = ?`;
      let results = [];

      db.all(sql, icebreakerID, function(err, rows){
        rows.forEach(function(row){
          let response = new IceBreakerResponse(row.icebreakerID, row.questionID, row.email, row.secret);
          response.id = row.id;
          results.push(response)
        })

        resolve(results)
      })        
    })

    return query;
  }

  static FindBySecret(secret){
    let query = new Promise(function(resolve, reject){
      let sql = `SELECT * FROM icebreaker_responses WHERE secret = ?`;

      db.get(sql, secret, function(err, row){
        let response = new IceBreakerResponse(row.icebreakerID, row.questionID, row.email, row.secret);
        response.id = row.id;

        resolve(response)
      })
    })

    return query;
  }  

  constructor(icebreakerID, questionID, email, secret) {
    this.icebreakerID = icebreakerID;
    this.questionID = questionID;
    this.email = email;
    this.secret = secret;
  }

  insert(){
    db.run(`INSERT INTO icebreaker_responses (icebreakerID, questionID, email, secret) 
      VALUES (?,?,?,?)`, this.icebreakerID, this.questionID, this.email, this.secret)
  }

  question(){
    return Question.Find(this.questionID)
  }
}

module.exports = IceBreakerResponse