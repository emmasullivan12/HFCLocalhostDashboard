// Merged on 3rd jan 2023

const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const originalQText = 'What to wear to an interview?'
const link = 'https://app.prospela.com'

ejs.renderFile(__dirname + "/emailTemplate-markedAsAcceptedAnswer.ejs", {link: link, originalQText: originalQText}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  'Someone marked your post on Prospela as the accepted answer',
      text: 'Someone marked your post as the accepted answer on Prospela! \n\nCongratulations! Someone marked your post as the accepted answer to the question: "' + originalQText + '" \n\nClick to see your answer: ' + link + ' \n\nFrom The Team @ Prospela',
      html: data
    }
  }
});
