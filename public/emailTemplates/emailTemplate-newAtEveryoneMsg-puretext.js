// Merged on 21st feb 2023

const user = {uid: '22222'}
const userRole = 'pr'
const fname = 'Emma'
const lname = 'Sullivan'
const author = userRole == 'pr' ? (fname + " from Prospela") : (fname + " " + lname)
const link = 'https://beta.prospela.com/'
const email = 'dexter@hotmail.com'

ejs.renderFile(__dirname + "/emailTemplate-newAtEveryoneMsg.ejs", {author: author, link: link}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  author + 'sent a new message to everyone in your group on Prospela',
      text: author + 'sent your group a new message\n\nIncoming messages! Want to see what they\'ve said?\n\nView Messages: ' + link,
      html: data
    }
  }
});
