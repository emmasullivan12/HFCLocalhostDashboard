// Merged on 29th Sept 2020
const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const tokenValue = '123456'
const link = 'https://test.prospela.com/login/resetpassword/uid/?uid='+encodeURIComponent(user.uid)

ejs.renderFile(__dirname + "/emailTemplate-resetPassword.ejs", {link: link, tokenValue: tokenValue}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Reset your Prospela password',
      text: 'Reset your password\n\nYou are receiving this email because you (or someone else) have requested to reset the password on your Prospela account.\n\nIf you did not request this, please ignore this email and your password will remain unchanged. Otherwise please click below:\n\n' + link + '\n\nYou\'ll need to use the following code to update your password: ' + tokenValue,
      html: data
    }
  }
});
