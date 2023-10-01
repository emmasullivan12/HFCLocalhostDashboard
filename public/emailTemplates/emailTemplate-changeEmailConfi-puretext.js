// Merged on 29th Sept 2020
const ejs = require("ejs");

const fname = 'Dexter'
const oldEmail = 'dexter@hotmail.com'
const newEmail = 'dexter@gmail.com'

ejs.renderFile(__dirname + "/emailTemplate-changeEmailConfi.ejs", {newEmail: newEmail}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: oldEmail,
      subject:  'Prospela - You\'ve changed your email address',
      text: 'You\'ve changed your email\n\nThis email is to confirm that you have changed your log in and notifications email to:\n\n' + newEmail + '\n\nIf the change does not look right please update your settings or contact us at talktous@prospela.com for assistance\n\nFrom,\nThe Team @ Prospela',
      html: data
    }
  }
});
