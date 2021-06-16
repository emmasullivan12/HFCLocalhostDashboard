// Merged on 29th Sept 2020
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'

ejs.renderFile(__dirname + "/emailTemplate-chatFeedback-mentorChaser.ejs", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[REMINDER] Don\'t forget to complete your chat feedback!',
      text: 'Don\'t forget to complete your chat feedback \n\n Feedback is a key part of the Prospela community. It\'s your chance to give and receive useful private feedback, as well as gain an insight to how your mentoring style was perceived. \n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
