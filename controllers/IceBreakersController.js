const IceBreakersController = {}
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');

IceBreakersController.New = async function(req, res, next) {
  let question = await Question.find(req.query.questionID)

  res.render('icebreakers/new', {question: question});  
}

IceBreakersController.Create = async function(req, res, next){
  let question = await Question.find(req.query.questionID)
  let icebreaker = new IceBreaker(question.id, req.body.icebreakerEmails)
    
  await icebreaker.save()
  
  res.redirect(`/icebreakers?secret=${icebreaker.secret}`)
}

IceBreakersController.Show = async function(req, res, next){
  let icebreaker = await IceBreaker.findBySecret(req.query.secret);
  let icebreakerResponses = await icebreaker.responses();
      
  res.render("icebreakers/show", {icebreaker: icebreaker, icebreakerResponses: icebreakerResponses})    
}

module.exports = IceBreakersController