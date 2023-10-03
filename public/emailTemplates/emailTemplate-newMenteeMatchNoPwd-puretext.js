// Merged on 25th march 2021 

const ejs = require("ejs");

const email = 'dexter@hotmail.com'

ejs.renderFile(__dirname + "/emailTemplate-newMenteeMatchNoPwd.ejs", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: 'You have a new Mentee match on Prospela',
      text: 'You have a new mentoring match on Prospela!\n\nOne of our team have scouted a new Mentee match for you 🎉 \n\nThey\'re particularly keen to speak with you and they\'ve already dropped you a little message \n\nSet your password to check out their profile (which we\'ve sent you by DM) and accept to start chatting (or kindly decline if you don\'t think it\'s quite the right fit).\n\nSet your password to see your Match at \'https://app.prospela.com/login/forgotpassword\' (9 days to respond)\n\nAs always, you can reach out to us if you need any help or ideas for how to introduce yourself. Chat to us in the platform =)\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
