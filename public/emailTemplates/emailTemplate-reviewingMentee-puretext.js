// Merged on 12th oct 2020
const ejs = require("ejs");

const fname = 'Dexter'
const email = 'dexter@hotmail.com'

ejs.renderFile(__dirname + "/emailTemplate-reviewingMentee.ejs", {fname: fname}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Won\'t be long - We\'re just reviewing your account',
      text: 'Hold tight. We\'re just reviewing your account\n\nOnce approved, you\'ll be able to enjoy live insights to work-life, get actionable career advice & have a network-for-life to open doors and get you those all-important career opportunities 🎉',
      html: data
    }
  }
});
