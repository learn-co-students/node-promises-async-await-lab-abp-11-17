Bootstrap or Simple Styles

/

List Questions - Choose this Question for your friends
Add a New Question

/questions/new

Form for new question

/icebreakers/new

Add people via email

/icebreakers/1/responses/1 - unique URL for everyone to add their response
/icebreakers/1 - shows the responses to an icebreaker


questions

extracting router
extracting loading of modules

db app wide / not having to require all the time
better pry debugger in controllers
how to build a console

seemingly circuluar require problem with models loading each other?
Seriously how the fuck does REQUIRE work?

in a console if you did Question.Find(1) you'd get a promise, how to "resolve" it in console...

TODO

1. Testing
2. Console
3. require issues
4. Deployment
5. Finish base features
6. Clean up style / design / ux
7. deployment
8. secrets
9. twilio / email integration
10. video integration

Considerations:

1. Instead of relational functions on objects like icebreaker.question() consider Question.FindByIceBreaker(icebreaker).
2. Consider a Model export that contains the other constants.