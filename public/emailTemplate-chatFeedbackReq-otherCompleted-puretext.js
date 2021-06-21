// Merged on 21st june 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'
const userRole = 'mentee'
const menteeName = 'Dexter'
const mentorName = 'Emma'
const matchName = userRole == 'mentee' ? mentorName : menteeName

ejs.renderFile(__dirname + "/emailTemplate-chatFeedbackReq-otherCompleted.ejs", {matchName: matchName}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Your chat feedback - Find out what ' + matchName + ' wrote',
      text: 'Find out what ' + matchName + ' wrote. \n\n You can read their review after you complete your chat feedback\n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
