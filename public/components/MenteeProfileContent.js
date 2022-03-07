// Dex last merged this code on 7th mar 2022

import React, { Component } from "react";

import {cdn, usercdn, userAvatarsFolder} from './CDN.js';
import AddEditRoleContent from './AddEditRoleModalContent.js';
import AddEditTrainingContent from './AddEditTrainingModalContent.js';
import AddEditSchContent from './AddEditSchModalContent.js';
import AddEditUniContent from './AddEditUniModalContent.js';
import EditHobbiesContent from './EditHobbiesContent.js';
import EditIndRolesContent from './EditIndRolesContent.js';
import EditLifestyleContent from './EditLifestyleModalContent.js';
import EditPlanningUniContent from './EditPlanningUniModalContent.js';
import EditRatingsContent from './EditRatingsModalContent.js';
import EditSubjectsContent from './EditSubjectsContent.js';
import EditWorkingOnContent from './EditWorkingOnContent.js';
import FeedbackPublic from './Feedback-publicView.js';
import FullPageModal from './FullPageModal.js';
import GroupCircle from "./GroupCircle";
import ManageFeedbackContent from './ManageFeedbackContent.js';
import Modal from './Modal.js';
import UpdateExpertiseContent from './UpdateExpertiseModalContent.js';
import UpdateHeadlineContent from './UpdateHeadlineModalContent.js';
import UpdateProfileOverviewContent from './UpdateProfOverviewModalContent.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import UpdateWhyJoinContent from './UpdateWhyJoinModalContent.js';
import UserActivity from './UserActivity.js';
import UserReads from './UserReads.js';
import UserQuotes from './UserQuotes.js';
import {getIndustryDeets, getGroupDeets, convertSubjects, convertRole, convertHobbies, convertWorkingOn, lookupUKSchUnis, userFlagEmoji, eduSubjects, eduName, timeSince, isNightDay, profileTimeZone} from './UserDetail.js';
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

