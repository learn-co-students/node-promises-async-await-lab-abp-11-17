# Node Promises with Async Await FIXME Lab

## Objectives

1. Implement a `Promise` within a function with blocking, slow code.
2. Declare a function as `async`.
3. Use `await` to wait for a promise to resolve.

## Instructions

The goal of the lab is to address the two `FIXME`s in `models/Question.js`. The `Question` has already been provided and implements promises with `async` and `await` correctly for the two `static` class functions, `All()`, which returns a promise, and `PrintAll()`, which is an `async` function that uses `await` to resolve the promise returned by `All()`. The tests show this functionality working. Additionally, we've provided a runner you can use to see the functionality in action, `printAllQuestions.js`, which you can run with `node printAllQuestions.js`.

```
// ♥ node printAllQuestions.js 
Printing all questions...
Waiting for Questions to load...
...Questions Loaded


Where in the world is Carmen Sandiego?
What's your favorite TV Show?
What superpower would you want?

```

As you can see, the sequence of the code is linear and the questions are loaded and only then does the printing continue.

Your job is to make `Question.Print(id)` work, a similar `static` class function for printing a specific question by `ID` (which is the index of the question in the `Question._All` array `- 1`, i.e `const question = Question._All[id-1]`). 

We've given you a runner for this behavior as well, `printFirstQuestion.js`. Currently that is broken because `Print(id)` and `Find(id)` fail to implement promises and `await` and `async`.

```
// ♥ node printFirstQuestion.js 
Printing first question...
Waiting for Question 1 to load...


/Users/avi/Development/code/accelerated-bootcamp-prep/week-2/node-promises-async-await-lab/models/Question.js:47
    console.log(question.content)
                         ^

TypeError: Cannot read property 'content' of undefined
```

That error is happening because the `Print(id)` function is trying to print the question's content before it has actually been returned.

### FIXME: `Question.Find(id)`

Within the `Question` class you'll find a non-functioning `Find(id)` static class method. The first thing to do is make this function return a promise that wraps the `setTimeout`. The promise you implement should resolve with the question.

### FIXME: `Question.Print(id)`

Once `Question.Find(id)` returns a promise that will resolve by returning the found question, you have to make `Question.Print(id)` an `async` function. Once that function is declared as `async`, you will be able to use `await` in front of `Question.Find(id)` to force the code to wait for the promise to resolve and return the question before trying to print.

Use the template that is implemented in `All()` and `PrintAll()` for help and syntax help.

## Resources

* [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
* [Intro to Promises](https://developers.google.com/web/fundamentals/primers/promises)
