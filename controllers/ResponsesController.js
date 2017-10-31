const ResponsesController = {}
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const IceBreakerResponse = require('../models/IceBreakerResponse');

ResponsesController.Edit = async function(req, resp, next){
 let iceBreakerResponse = await IceBreakerResponse.FindBySecret(req.query.secret)
 let question = await iceBreakerResponse.question();

 resp.render("responses/edit", {question: question, iceBreakerResponse: iceBreakerResponse})
}

ResponsesController.Update = async function(req, resp, next){
 let iceBreakerResponse = await IceBreakerResponse.FindBySecret(req.query.secret)
 let question = await iceBreakerResponse.question();

  resp.redirect("/responses", {question: question, iceBreakerResponse: iceBreakerResponse}) 
}

ResponsesController.Show = async function(req, resp, next){
  let icebreaker = await IceBreaker.FindBySecret(req.query.secret);
  let icebreakerResponses = await icebreaker.responses();

  resp.render("responses/show", {icebreaker: icebreaker, question: question, iceBreakerResponse: iceBreakerResponse}) 
}

module.exports = ResponsesController