// Dex last merged this code on 5th nov 2021

import React, { Component } from "react";

import {cdn, usercdn, userAvatarsFolder} from './CDN.js';
import AddEditRoleContent from './AddEditRoleModalContent.js';
import AddEditTrainingContent from './AddEditTrainingModalContent.js';
import AddEditSchContent from './AddEditSchModalContent.js';
import AddEditUniContent from './AddEditUniModalContent.js';
import EditHobbiesContent from './EditHobbiesContent.js';
import EditIndRolesContent from './EditIndRolesContent.js';
import EditSubjectsContent from './EditSubjectsContent.js';
import FeedbackPublic from './Feedback-publicView.js';
import FullPageModal from './FullPageModal.js';
import GroupCircle from "./GroupCircle";
import ManageFeedbackContent from './ManageFeedbackContent.js';
import Modal from './Modal.js';
import UpdateExpertiseContent from './UpdateExpertiseModalContent.js';
import UpdateHeadlineContent from './UpdateHeadlineModalContent.js';
import UpdateProfileOverviewContent from './UpdateProfOverviewModalContent.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import UpdateWhyHelpContent from './UpdateWhyHelpModalContent.js';
import UserActivity from './UserActivity.js';
import UserReads from './UserReads.js';
import UserQuotes from './UserQuotes.js';
import {getIndustryDeets, getGroupDeets, convertSubjects, convertRole, convertHobbies, lookupUKSchUnis, userFlagEmoji, eduSubjects, eduName, timeSince, isNightDay, profileTimeZone} from './UserDetail.js';
import {DateCalc, whichBrowser, monthDiff, LoadingSpinner, ChevronDown, ChevronUp} from "./GeneralFunctions";

import "../css/General.css";
import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Profile.css";

