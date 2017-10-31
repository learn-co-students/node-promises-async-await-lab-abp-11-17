const QuestionsController = {}
const Question = require('../models/Question');

QuestionsController.Index = async function(req, res, next) {
  let questions = await Question.all()
  res.render('questions/index', {questions: questions});
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