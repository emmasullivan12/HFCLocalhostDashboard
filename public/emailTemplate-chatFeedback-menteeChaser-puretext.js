// Merged on 21st june 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'

ejs.renderFile(__dirname + "/emailTemplate-chatFeedback-menteeChaser.ejs", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[REMINDER] Don\'t forget to complete your chat feedback!',
      text: 'Don\'t forget to complete your chat feedback \n\n Feedback is a key part of the Prospela community. It\'s your chance to give and receive useful private feedback, as well as gain a potential reference to showcase your qualities to the community (& future employers!). \n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
