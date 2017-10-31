const QuestionsController = {}
const Question = require('../models/Question');

QuestionsController.Index = function(req, res, next) {
  // gets all questions
  Question.all().then(function(questions){
    console.log(questions)
    res.render('questions/index', {questions: questions});
  })
}

QuestionsController.New = function(req, res, next) {
  
  res.render('questions/new', {});
}

QuestionsController.Create = function(req, res, next) {
  question = new Question(req.body.questionContent);
  question.save()  
  
  res.redirect('/');
}

module.exports = QuestionsController