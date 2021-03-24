// Merged on 7th march 2021
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const mentorsGroup = 'Access:VFX'

ejs.renderFile(__dirname + "/emailTemplate-newMentorMatch.ejs", {mentorsGroup: mentorsGroup}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject: 'You have a new ' + mentorsGroup + ' E-Mentor match on Prospela',
      text: 'You have a new mentoring match on Prospela!\n\nOne of our team have scouted an ' + mentorsGroup + ' E-Mentor match for you 🎉 \n\nClick below to check out the message we\'ve sent you (with your E-Mentor\'s profile) and accept to start chatting, but be quick! - they might not be available for long.\n\nSee your Match at \'https://app.prospela.com\' (9 days to respond)\n\nAs always, you can reach out to us if you need any help or ideas for how to introduce yourself. Chat to us in the platform =)\n\nFrom, The Team @ Prospela',
      html: data
    }
  }
});
