// Merged on 23rd feb 2022

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const questionAsked = "What is best to wear to an interview?"
const link = 'https://app.prospela.com'

ejs.renderFile(__dirname + "/emailTemplate-newAnswer.ejs", {questionAsked: questionAsked, link: link}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'You have a new answer to your question on Prospela',
      text: 'You have a new answer to your question on Prospela! \n\nSomeone answered your question: "' + questionAsked + '" \n\nClick below to check out the response, and be sure to upvote if you\'re happy! \n\nSee Answer: ' + link + ' \n\nFrom The Team @ Prospela',
      html: data
    }
  }
});
