// Dex last merged this code on 19th july 2021

import React, { Component } from "react";

import {cdn, usercdn, userAvatarsFolder} from './CDN.js';
import AddEditRoleContent from './AddEditRoleModalContent.js';
import FeedbackPublic from './Feedback-publicView.js';
import GroupCircle from "./GroupCircle";
import ManageFeedbackContent from './ManageFeedbackContent.js';
import Modal from './Modal.js';
import UpdateProfileOverviewContent from './UpdateProfOverviewModalContent.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import UserActivity from './UserActivity.js';
import UserReads from './UserReads.js';
import UserQuotes from './UserQuotes.js';
import {getIndustryDeets, getGroupDeets, convertSubjects, convertRole, convertHobbies, userFlagEmoji, eduSubjects, eduName, timeSince, isNightDay, profileTimeZone} from './UserDetail.js';
import {DateCalc, monthDiff} from "./GeneralFunctions";

import "../css/General.css";
import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Profile.css";

const EditProfileSectionModalProps = {
  ariaLabel: 'Edit profile section',
  triggerText: 'Edit section',
  usedFor: 'editSection',
  changeInitFocus: true,
}

const AddRoleModalProps = {
  ariaLabel: 'Add / Edit role',
  triggerText: '+ Add role',
  usedFor: 'addEditRole',
  changeInitFocus: true
}

const EditRoleDescModalProps = {
  ariaLabel: 'Add / Edit role',
  triggerText: '+ Add description',
  usedFor: 'addRoleDesc',
  changeInitFocus: true
}

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Profile Picture',
  triggerText: 'Add/Edit Profile pic',
  usedFor: 'addPicBtn'
}

const ViewMoreFeedbackProps = {
  ariaLabel: 'View more feedback for this user',
//  triggerText: 'View all Feedback',
  usedFor: 'viewMoreFeedback',
  wider: true, // Have wider modal
}

class MentorProfileContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
  //    followStatus: false,
  //    save4LaterClicked: false,
  //    availabilityClicked: true,
  //    saved4later: false,
      feedbackReceivedArr: [
        {
          matchid: 12345,
          date_matched: '2021-03-21T00:00:00.000Z',
          mentorname: 'Emma',
          mentoruid: 2345,
          menteename: 'Dexter',
          menteeuid: 1234,
          eetstatus: 'job',
          schname: '',
          schnamefreetext: '', // If their school wasn't on the list
          uniname: '75',
          uninamefreetext: '', // If their school wasn't on the list
          degree: '',
          currrole: 'Head of Marketing',
          currco: 'Pladis',
          currtraining: '',
          currtrainingprovider: '',
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3,
          notetomentorpub: 1,
          referenceformenteepub: 0
        },
        {
          matchid: 12346,
          date_matched: '2021-03-21T00:00:00.000Z',
          mentorname: 'Emma',
          mentoruid: 2345,
          menteename: 'Dexter',
          menteeuid: 1234,
          eetstatus: 'job',
          schname: '',
          schnamefreetext: '', // If their school wasn't on the list
          uniname: '75',
          uninamefreetext: '', // If their school wasn't on the list
          degree: '',
          currrole: 'Head of Marketing',
          currco: 'Pladis',
          currtraining: '',
          currtrainingprovider: '',
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,2,3,4,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3,
          notetomentorpub: 1,
          referenceformenteepub: 0
        },
        {
          matchid: 12347,
          date_matched: '2021-03-21T00:00:00.000Z',
          mentorname: 'Emma',
          mentoruid: 2345,
          menteename: 'Dexter',
          menteeuid: 1234,
          eetstatus: 'job',
          schname: '',
          schnamefreetext: '', // If their school wasn't on the list
          uniname: '75',
          uninamefreetext: '', // If their school wasn't on the list
          degree: '',
          currrole: 'Head of Marketing',
          currco: 'Pladis',
          currtraining: '',
          currtrainingprovider: '',
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [0],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3,
          notetomentorpub: 0,
          referenceformenteepub: 0
        },
      ],
    }
