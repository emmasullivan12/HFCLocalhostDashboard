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
      subject:  'Welcome to the Prospela family | Next Steps',
      text: 'Welcome to the family, @' + fname + '!\n\nSomewhere in London, you\'ve made a bunch of Prospela employees & Villiers really happy because you\'ve just signed up with us. 🕺🏾💃🏻🤙\n\nWe don\'t take it for granted.🙏\n\nWe hope you\'re as pumped as we are to build out your network of real employee E-Mentors. You\'ll enjoy live insights to work-life, get actionable career advice & have a network-for-life to open doors and get you those all-important career opportunities 🎉\n\nComplete your full sign up at \'https://beta.prospela.com\'\n\nNext steps\n✏️ Customise what kind of mentor you\'d like & help us make a high-quality match by completing the full sign up.\n🎓 Complete your online Mentee training. It takes no longer than 10 minutes, but will help you feel prepped to start chatting with real employees and kick-start a fruitful conversation!\n\n*Questions, thoughts, feedback?*\nSimply reply to this email or shoot us a DM in the Prospela platform and one of the team will stop doing their happy dance and get back to you asap 😃',
      html: data
    }
  }
});
