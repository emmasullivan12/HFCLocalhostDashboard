// Merged on 5th march 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const mentorsGroup = 'Access:VFX'

ejs.renderFile(__dirname + "/emailTemplate-newMenteeMatch-chaser1.ejs", {mentorsGroup: mentorsGroup}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: '[REMINDER] You have a new Mentee match on Prospela',
      text: '⏰ Don\'t forget your new Mentee match on Prospela!\n\nOne of our team sent you a DM (and your Mentees\'s profile and "hello" message) which you need to accept to start chatting (or decline so we can match them with someone else).\n\nSee your Match at \'https://app.prospela.com\' (6 days left)\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
