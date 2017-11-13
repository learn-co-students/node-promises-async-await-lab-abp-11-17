'use strict';

const { expect } = require('chai');

const Icebreaker = require('../../models/Icebreaker');
const Question = require('../../models/Question');

describe('Icebreaker', () => {
  it("is exported into modules so it can be loaded here", () => {
    expect(Icebreaker).to.be.a("function", "Icebreaker not exported in Icebreaker.js")
  })
  
  it("requires('./Question.js')", () => {
    expect(Question).to.be.a("function", "Question not required in Icebreaker.js")
  })
});
