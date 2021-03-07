// Merged on 5th march 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const mentorsGroup = 'Access:VFX'

ejs.renderFile(__dirname + "/emailTemplate-newMentorMatchNoPwd-chaser2.ejs", {mentorsGroup: mentorsGroup}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: '[LAST CALL] Don\'t lose your ' + mentorsGroup + ' E-Mentor match on Prospela!',
      text: '📢 Last chance! Accept your new mentoring match on Prospela!\n\nOne of our team sent you a DM (and your E-Mentor\'s profile) which you need to accept to start chatting, so be quick! - they might not be available for long.\n\nSet your password to see your Match at \'https://app.prospela.com/login/forgotpassword\'\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
