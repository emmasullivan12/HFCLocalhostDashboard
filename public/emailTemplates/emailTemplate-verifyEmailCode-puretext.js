// Merged on 29th Sept 2020 
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const tokenValue = '123456'

ejs.renderFile(__dirname + "/emailTemplate-verifyEmailCode.ejs", {tokenValue: tokenValue}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  '[ACTION REQUIRED] Prospela - Verify your email',
      text: 'You\'re nearly in! Verify your email\n\nWe are looking forward to having you on board 🎉\n\nPlease verify your account using the following code which is valid for the next 24hrs:\n\n' + tokenValue + '\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
