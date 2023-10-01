// Merged on 21st june 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'
const userRole = 'mentee'
const menteeName = 'Dexter'
const mentorName = 'Emma'
const matchName = userRole == 'mentee' ? mentorName : menteeName

ejs.renderFile(__dirname + "/emailTemplate-chatFeedbackReq-bothCompleted.ejs", {matchName: matchName}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Here\'s your chat feedback from ' + matchName,
      text: 'Here\'s what ' + matchName + ' wrote. \n\n Now that you\'ve both completed your chat feedback, you can check it out now (and - if you want to - show it off on your profile)\n\nView Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
