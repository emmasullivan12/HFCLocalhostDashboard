// Merged on 29th Sept 2020
const ejs = require("ejs");

const fname = 'Dexter'
const email = 'dexter@hotmail.com'

ejs.renderFile(__dirname + "/emailTemplate-welcomeMentee.ejs", {fname: fname}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Won\'t be long - We\'re just reviewing your account',
      text: 'Hold tight. We\'re just reviewing your account\n\nOnce approved, you\'ll be able to customize how you\'d like to mentor with us and directly contribute to helping disadvantaged young people get their foot in the door to "out-of-reach" industries. 🎉',
      html: data
    }
  }
});
