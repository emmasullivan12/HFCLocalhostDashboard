// Merged on 29th Sept 2020
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const link = 'https://app.prospela.com/'

ejs.renderFile(__dirname + "/emailTemplate-chatFeedbackReq.ejs", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[ACTION REQUIRED] It\'s chat feedback time!',
      text: 'You\'ve had some time to kick off your conversation. Now, take a few minutes to reflect on the experience so far, share some feedback and how you\'d like to engage with your match going forward.\n\n Don\'t worry, we won\'t share your responses until after your match leaves their feedback too. \n\nComplete Feedback: ' + link + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
