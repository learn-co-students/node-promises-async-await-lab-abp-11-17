'use strict';

const { expect } = require('chai');

const Question = require('../../models/Question.js');

describe('Question', () => {
  beforeEach(function(){
    Question._All = [
      new Question("Where in the world is Carmen Sandiego?"),
      new Question("What's your favorite TV Show?"),
      new Question("What superpower would you want?")
    ]
  })
  describe("Question.All()", function(){
    it("returns a promise", function(){
      const questions = Question.All()

      expect(questions).to.be.an.instanceOf(Promise);
    })

    it("returns a the array of Questions in ._All with await/async", async function(){
      const questions = await Question.All()

      expect(questions).to.eql(Question._All)
    })
  })
  describe("Question.PrintAll()", function(){
    it('is an async function', function(){
      expect(Question.PrintAll.constructor.name).to.eq('AsyncFunction')
    })
  })

  describe("Question.Find(id)", function(){
    it("returns a promise", function(){
      const question = Question.Find(1)

      expect(question).to.be.an.instanceOf(Promise);
    })

    it("returns the question with await/async", async function(){
      const question = await Question.Find(1)

      expect(question).to.eql(Question._All[0], "HINT: Are you returning a promise that has a resolve?\n")
    })
  })
  describe("Question.Print(id)", function(){
    it('is an async function', function(){
      expect(Question.Print.constructor.name).to.eq('AsyncFunction', "HINT: Did you declare Print to be a static async function?\n")
    })
  })
});
// true;
