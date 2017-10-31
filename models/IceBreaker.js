let db = require("../config/db");
let crypto = require('crypto');

class IceBreaker {
  static CreateTable(){
    let sql = `
      CREATE TABLE IF NOT EXISTS icebreakers (
        id INTEGER PRIMARY KEY, 
        questionID INTEGER,
        secret TEXT
      )
    `

    db.run(sql)
  }

  static FindBySecret(secret){
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

  static Find(id){
    let query = new Promise(function(resolve, reject){
      let sql = `SELECT * FROM icebreakers WHERE id = ?`;

      db.get(sql, id, function(err, row){
        let icebreaker = new IceBreaker(row.questionID);
        icebreaker.id = row.id;
        icebreaker.secret = row.secret;
        resolve(icebreaker)
      })
    })

    return query;
  }    

  constructor(questionID, emails) {
    this.questionID = questionID;
    this.emails = emails;
  }

  save(){
    const IceBreakerResponse = require('./IceBreakerResponse');

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
    const IceBreakerResponse = require('./IceBreakerResponse');
    return IceBreakerResponse.FindAllByIceBreakerID(this.id);
  }
}

module.exports = IceBreaker