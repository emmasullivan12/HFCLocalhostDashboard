// Merged on 12th oct 2020
const ejs = require("ejs");

const fname = 'Dexter'
const email = 'dexter@hotmail.com'
const numQASuggestions = 3
const link = 'https://app.prospela.com'
const qaArray = [
  {qid: '123', url: 'what-best-wear-to-interview', qauthorfname: 'Hannah', title: 'What is the best thing to wear to an interview?', textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer'},
  {qid: '456', url: 'when-apply-vfx-industry', qauthorfname: 'Lucy', title: 'When should we apply to the VFX industry?', textdetail: ''},
  {qid: '789', url: 'advice-first-showreel', qauthorfname: 'Tom', title: 'Best advice for first showreel?', textdetail: ''},
]

const qaArrayPureTextVersion = qaArray.map(qa => ('\n\n' + qa.qauthorfname ' asked:\n\n' + qa.title + (qa.textdetail != '' ? ('\n\n' + qa.textdetail) : '') + '\n\n Answer >> ' + ("https://app.prospela.com/questions/" + qa.qid + "/" + qa.url))
const qaArrayHTMLVersion = qaArray.map(qa => {
  return (
    <tr style="border-bottom:2px solid #f2f2f2; border-top:1px solid white">
      <td align="center" style="vertical-align: middle; text-align: center;">
        <table>
          <tbody style="margin-bottom:15px;margin-top:15px">
            <tr style="vertical-align:bottom">
              <td style="text-align:center; vertical-align:bottom">
                <img src="https://ci5.googleusercontent.com/proxy/EVR1Cc-axIItQ2AIE5o6do0CHSlOGHn1WPYF-w3Ue4qpsDrpjQahZJj7K1_YYtdfvU8ew0Di5z-8aAQbiI-oPLo7Y_qzVth3V-CeZCImgCrzZjQECm8-dFcdt2RvwEs=s0-d-e1-ft#https://res.cloudinary.com/careervillage/avatars/avatars-v4/v4_avatar-64.png" width="50px">
              </td>
            </tr>
            <tr>
              <td style="text-align:center;vertical-align:middle">
                <p style="font-family:Lato;margin:2px;padding:0px">
                  {qa.qauthorname}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td align="left" style="vertical-align:top">
        <div style="margin-left:20px;margin-right:20px">
          <table>
            <tbody>
              <tr>
                <td style="text-align:left;vertical-align:baseline">
                  <p style="font-weight:700;color:#433a53;font-family:Lato;font-size:13px;margin-bottom:2px;word-break:normal;border-collapse:collapse!important">
                    {qa.title}
                  </p>
                </td>
              </tr>
              {qa.textdetail != '' && (
                <tr>
                  <td style="text-align:left;vertical-align:baseline">
                    <p style="margin-top:3px;font-family:Lato;font-size:13px;word-break:normal;border-collapse:collapse!important;color:#433a53">
                      {qa.textdetail}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </td>
      <td align="center">
        <table style="white-space:nowrap;min-width:140px">
          <tbody style="white-space:nowrap">
            <tr style="white-space:nowrap">
              <td style="text-align:center;padding-bottom:15px;white-space:nowrap">
                <a href={"https://app.prospela.com/questions/" + qa.qid + "/" + qa.url} style="font-size:14px;text-decoration:none;font-family:Lato;margin-left:15px;margin-right:15px;padding-left:35px;padding-right:35px;padding-bottom:10px;padding-top:10px;background-color:#1accbd;color:white;border-radius:5px;white-space:nowrap" target="_blank">
                  Answer
                </a>
              </td>
            </tr>
            <tr>
              <td style="text-align:center">
                <a href={"https://app.prospela.com/questions/" + qa.qid + "/" + qa.url style="font-family:Lato;font-weight:500;font-stretch:semi-condensed;text-decoration:none;color:#433a53;font-size:14px;min-width:120px" target="_blank">
                  Refer to a friend
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
})

ejs.renderFile(__dirname + "/emailTemplate-suggestedQAMentor.ejs", {fname: fname, numQASuggestions: numQASuggestions, link: link, qaArrayPureTextVersion: qaArrayPureTextVersion, qaArrayHTMLVersion: qaArrayHTMLVersion}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  numQASuggestions + ' students need your advice today - Q&A matched to your skill set inside',
      text: 'We\'ve found ' + numQASuggestions + ' Q&A requests for your expertise on Prospela\n\nCan you help us get them an answer?\n\n' + qaArrayPureTextVersion + '\n\nPro tip 💡: You can update the skills tags on your profile to improve your matches here >>' + link + '\n\nSee all unanswered questions and help get them answered here >>' + link + '\n\nBest\n\nThe Team @ Prospela',
      html: data
    }
  }
});
