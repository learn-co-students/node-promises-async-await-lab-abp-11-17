const IceBreakersController = {}
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');

IceBreakersController.New = function(req, res, next) {
  Question.find(req.query.questionID).then(function(question){

    res.render('icebreakers/new', {question: question});  
  })
}

IceBreakersController.Create = function(req, res, next){
  Question.find(req.query.questionID).then(function(question){
    let icebreaker = new IceBreaker(question.id, req.body.icebreakerEmails)
    // this sucks
    icebreaker.save().then(function(icebreaker, icebreakerResponses){
      console.log(icebreakerResponses)
      console.log(icebreaker)

      res.redirect(`/icebreakers?secret=${icebreaker.secret}`)
    })    
  })
}

IceBreakersController.Show = async function(req, res, next){
  let icebreaker = await IceBreaker.findBySecret(req.query.secret);
  let icebreakerResponses = await icebreaker.responses();
    
  console.log(icebreaker)    
  console.log(icebreakerResponses)
  
  res.render("icebreakers/show", {icebreaker: icebreaker, icebreakerResponses: icebreakerResponses})    
}

module.exports = IceBreakersController