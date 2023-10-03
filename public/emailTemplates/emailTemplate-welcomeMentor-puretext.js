// Merged on 12th oct 2020 
const ejs = require("ejs");

const email = 'dexter@hotmail.com'
const neededApproval = true

ejs.renderFile(__dirname + "/emailTemplate-welcomeMentor.ejs", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  neededApproval ? 'You\'re approved! Welcome to the Prospela family + Next Steps' : 'Welcome to the Prospela family | Next Steps',
      text: 'Welcome to the family!\n\nSomewhere in London, you\'ve made a bunch of Prospela employees & Villiers really happy because you\'ve just signed up with us. 🕺🏾💃🏻🤙\n\nWe don\'t take it for granted.🙏\n\nIt means we can literally now reach out to a couple more disadvantaged young people and help them get their foot in the door to industries that were previously "out-of-reach".\n\nComplete your full sign up at \'https://beta.prospela.com\'\n\nNext steps\n✏️ Customise how you\'d like to mentor & help us make a high-quality match by completing the full sign up.\n📷 If you opt to support under 18s (which we really hope you can!), for safeguarding reasons there will be a couple of quick extra steps, including a selfie with your ID and background check.\n🎓 Complete your online E-Mentor training. It takes no longer than 10 minutes, but will help you feel prepped to start chatting with mentees and kick-start a fruitful conversation!\n\n*Questions, thoughts, feedback?*\nSimply reply to this email or shoot us a DM in the Prospela platform and one of the team will stop doing their happy dance and get back to you asap 😃',
      html: data
    }
  }
});
