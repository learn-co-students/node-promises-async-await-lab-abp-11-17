const ResponsesController = {}
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const IceBreakerResponse = require('../models/IceBreakerResponse');

ResponsesController.Edit = async function(req, res, next){
  let iceBreakerResponse = await IceBreakerResponse.FindBySecret(req.query.secret)
  let question = await iceBreakerResponse.question();

  res.render("responses/edit", {question: question, iceBreakerResponse: iceBreakerResponse})
}

ResponsesController.Update = async function(req, res, next){
  let iceBreakerResponse = await IceBreakerResponse.FindBySecret(req.query.secret)
  let question = await iceBreakerResponse.question();
  let icebreaker = await iceBreakerResponse.icebreaker();

  await iceBreakerResponse.updateResponseText(req.body.responseText)

  res.redirect(`/responses?secret=${icebreaker.secret}`) 
}

ResponsesController.Show = async function(req, res, next){
  let icebreaker = await IceBreaker.FindBySecret(req.query.secret);
  let icebreakerResponses = await icebreaker.responses();
  let question = await icebreaker.question();

  res.render("responses/show", {icebreaker: icebreaker, question: question, icebreakerResponses: icebreakerResponses}) 
}

module.exports = ResponsesController