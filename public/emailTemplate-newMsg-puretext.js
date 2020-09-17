const ejs = require("ejs");

const user = {uid: '22222'}
const email = 'dexter@hotmail.com'
const author = 'Emma'
const link = 'https://beta.prospela.com/'

ejs.renderFile(__dirname + "/emailTemplate-newMsg.ejs", {author: author, link: link}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  author + 'via Prospela - You\'ve got a new message',
      text: author + 'sent you a new message\n\nIncoming messages! Want to see what they\'ve said?\n\nView Messages: ' + link,
      html: data
    }
  }
});
