// Merged on 29th Sept 2020
const ejs = require("ejs");

const newEmail = 'newemail@hotmail.com'
const tokenValue = '123456'

ejs.renderFile(__dirname + "/emailTemplate-changeEmailCode.ejs", {tokenValue: tokenValue}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: newEmail,
      subject:  '[ACTION REQUIRED] Prospela - Verify your email to complete your change of details',
      text: 'You\'re trying to change your email address! Verify your email\n\nPlease verify your account using the following code which is valid for the next 24hrs:\n\n' + tokenValue + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
