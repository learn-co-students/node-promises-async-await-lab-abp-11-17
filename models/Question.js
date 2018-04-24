'use strict';

class Question {
  constructor(content){
    this.content = content;
  }

  static All(){
    console.log("Waiting for Questions to load...")
    return new Promise(function(resolve){
      setTimeout(function(){
        const questions = Question._All
        console.log("...Questions Loaded")

        resolve(questions)
      }, 1500)
    })
  }

  static async PrintAll(){
    const allQuestions = await Question.All()
    console.log("\n")
    allQuestions.forEach(function(question){
      console.log(question.content)
    })
    console.log("\n")
  }

  // FIXME: Implement Promise
  static Find(id){
    console.log(`Waiting for Question ${id} to load...`)

    return new Promise(function(resolve){
      setTimeout(function(){
        const question = Question._All[id-1] // Do Not Edit
        console.log(`...Question ${id} Loaded`) // Do Not Edit
        // We don't return in a promise, we resolve
        // return question
        resolve (question)
      }, 1500)

    })
  }

  // FIXME: Implement async / await
  static async Print(id){
    // Find the question
    const question = await Question.Find(id)
    // Print it
    console.log(question.content)

    // Calling Print within Print doesn't feel write...
    //static async Print(id){
  }
}

Question._All = [
  new Question("Where in the world is Carmen Sandiego?"),
  new Question("What's your favorite TV Show?"),
  new Question("What superpower would you want?")
]

module.exports = Question