//    this.toggleFollowStatus = this.toggleFollowStatus.bind(this);
//    this.handleAvailabilityClick = this.handleAvailabilityClick.bind(this);
//    this.toggleSave4LaterClick = this.toggleSave4LaterClick.bind(this);
    this.availabilityMsg = this.availabilityMsg.bind(this);
  }

  getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved) {
    let verifLevels = []

    // If has verified email
    if (mentorSUStep != 'did1stSU' && mentorSUStep != 'didCountry' && mentorSUStep != 'didEdu' && mentorSUStep != 'didIndRoleMentor' && mentorSUStep != 'updatingEmail' && mentorSUStep != 'didEduEmailNeedsRev' && mentorSUStep != 'didEmailVerifNeedsRev') {
      verifLevels.push('email')
    }

    // If Prospela can verify their edu/work/training (i.e. inst email)
    if (verifiedType == 1 || eduemailverif == true || profemailverif == true) {
      verifLevels.push('inst')
    }

    // If completed their Prospela training
    if (mentorSUStep == 'didIDTrain' || mentorSUStep == 'didTrain') {
      verifLevels.push('training')
    }

    if (tsapproved != '' || tsapproved != null) {
      verifLevels.push('id') // Prospela approved their ID
      verifLevels.push('background') // Prospela did crim record & other background checks
    }

    return verifLevels;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

/*  toggleFollowStatus() {
    const currentState = this.state.followStatus;
    this.setState({ followStatus: !currentState });
  }*/

/*  handleAvailabilityClick() {
    this.setState({ availabilityClicked: true });
    this.setState({ save4LaterClicked: false });
  }*/

/*  toggleSave4LaterClick() {
    const saved = this.state.saved4later;
    this.setState({ save4LaterClicked: true });
    this.setState({ saved4later: !saved });
    this.setState({ availabilityClicked: false });
  }*/

  availabilityMsg(userAvail) {
    if (userAvail === 2 || userAvail === 3) {
      return <span>Available for <strong className="greenText">long-term</strong> and/or <strong className="greenText">short-term</strong> mentorship</span>
    } else if (userAvail === 0) {
      return <span>Available to offer <strong className="greenText">long-term</strong> mentorship</span>
    } else if (userAvail === 1) {
      return <span>Available to offer <strong className="greenText">short-term</strong> mentor support</span>
/*    } else if (userAvail === 4) {
      return <span><span className="redText">Not currently available</span> for mentorship</span> */
    }
  }

  render() {
    const {feedbackReceivedArr} = this.state;
    const mentor = {
      uid: '23456',
      fname: 'Emma',
      lname: 'Sullivan',
//      profPicSrc: '',
      profPicSrc: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
      city: 'LA',
      country: 'USA',
      timeZone: 'Europe/London',
      availType: 1,
      activeMentees: 2,
      allMentees: 2,
      maxmentees: 6,
      views: 200,
      didTrain: 1,
      lastActiveDate: '1556389526',
      yrsExp: 7,
      uni: null,
      eetstatus: 'job',
      degree: 'BSc (Hons) Business Administration',
      schname: '',
      schnamefreetext: '', // If their school wasn't on the list
      uniname: '44',
      uninamefreetext: '', // If their school wasn't on the list
    //  subjects: 'Business, Art, English Literature & Language',
      subjects: [1,13,21],
      currrole: 'Head of Marketing',
      currco: 'Pladis',
      industriesexp: [2, 19],
      rolesexp: [1, 2, 69, 5, 22, 41],
      rolesexpfreetext: ['Head of M&A'],
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
      hobbies: [1,14,30],
      hobbiesfreetext: ['running, swimming, theatre, yoga, skiing, gabadee'],
      activityPublic: 1,
      groupsSet: 1,
      readsSet: 1,
      quotesSet: 1,
      groupDisabilities: 1,
      groupLGB: 1,
      groupBAME: 1,
      groupWomen: 1,
      groupParents: 1,
      groupSingle: 1,
      mentorgroups: [1,3],
      whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
      helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
      roledesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
    }
    const roleHistory = [
      {title: 'Marketing Manager', co: 'GE', startDate: '2019-06-01T13:30:50.667Z', endDate: '2021-01-01T13:30:50.667Z', roledesc: 'I look after everything marketing, whether it is product, price, packaging or promotion - the 4 Ps, just what I learned at Uni.'},
      {title: 'Marketing Analyst', co: 'Energy Contract Company', startDate: '2019-06-01T13:30:50.667Z', endDate: '2021-01-01T13:30:50.667Z', roledesc: ''}
    ]
/*    const userReads = [
      {
        id: '11111',
        type: 'book',
        text: 'Bookname by Book Author',
        link: ''
      },
      {
        id: '11112',
        type: 'link',
        text: 'Great video about XYZ',
        link: 'www.youtube.com'
      }
    ]
    const userQuotes = [
      {
        id: '11113',
        author: 'Josh Bridges',
        text: 'Success is not owed. It is leased, and rent is due every day. Pay the man.'
      },
      {
        id: '11114',
        author: 'Nietsche',
        text: 'Those who were seen dancing were thought insane by those who could not hear the music'
      }
    ]
    const userActivity = [
      {
        id: '11117',
        type: 'newRead',
        ts: 'yesterday',
        text: ' has just added a new <strong>recommended read</strong>'
      },
      {
        id: '11118',
        type: 'newQuote',
        ts: 'yesterday',
        text: ' has just added a new <strong>quote</strong>'
      },
      {
        id: '11119',
        type: 'highlight',
        ts: 'yesterday',
        text: ' just had their advice <strong>highlighted</strong>'
      },
      {
        id: '11120',
        type: 'newMatch',
        ts: 'yesterday',
        text: ' just took on a new mentee'
      }
    ]
*/    const profShareSettings = {
      groups: false
    };
    const rolesCommaString = convertRole(mentor.rolesexp, mentor.rolesexpfreetext)
    const rolesArray = rolesCommaString.split(',')
    const hobbiesCommaString = convertHobbies(mentor.hobbies, mentor.hobbiesfreetext)
    const hobbiesArr = hobbiesCommaString.split(',');
    const expertiseArr = mentor.expertise.split(',');
    const learningArr = mentor.learning.split(',');
    const subjectsCommaString = convertSubjects(mentor.subjects)
    const subjectsArr = subjectsCommaString.split(',');
    const lastActive = timeSince(mentor.lastActiveDate);
    const userCurrentTime = profileTimeZone(mentor.timeZone);
    const isDayNight = isNightDay(userCurrentTime);
    const flagEmoji = userFlagEmoji(mentor.country);
    const eduInstName = eduName(mentor.schname, mentor.schnamefreetext, mentor.uniname, mentor.uninamefreetext, mentor.eetstatus);
    const isPicSet = mentor.profPicSrc != '';
//    const isPicSet = false;
    const uid = '23456';
    const isMe = uid == mentor.uid ? 'isMe' : 'isntMe';
    const menteeIsU18 = true;
    const userInitial = mentor.fname.charAt(0).toUpperCase();
    const numMentees = 3 // user.matches.filter(x => x.status_of_match == 6 && x.mentoruid == user.uid);
    const publicFeedbackToShow = feedbackReceivedArr.filter(feedback => feedback.notetomentorpub == true) // for mentee use referenceformenteepub == true
    const verifiedType = 0 // LINK WITH DEX (THIS IS WHETHER PROSPELA DID FULL OR SOFT VERIF OF THEIR INSTITUTION)
    const eduemailverif = true
    const profemailverif = false
    const mentorSUStep = 'didIDTrain' // LINK WITH DEX
    const tsapproved = '2020-09-01T13:30:50.667Z' // LINK WITH DEX (THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND)
    const verifTypesArr = this.getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved)
    const hasMinVerif = verifTypesArr.length > 0

    return (
      <React.Fragment>
        <div className="article-page profile">
          <div className="row article-container profile">
            <div className="col-3 col-s-12 article-extras profile">
              <div className="profile-thumb-container">
                {isPicSet ? (
                  <div className={"profile-thumb img-circle allowAddPic "+isMe}>
                    {isMe === 'isMe' && (
                      <Modal {...UploadProfPicProps}>
                        <UploadProfPicContent isPicSet={isPicSet} profPicSrc={mentor.profPicSrc} isMe={isMe} picSizeToShow={270}/>
                      </Modal>
                    )}
                    <img
                      src={usercdn.concat('/',userAvatarsFolder,mentor.profPicSrc,'-360')}
                      alt="User profile pic"
                    />
                  </div>
                  )
                : (
                  <div className={"profile-thumb img-circle allowAddPic noPic "+isMe}>
                    {isMe === 'isMe' && (
                      <Modal {...UploadProfPicProps}>
                        <UploadProfPicContent isPicSet={isPicSet} userInitial={userInitial} isMe={isMe}/>
                      </Modal>
                    )}
                    <div className="userInitial">
                      {userInitial}
                    </div>
                  </div>
                )}
                {hasMinVerif == true && (
                  <div className="pr-certified img-circle tooltip">
                    <span>&#10003;</span>
                    <span className="tooltiptext below profile textLeft">
                      <strong>Prospela Certified Mentor:</strong>
                      {verifTypesArr.map((verifType, index) => {
                        if (verifType == 'id') {
                          return <div className="tooltiptextDetail" key={verifType}><span role="img" aria-label="tick emoji">✔️</span> ID Checked</div>
                        } else if (verifType == 'background') {
                          return <div className="tooltiptextDetail" key={verifType}><span role="img" aria-label="tick emoji">✔️</span> Background Checked</div>
                        } else if (verifType == 'email') {
                          return <div className="tooltiptextDetail" key={verifType}><span role="img" aria-label="tick emoji">✔️</span> Email Verified</div>
                        } else if (verifType == 'inst') {
                          return <div className="tooltiptextDetail" key={verifType}><span role="img" aria-label="tick emoji">✔️</span> Work or Edu Status Verified</div>
                        } else if (verifType == 'training') {
                          return <div className="tooltiptextDetail" key={verifType}><span role="img" aria-label="tick emoji">✔️</span> Prospela Trained</div>
                        } else return
                      })}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="profileName">{mentor.fname}{menteeIsU18 ? '' : (" " + mentor.lname)}</h1>
              <div className="editSectionContainer">
                {mentor.eetstatus == 'sch' && (
                  <React.Fragment>
                    <div className="profilePosition">Student</div>
                  </React.Fragment>
                )}
                {mentor.eetstatus == 'uni' && (
                  <React.Fragment>
                    <div className="profilePosition">{mentor.degree}</div>
                  {/*  <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {eduInstName}</div>*/}
                  </React.Fragment>
                )}
                {mentor.eetstatus == 'job' && (
                  <React.Fragment>
                    <div className="profilePosition">{mentor.currrole}</div>
                    <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {mentor.currco}</div>
                  </React.Fragment>
                )}
                {mentor.eetstatus == 'train' && (
                  <React.Fragment>
                    <div className="profilePosition">{mentor.currtraining}</div>
                    <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {mentor.currtrainingprovider}</div>
                  </React.Fragment>
                )}
                {mentor.eetstatus == 'none' && (
                  <div className="profilePosition">Looking for opportunities</div>
                )}

            {/*    <div className="profileIndustryTag">{mentor.currInd}</div>
                <button type="button" className={"Submit-btn " + (followStatus===false ? 'notFollowing' : 'Following')} onClick={this.toggleFollowStatus}>
                  {followStatus===false ? 'Follow' : <span>&#10003; Following</span>}
                </button>*/}
                {isMe == "isMe" && (
                  <div className="editSectionBtn dispInlineBlock">
                    <Modal {...EditProfileSectionModalProps}>
                      <UpdateProfileOverviewContent currRole={mentor.currrole} currCo={mentor.currco} />
                    </Modal>
                  </div>
                )}
              </div>
              <div>
                <h2>
                  Location
                </h2>
                <p>
                  <span>
                    <i className={"emoji-icon " + flagEmoji}/>
                  </span>
                  {mentor.city}, {mentor.country}
                </p>
              </div>
          {/*    <div className="lastActiveTxt greenText">Last active <span>{lastActive}</span></div>*/}
              <div className={"contentBox feedbackOnProfile" + (publicFeedbackToShow.length > 0 ? "" : " noFeedbackYet")}>
                <h2 className="marginBottom5"><span className="smallFont" role="img" aria-label="star emoji">⭐</span> Credentials & Feedback <span className="smallFont" role="img" aria-label="star emoji">⭐</span></h2>
                <div className="credTxtContainer">
                  <div className={"marginTop20" + (isMe == "isMe" ? "" : " marginBottom20")}><span className="credNum">{mentor.allMentees}</span>mentees supported</div>
                  {isMe == "isMe" && (
                    <div className="editSectionContainer">
                      <div className="marginBottom20"><span className="credNum">{mentor.maxmentees}</span>max mentees at a time</div>
                      {isMe == "isMe" && (
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps} >
                            <div>yo</div>
                          </Modal>
                        </div>
                      )}
                    </div>
                  )}
                  {publicFeedbackToShow.length == 0 && (
                    <div className="restrictedContent darkGreyText">
                      <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                      {mentor.fname} does not have any public endorsements from mentees yet.
                    </div>
                  )}

                  {publicFeedbackToShow.length > 0 && (
                    <React.Fragment>
                      <FeedbackPublic fname={mentor.fname} isProfile feedbackArr={[publicFeedbackToShow[0]]} userRoleToView='mentor'/>
                      {(publicFeedbackToShow.length > 1 || isMe == 'isMe') && (
                        <div className="feedbackBtn">
                          <div className="messageCTABtns">
                            <Modal {...ViewMoreFeedbackProps} triggerText={isMe == 'isMe' ? 'Manage my Feedback' : 'View all Feedback'}>
                              <ManageFeedbackContent isForPublicProfile={isMe == 'isMe' ? false : true} userToView={mentor.fname} userRoleToView='mentor' publicFeedbackToShow={isMe == 'isMe' ? null : publicFeedbackToShow}/>
                            </Modal>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6 col-s-12 content-col profile">
              <div className="prLogoContainer profile">
              {/*    <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" /> */}
                  <img
                    className="prLogoImg"
                    alt="Prospela Logo"
                    srcSet={cdn+"/images/Prospela-New-Logo_Colour_213.png 213w, "+cdn+"/images/Prospela-New-Logo_Colour_341.png 314w, "+cdn+"/images/Prospela-New-Logo_Colour_640.png 640w"}
                    sizes="(max-width: 1440px) 69px, 69px"
                    src={cdn+"/images/Prospela-New-Logo_Colour.png"}
                  />
              </div>
              <div className="article-body profile">
                <section className="scroll-anchor" id="expertise-and-career" name="expertise-and-career">
                {/*  <div className="contentBox">
                    <h2>Credentials & Highlights</h2>
                    <div className="credTxtContainer">
                      <div><span className="credNum">{mentor.yrsExp}</span>years experience</div>
                      <div><span className="credNum">{mentor.activeMentees}</span># active mentees</div>
                      <div><span className="credNum">{mentor.allMentees}</span># total mentees supported</div>
                      {mentor.views != null && (
                        <div><span className="credNum">{mentor.views}</span># content views / reach</div>
                      )}
                      <div className="lastActiveTxt greenText">Last active <span>{lastActive}</span></div>
                    </div>
                  </div>*/}
                  <h1 >
                    <br/>
                    <i className="emoji-icon suitcase-emoji"/> Expertise & Career
                  </h1>
                  <div>
                    {roleHistory.map((role) => {
                      let roleLengthMths
                      let roleLengthYrs
                      let roleLengthTxt
                      let roleLengthRemainderMths

                      // If hasn't set dates yet
                      if (role.startDate == '') {
                        roleLengthTxt = ''

                      } else {

                        // If is current role
                        if (role.endDate == '') {
                          var today = new Date()
                          roleLengthMths = monthDiff(new Date(role.startDate), today)
                        } else {
                          roleLengthMths = monthDiff(new Date(role.startDate), new Date(role.endDate))
                        }
                        roleLengthYrs = Math.floor(roleLengthMths / 12)
                        roleLengthRemainderMths = roleLengthMths - (roleLengthYrs * 12)
                        roleLengthTxt = roleLengthYrs == 0 ? (roleLengthMths + ' mos') : (roleLengthYrs + (roleLengthYrs == 1 ? ' yr' : ' yrs') + (roleLengthRemainderMths > 0 ? (' ' + roleLengthRemainderMths + (roleLengthRemainderMths == 1 ? ' mo' : ' mos')) : ''))
                      }

                      return (
                        <div className="editSectionContainer roleItem" key={role.title}>
                          <div className="displayFlex marginBottom5">
                            <div className="msg-thumb-container">
                              <div className="msg-thumb img-square noPic isCompany">
                                <div className="userInitial msg-thumb noModal">
                                  {role.co.charAt(0).toUpperCase()}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div><strong>{role.title}</strong></div>
                              <div>{role.co}</div>
                              <div className="marginBottom5 smallFont darkGreyText">
                                {role.startDate != '' && (
                                  <span><DateCalc time={role.startDate} showPureDate dontShowDay /> - </span>
                                )}
                                {role.endDate == '' ? 'Present' : <DateCalc time={role.endDate} showPureDate dontShowDay />}
                                {role.startDate != '' && <span> &#8226; {roleLengthTxt}</span>}
                              </div>
                            </div>
                          </div>
                          {
                            role.roledesc != '' ? (
                              <p>
                                {role.roledesc}
                              </p>
                              )
                            : (
                              <Modal {...EditRoleDescModalProps}>
                                <div>yo</div>
                              </Modal>
                            )
                          }
                          {isMe == "isMe" && (
                            <div className="editSectionBtn dispInlineBlock">
                              <Modal {...EditProfileSectionModalProps}>
                                <AddEditRoleContent modalTitle='Edit Role / Experience' roleTitle={role.title} roleCo={role.co} startDate={role.startDate} endDate={role.endDate} roleDesc={role.roledesc}/>
                              </Modal>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {isMe == "isMe" && (
                      <Modal {...AddRoleModalProps}>
                        <div>yo</div>
                      </Modal>
                    )}
                  </div>
                  <div className="editSectionContainer">
                    <h2>
                      Industries / Roles I can talk about
                    </h2>
                    <div className="bubbleContainer">
                      {mentor.industriesexp.map((indID) => {
                        let industryItem = getIndustryDeets(indID)
                        let icon = industryItem.fa
                        let indName = industryItem.label
                        return <div className="bubble" key={indID}><i className={icon} /> {indName}</div>
                      })}
                      {rolesArray && rolesArray.map((role) => {
                        return <div className="bubble" key={role}>{role}</div>
                      })}
                    </div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                  <div className="editSectionContainer">
                    <h2>
                      <span role="img" aria-label="tools emoji">🛠️</span> Skills I use day-to-day
                    </h2>
                    <div>
                      {expertiseArr && expertiseArr.map((skill) => {
                        return <div key={skill}>{skill.trim()}</div>
                      })}
                    </div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                  <div className="editSectionContainer">
                    <h2>
                      <span role="img" aria-label="book emoji">📚</span> I&#39;m currently learning
                    </h2>
                    <div>
                      {learningArr && learningArr.map((skill) => {
                        return <div key={skill}>{skill.trim()}</div>
                      })}
                    </div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                </section>
                <section className="scroll-anchor" id="education" name="education">
                  <h1 >
                    <br/>
                    <i className="emoji-icon schoolHat-emoji"/> Education
                  </h1>
                  <div className="editSectionContainer">
                    <h2>
                      University Degree:
                    </h2>
                    <p>
                      {mentor.uni != null && (
                        mentor.degree + ' @ ' + eduInstName
                      )}
                      {mentor.uni == null && (
                        '❌ I didn\'t go to University'
                      )}
                    </p>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                  {mentor.subjects.length > 0 && (
                    <React.Fragment>
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="studybook emoji">📓</span> {eduSubjects(mentor.country)}
                        </h2>
                        <div>
                          {subjectsArr && subjectsArr.map((subject) => {
                            return <div key={subject}>{subject}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionModalProps}>
                              <div>yo</div>
                            </Modal>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </section>
                <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                  <h1 >
                    <br/>
                    <i className="emoji-icon rockOn-emoji"/> Outside of work
                  </h1>
                  <div className="editSectionContainer">
                    <h2>
                      <span role="img" aria-label="football emoji">⚽️</span> When I&#39;m not working, you&#39;ll find me
                    </h2>
                    <div>
                      {hobbiesArr && hobbiesArr.map((hobby) => {
                        return <div key={hobby}>{hobby}</div>
                      })}
                    </div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                  <div className="editSectionContainer">
                    <h2>
                      I&#39;m interested in being a mentor because:
                    </h2>
                    <p>
                      {mentor.whyHelp}
                    </p>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <div>yo</div>
                        </Modal>
                      </div>
                    )}
                  </div>
                  {mentor.mentorgroups.length > 0 && (
                    <React.Fragment>
                      <h2>
                        Groups I&#39;m a member of
                      </h2>
                      <div>
                        {mentor.mentorgroups.map((group) => {
                          return (
                            <GroupCircle
                              showAsLink={false}
                              group={getGroupDeets(group)}
                              key={group.gid}
                            />
                          )
                        })}
                      </div>
                    </React.Fragment>
                  )}
                {/*  {mentor.groupsSet === 1 && profShareSettings.groups === true && (
                    <React.Fragment>
                      <h2>
                        Groups I&#39;m passionate about supporting
                      </h2>
                      <div className="bubbleContainer">
                        {mentor.groupDisabilities === 1 && <div className="bubble">People with disabilities</div>}
                        {mentor.groupLGB === 1 && <div className="bubble">LGBTQI+</div>}
                        {mentor.groupBAME === 1 && <div className="bubble">Black, Asian, Minority Ethnic (BAME)</div>}
                        {mentor.groupWomen === 1 && <div className="bubble">Women in the workforce</div>}
                        {mentor.groupParents === 1 && <div className="bubble">Working parents</div>}
                        {mentor.groupSingle === 1 && <div className="bubble">Single parents</div>}
                      </div>
                    </React.Fragment>
                  )}*/}
                </section>
            {/*    {(mentor.activityPublic === 1 || mentor.readsSet === 1 || mentor.quotesSet === 1) && (
                  <section className="scroll-anchor" id="recent-activity" name="recent-activity">
                    {mentor.activityPublic === 1 && (
                      <div className="contentBox">
                        <h1 >
                          <br/>
                          <i className="emoji-icon chat-emoji"/> Recent activity / highlights
                        </h1>
                        {userActivity.map((activity, index) => {
                          return (
                            <UserActivity
                              activity={activity}
                              key={activity.id}
                              fname={mentor.fname}
                            />
                          )
                        })}
                      </div>
                    )}
                    {mentor.readsSet === 1 && (
                      <div className="contentBox">
                        <h2>
                          Good reads / links
                        </h2>
                        {userReads.map((reads, index) => {
                          return (
                            <UserReads
                              reads={reads}
                              key={reads.id}
                            />
                          )
                        })}
                      </div>
                    )}
                    {mentor.quotesSet === 1 && (
                      <div className="contentBox">
                        <h2>
                          Quotes that inspire me
                        </h2>
                        {userQuotes.map((quotes, index) => {
                          return (
                            <UserQuotes
                              quotes={quotes}
                              key={quotes.id}
                            />
                          )
                        })}
                      </div>
                    )}
                  </section>
                )}*/}
              </div>
            </div>
            <div className="col-3 col-s-12 category-list profile">
              <ul className="section-list left">
                <li>
                  <a href="#expertise-and-career" className="active">Expertise & Career</a>
                </li>
                <li>
                  <a href="#education">Education</a>
                </li>
                <li>
                  <a href="#hobbies-interests">Outside of work</a>
                </li>
          {/*      {(mentor.activityPublic === 1 || mentor.readsSet === 1 || mentor.quotesSet === 1) && (
                  <li>
                    <a href="#recent-activity">Recent activity</a>
                  </li>
                )}*/}
              </ul>
              <div className="profileCTAContainer">
              {/*  {availabilityClicked===true || save4LaterClicked===false || save4LaterClicked===true && saved4later===false ? (
                  <div className="profileBtnToolTip avail">
                    {this.availabilityMsg(mentor.availType)}
                  </div>
                  )
                : (
                  <div className="profileBtnToolTip save">
                    <span>Saved as a potential future mentor!</span>
                  </div>
                  )
                }*/}
                <div className="profileBtnToolTip avail">
                  {this.availabilityMsg(mentor.availType)}
                </div>
                <div className="profileUserCTA">
                  {(mentor.availType === 0 || mentor.availType === 1 || mentor.availType === 2 || mentor.availType === 3) ? (
                    <button type="button" className="profileBtn" onClick={this.handleAvailabilityClick}>
                      <span>&#10003;</span>
                    </button>
                    )
                  : (
                    <button type="button" className="profileBtn redTextBorderBkgnd">
                      <span>&#10007;</span>
                    </button>
                    )
                  }

              {/*    <button type="button" className={"profileBtn save4Later " + (saved4later===true && "greenTextBorderBkgnd")} id="save4LaterBtn" onClick={this.toggleSave4LaterClick}>
                    <i className="far fa-bookmark"/>
                  </button>
                  <button type="button" className="profileBtn">
                    <i className="fas fa-share-alt"/>
                  </button>*/}
                  <div className="timeContainer">
                    {isDayNight==='day' ? (
                      <button type="button" className="profileBtn dayTime">
                        <i className="fas fa-sun"/>
                      </button>
                      )
                    : (
                      <button type="button" className="profileBtn nightTime">
                        <i className="fas fa-moon"/>
                      </button>
                      )
                    }
                    <div className="TimeZoneContainer">
                      <div className={"UserLocalTime " + isDayNight}>{userCurrentTime}</div>
                      <div className={"UserTimeZone " + isDayNight}>{mentor.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"mapImg " + mentor.country + " " + mentor.city}>
              <div className="mapAttribution">
                &#169; <a href="https://www.openstreetmap.org/copyright" className="link map">OpenStreetMap</a> contributors
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorProfileContent;
