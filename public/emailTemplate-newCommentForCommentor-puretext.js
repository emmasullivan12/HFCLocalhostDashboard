// Merged on 24th feb 2022

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const type = 'q'
const originalQText = 'What to wear to an interview?'
const link = 'https://app.prospela.com'

ejs.renderFile(__dirname + "/emailTemplate-newCommentForCommentor.ejs", {type: type, link: link, originalQText: originalQText}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Someone replied to your comment on Prospela',
      text: 'You have a reply to your comment on Prospela! \n\nSomeone replied to your comment on ' + (type == 'q' ? ('the question: ' + originalQText) : (type == 'a' ? ('an answer to the question: ' + originalQText) : 'a post')) + '" \n\nClick below to check out the comment, and be sure to reply or upvote if you\'re happy! \n\nSee Comment: ' + link + ' \n\nFrom The Team @ Prospela',
      html: data
    }
  }
});

originalQText
