// Merged on 8th march 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const mentorsGroup = 'Access:VFX'

ejs.renderFile(__dirname + "/emailTemplate-newMenteeMatchNoPwd-chaser1.ejs", {mentorsGroup: mentorsGroup}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: '[REMINDER] You have a new Mentee match on Prospela',
      text: '⏰ Don\'t forget your new Mentee match on Prospela!\n\nOne of our team sent you a DM (and your Mentees\'s profile and "hello" message) which you need to accept to start chatting (or decline so we can match them with someone else).\n\nSet your password to see your Match at \'https://app.prospela.com/login/forgotpassword\' (6 days left)\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
