// Merged on 25th march 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const mentorsGroup = 'Access:VFX'

ejs.renderFile(__dirname + "/emailTemplate-newMenteeMatchNoPwd-chaser2.ejs", {mentorsGroup: mentorsGroup}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: '[LAST CALL] Don\'t lose your Mentee match on Prospela',
      text: '📢 Last chance! Accept your new mentoring match on Prospela!\n\nOne of our team sent you a DM (and your Mentee\'s profile and "hello" message) which you need to accept to start chatting (or kindly decline so that we can match them with someone else).\n\nSet your password to see your Match at \'https://app.prospela.com/login/forgotpassword\' (2 days left)\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
