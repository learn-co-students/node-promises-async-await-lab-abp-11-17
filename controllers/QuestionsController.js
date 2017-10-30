const QuestionsController = function(req, res, next) {
  // gets all questions
  
  res.render('index', { title: 'Express' });
}

module.exports = QuestionsController