const AddWorkingOnFPModalProps = {
  ariaLabel: 'Add Activities',
  triggerText: '+ Add Activities',
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

const AddPlanningUniModalProps = {
  ariaLabel: 'Add / Edit university plans',
  triggerText: '+ Add Uni Plans',
  usedFor: 'addEditSkills',
  changeInitFocus: true
}

const AddRatingsModalProps = {
  ariaLabel: 'Add / Edit self-ratings',
  triggerText: '+ Add / Edit Self-Ratings',
  usedFor: 'addEditTraining',
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

const AddLifestyleModalProps = {
  ariaLabel: 'Add lifestyle',
  triggerText: '+ Add lifestyle preferences',
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

class MenteeProfileContent extends Component {
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
          noteToMentor: 'Thank you so much for being my mentee. You were amazing and I really appreciated when you told me X and taught my Y',
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
          noteToMentor: 'Thank you so much for being my mentee. You were amazing and I really appreciated when you told me X and taught my Y',
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
          noteToMentor: 'Thank you so much for being my mentee. You were amazing and I really appreciated when you told me X and taught my Y',
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleShowFeedback = () => {
    const currentState = this.state.showFeedback;
    this.setState({
      showFeedback: !currentState,
    })
  }

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

  render() {
    const {feedbackReceivedArr, isLoadingUnis, isGeneralError, nowAvailable, showFeedback, browser} = this.state;
    const mentee = {
      uid: '23456',
      fname: 'Emma',
      lname: 'Sullivan',
      profPicSrc: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
      headline: 'Vegan slut drop who loves yoga, skiing and weightlifting',
      city: 'LA',
      country: 'USA',
      timeZone: 'Europe/London',
      eetstatus: 'sch',
      degree: 'BSc (Hons) Business Administration',
      schname: '',
      schnamefreetext: '', // If their school wasn't on the list
      schgraduyr: '2021',
      schyrgrp: '', // yr8/yr9/yr10/yr11/yr12/yr13/finSch
      planninguni: '1',
      uniname: '',
      uninamefreetext: '',
      unistartyr: '',
      unigraduyr: '2021',
      uniyrgrp: 'rcGrad',
      subjects: [1,13,21],
      subjectsfreetext: ['japanese with french, cryptography, cyberhacking'],
      currrole: 'Head of Marketing',
      currco: 'Pladis',
      industries: [2, 19],
      roles: [2, 69, 5, 22, 41],
      rolesfreetext: ['Head of M&A'],
      rolesexp: [1],
      rolesexpfreetext: ['Trainer Sales Assistant'],
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
      hobbies: [1,14,30],
      hobbiesfreetext: ['running, swimming, theatre, yoga, skiing, gabadee'],
      workingon: [],
      workingonfreetext: [],
      currtraining: '',
      currtrainingprovider: '',
      trainingstartdate: '',
      trainingenddate: '',
      trainingdesc: '',
      isavailable: {status: 1, by: "auto", dateUnavailable:"2021-02-04T14:46:14.209Z", reminderDate:"2021-02-14T14:46:14.209Z", reminderStatus: 1, userToRemind: 3},
      menteegroups: [1,3],
      whyjoin: 'I really need help knowing how to get to become a 3D Animator and get contacts in the industry',
      certainty: '',
      knownextsteps: '',
      lifestyle: 'Rich with a lambo'
    }
//    const roleHistory = []
    const roleHistory = [
      {title: 'Trainer Sales Assistant', co: 'JD Sports', startDate: '', endDate: '', roledesc: 'I sell trainers to consumers.', ismain: true},
    ]
  //  const uniHistory = []
    const uniHistory = [
      {degree: 'Marketing', uniname: '44', uninamefreetext: '', unistartyr: '', unigraduyr: '2017', uniyrgrp: 'pg', unidesc: ''},
      {degree: 'Business', uniname: '', uninamefreetext: 'FreeName University', unistartyr: '2017', unigraduyr: '2020', uniyrgrp: '1', unidesc: ''},
      {degree: 'Business Basics', uniname: '', uninamefreetext: 'Other University', unistartyr: '', unigraduyr: '2017', uniyrgrp: '', unidesc: 'Such a good 4 years of my life!'}
    ]
//    const schHistory = []
    const schHistory = [
      {schname: '', schnamefreetext: 'Strodes College', schgraduyr: '2021', schyrgrp: 'yr13', schdesc: 'Studied A-Levels and did dissertation on XYZ - Got top grades!'}, // schyrgrp: yr8/yr9/yr10/yr11/yr12/yr13/finSch
      {schname: '', schnamefreetext: 'Thamesmead', schgraduyr: '2002', schyrgrp: '', schdesc: ''},
      {schname: '', schnamefreetext: 'Spelthorne', schgraduyr: '2005', schyrgrp: '', schdesc: ''},
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
    const rolesCommaString = (mentee.roles.length > 0 || mentee.rolesfreetext.length > 0) ? convertRole(mentee.roles, mentee.rolesfreetext) : []
    const rolesArray = rolesCommaString.length == 0 ? [] : rolesCommaString.split(', ')
    const hobbiesCommaString = (mentee.hobbies.length > 0 || mentee.hobbiesfreetext.length > 0) ? convertHobbies(mentee.hobbies, mentee.hobbiesfreetext) : []
    const hobbiesArr = hobbiesCommaString.length == 0 ? [] : hobbiesCommaString.split(', ');
    const expertiseArr = mentee.expertise.split(',');
    const learningArr = mentee.learning.split(',');
    const subjectsCommaString = (mentee.subjects.length > 0 || mentee.subjectsfreetext.length > 0) ? convertSubjects(mentee.subjects, mentee.subjectsfreetext) : []
    const subjectsArr = subjectsCommaString.length == 0 ? [] : subjectsCommaString.split(', ');
  /*  const workingOnOptions = [
      {value: '0', label: 'Deciding on a career path'},
      {value: '1', label: 'CV/Resume editing'},
      {value: '2', label: 'Portfolio / Showreel review'},
      {value: '3', label: 'Finding an internship / work experience'},
      {value: '4', label: 'Full-time job search'},
      {value: '5', label: 'Job Interviews'},
      {value: '6', label: 'Making subject / degree choices'},
      {value: '7', label: 'Applying to University'},
      {value: '8', label: 'Learning to Code'},
      {value: '9', label: 'Learning a language'},
      {value: '10', label: 'Learning an instrument'},
      {value: '11', label: 'Training for a sporting event'},
    ]*/
    const workingOnCommaString = mentee.workingon.length > 0 ? convertWorkingOn(mentee.workingon, mentee.workingonfreetext) : []
    const workingOnArr = workingOnCommaString.length == 0 ? [] : workingOnCommaString.split(', ');
    const latestRole = roleHistory && roleHistory.length != 0 && roleHistory.filter(role => role.ismain == true)
    const currRole = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.title)
    const currCo = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.co)
    const sortedUnis = uniHistory && uniHistory.length != 0 && uniHistory.sort((a, b) => parseFloat(b.unigraduyr) - parseFloat(a.unigraduyr));
    const latestUni = sortedUnis && sortedUnis[0]
    const sortedSchs = schHistory && schHistory.length != 0 && schHistory.sort((a, b) => parseFloat(b.schgraduyr) - parseFloat(a.schgraduyr));
    const latestSch = sortedSchs[0]
//    const lastActive = timeSince(mentee.lastActiveDate);
    const userCurrentTime = profileTimeZone(mentee.timeZone);
    const isDayNight = isNightDay(userCurrentTime);
    const flagEmoji = userFlagEmoji(mentee.country);

    const isPicSet = mentee.profPicSrc != '';
//    const isPicSet = false;
    const uid = '23456';
    const isMe = uid == mentee.uid ? 'isMe' : 'isntMe';
    const viewerIsU18 = false;
    const profUserIsU18 = true;
    const viewerCountry = 'GBR'
    const userInitial = mentee.fname.charAt(0).toUpperCase();
    const numMentees = 3 // user.matches.filter(x => x.status_of_match == 6 && x.mentoruid == user.uid);
    const publicFeedbackToShow = feedbackReceivedArr.filter(feedback => feedback.referenceformenteepub == true) // for mentor use notetomentorpub == true
  //  const uniInstName = (mentee.uniname != '' || mentee.uninamefreetext != '') ? this.getUniInstName(mentee.uniname, mentee.uninamefreetext) : ''
    const uniInstName = latestUni ? latestUni.uniname ? latestUni.uniname : latestUni.uninamefreetext : ''
    const schInstName = latestSch ? latestSch.schname ? latestSch.schname : latestSch.schnamefreetext : ''
    const menteeSUStep = 'didIDTrain' // LINK WITH DEX
    const tsapproved = '2020-09-01T13:30:50.667Z' // LINK WITH DEX (THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND)
    let trainLengthTxt = ''
    let trainLengthMths
    let trainLengthYrs
    let trainLengthRemainderMths
    let today = new Date()

    if (mentee.trainingstartdate != '') {
      // If is current role
      if (mentee.trainingenddate == '') {
        trainLengthMths = monthDiff(new Date(mentee.trainingstartdate), today)
      } else {
        trainLengthMths = monthDiff(new Date(mentee.trainingstartdate), new Date(mentee.trainingenddate))
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
                          <UploadProfPicContent isPicSet={isPicSet} profPicSrc={mentee.profPicSrc} isMe={isMe} picSizeToShow={270}/>
                        </Modal>
                      )}
                      <img
                        className={(viewerIsU18 || profUserIsU18) ? 'userImg showSml' : ''}
                        src={usercdn.concat('/',userAvatarsFolder,mentee.profPicSrc,picSizePublic)}
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
                </div>
                <h1 className="profileName">{mentee.fname}{(viewerIsU18 || profUserIsU18) ? '' : (" " + mentee.lname)}</h1>
                <div className="editSectionContainer zIndex0">
                  {mentee.eetstatus == 'sch' && (
                    <React.Fragment>
                      <div className={(profUserIsU18 != true && viewerIsU18 != true) ? "profilePosition" : "profileInstitution"}>Student</div>
                      {(profUserIsU18 != true && viewerIsU18 != true) && (
                        <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {schInstName}</div>
                      )}
                    </React.Fragment>
                  )}
                  {mentee.eetstatus == 'uni' && (
                    <React.Fragment>
                      <div className="profilePosition">{latestUni.degree}</div>
                    {/*  <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {uniInstName}</div>*/}
                    </React.Fragment>
                  )}
                  {mentee.eetstatus == 'job' && (
                    <React.Fragment>
                      <div className="profilePosition">{currRole}</div>
                      <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {currCo}</div>
                    </React.Fragment>
                  )}
                  {mentee.eetstatus == 'train' && (
                    <React.Fragment>
                      <div className="profilePosition">{mentee.currtraining}</div>
                      <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {mentee.currtrainingprovider}</div>
                    </React.Fragment>
                  )}
                  {mentee.eetstatus == 'none' && (
                    <div className="profilePosition">Looking for opportunities</div>
                  )}
                  {isMe == "isMe" && (
                    <div className="editSectionBtn dispInlineBlock">
                      <Modal {...EditProfileSectionModalProps}>
                        <UpdateProfileOverviewContent
                          eetStatus={mentee.eetstatus}
                          country={mentee.country}
                          fName={mentee.fname}
                          lName={mentee.lname}
                          isPicSet={isPicSet}
                          profPicSrc={mentee.profPicSrc}
                          profUserIsU18={profUserIsU18}
                          viewerIsU18={viewerIsU18}
                          schInstName={schInstName}
                          degree={latestUni.degree}
                          uniInstName={uniInstName}
                          currRole={currRole}
                          currCo={currCo}
                          currTraining={mentee.currtraining}
                          currTrainingProvider={mentee.currtrainingprovider}
                        />
                      </Modal>
                    </div>
                  )}
                </div>
                {mentee.headline != '' && (
                  <div className="editSectionContainer zIndex0">
                    <div className="profileHighlight">{mentee.headline}</div>
                    {isMe == "isMe" && (
                      <div className="editSectionBtn dispInlineBlock">
                        <Modal {...EditProfileSectionModalProps}>
                          <UpdateHeadlineContent addOrEdit='edit' modalTitle='Edit your Headline' headline={mentee.headline}/>
                        </Modal>
                      </div>
                    )}
                  </div>
                )}
                {mentee.headline == '' && isMe == "isMe" && (
                  <Modal {...AddHeadlineModalProps}>
                    <UpdateHeadlineContent addOrEdit='add' modalTitle='Add new Headline' headline=''/>
                  </Modal>
                )}
                <div className="marginTop20">
                  <p>
                    <span>
                      <i className={"emoji-icon " + flagEmoji}/>
                    </span>
                    {(profUserIsU18 != true && viewerIsU18 != true) && (mentee.city + ', ')}{mentee.country}
                  </p>
                </div>
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
                    {publicFeedbackToShow.length == 0 && (
                      <div className="restrictedContent darkGreyText">
                        <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                        {mentee.fname} does not have any public endorsements from mentors yet.
                      </div>
                    )}
                    {publicFeedbackToShow.length > 0 && (
                      <React.Fragment>
                        <FeedbackPublic fname={mentee.fname} isProfile feedbackArr={[publicFeedbackToShow[0]]} userRoleToView='mentee'/>
                        {(publicFeedbackToShow.length > 1 || isMe == 'isMe') && (
                          <div className="feedbackBtn">
                            <div className="messageCTABtns">
                              <Modal {...ViewMoreFeedbackProps} triggerText={isMe == 'isMe' ? 'Manage my Feedback' : 'View all Feedback'}>
                                <ManageFeedbackContent isForPublicProfile={isMe == 'isMe' ? false : true} userToView={mentee.fname} userRoleToView='mentee' publicFeedbackToShow={isMe == 'isMe' ? null : publicFeedbackToShow}/>
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
                    <img
                      className="prLogoImg"
                      alt="Prospela Logo"
                      srcSet={cdn+"/images/Prospela-New-Logo_Colour_213.png 213w, "+cdn+"/images/Prospela-New-Logo_Colour_341.png 314w, "+cdn+"/images/Prospela-New-Logo_Colour_640.png 640w"}
                      sizes="(max-width: 1440px) 69px, 69px"
                      src={cdn+"/images/Prospela-New-Logo_Colour.png"}
                    />
                </div>
                <div className="article-body profile">
                  <section className="scroll-anchor" id="career-aspirations" name="career-aspirations">
                    <h1 >
                      <br/>
                      <i className="emoji-icon suitcase-emoji"/> Career Aspirations
                    </h1>
                    {isMe == "isMe" && (mentee.industries.length == 0 && rolesArray.length == 0) && (
                      <div className="editSectionContainer">
                        <h2>
                          Industries / Roles I&#39;m interested in
                        </h2>
                        <FullPageModal {...AddIndRolesFPModalProps}>
                          <EditIndRolesContent modalTitle='Edit the Industries / Role-types you are interested in' industriesexp={[]} rolesArray={[]} />
                        </FullPageModal>
                        <div className="editSectionBtn dispInlineBlock">
                          <FullPageModal {...EditProfileSectionModalProps}>
                            <EditIndRolesContent modalTitle='Edit the Industries / Role-types you are interested in' industriesexp={[]} rolesArray={[]} />
                          </FullPageModal>
                        </div>
                      </div>
                    )}
                    {(mentee.industries.length > 0 || rolesArray.length > 0) && (
                      <div className="editSectionContainer">
                        <h2>
                          Industries / Roles I&#39;m interested in
                        </h2>
                        <div className="bubbleContainer">
                          {mentee.industries.map((indID) => {
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
                              <EditIndRolesContent modalTitle='Edit the Industries / Role-types you are interested in' industriesexp={mentee.industries.length > 0 ? mentee.industries : []} rolesArray={rolesArray.length > 0 ? rolesArray : []} />
                            </FullPageModal>
                          </div>
                        )}
                      </div>
                    )}
                    {(mentee.certainty != '' || mentee.knownextsteps != '') && (
                      <div className="marginTop20">
                        {mentee.certainty != '' && mentee.certainty != null && (
                          <div className="editSectionContainer">
                            <p>
                              <span className="impactTxt">How certain I am of the career I want:</span>
                              <span className="impactRating">{mentee.certainty}</span><span className="neutralText"> / 10</span>
                            </p>
                            {isMe == "isMe" && (
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionModalProps}>
                                  <EditRatingsContent modalTitle='Edit your self-ratings' certainty={mentee.certainty} knowNextSteps={mentee.knownextsteps == '' ? '' : mentee.knownextsteps}/>
                                </Modal>
                              </div>
                            )}
                          </div>
                        )}
                        {mentee.knownextsteps != '' && mentee.knownextsteps != null && (
                          <div className="editSectionContainer">
                            <p>
                              <span className="impactTxt">I know what next steps to take to get down my preferred career path:</span>
                              <span className="impactRating">{mentee.knownextsteps}</span><span className="neutralText"> / 10</span>
                            </p>
                            {isMe == "isMe" && (
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionModalProps}>
                                  <EditRatingsContent modalTitle='Edit your self-ratings' idToFocusOnOpen="ratingsContainer-knowNextStepsRating" certainty={mentee.certainty == '' ? '' : mentee.certainty} knowNextSteps={mentee.knownextsteps}/>
                                </Modal>
                              </div>
                            )}
                          </div>
                        )}
                        {isMe == "isMe" && (
                          <Modal {...AddRatingsModalProps}>
                            <EditRatingsContent modalTitle='Edit your self-ratings' certainty={mentee.certainty == '' ? '' : mentee.certainty} knowNextSteps={mentee.knownextsteps == '' ? '' : mentee.knownextsteps} />
                          </Modal>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && mentee.certainty == '' && mentee.knownextsteps == '' && (
                      <div className="editSectionContainer marginTop20">
                        <Modal {...AddRatingsModalProps}>
                          <EditRatingsContent modalTitle='Edit your self-ratings' certainty='' knowNextSteps='' />
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <EditRatingsContent modalTitle='Edit your self-ratings' certainty='' knowNextSteps='' />
                          </Modal>
                        </div>
                      </div>
                    )}
                    {isMe == "isMe" && (mentee.lifestyle == '' || mentee.lifestyle == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          The lifestyle I want
                        </h2>
                        <Modal {...AddLifestyleModalProps}>
                          <EditLifestyleContent modalTitle='Edit your ambitions' lifestyle='' />
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <EditLifestyleContent modalTitle='Edit your ambitions' lifestyle='' />
                          </Modal>
                        </div>
                      </div>
                    )}
                    {mentee.lifestyle != '' && mentee.lifestyle != null && (
                      <div className="editSectionContainer">
                        <h2>
                          The lifestyle I want
                        </h2>
                        <p>{mentee.lifestyle}</p>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionModalProps}>
                              <EditLifestyleContent modalTitle='Your ambitions' lifestyle={mentee.lifestyle}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentee.whyjoin == '' || mentee.whyjoin == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          I&#39;m interested in getting a mentor because:
                        </h2>
                        <Modal {...AddwhyhelpModalProps}>
                          <UpdateWhyJoinContent modalTitle='Your motivations for Mentoring' whyJoin={mentee.whyjoin ? mentee.whyjoin : ''}/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateWhyJoinContent modalTitle='Your motivations for Mentoring' whyJoin={mentee.whyjoin ? mentee.whyjoin : ''}/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {(mentee.whyjoin != '' && mentee.whyjoin != null) && (
                      <div className="editSectionContainer">
                        <h2>
                          I&#39;m interested in getting a mentor because:
                        </h2>
                        <p>{mentee.whyjoin}</p>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionModalProps}>
                              <UpdateWhyJoinContent modalTitle='Your motivations for Mentoring' whyJoin={mentee.whyjoin ? mentee.whyjoin : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && workingOnArr.length == 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="footsteps emoji">👣</span> My immediate next steps
                        </h2>
                        <FullPageModal {...AddWorkingOnFPModalProps}>
                          <EditWorkingOnContent modalTitle='Edit what you are working on' workingOnArr={[]} />
                        </FullPageModal>
                        <div className="editSectionBtn dispInlineBlock">
                          <FullPageModal {...EditProfileSectionFPModalProps}>
                            <EditWorkingOnContent modalTitle='Edit what you are working on' workingOnArr={[]} />
                          </FullPageModal>
                        </div>
                      </div>
                    )}
                    {workingOnArr.length > 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="footsteps emoji">👣</span> My immediate next steps
                        </h2>
                        <div>
                          {workingOnArr.length > 0 && workingOnArr.map((item) => {
                            return <div key={item}>{item.trim()}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <FullPageModal {...EditProfileSectionFPModalProps}>
                              <EditWorkingOnContent modalTitle='Edit what you are working on' workingOnArr={workingOnArr}/>
                            </FullPageModal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentee.expertise == '' || mentee.expertise == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="tools emoji">🛠️</span> Skills I currently have
                        </h2>
                        <Modal {...AddExpertiseModalProps}>
                          <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise='' learning={mentee.learning ? mentee.learning : ''}/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise='' learning={mentee.learning ? mentee.learning : ''}/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {(mentee.expertise != '' && mentee.expertise != null) && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="tools emoji">🛠️</span> Skills I currently have
                        </h2>
                        <div>
                          {expertiseArr && expertiseArr.map((skill) => {
                            return <div key={skill}>{skill.trim()}</div>
                          })}
                        </div>
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionModalProps}>
                              <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise={mentee.expertise ? mentee.expertise : ''} learning={mentee.learning ? mentee.learning : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                    {isMe == "isMe" && (mentee.learning == '' || mentee.learning == null) && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="book emoji">📚</span> I&#39;m currently learning
                        </h2>
                        <Modal {...AddLearningModalProps}>
                          <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='learning' expertise={mentee.expertise ? mentee.expertise : ''} learning=''/>
                        </Modal>
                        <div className="editSectionBtn dispInlineBlock">
                          <Modal {...EditProfileSectionModalProps}>
                            <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='learning' expertise={mentee.expertise ? mentee.expertise : ''} learning=''/>
                          </Modal>
                        </div>
                      </div>
                    )}
                    {mentee.learning != '' && mentee.learning != null && (
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
                              <UpdateExpertiseContent modalTitle='Edit your Skills / Expertise' expOrLearning='learning' expertise={mentee.expertise ? mentee.expertise : ''} learning={mentee.learning ? mentee.learning : ''}/>
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                  <section className="scroll-anchor" id="work-experience" name="work-experience">
                    <h1 >
                      <br/>
                      <i className="emoji-icon suitcase-emoji"/> Work Experience
                    </h1>
                    <div>
                      {roleHistory.length == 0 && (
                        <div className="editSectionContainer">
                          <p><span role="img" aria-label="cross-emoji">❌</span> No work experience, currently</p>
                          {isMe == "isMe" && (
                            <React.Fragment>
                              <Modal {...AddRoleModalProps}>
                                <AddEditRoleContent addOrEdit='add' modalTitle='Add Role / Experience' roleTitle='' roleCo='' startDate='' endDate='' roleDesc='' isMain={false}/>
                              </Modal>
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionModalProps}>
                                  <AddEditRoleContent addOrEdit='add' modalTitle='Add Role / Experience' roleTitle='' roleCo='' startDate='' endDate='' roleDesc='' isMain={false} />
                                </Modal>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {roleHistory.length > 0 && (
                        <React.Fragment>
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
                        </React.Fragment>
                      )}
                    </div>
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
                        <React.Fragment>
                          {mentee.eetstatus != 'uni' && (
                            <div className="editSectionContainer">
                              {mentee.planninguni == 2 && (
                                  <p><span role="img" aria-label="thinking-emoji">🤔</span> I&#39;m undecided as to whether to go</p>
                              )}
                              {mentee.planninguni == 1 && (
                                  <p><span role="img" aria-label="cross-emoji">❌</span> I dont plan to go</p>
                              )}
                              {mentee.planninguni === 0 && (
                                  <p><span role="img" aria-label="cross-emoji">🙏</span> I&#39;m planning to go</p>
                              )}
                              {isMe == "isMe" && (
                                <React.Fragment>
                                  {mentee.planninguni === '' && (
                                    <Modal {...AddPlanningUniModalProps}>
                                      <EditPlanningUniContent modalTitle='Add your University Plans' planningUni=''/>
                                    </Modal>
                                  )}
                                  <div className="editSectionBtn dispInlineBlock">
                                    <Modal {...EditProfileSectionFPModalProps}>
                                      <EditPlanningUniContent modalTitle='Add your University Plans' planningUni={mentee.planninguni ? mentee.planninguni : ''}/>
                                    </Modal>
                                  </div>
                                </React.Fragment>
                              )}
                            </div>
                          )}
                          <div className="editSectionContainer">
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
                        </React.Fragment>
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
                                  <p className="marginBottom20">{uni.unidesc}</p>
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
                                <AddEditSchContent modalTitle={mentee.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStartYr='' schGraduYr='' schDesc=''/>
                              </Modal>
                              <div className="editSectionBtn dispInlineBlock">
                                <Modal {...EditProfileSectionFPModalProps}>
                                  <AddEditSchContent modalTitle={mentee.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStarYr='' schGraduYr='' schDesc=''/>
                                </Modal>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {schHistory.length > 0 && (
                        <React.Fragment>
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
                                        <AddEditSchContent modalTitle={mentee.country == 'GBR' ? 'Edit your School / College' : 'Edit your High School(s)'} addOrEdit='edit' schName={sch.schnamefreetext ? '' : userSchName} schNameFreeText={sch.schnamefreetext ? userSchName : ''} schStartYr={schStartYr} schGraduYr={sch.schgraduyr} schDesc={sch.schdesc}/>
                                      </Modal>
                                    </div>
                                  )}
                                </div>
                                {sch.schdesc != '' && (
                                  <p className="marginBottom20">{sch.schdesc}</p>
                                )}
                                {isMe == "isMe" && sch.schdesc == '' && (
                                  <Modal {...EditSchDescModalProps}>
                                    <AddEditSchContent roleIndex={index} addOrEdit='edit' modalTitle={mentee.country == 'GBR' ? 'Edit your School / College' : 'Edit your High School(s)'} schName={sch.schnamefreetext ? '' : userSchName} schNameFreeText={sch.schnamefreetext ? userSchName : ''} schStartYr={schStartYr} schGraduYr={sch.schgraduyr} schDesc={sch.schdesc} idToFocusOnOpen='schDescInput'/>
                                  </Modal>
                                )}
                              </div>
                            )
                          })}
                          {isMe == "isMe" && (
                            <Modal {...AddSchFPModalProps}>
                              <AddEditSchContent modalTitle={mentee.country == 'GBR' ? 'Add your School / College' : 'Add your High School(s)'} addOrEdit='add' schName='' schNameFreeText='' schStartYr='' schGraduYr='' schDesc='' />
                            </Modal>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                    {isMe == "isMe" && subjectsArr.length == 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="studybook emoji">📓</span> {eduSubjects(mentee.country)}
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
                          <span role="img" aria-label="studybook emoji">📓</span> {eduSubjects(mentee.country)}
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
                    {(mentee.currtraining == null || mentee.currtraining == '') && (
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
                    {(mentee.currtraining != null && mentee.currtraining != '') && (
                      <div className="editSectionContainer">
                        <h2>
                          Training:
                        </h2>
                        <div className="displayFlex marginBottom5">
                          <div className="msg-thumb-container">
                            <div className="msg-thumb img-square noPic isCompany">
                              <div className="userInitial msg-thumb noModal">
                                {mentee.currtrainingprovider.charAt(0).toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div><strong>{mentee.currtraining}</strong></div>
                            <div>{mentee.currtrainingprovider}</div>
                            <div className="marginBottom5 smallFont darkGreyText">
                              {mentee.trainingstartdate != '' && (
                                <span><DateCalc time={mentee.trainingstartdate} showPureDate dontShowDay /> - </span>
                              )}
                              {mentee.trainingenddate == '' ? 'Present' : <DateCalc time={mentee.trainingenddate} showPureDate dontShowDay />}
                              {mentee.trainingstartdate != '' && <span> &#8226; {trainLengthTxt}</span>}
                            </div>
                          </div>
                        </div>
                        {mentee.trainingdesc != '' && (
                          <p>{mentee.trainingdesc}</p>
                        )}
                        {isMe == "isMe" && mentee.trainingdesc == '' && (
                          <Modal {...EditRoleDescModalProps}>
                            <AddEditTrainingContent modalTitle='Edit Training Course' addOrEdit='edit' currTraining={mentee.currtraining} currTrainingProvider={mentee.currtrainingprovider} startDate={mentee.trainingstartdate} endDate={mentee.trainingenddate} trainingDesc={mentee.trainingdesc} idToFocusOnOpen='trainingDescInput'/>
                          </Modal>
                        )}
                        {isMe == "isMe" && (
                          <div className="editSectionBtn dispInlineBlock">
                            <Modal {...EditProfileSectionFPModalProps}>
                              <AddEditTrainingContent modalTitle='Edit Training Course' addOrEdit='edit' currTraining={mentee.currtraining} currTrainingProvider={mentee.currtrainingprovider} startDate={mentee.trainingstartdate} endDate={mentee.trainingenddate} trainingDesc={mentee.trainingdesc} />
                            </Modal>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                  <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                    <h1 >
                      <br/>
                      <i className="emoji-icon rockOn-emoji"/> Hobbies & Interests
                    </h1>
                    {isMe == "isMe" && hobbiesArr.length == 0 && (
                      <div className="editSectionContainer">
                        <h2>
                          <span role="img" aria-label="football emoji">⚽️</span> When I&#39;m not {(mentee.eetstatus == 'sch' || mentee.eetstatus == 'uni') ? 'studying' : 'working'}, you&#39;ll find me
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
                          <span role="img" aria-label="football emoji">⚽️</span> When I&#39;m not {(mentee.eetstatus == 'sch' || mentee.eetstatus == 'uni') ? 'studying' : 'working'}, you&#39;ll find me
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
                    {mentee.menteegroups.length > 0 && (
                      <React.Fragment>
                        <h2>
                          Groups I&#39;m a member of
                        </h2>
                        <div>
                          {mentee.menteegroups.map((group) => {
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
                  </section>
                </div>
              </div>
              <div className="col-3 col-s-12 category-list profile">
                <ul className="section-list left">
                  <li>
                    <a href="#career-aspirations" className="active">Career Aspirations</a>
                  </li>
                  <li>
                    <a href="#work-experience">Work Experience</a>
                  </li>
                  <li>
                    <a href="#education">Education</a>
                  </li>
                  <li>
                    <a href="#hobbies-interests">Hobbies & Interests</a>
                  </li>
                </ul>
                <div className="profileCTAContainer">
                  <div className="profileUserCTA">
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
                        <div className={"UserTimeZone " + isDayNight}>{mentee.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"mapImg " + mentee.country + ((profUserIsU18 != true && viewerIsU18 != true) ? "" : (" " + mentee.city))}>
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

export default MenteeProfileContent;
