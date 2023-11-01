// Merged on 12th oct 2020
const ejs = require("ejs");
import {usercdn, userAvatarsFolder} from './CDN.js';

const fname = 'Dexter'
const email = 'dexter@hotmail.com'
const numQASuggestions = 3
const link = 'https://app.prospela.com'
const qaArray = [
  {qid: '123', userprofilepic: '', isanon: false, url: 'what-best-wear-to-interview', qauthorfname: 'Hannah', title: 'What is the best thing to wear to an interview?', textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer'},
  {qid: '456', userprofilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png', isAnon: false, url: 'when-apply-vfx-industry', qauthorfname: 'Lucy', title: 'When should we apply to the VFX industry?', textdetail: ''},
  {qid: '789', userprofilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png', isAnon: true, url: 'advice-first-showreel', qauthorfname: 'Tom', title: 'Best advice for first showreel?', textdetail: ''},
]

const qaArrayPureTextVersion = qaArray && qaArray.map(qa => ('\n\n' + qa.qauthorfname + ' asked:\n\n' + qa.title + (qa.textdetail != '' ? ('\n\n' + qa.textdetail) : '') + '\n\n Answer >> ' + ("https://app.prospela.com/questions/" + qa.qid + "/" + qa.url)))
const qaArrayHTMLVersion = qaArray && qaArray.map(qa => {
  const userProfPic = qa.isanon == true ? 'https://files.prospela.com/images/AnonymousUser.png' : qa.userprofilepic;
  const isPicSet = userProfPic != null && userProfPic != ''
  const profPicSrc = qa.isanon == true ? userProfPic : usercdn.concat('/',userAvatarsFolder,qa.userprofilepic,'-',360);
  return (
    <tr style="border-bottom:2px solid #f2f2f2;border-top:1px solid white">
      <td class="stack-column-center padding-top-20-onmobile" align="center" style="vertical-align:middle">
        <table>
          <tbody style="margin-bottom:15px;margin-top:15px">
            <tr style="vertical-align:bottom">
              <td style="text-align:center;vertical-align:bottom">
                <div style="width: 40px;height:100%;box-sizing: content-box;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;">
                  {isPicSet ? (
                    <div style={"width:40px;height:40px;border-style:none;background-size: cover; background-size: cover;background-position: center center; border-radius: 50%; -webkit-border-radius: 50%;  -moz-border-radius: 50%;  -ms-border-radius: 50%;-o-border-radius: 50%;" + (qa.isanon == true ? "left: 55%;position: relative;" : "")} style={backgroundImage:"url(" + profPicSrc + ")"} />
                  ) : (
                    <div style="width:40px;font-size: 20px;text-align: center;font-family:Lato;color: #fff;background-color: rgb(53,28,117); background-color: rgba(53,28,117,.5); margin: auto;border-radius: 50%; -webkit-border-radius: 50%;  -moz-border-radius: 50%;  -ms-border-radius: 50%;-o-border-radius: 50%;line-height: 40px;" >
                      {qa.qauthorfname.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;vertical-align:middle">
                <p style="font-family:Lato;margin:2px;padding:0px">
                  {qa.isanon == true ? 'Anonymous' : qa.qauthorfname}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td class="stack-column-center" align="left" style="vertical-align:top">
        <div style="margin-left:20px;margin-right:20px">
          <table>
            <tbody>
              <tr>
                <td style="text-align:left;vertical-align:baseline">
                  <p style="font-weight:700;color:#433a53;font-family:Lato;font-size:13px;margin-bottom:2px;word-break:normal;border-collapse:collapse!important;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">
                    {qa.title}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="text-align:left;vertical-align:baseline">
                  <p class="ignore-font-change margin-bottom-20-onmobile" style="margin-top:3px;font-family:Lato;font-size:13px;word-break:normal;border-collapse:collapse!important;color:#433a53;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">
                    {qa.textdetail != '' ? qa.textdetail : qa.title}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
      <td class="stack-column-center padding-bottom-20-onmobile" align="center">
        <table style="white-space:nowrap;min-width:140px">
          <tbody style="white-space:nowrap">
            <tr style="white-space:nowrap">
              <td style="text-align:center;padding-bottom:15px;white-space:nowrap">
                <a href={"https://app.prospela.com/questions/" + qa.qid + "/" + qa.url} style="font-size:14px;text-decoration:none;font-family:Lato;margin-left:15px;margin-right:15px;padding-left:35px;padding-right:35px;padding-bottom:10px;padding-top:10px;background-color:#1accbd;color:white;border-radius:5px;white-space:nowrap" target="_blank">
                  <b>Answer >></b>
                </a>
              </td>
            </tr>
            <tr>
              <td style="text-align:center">
                <a href={"https://app.prospela.com/questions/" + qa.qid + "/" + qa.url} style="font-family:Lato;font-weight:500;font-stretch:semi-condensed;text-decoration:none;color:#433a53;font-size:14px;min-width:120px" target="_blank">
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

{/*<script>
  id="<%= qa.userprofilepic %>"
  let profPicSrc
  profPicSrc = qa.isanon == true ? 'https://files.prospela.com/images/AnonymousUser.png' : ('https://media-uploads.prospela.com/userAvatars/' + qa.userprofilepic + '-360')
  document.getElementById(qa.userprofilepic).style.backgroundImage = "url(" + profPicSrc + ")"
</script>
*/}
const data = {
  fname: fname,
  numQASuggestions: numQASuggestions,
  link: link,
  qaArrayPureTextVersion: qaArrayPureTextVersion,
  qaArrayHTMLVersion: qaArrayHTMLVersion
}

ejs.renderFile(__dirname + "/emailTemplate-suggestedQAMentor.ejs", {fname: fname, numQASuggestions: numQASuggestions, link: link, qaArrayPureTextVersion: qaArrayPureTextVersion, qaArrayHTMLVersion: qaArrayHTMLVersion, qaArray: qaArray}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from:  'Prospela',
      to: email,
      subject:  numQASuggestions + (numQASuggestions == 1 ? ' student needs ' : ' students need ') + 'your advice today - Q&A matched to your skill set inside',
      text: 'We\'ve found ' + numQASuggestions + ' Q&A requests for your expertise on Prospela\n\nCan you help us get them an answer?\n\n' + qaArrayPureTextVersion + '\n\nPro tip 💡: You can update the skills tags on your profile to improve your matches here >>' + link + '\n\nSee all unanswered questions and help get them answered here >>' + link + '\n\nBest\n\nThe Team @ Prospela',
      html: data
    }
  }
});
