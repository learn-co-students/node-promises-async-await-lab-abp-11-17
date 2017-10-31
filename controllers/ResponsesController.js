const ResponsesController = {}
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const IceBreakerResponse = require('../models/IceBreakerResponse');

ResponsesController.Edit = async function(req, resp, next){
 let iceBreakerResponse = await IceBreakerResponse.FindBySecret(req.query.secret)
 let question = await iceBreakerResponse.question();

 resp.render("responses/edit", {question: question})
}

ResponsesController.Update = async function(req, resp, next){
  
}

module.exports = ResponsesController