const EditProfileSectionFPModalProps = {
  ariaLabel: 'Edit profile section',
  triggerText: 'Edit Section',
  usedFor: 'editSection',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const AddIndRolesFPModalProps = {
  ariaLabel: 'Add Industries / Roles',
  triggerText: '+ Add Industries / Roles',
  usedFor: 'editIndRoles',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const AddUniFPModalProps = {
  ariaLabel: 'Add University',
  triggerText: '+ Add University',
  usedFor: 'editUni',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const AddSchFPModalProps = {
  ariaLabel: 'Add School',
  triggerText: '+ Add School',
  usedFor: 'editSch',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const AddSubjectsFPModalProps = {
  ariaLabel: 'Add Subjects',
  triggerText: '+ Add Subjects',
  usedFor: 'editSubjects',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const AddHobbiesFPModalProps = {
  ariaLabel: 'Add Hobbies',
  triggerText: '+ Add Hobbies',
  usedFor: 'editHobbies',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const EditProfileSectionModalProps = {
  ariaLabel: 'Edit profile section',
  triggerText: 'Edit section',
  usedFor: 'editSection',
  changeInitFocus: true,
}

const AddExpertiseModalProps = {
  ariaLabel: 'Add / Edit skills',
  triggerText: '+ Add Key Skills',
  usedFor: 'addEditSkills',
  changeInitFocus: true
}

const AddTrainingModalProps = {
  ariaLabel: 'Add / Edit training',
  triggerText: '+ Add Training',
  usedFor: 'addEditTraining',
  changeInitFocus: true
}

const AddwhyhelpModalProps = {
  ariaLabel: 'Add / Edit motivations',
  triggerText: '+ Add Motivations',
  usedFor: 'addEditwhyhelp',
  changeInitFocus: true
}

const AddLearningModalProps = {
  ariaLabel: 'Add / Edit skills',
  triggerText: '+ Add Skills I\'m learning',
  usedFor: 'addEditSkills',
  changeInitFocus: true
}

const AddRoleModalProps = {
  ariaLabel: 'Add role',
  triggerText: '+ Add role',
  usedFor: 'addEditRole',
  changeInitFocus: true
}

const AddHeadlineModalProps = {
  ariaLabel: 'Add headline',
  triggerText: '+ Add headline',
  usedFor: 'addEditHeadline',
  changeInitFocus: true
}

const AddUniModalProps = {
  ariaLabel: 'Add Degree',
  triggerText: '+ Add Degree',
  usedFor: 'addEditUni',
  changeInitFocus: true
}

const EditRoleDescModalProps = {
  ariaLabel: 'Add / Edit role',
  triggerText: '+ Add description',
  usedFor: 'addRoleDesc',
  changeInitFocus: true
}

const EditSchDescModalProps = {
  ariaLabel: 'Add / Edit Sch',
  triggerText: '+ Add description',
  usedFor: 'addSchDesc',
  changeInitFocus: true
}

const EditUniDescModalProps = {
  ariaLabel: 'Add / Edit Uni',
  triggerText: '+ Add description',
  usedFor: 'addUniDesc',
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
      isLoadingUnis: true,
      isGeneralError: '',
      nowAvailable: false,
      showFeedback: true,
      browser: '',
    }
//    this.toggleFollowStatus = this.toggleFollowStatus.bind(this);
//    this.toggleSave4LaterClick = this.toggleSave4LaterClick.bind(this);
    this.availabilityMsg = this.availabilityMsg.bind(this);
  }

  componentDidMount() {
    this.mounted = true

    this.setState({
      browser: whichBrowser()
    })

  }

  componentWillUnmount() {
    this.mounted = false;
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

  toggleShowFeedback = () => {
    const currentState = this.state.showFeedback;
    this.setState({
      showFeedback: !currentState,
    })
  }

  handleAvailabilityClick = () => {
  //  this.setState({ availabilityClicked: true });
    //this.setState({ save4LaterClicked: false });
    this.setState({ nowAvailable: true }, () => {
      this.availabilityMsg('', this.state.nowAvailable)
    })
  }

/*  toggleSave4LaterClick() {
    const saved = this.state.saved4later;
    this.setState({ save4LaterClicked: true });
    this.setState({ saved4later: !saved });
    this.setState({ availabilityClicked: false });
  }*/

  /*getUniStartYr = (uniYrGrp) => { //

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();

    let startYr = year - uniYrGrp;

    if (month > 7) {
      startYr++;
    }

    return startYr
  }

  getSchStartYr = (schYrGrp) => {

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    let schYr

    switch(schYrGrp) {
      case 'yr8':
        schYr = 2
        break
      case 'yr9':
        schYr = 3
        break
      case 'yr10':
        schYr = 4
        break
      case 'yr11':
        schYr = 5
        break
      case 'yr12':
        schYr = 6
        break
      case 'yr13':
        schYr = 7
        break
    }

    let startYr = year - schYr;

    if (month > 7) {
      startYr++;
    }

    return startYr
  }*/

  getUniInstName = (uniName, uniNameFreeText) => {
    if (uniName == '' && uniNameFreeText == '') {
      this.setState({
        isLoadingUnis: false,
        isGeneralError: false
      }, () => {
        return ''
      })
    } else if (uniNameFreeText) {
      this.setState({
        isLoadingUnis: false,
        isGeneralError: false
      }, () => {
        return uniNameFreeText
      })
    } else {
      return Promise.all([lookupUKSchUnis(uniName, 'label', 'uni')])
        .then(uni => {
          if(this.mounted) {
            this.setState({
              isLoadingUnis: false,
              isGeneralError: false,
            }, () => {
              return uni[0].label
            })
          }
        })
        .catch(err => {
          if(this.mounted) {
            this.setState({
              isGeneralError: true,
            })
          }
        })
    }
  }

  availabilityMsg(userAvail, nowAvailable) {
    if (userAvail !== 0 || nowAvailable) {
      return <span>Available for <strong className="greenText">long-term</strong> and/or <strong className="greenText">short-term</strong> mentorship</span>
    } else if (userAvail === 0) {
      return <span><span className="redText"><strong>Not currently available</strong></span> for mentorship</span>
    }
  /*  if (userAvail === 2 || userAvail === 3) {
      return <span>Available for <strong className="greenText">long-term</strong> and/or <strong className="greenText">short-term</strong> mentorship</span>
    } else if (userAvail === 0) {
      return <span>Available to offer <strong className="greenText">long-term</strong> mentorship</span>
    } else if (userAvail === 1) {
      return <span>Available to offer <strong className="greenText">short-term</strong> mentor support</span>
    } else if (userAvail === 4) {
      return <span><span className="redText">Not currently available</span> for mentorship</span> */
  }

  render() {
    const {feedbackReceivedArr, isLoadingUnis, isGeneralError, nowAvailable, showFeedback, browser} = this.state;
    const mentor = {
      uid: '23456',
      fname: 'Emma',
      lname: 'Sullivan',
//      profPicSrc: '',
      profPicSrc: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
      headline: 'Vegan slut drop who loves yoga, skiing and weightlifting',
  //    headline: '',
      city: 'LA',
      country: 'USA',
      timeZone: 'Europe/London',
      availType: 1,
      activeMentees: 2,
      allMentees: 2,
      maxmentees: 6,
  //    views: 200,
      didTrain: 1,
  //    lastActiveDate: '1556389526',
      yrsExp: 7,
  //    uni: null,
      eetstatus: 'sch',
      degree: 'BSc (Hons) Business Administration',
      schname: '',
      schnamefreetext: '', // If their school wasn't on the list
      schgraduyr: '2021',
      schyrgrp: '', // yr8/yr9/yr10/yr11/yr12/yr13/finSch
      uniname: '',
    //  uninamefreetext: '',
      uninamefreetext: 'Random FreeText Uni', // If their school wasn't on the list
    //  uniyrgrp: '1',
      unistartyr: '',
      unigraduyr: '2021',
      uniyrgrp: 'rcGrad',
  //    unigraduyr: '',
      subjects: [1,13,21],
      subjectsfreetext: ['japanese with french, cryptography, cyberhacking'],
    //  subjects: [],
    //  subjectsfreetext: [],
      currrole: 'Head of Marketing',
      currco: 'Pladis',
      industriesexp: [2, 19],
      rolesexp: [1, 2, 69, 5, 22, 41],
      rolesexpfreetext: ['Head of M&A'],
    //  industriesexp: [],
    //  rolesexp: [],
    //  rolesexpfreetext: [],
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
    //  expertise: '',
    //  learning: '',
      hobbies: [1,14,30],
      hobbiesfreetext: ['running, swimming, theatre, yoga, skiing, gabadee'],
    //  hobbies: [],
    //  hobbiesfreetext: [],
    //  activityPublic: 1,
    //  currtraining: 'coursename',
    //  currtrainingprovider: 'ICAS',
      currtraining: 'test',
      currtrainingprovider: 'testy',
      trainingstartdate: '2021-02-04T14:46:14.209Z',
      trainingenddate: '',
      trainingdesc: '',
    /*  groupsSet: 1,
      readsSet: 1,
      quotesSet: 1,
      groupDisabilities: 1,
      groupLGB: 1,
      groupBAME: 1,
      groupWomen: 1,
      groupParents: 1,
      groupSingle: 1,*/
      isavailable: {status: 1, by: "auto", dateUnavailable:"2021-02-04T14:46:14.209Z", reminderDate:"2021-02-14T14:46:14.209Z", reminderStatus: 1, userToRemind: 3},
      mentorgroups: [1,3,6,7],
      whyhelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
    //  whyhelp: '',
    //  helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
    //  roledesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
    }
//    const roleHistory = []
    const roleHistory = [
      {title: 'Marketing Manager', co: 'GE', startDate: '', endDate: '', roledesc: 'I look after everything marketing, whether it is product, price, packaging or promotion - the 4 Ps, just what I learned at Uni.', ismain: true},
      {title: 'Marketing Analyst', co: 'Energy Contract Company', startDate: '2019-01-03T13:30:50.667Z', endDate: '2021-01-01T13:30:50.667Z', roledesc: '', ismain: false}
    ]
//    const uniHistory = []
    const uniHistory = [
  //    {degree: 'Marketing', uniname: '44', uninamefreetext: '', unistartyr: '', unigraduyr: '2017', uniyrgrp: 'pg', unidesc: ''},
  //    {degree: 'Business', uniname: '', uninamefreetext: 'FreeName University', unistartyr: '2017', unigraduyr: '2020', uniyrgrp: '1', unidesc: ''},
  //    {degree: 'Business Basics', uniname: '', uninamefreetext: 'Other University', unistartyr: '', unigraduyr: '2017', uniyrgrp: '', unidesc: 'Such a good 4 years of my life!'}
    ]
//    const schHistory = []
    const schHistory = [
  //    {schname: '', schnamefreetext: 'Strodes College', schgraduyr: '2021', schyrgrp: 'yr13', schdesc: 'Studied A-Levels and did dissertation on XYZ - Got top grades!'}, // schyrgrp: yr8/yr9/yr10/yr11/yr12/yr13/finSch
  //    {schname: '', schnamefreetext: 'Thamesmead', schgraduyr: '2002', schyrgrp: '', schdesc: ''},
  //    {schname: '', schnamefreetext: 'Spelthorne', schgraduyr: '2005', schyrgrp: '', schdesc: ''},
    ]
    const isSafari = browser === 'safari'
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
    const rolesCommaString = (mentor.rolesexp.length > 0 || mentor.rolesexpfreetext.length > 0) ? convertRole(mentor.rolesexp, mentor.rolesexpfreetext) : []
    const rolesArray = rolesCommaString.length == 0 ? [] : rolesCommaString.split(', ')
    const hobbiesCommaString = (mentor.hobbies.length > 0 || mentor.hobbiesfreetext.length > 0) ? convertHobbies(mentor.hobbies, mentor.hobbiesfreetext) : []
    const hobbiesArr = hobbiesCommaString.length == 0 ? [] : hobbiesCommaString.split(', ');
    const expertiseArr = mentor.expertise.split(',');
    const learningArr = mentor.learning.split(',');
    const subjectsCommaString = (mentor.subjects.length > 0 || mentor.subjectsfreetext.length > 0) ? convertSubjects(mentor.subjects, mentor.subjectsfreetext) : []
    const subjectsArr = subjectsCommaString.length == 0 ? [] : subjectsCommaString.split(', ');
    const latestRole = roleHistory && roleHistory.length != 0 && roleHistory.filter(role => role.ismain == true)
    const currRole = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.title)
    const currCo = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.co)
    const sortedUnis = uniHistory && uniHistory.length != 0 && uniHistory.sort((a, b) => parseFloat(b.unigraduyr) - parseFloat(a.unigraduyr));
    const latestUni = sortedUnis[0]
    const sortedSchs = schHistory && schHistory.length != 0 && schHistory.sort((a, b) => parseFloat(b.schgraduyr) - parseFloat(a.schgraduyr));
    const latestSch = sortedSchs[0]
//    const lastActive = timeSince(mentor.lastActiveDate);
    const userCurrentTime = profileTimeZone(mentor.timeZone);
    const isDayNight = isNightDay(userCurrentTime);
    const flagEmoji = userFlagEmoji(mentor.country);

    const isPicSet = mentor.profPicSrc != '';
//    const isPicSet = false;
    const uid = '23456';
    const isMe = uid == mentor.uid ? 'isMe' : 'isntMe';
    const viewerIsU18 = true;
    const profUserIsU18 = false;
    const viewerCountry = 'GBR'
    const userInitial = mentor.fname.charAt(0).toUpperCase();
    const numMentees = 3 // user.matches.filter(x => x.status_of_match == 6 && x.mentoruid == user.uid);
    const publicFeedbackToShow = feedbackReceivedArr.filter(feedback => feedback.notetomentorpub == true) // for mentee use referenceformenteepub == true
    const verifiedType = 0 // LINK WITH DEX (THIS IS WHETHER PROSPELA DID FULL OR SOFT VERIF OF THEIR INSTITUTION)
    const eduemailverif = true
    const profemailverif = false
  //  const uniInstName = (mentor.uniname != '' || mentor.uninamefreetext != '') ? this.getUniInstName(mentor.uniname, mentor.uninamefreetext) : ''
    const uniInstName = latestUni ? (latestUni.uniname ? latestUni.uniname : latestUni.uninamefreetext) : ''
    const schInstName = latestSch ? (latestSch.schname ? latestSch.schname : latestSch.schnamefreetext) : ''
    const mentorSUStep = 'didIDTrain' // LINK WITH DEX
    const tsapproved = '2020-09-01T13:30:50.667Z' // LINK WITH DEX (THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND)
    const verifTypesArr = this.getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved)
    const hasMinVerif = verifTypesArr.length > 0
    let trainLengthTxt = ''
    let trainLengthMths
    let trainLengthYrs
    let trainLengthRemainderMths

    if (mentor.trainingstartdate != '') {
      // If is current role
      if (mentor.trainingenddate == '') {
        var today = new Date()
        trainLengthMths = monthDiff(new Date(mentor.trainingstartdate), today)
      } else {
        trainLengthMths = monthDiff(new Date(mentor.trainingstartdate), new Date(mentor.trainingenddate))
      }
      trainLengthYrs = Math.floor(trainLengthMths / 12)
      trainLengthRemainderMths = trainLengthMths - (trainLengthYrs * 12)
      trainLengthTxt = trainLengthYrs == 0 ? (trainLengthMths + ' mos') : (trainLengthYrs + (trainLengthYrs == 1 ? ' yr' : ' yrs') + (trainLengthRemainderMths > 0 ? (' ' + trainLengthRemainderMths + (trainLengthRemainderMths == 1 ? ' mo' : ' mos')) : ''))
    }

    if (isGeneralError === true) {
      <div>
        Oops! Something went wrong. Please try reloading the page.
      </div>
    } else {

    const picSizePublic = (viewerIsU18 || profUserIsU18) ? '-40' : '-360'

      return (
        <React.Fragment>
          <div className={"article-page profile" + (isSafari ? ' safari' : "")}>
            <div className={"row article-container profile" + (isSafari ? ' safari' : "")}>
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
                        className={(viewerIsU18 || profUserIsU18) ? 'userImg showSml' : ''}
                        src={usercdn.concat('/',userAvatarsFolder,mentor.profPicSrc,picSizePublic)}
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
                <h1 className="profileName">{mentor.fname}{(viewerIsU18 || profUserIsU18) ? '' : (" " + mentor.lname)}</h1>
                <div className="editSectionContainer zIndex0">
                  {mentor.eetstatus == 'sch' && (
                    <React.Fragment>
                      <div className="profileInstitution">Student</div>
                    </React.Fragment>
                  )}
                  {mentor.eetstatus == 'uni' && (
                    <React.Fragment>
                      <div className="profilePosition">{latestUni ? latestUni.degree : 'Student'}</div>
                    {/*  <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {uniInstName}</div>*/}
                    </React.Fragment>
                  )}
                  {mentor.eetstatus == 'job' && (
                    <React.Fragment>
                      <div className="profilePosition">{currRole}</div>
                      <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {currCo}</div>
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
                        <UpdateProfileOverviewContent
                          eetStatus={mentor.eetstatus}
                          country={mentor.country}
                          fName={mentor.fname}
                          lName={mentor.lname}
                          isPicSet={isPicSet}
                          profPicSrc={mentor.profPicSrc}
                          hasMinVerif={hasMinVerif}
                          profUserIsU18={profUserIsU18}
                          viewerIsU18={viewerIsU18}
                          schInstName={schInstName}
                          degree={latestUni ? latestUni.degree : ''}
                          uniInstName={uniInstName}
                          currRole={currRole}
                          currCo={currCo}
                          currTraining={mentor.currtraining}
                          currTrainingProvider={mentor.currtrainingprovider}
                        />
                      </Modal>
                    </div>
                  )}
                </div>
                {mentor.headline != '' && (
                  <div className="editSectionContainer zIndex0">
                    <div className="profileHighlight">{mentor.headline}</div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <UpdateHeadlineContent addOrEdit='edit' modalTitle='Edit your Headline' headline={mentor.headline}/>
                        </Modal>
                      </div>
                    )}
                  </div>
                )}
                {mentor.headline == '' && isMe == "isMe" && (
                  <Modal {...AddHeadlineModalProps}>
                    <UpdateHeadlineContent addOrEdit='add' modalTitle='Add new Headline' headline=''/>
                  </Modal>
                )}
                <div className="marginTop20">
                  <p>
                    <span>
                      <i className={"emoji-icon " + flagEmoji}/>
                    </span>
                    {mentor.city}, {mentor.country}
                  </p>
                </div>
            {/*    <div className="lastActiveTxt greenText">Last active <span>{lastActive}</span></div>*/}
                <div className={"contentBox feedbackOnProfile" + (publicFeedbackToShow.length > 0 ? "" : " noFeedbackYet")}>
                  <h2 className="marginBottom5">
                    <span className="smallFont" role="img" aria-label="star emoji">⭐</span> Credentials & Feedback <span className="smallFont" role="img" aria-label="star emoji">⭐</span>
                    <div className={"showHideBtn greyText textRight dispInlineBlock absolute right20 " + (publicFeedbackToShow.length == 0 ? 'greyBackground' : '')} onClick={this.toggleShowFeedback}>
                      {showFeedback == true ? 'Hide' : 'Show'}
                      <span className="showHideArrow dispInlineBlock">
                        { showFeedback == true ? <ChevronDown /> : <ChevronUp /> }
                      </span>
                    </div>
                  </h2>
                  <div className={"credTxtContainer showFeedback " + (showFeedback == true ? '' : ' hidden')}>
                  {/*  <div className={"marginTop20" + (isMe == "isMe" ? "" : " marginBottom20")}><span className="credNum">{mentor.allMentees}</span>mentees supported</div>
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
                    )}*/}
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
                      {roleHistory.map((role, index) => {
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
                            {role.roledesc != '' && (
                              <p>{role.roledesc}</p>
                            )}
                            {isMe == "isMe" && role.roledesc == '' && (
                              <Modal {...EditRoleDescModalProps}>
                                <AddEditRoleContent roleIndex={index} addOrEdit='edit' modalTitle='Edit Role / Experience' roleTitle={role.title} roleCo={role.co} startDate={role.startDate} endDate={role.endDate} roleDesc={role.roledesc} isMain={role.ismain} idToFocusOnOpen='roleDescInput'/>
                              </Modal>
                            )}
                            {isMe == "isMe" && (
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionModalProps}>
                                  <AddEditRoleContent roleIndex={index} addOrEdit='edit' modalTitle='Edit Role / Experience' roleTitle={role.title} roleCo={role.co} startDate={role.startDate} endDate={role.endDate} roleDesc={role.roledesc} isMain={role.ismain} />
                                </Modal>
                              </div>
                            )}
                          </div>
                        )
                      })}
                      {isMe == "isMe" && (
                        <Modal {...AddRoleModalProps}>
                          <AddEditRoleContent addOrEdit='add' modalTitle='Add new Role / Experience' roleTitle='' roleCo='' startDate='' endDate='' roleDesc='' isMain={false}/>
                        </Modal>
                      )}
                    </div>
                    {isMe == "isMe" && (mentor.industriesexp.length == 0 && rolesArray.length == 0) && (
                      <div className="editSectionContainer">
                        <h2>
                          Industries / Roles I can talk about
                        </h2>
                        <FullPageModal {...AddIndRolesFPModalProps}>
                          <EditIndRolesContent modalTitle='Edit the Industries / Role-types you can talk about' industriesexp={[]} rolesArray={[]} />
                        </FullPageModal>
                        <div className="editSectionBtn dispInlineBlock">
                          <FullPageModal {...EditProfileSectionFPModalProps}>
                            <EditIndRolesContent modalTitle='Edit the Industries / Role-types you can talk about' industriesexp={[]} rolesArray={[]} /*rolesexp={mentor.rolesexp} rolesexpfreetext={mentor.rolesexpfreetext}*/ />
                          </FullPageModal>
                        </div>
                      </div>
                    )}
                    {(mentor.industriesexp.length > 0 || rolesArray.length > 0) && (
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
                          {rolesArray.length > 0 && rolesArray.map((role) => {
                            return <div className="bubble" key={role}>{role}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <FullPageModal {...EditProfileSectionFPModalProps}>
                              <EditIndRolesContent modalTitle='Edit the Industries / Role-types you can talk about' industriesexp={mentor.industriesexp.length > 0 ? mentor.industriesexp : []} rolesArray={rolesArray.length > 0 ? rolesArray : []} /*rolesexp={mentor.rolesexp} rolesexpfreetext={mentor.rolesexpfreetext}*/ />
                            </FullPageModal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentor.expertise == '' || mentor.expertise == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="tools emoji">🛠️</span> Skills I use day-to-day
                        </h2>
                        <Modal {...AddExpertiseModalProps}>
                          <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise='' learning={mentor.learning ? mentor.learning : ''}/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise='' learning={mentor.learning ? mentor.learning : ''}/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {(mentor.expertise != '' && mentor.expertise != null) && (
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
                              <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise={mentor.expertise ? mentor.expertise : ''} learning={mentor.learning ? mentor.learning : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentor.learning == '' || mentor.learning == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="book emoji">📚</span> I&#39;m currently learning
                        </h2>
                        <Modal {...AddLearningModalProps}>
                          <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='learning' expertise={mentor.expertise ? mentor.expertise : ''} learning=''/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='learning' expertise={mentor.expertise ? mentor.expertise : ''} learning=''/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {mentor.learning != '' && mentor.learning != null && (
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
                              <UpdateExpertiseContent modalTitle='Edit your Skills / Expertise' expOrLearning='learning' expertise={mentor.expertise ? mentor.expertise : ''} learning={mentor.learning ? mentor.learning : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                  <section className="scroll-anchor" id="education" name="education">
                    <h1 >
                      <br/>
                      <i className="emoji-icon schoolHat-emoji"/> Education & Training
                    </h1>
                    <div>
                      <h2>
                        University:
                      </h2>
                      {uniHistory.length == 0 && (
                        <div className="editSectionContainer">
                          {mentor.eetstatus != 'sch' && (
                            <p><span role="img" aria-label="cross-emoji">❌</span> I didnt go to University</p>
                          )}
                          {isMe == "isMe" && (
                            <React.Fragment>
                              <Modal {...AddUniFPModalProps}>
                                <AddEditUniContent modalTitle='Add your University Degree' addOrEdit='add' uniName='' uniNameFreeText='' degree='' uniStartYr='' uniYrGrp='' uniGraduYr='' uniDesc=''/>
                              </Modal>
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionFPModalProps}>
                                  <AddEditUniContent modalTitle='Add your University Degree' addOrEdit='add' uniName='' uniNameFreeText='' degree='' uniStartYr='' uniYrGrp='' uniGraduYr='' uniDesc=''/>
                                </Modal>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {uniHistory.length > 0 && (
                        <React.Fragment>
                        {/*  {isLoadingUnis == true && (
                            <div className="loadingSUMsg">
                              <p className="">
                                Loading University details...
                              </p>
                              <div className="infiniteSpinner infiniteSpinner-medium">
                                <div className="LoaderLayout-sc-1eu50fy-0 eczmJS">
                                  <div className="LoaderWrapper-sc-1eu50fy-1 iKvkDg">
                                    <LoadingSpinner />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}*/}
                          {uniHistory.map((uni, index) => {
                            const uniStartYr = uni.unistartyr ? uni.unistartyr : ''
                          //  const userUniName = this.geUniInstName(uni.uniname, uni.uninamefreetext)
                            const userUniName = uni.uniname ? uni.uniname : uni.uninamefreetext
                            return (
                              <div key={index} className="editSectionContainer">
                                <div className="displayFlex marginBottom5">
                                  <div className="msg-thumb-container">
                                    <div className="msg-thumb img-square noPic isCompany">
                                      <div className="userInitial msg-thumb noModal">
                                        {userUniName && userUniName.charAt(0).toUpperCase()}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div><strong>{uni.degree}</strong></div>
                                    <div>{userUniName && userUniName}</div>
                                    <div className="marginBottom5 smallFont darkGreyText">
                                      {uniStartYr != '' && (
                                        <span>{uniStartYr} - </span>
                                      )}
                                      {uni.unigraduyr == '' ? 'Present' : uni.unigraduyr}
                                    </div>
                                  </div>
                                  {isMe == "isMe" && (
                                    <div className="editSectionBtn dispInlineBlock">
                                      <Modal {...EditProfileSectionFPModalProps}>
                                        <AddEditUniContent modalTitle='Edit your University Degree' addOrEdit='edit' uniName={uni.uninamefreetext ? '' : userUniName} uniNameFreeText={uni.uninamefreetext ? userUniName : ''} degree={uni.degree} uniStartYr={uniStartYr} uniGraduYr={uni.unigraduyr} uniDesc={uni.unidesc}/>
                                      </Modal>
                                    </div>
                                  )}
                                </div>
                                {uni.unidesc != '' && (
                                  <p classNamme="marginBottom20">{uni.unidesc}</p>
                                )}
                                {isMe == "isMe" && uni.unidesc == '' && (
                                  <Modal {...EditUniDescModalProps}>
                                    <AddEditUniContent roleIndex={index} modalTitle='Edit your University Degree' addOrEdit='edit' uniName={uni.uninamefreetext ? '' : userUniName} uniNameFreeText={uni.uninamefreetext ? userUniName : ''} degree={uni.degree} uniStartYr={uniStartYr} uniGraduYr={uni.unigraduyr} uniDesc={uni.unidesc} idToFocusOnOpen='uniDescInput'/>
                                  </Modal>
                                )}
                              </div>
                            )
                          })}
                          {isMe == "isMe" && (
                            <Modal {...AddUniFPModalProps}>
                              <AddEditUniContent modalTitle='Add your University Degree' addOrEdit='add' uniName='' uniNameFreeText='' degree='' uniStartYr='' uniYrGrp='' uniGraduYr='' uniDesc=''/>
                            </Modal>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                    <div>
                      <h2>
                        {viewerCountry == 'GBR' ? 'School / College:' : 'High School'}
                      </h2>
                      {schHistory.length == 0 && (
                        <div className="editSectionContainer">
                          {isMe == "isMe" && (
                            <React.Fragment>
                              <Modal {...AddSchFPModalProps}>
                                <AddEditSchContent modalTitle={mentor.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStartYr='' schGraduYr='' schDesc=''/>
                              </Modal>
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionFPModalProps}>
                                  <AddEditSchContent modalTitle={mentor.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStarYr='' schGraduYr='' schDesc=''/>
                                </Modal>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {schHistory.length > 0 && (
                        <React.Fragment>
                        {/*  {isLoadingUnis == true && (
                            <div className="loadingSUMsg">
                              <p className="">
                                Loading University details...
                              </p>
                              <div className="infiniteSpinner infiniteSpinner-medium">
                                <div className="LoaderLayout-sc-1eu50fy-0 eczmJS">
                                  <div className="LoaderWrapper-sc-1eu50fy-1 iKvkDg">
                                    <LoadingSpinner />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}*/}
                          {schHistory.map((sch, index) => {
                            const schStartYr = sch.schstartyr ? sch.schstartyr : ''
                          //  const userUniName = this.geUniInstName(uni.uniname, uni.uninamefreetext)
                            const userSchName = sch.schname ? sch.schname : sch.schnamefreetext
                            return (
                              <div key={index} className="editSectionContainer">
                                <div className="displayFlex marginBottom5">
                                  <div className="msg-thumb-container">
                                    <div className="msg-thumb img-square noPic isCompany">
                                      <div className="userInitial msg-thumb noModal">
                                        {userSchName && userSchName.charAt(0).toUpperCase()}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div>{userSchName && userSchName}</div>
                                    <div className="marginBottom5 smallFont darkGreyText">
                                      {schStartYr != '' && (
                                        <span>{schStartYr} - </span>
                                      )}
                                      {sch.schgraduyr == '' ? 'Present' : sch.schgraduyr}
                                    </div>
                                  </div>
                                  {isMe == "isMe" && (
                                    <div className="editSectionBtn dispInlineBlock">
                                      <Modal {...EditProfileSectionFPModalProps}>
                                        <AddEditSchContent modalTitle={mentor.country == 'GBR' ? 'Edit your School / College' : 'Edit your High School(s)'} addOrEdit='edit' schName={sch.schnamefreetext ? '' : userSchName} schNameFreeText={sch.schnamefreetext ? userSchName : ''} schStartYr={schStartYr} schGraduYr={sch.schgraduyr} schDesc={sch.schdesc}/>
                                      </Modal>
                                    </div>
                                  )}
                                </div>
                                {sch.schdesc != '' && (
                                  <p className="marginBottom20">{sch.schdesc}</p>
                                )}
                                {isMe == "isMe" && sch.schdesc == '' && (
                                  <Modal {...EditSchDescModalProps}>
                                    <AddEditSchContent roleIndex={index} addOrEdit='edit' modalTitle={mentor.country == 'GBR' ? 'Edit your School / College' : 'Edit your High School(s)'} schName={sch.schnamefreetext ? '' : userSchName} schNameFreeText={sch.schnamefreetext ? userSchName : ''} schStartYr={schStartYr} schGraduYr={sch.schgraduyr} schDesc={sch.schdesc} idToFocusOnOpen='schDescInput'/>
                                  </Modal>
                                )}
                              </div>
                            )
                          })}
                          {isMe == "isMe" && (
                            <Modal {...AddSchFPModalProps}>
                              <AddEditSchContent modalTitle={mentor.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStartYr='' schGraduYr='' schDesc='' />
                            </Modal>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                    {(mentor.currtraining == null || mentor.currtraining == '') && (
                      <div className="editSectionContainer">
                        <h2>
                          Training:
                        </h2>
                        {isMe == "isMe" && (
                          <React.Fragment>
                            <Modal {...AddTrainingModalProps}>
                              <AddEditTrainingContent modalTitle='Add Training Course' addOrEdit='add' currTraining='' currTrainingProvider='' startDate='' endDate='' trainingDesc='' />
                            </Modal>
                            <div className="editSectionBtn dispInlineBlock">
                              <Modal {...EditProfileSectionModalProps}>
                                <AddEditTrainingContent modalTitle='Add Training Course' addOrEdit='add' currTraining='' currTrainingProvider='' startDate='' endDate='' trainingDesc='' />
                              </Modal>
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    )}
                    {(mentor.currtraining != null && mentor.currtraining != '') && (
                      <div className="editSectionContainer">
                        <h2>
                          Training:
                        </h2>
                        <div className="displayFlex marginBottom5">
                          <div className="msg-thumb-container">
                            <div className="msg-thumb img-square noPic isCompany">
                              <div className="userInitial msg-thumb noModal">
                                {mentor.currtrainingprovider.charAt(0).toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div><strong>{mentor.currtraining}</strong></div>
                            <div>{mentor.currtrainingprovider}</div>
                            <div className="marginBottom5 smallFont darkGreyText">
                              {mentor.trainingstartdate != '' && (
                                <span><DateCalc time={mentor.trainingstartdate} showPureDate dontShowDay /> - </span>
                              )}
                              {mentor.trainingenddate == '' ? 'Present' : <DateCalc time={mentor.trainingenddate} showPureDate dontShowDay />}
                              {mentor.trainingstartdate != '' && <span> &#8226; {trainLengthTxt}</span>}
                            </div>
                          </div>
                        </div>
                        {mentor.trainingdesc != '' && (
                          <p>{mentor.trainingdesc}</p>
                        )}
                        {isMe == "isMe" && mentor.trainingdesc == '' && (
                          <Modal {...EditRoleDescModalProps}>
                            <AddEditTrainingContent modalTitle='Edit Training Course' addOrEdit='edit' currTraining={mentor.currtraining} currTrainingProvider={mentor.currtrainingprovider} startDate={mentor.trainingstartdate} endDate={mentor.trainingenddate} trainingDesc={mentor.trainingdesc} idToFocusOnOpen='trainingDescInput'/>
                          </Modal>
                        )}
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionFPModalProps}>
                              <AddEditTrainingContent modalTitle='Edit Training Course' addOrEdit='edit' currTraining={mentor.currtraining} currTrainingProvider={mentor.currtrainingprovider} startDate={mentor.trainingstartdate} endDate={mentor.trainingenddate} trainingDesc={mentor.trainingdesc} />
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && subjectsArr.length == 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="studybook emoji">📓</span> {eduSubjects(mentor.country)}
                        </h2>
                        <FullPageModal {...AddSubjectsFPModalProps}>
                          <EditSubjectsContent modalTitle='Add the Subjects you studied at School' subjectsArray={[]} />
                        </FullPageModal>
                        <div className="editSectionBtn dispInlineBlock">
                          <FullPageModal {...EditProfileSectionFPModalProps}>
                            <EditSubjectsContent modalTitle='Add the Subjects you studied at School' subjectsArray={[]} />
                          </FullPageModal>
                        </div>
                      </div>
                    )}
                    {subjectsArr.length > 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="studybook emoji">📓</span> {eduSubjects(mentor.country)}
                        </h2>
                        <div>
                          {subjectsArr.length > 0 && subjectsArr.map((subject) => {
                            return <div key={subject}>{subject.trim()}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <FullPageModal {...EditProfileSectionFPModalProps}>
                              <EditSubjectsContent modalTitle='Edit the Subjects you studied at School' subjectsArray={subjectsArr.length > 0 ? subjectsArr : []} />
                            </FullPageModal>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                  <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                    <h1 >
                      <br/>
                      <i className="emoji-icon rockOn-emoji"/> Outside of work
                    </h1>
                    {isMe == "isMe" && hobbiesArr.length == 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="football emoji">⚽️</span> When I&#39;m not working, you&#39;ll find me
                        </h2>
                        <FullPageModal {...AddHobbiesFPModalProps}>
                          <EditHobbiesContent modalTitle='Edit your Hobbies' hobbiesArr={[]} />
                        </FullPageModal>
                        <div className="editSectionBtn dispInlineBlock">
                          <FullPageModal {...EditProfileSectionFPModalProps}>
                            <EditHobbiesContent modalTitle='Edit your Hobbies' hobbiesArr={[]}/>
                          </FullPageModal>
                        </div>
                      </div>
                    )}
                    {hobbiesArr.length > 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="football emoji">⚽️</span> When I&#39;m not working, you&#39;ll find me
                        </h2>
                        <div>
                          {hobbiesArr.length > 0 && hobbiesArr.map((hobby) => {
                            return <div key={hobby}>{hobby.trim()}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <FullPageModal {...EditProfileSectionFPModalProps}>
                              <EditHobbiesContent modalTitle='Edit your Hobbies' hobbiesArr={hobbiesArr}/>
                            </FullPageModal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentor.whyhelp == '' || mentor.whyhelp == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          I&#39;m interested in being a mentor because:
                        </h2>
                        <Modal {...AddwhyhelpModalProps}>
                          <UpdateWhyHelpContent modalTitle='Your motivations for Mentoring' whyHelp={mentor.whyhelp ? mentor.whyhelp : ''}/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateWhyHelpContent modalTitle='Your motivations for Mentoring' whyHelp={mentor.whyhelp ? mentor.whyhelp : ''}/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {(mentor.whyhelp != '' && mentor.whyhelp != null) && (
                      <div className="editSectionContainer">
                        <h2>
                          I&#39;m interested in being a mentor because:
                        </h2>
                        <p>{mentor.whyhelp}</p>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionModalProps}>
                              <UpdateWhyHelpContent modalTitle='Your motivations for Mentoring' whyHelp={mentor.whyhelp ? mentor.whyhelp : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
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
                    {this.availabilityMsg(mentor.isavailable.status, this.state.nowAvailable)}
                  </div>
                  <div className="profileUserCTA">
                    {(mentor.isavailable.status !== 0 || nowAvailable) ? (
                      <button type="button" className={"profileBtn" + (isMe == "isMe" ? "" : " notMe")}>
                        <span>&#10003;</span>
                      </button>
                      )
                    : (
                      <button type="button" className={"profileBtn redTextBorderBkgnd" + (isMe == "isMe" ? "" : " notMe")} onClick={isMe == 'isMe' ? this.handleAvailabilityClick : null}>
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
}

export default MentorProfileContent;
