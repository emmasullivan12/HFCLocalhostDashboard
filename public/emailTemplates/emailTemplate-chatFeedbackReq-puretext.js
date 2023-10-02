// Merged on 19th july 2021 
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'
const matchName = 'Dave'

ejs.renderFile(__dirname + "/emailTemplate-chatFeedbackReq.ejs", {matchName: matchName}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[ACTION REQUIRED] It\'s time to give ' + matchName + ' some chat feedback!',
      text: 'You\'ve had some time to kick off your conversation. Now, take a few minutes to reflect on the experience so far, share some feedback directly with ' + matchName + ' and how you\'d like to engage going forward.\n\n Don\'t worry, we won\'t share your responses until after ' + matchName + ' leaves their feedback too. \n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
