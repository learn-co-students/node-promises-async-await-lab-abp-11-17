'use strict';

process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const db = require('../../config/db');

const Question = require('../../models/Question');

const createTable = () => new Promise((resolve, reject) => db.get('CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY, content TEXT )', [], (err, row) => err ? reject(err) : resolve(row)));

const getTables = () => new Promise((resolve, reject) => {
  db.all("SELECT name FROM sqlite_master WHERE type = 'table'", [], (err, rows) => {
    err ? reject(err) : resolve(rows);
  });
});

const getTableInfo = tableName => new Promise((resolve, reject) => {
  db.get("SELECT * FROM sqlite_master WHERE type = 'table' AND name = ?", [ tableName ], (err, row) => {
    err ? reject(err) : resolve(row);
  });
});

const createDummyQuestion = (content) => new Promise((resolve, reject) => db.get("INSERT INTO questions (content) VALUES (?)", [ content ], (err, row) => err ? reject(err) : resolve(row)));

const seedDB = () => Promise.all([
  createDummyQuestion("What's your favorite TV show?"),
  createDummyQuestion("What olympic sport would you compete in?"),
]);

const resetDB = async () => {
  const tables = await getTables();

  tables.forEach(async t => await db.run(`DROP TABLE IF EXISTS ${ t.name }`));
};

describe('Question', () => {
  describe('as a class', () => {
    describe('.CreateTable()', () => {
      afterEach(async () => {
        await resetDB();
      });

      it('exists', () => {
        expect(Question.CreateTable).to.be.a('function');
      });

      it("creates a new table in the database named 'questions'", async () => {
        await Question.CreateTable();

        const tables = await getTables();

        expect(tables[0].name).to.eq('questions');
      });

      it("adds 'id' and 'content' columns to the 'questions' table", async () => {
        await Question.CreateTable();

        const { sql } = await getTableInfo('questions');

        const idFieldExists = sql.indexOf('id INTEGER PRIMARY KEY') > -1;
        const contentFieldExists = sql.indexOf('content TEXT') > -1;

        expect(idFieldExists, "'questions' table is missing an 'id' field with type 'INTEGER' and modifier 'PRIMARY KEY'").to.eq(true);
        expect(contentFieldExists, "'questions' table is missing a 'content' field with type 'TEST'").to.eq(true);
      });
    });

    describe('.All()', () => {
      before(async () => {
        await createTable();
        await seedDB();
      });

      after(async () => {
        await resetDB();
      });

      it('exists', () => {
        expect(Question.All).to.be.a('function');
      });

      it('returns all Questions in the database as Question objects', async () => {
        const questions = await Question.All();

        expect(questions[0]).to.be.an.instanceof(Question)
        expect(questions[1]).to.be.an.instanceof(Question)
        expect(questions[0].content).to.eq("What's your favorite TV show?");
        expect(questions[1].content).to.eq("What olympic sport would you compete in?");
      });
    });


    describe('.Find()', () => {
      before(async () => {
        await createTable();
        await seedDB();
      });

      after(async () => {
        await resetDB();
      });

      it('exists', () => {
        expect(Question.Find).to.be.a('function');
      });

      it('finds an Question in the database by its ID and returns a new Question object', async () => {
        const foundQuestion = await Question.Find(2);

        expect(foundQuestion.id).to.eq(2);
        expect(foundQuestion.content).to.eq("What olympic sport would you compete in?");
      });
    });
  });

  describe('as an object', () => {
    it("sets the 'content' attribute when initializing a new object", () => {
      const question = new Question("Where in the world is Carmen Sandiego?");

      expect(question.content).to.eq("Where in the world is Carmen Sandiego?");
    });

    describe('#save()', () => {
      before(async () => {
        await createTable();
      });

      after(async () => {
        await resetDB();
      });

      it('exists', () => {
        const question = new Question("Where in the world is Carmen Sandiego?");

        expect(question.save).to.be.a('function');
      });

      it("persists itself to the 'questions' database", async () => {
        const question = new Question("Where in the world is Carmen Sandiego?");

        const savedQuestion = await question.save();

        expect(savedQuestion.id).to.eq(1);
      });
    });
  });
});
