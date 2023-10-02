// Merged on 21st june 2021 
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'
const matchName = 'Dave'

ejs.renderFile(__dirname + "/emailTemplate-chatFeedback-mentorChaser.ejs", {matchName: matchName}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[REMINDER] Don\'t forget to complete your chat feedback for ' + matchName + '!',
      text: 'Don\'t forget to complete your chat feedback for ' + matchName + ' \n\n Feedback is a key part of the Prospela community. It\'s your chance to give and receive useful private feedback, as well as gain an insight to how your mentoring style was perceived. \n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
