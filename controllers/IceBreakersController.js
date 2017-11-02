'use strict';

const IceBreakersController = {};
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const IceBreakerResponse = require('../models/IceBreakerResponse');

IceBreakersController.New = async function (req, res, next) {
  const question = await Question.Find(req.query.questionID);

  res.render('icebreakers/new', {
    question: question
  });
};

IceBreakersController.Create = async function (req, res, next) {
  const question = await Question.Find(req.query.questionID);
  const iceBreaker = new IceBreaker(question.id);
  const savedIceBreaker = await iceBreaker.save();

  await IceBreakerResponse.BatchCreate(savedIceBreaker.id, req.body.iceBreakerEmails);

  res.redirect(`/icebreakers?secret=${ savedIceBreaker.secret }`);
};

IceBreakersController.Show = async function (req, res, next) {
  const iceBreaker = await IceBreaker.FindBySecret(req.query.secret);
  const iceBreakerResponses = await IceBreakerResponse.FindAllByIceBreakerID(iceBreaker.id);

  res.render('icebreakers/show', {
    iceBreaker: iceBreaker,
    iceBreakerResponses: iceBreakerResponses
  });
};

module.exports = IceBreakersController;
