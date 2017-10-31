let db = require("../config/db");
let crypto = require('crypto');
const IceBreakerResponse = require('./IceBreakerResponse');

class IceBreaker {
  constructor(questionID, emails) {
    this.questionID = questionID;
    this.emails = emails;
  }

  save(){
    let self = this;
    let insert = new Promise(function(resolve, reject){
      let iceBreakerResponses = [];
      db.serialize(function(){
        self.secret = crypto.randomBytes(10).toString('hex')
        db.run(`INSERT INTO icebreakers (questionID, secret) VALUES (?, ?)`, self.questionID, self.secret)
        db.get(`SELECT last_insert_rowid() AS id FROM icebreakers`, function(err, row){
          self.id = row.id;
          self.emails.forEach(function(email){
            let secret = crypto.randomBytes(10).toString('hex')
            let iceBreakerResponse = new IceBreakerResponse(self.id, self.questionID, email, secret)
            iceBreakerResponse.insert()
            iceBreakerResponses.push(iceBreakerResponse)
          })
          resolve(self, iceBreakerResponses)
        })
      })
    })
    return insert;
  }

  responses(){
    return IceBreakerResponse.findAllByIceBreakerID(this.id);
  }
}

IceBreaker.createTable = function(){
  let sql = `
    CREATE TABLE IF NOT EXISTS icebreakers (
      id INTEGER PRIMARY KEY, 
      questionID INTEGER,
      secret TEXT
    )
  `

  db.run(sql)
}

IceBreaker.findBySecret = function(secret){
  let query = new Promise(function(resolve, reject){
    let sql = `SELECT * FROM icebreakers WHERE secret = ?`;

    db.get(sql, secret, function(err, row){
      let icebreaker = new IceBreaker(row.questionID);
      icebreaker.id = row.id;

      resolve(icebreaker)
    })
  })

  return query;
}

module.exports = IceBreaker