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
    return new Promise(function(resolve) {
      setTimeout(function(){
        const question = Question._All[id-1] // Do Not Edit
        console.log(`...Question ${id} Loaded`) // Do Not Edit

        resolve(question)
      }, 1500)
    })
  }

  // FIXME: Implement async / await
  static async Print(id){
    const question = await Question.Find(id)

    console.log("\n")
    console.log(question.content)
    console.log("\n")
  }
}

Question._All = [
  new Question("Where in the world is Carmen Sandiego?"),
  new Question("What's your favorite TV Show?"),
  new Question("What superpower would you want?")
]

module.exports = Question
