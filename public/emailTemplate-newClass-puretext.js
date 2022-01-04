// Merged on 13th dec 2020

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const groupName = 'Mr Elvie\'s Music Class'
const link = 'https://beta.prospela.com/'
const codetojoin = '12345'

ejs.renderFile(__dirname + "/emailTemplate-newClass.ejs", {groupName: groupName, link: link, codetojoin: codetojoin}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Welcome to Prospela! You\'re new class: ' + groupName,
      text: 'Welcome to the Prospela family! Prospela is a place students can get on-demand careers advice, insights to work-life and their own network of real employee contacts at anytime, anywhere. \n\nNext Steps \n\nSimply forward this email on for your students to join your class. \n\n Join ' + groupName + ': ' + link + ' \n\n Alternatively, if already a Prospela member here is your class code to join directly within the platform: ' + codetojoin,
      html: data
    }
  }
});
