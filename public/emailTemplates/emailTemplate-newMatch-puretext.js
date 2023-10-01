// Merged on 13th dec 2020

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const userRole = 'mentor'
const matchRole = userRole === 'mentor' ? 'mentee' : 'mentor'
const link = 'https://beta.prospela.com/'

ejs.renderFile(__dirname + "/emailTemplate-newMatch.ejs", {matchRole: matchRole, link: link}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Prospela - You\'ve been introduced to a new ' + matchRole,
      text: 'You\'ve just been introduced to a new ' + matchRole + 'match\n\nPlease do say hello and a bit about yourself as soon as you can - we hope you have a great chat!\n\nIf you need support at any time, don\'t hesitate to reach out to the Prospela team (either via email or within the platform)\n\nView your new chat: ' + link,
      html: data
    }
  }
});
