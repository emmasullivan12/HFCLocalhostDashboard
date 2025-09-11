// Merged on 24th feb 2022

const ejs = require("ejs");

const firstName = 'Emma'
const email = 'dexter@hotmail.com'
const subject = "Welcome to The Human Finance Club | Next Steps (+ exclusive 24h offer!)"
const previewText = "Rise above the AI layer and land more strategic and commercial roles."
const tripwireLink = 'www.stripe.com'
const platformLink = 'https://app.thehumanfinanceclub.com'
const year = new Date().getFullYear()

ejs.renderFile(__dirname + "/emailTemplate-HFCwelcome.ejs", {firstName: firstName, subject: subject, previewText: previewText, tripwireLink: tripwireLink, platformLink: platformLink, year: year}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Dexter @ The Human Finance Club',
      to: email,
      subject:  subject,
      text: 'Welcome to the club, ' + firstName + '\n\nWe hope you\'re excited to be part of a community of finance humans rising above the AI layer! You can expect: \n\n🧠 Unfiltered insights from peers and real operators\n\n🎯 Weekly strategic challenges\n\n🧭 Opportunity to curate commercial skills, tools, and stacks that actually matter\n\nAnd more...\n\nThis isn’t about panic. It’s about building the human edge - AI-smart instincts, durable skills, and a network that lasts.\n\nNext steps\n\nFor the next 24 hours only, grab our AI-era Finance CV / Resume Guide for just $27 (normally $54). It’s a 50+ page playbook to help you break out of the weeds and land more strategic, commercial roles. 👉 [Get instant access → ' + tripwireLink + ']\n\nMeanwhile, check your profile [' + platformLink + '] - we’ve auto-joined you to relevant sub-communities, and you can customise your feed further by adding your skills.\n\nQuestions, thoughts, feedback?\n\nJust hit reply to this email and one of the team will get back to you asap.\n\nCatch you in the platform,\n\n— Dexter\n\nCo-Founder, The Human Finance Club Team',
      html: data
    }
  }
});
