// Merged on 3rd jan 2023

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const type = 'q'
const originalQText = 'What to wear to an interview?'
const link = 'https://app.prospela.com'

ejs.renderFile(__dirname + "/emailTemplate-newCommentForAuthor.ejs", {type: type, link: link, originalQText: originalQText}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'You have a new comment on your ' + (type == 'q' ? 'Question' : (type == 'a' ? 'Answer' : 'Post')) + ' on Prospela',
      text: 'You have a new comment on your ' + (type == 'q' ? 'Question' : (type == 'a' ? 'Answer' : 'Post')) + ' on Prospela! \n\nSomeone commented on your ' + (type == 'q' ? ('Question: "' + originalQText) : (type == 'a' ? ('Answer to the question: "' + originalQText) : 'Post')) + '" \n\nClick below to check out the comment, and be sure to reply or upvote if you\'re happy! \n\nSee Comment: ' + link + ' \n\nFrom The Team @ Prospela',
      html: data
    }
  }
});
