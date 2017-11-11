'use strict';

const { expect } = require('chai');

const Question = require('../../models/Question');


describe('Question', () => {
  it("is exported into modules so it can be loaded here", () => {
    expect(Question).to.be.a("function")
  })
});
