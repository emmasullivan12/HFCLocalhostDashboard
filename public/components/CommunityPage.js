// Last merged this code on 25th jan 2024

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {checkMobile, metaAdder, DateCalc, TimeCalc, LoadingSpinner} from './GeneralFunctions.js';
import Avatar from './Avatar.js';
import AddHighlightModalContent from "./AddHighlightModalContent";
import {cdn} from './CDN.js';
import CommunityOverview from "./CommunityOverview.js";
import CommunityQuestions from "./CommunityQuestions.js";
import CommunityLeaderboard from "./CommunityLeaderboard.js";
import FullPageModal from './FullPageModal.js';
import MentorProfileContent from './MentorProfileContent.js';
import MenuNav from './MenuNav.js';
import Modal from './Modal.js';
import MyContent from "./MyContent.js";
import SelectBox from './Select.js';
import ShareOptionsBox from './ShareOptionsBox.js';
import {getIndustryDeets, getSkillDeets} from './UserDetail.js';

import '../css/CommunityPage.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";
const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addAnswerQApage',
  changeInitFocus: true,
  wider: true
}

const AskQModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}

const LeaveGroupProps = {
  ariaLabel: 'Leave group',
  triggerText: 'Leave Group',
  usedFor: 'leaveGroup',
  changeInitFocus: true,
  removeOverflowY: true
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  usedFor: 'mentor-profile-qaItem',
  backBtn: 'arrow'
}

class CommunityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.initialTabToView ? this.props.initialTabToView : 'overview',
      prevFeedScrollPos: this.props.prevFeedScrollPos ? this.props.prevFeedScrollPos : 0,
      isGroupMember: false,
      userWasLearningSkill: false,
      companiesOfTopMentors: [],
      mentorsSorted: [],
      isSubmittingLeaveGroup: false,
      updateLeaveGroupSuccess: false,
    }
  }

  componentDidMount() {
    const {updateDocumentTitle} = this.props
    const {prevFeedScrollPos} = this.state

    const community = {
      cmid: '1234',
      name: 'Houdini',
      type: 'skills',
      typeid: '425',
    /*  name: 'Film, TV & VFX',
      type: 'industry',
      typeid: '19',*/
      experts: [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}],
      members: [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}, {uid: '5'}, {uid: '6'}, {uid: '7'}, {uid: '8'}],
      numUnanswered: 24,
    }
    if(community != null){
      updateDocumentTitle(community.name + " community - Prospela.com")
    }
    const loggedInUID = '20'
    const userWasLearningSkill = !community.experts.find(user => user.uid == loggedInUID)
    const isGroupMember = community.members.some(e => e.uid == loggedInUID);
    this.setState({
      isGroupMember: isGroupMember,
      userWasLearningSkill: userWasLearningSkill
    })
    if (prevFeedScrollPos != 0) {
      const commContainer = document.getElementById("communityFeedContainer")
      commContainer.scrollTo({ top: prevFeedScrollPos, behavior: 'auto' });
    }

    const mentors = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 14, numGenerals: 0, numMentees: 7, isU18: false, eetstatus: 'job', currco: 'Framestore', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: 'Compositor', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 14, numGenerals: 0, numMentees: 6, isU18: false, eetstatus: 'job', currco: 'Framestore', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: 'Compositor', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false, eetstatus: 'train', currco: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false, eetstatus: 'uni', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '11', currrole: '', currtraining: '', degree: 'BSc Business', state: '', country: ''},
      {uid: 'uuid126', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 14, numGenerals: 3, numMentees: 2, isU18: false, eetstatus: 'sch', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid127', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 3, numMentees: 1, isU18: false, eetstatus: 'none', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'CA', country: 'USA'},
      {uid: 'uuid127', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 3, numMentees: 1, isU18: false, eetstatus: 'none', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'CA', country: 'USA'},
      {uid: 'uuid128', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 4, isU18: false, eetstatus: 'uni', currco: '', currtrainingprovider: '', uninamefreetext: 'FreeTextUniName', uniname: '', currrole: '', currtraining: '', degree: 'MA Animation & VFX', state: '', country: ''},
    ];

    let companiesOfTopMentors = []

    const mentorsSorted = mentors.sort((a,b)=> {
      if(b.numAnswers < a.numAnswers) { return -1; }
      if(b.numAnswers > a.numAnswers) { return 1; }
      if (b.numGenerals < a.numGenerals) return -1;
      if (b.numGenerals > a.numGenerals) return 1;
      if (b.numMentees < a.numMentees) return -1;
      if (b.numMentees > a.numMentees) return 1;
      return 0;
    })

    this.setState({
      mentorsSorted: mentorsSorted
    })

    mentorsSorted.map((user, index) => {
      let nameToShow, uniName

      if (companiesOfTopMentors.length < 5) {
        switch (user.eetstatus) {
          case 'job':
            // convert companyname here
            nameToShow = user.currco
            break
          case 'train':
            nameToShow = user.currtrainingprovider
            break
          case 'uni':
            // convert uniname here
            uniName = user.uniname ? user.uniname : user.uninamefreetext
            nameToShow = uniName
            break
          case 'none':
            nameToShow = 'Freelance'
            break
        }

        let alreadyExists = companiesOfTopMentors.some((e) => {
          return e.nameToShow == nameToShow && e.eetstatus == user.eetstatus;
        });

        if (user.eetstatus != 'sch' && !alreadyExists) {
          companiesOfTopMentors.push(
            {eetstatus: user.eetstatus, nameToShow: nameToShow}
          )
        }
        this.setState({
          companiesOfTopMentors: companiesOfTopMentors
        })
      }
    })
  }

  componentWillUnmount() {
    this.props.updateDocumentTitle("Prospela Dashboard")
  }

  updateTabToView = (e) => {
    let name
    e.persist()
    name = e.target.name ? e.target.name : e.currentTarget.name

    this.setState({
      tabToView: name
    })
  }

  scrollToView = (e) => {
    var el = e.target.name ? e.target : e.currentTarget

    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

/*goToUnansweredQs = () => {
    this.setState({
      tabToView: 'questions'
    })
  }*/

  handleCommunityFeedClick = (e) => {
    e.stopPropagation()

    const feedItems = document.getElementById('feedItems')

    // Only if item is on the feed, otherwise is probably in a modal
    if (feedItems.contains(e.target)){
      const {updateFeedScrollPos} = this.props
      const prevScrollPos = e.target.closest('#communityFeedContainer').scrollTop
      updateFeedScrollPos(prevScrollPos)

    // Is probably within a modal i.e. not directly clicking on feed
    } else {
      return
    }

  }

  renderCommunityActivity = (commURL, isMainBar) => {
    const community = {
      cmid: '1234',
      name: 'Houdini',
      type: 'skills',
      typeid: '425',
      /*  name: 'Film, TV & VFX',
        type: 'industry',
        typeid: '19',*/
      experts: ['1','2','3','4'],
      members: ['1','2','3','4','1','2','3','4','1','2','3','4'],
    /*  experts: ['1','2','3','4'],
      members: ['1','2','3','4','1','2','3','4','1','2','3','4'], */
      numUnanswered: 24
    }
    //const activityArr = []
    const activityArr = [
      {type: "newMatch", timestamp: '2020-09-04T13:30:50.667Z', qTitle: null, qid: null, relatedqid: null, qURL: null, mentorfname: 'John', mentorlname: 'Blue', mentorinsttype: 'job', mentorText: 'Pladis', menteefname: 'Bob', mentoruid: '123'},
      {type: "chatFeedbackRec", timestamp: '2020-02-04T13:30:50.667Z', qTitle: null, qid: null, relatedqid: null, qURL: null, mentorfname: 'Dexter', mentorlname: 'Boyce', mentorinsttype: 'train', mentorText: 'TrainingCo', menteefname: 'Barbara', mentoruid: '123'},
      {type: "newMatch", timestamp: '2020-09-04T13:30:50.667Z', qTitle: null, qid: null, relatedqid: null, qURL: null, mentorfname: 'Lily', mentorlname: 'Red', mentorinsttype: 'sch', mentorText: '11', menteefname: 'Bill', mentoruid: '123'},
      {type: "question", timestamp: '2020-01-04T13:30:50.667Z', qTitle: "What to wear to an interview for the first time if you are nervous", qid: '123', relatedqid: null, qURL: "/what-wear-to-interview", mentorfname: null, mentorlname: null, mentorinsttype: null, mentorText: null, menteefname:'David', mentoruid: null},
      {type: "answer", timestamp: '2020-10-04T13:30:50.667Z', qTitle: "Where is the best part of London to work?", qid: null, relatedqid: '123', qURL: "/what-wear-to-interview/#firstanswer", mentorfname: 'Samantha', mentorlname: 'Jones', mentorinsttype: 'sch', mentorText: 'SATC', menteefname: null, mentoruid: '123'}
    ]
    const activityArrToShow = activityArr.length > 0 && activityArr.sort((a,b)=> {
      if(b.timestamp < a.timestamp) { return -1; }
      if(b.timestamp > a.timestamp) { return 1; }
      return 0;
    })

    return (
      <div className={isMainBar ? ("isSideDivOnMain marginBottom40 paddingL maxWidth450px" + (activityArr.length == 0 ? " displayNone" : "")) : "paddingL20 paddingR20"}>
        <div className="bold darkGreyText marginBottom10">
          {!isMainBar ? (
            <span><i className="fontSize14 fas fa-coffee" /> Community Activity</span>
          ) : (
            <span>Community Activity</span>
          )}
        </div>
        {activityArr.length > 0 && activityArrToShow.map((activity, index) => {
          var isLast = (activityArrToShow.length - 1) == index
          return (
          <div className="paddingTop5" key={index}>
            {this.renderActivityType(activity, isLast)}
          </div>
          )
        })}
        {activityArr.length == 0 && (
          <div className="darkGreyText fontSize14">
            <div>...nothing here yet!</div>
            <div className="marginTop20">
              <ShareOptionsBox
                id={community.cmid}
                qURL={commURL}
                contentType={community.type}
                authorinsttype={null}
                authorinstfreetext={null}
                authorinst={null}
                buttonToShow="linkEmojiInviteText"
                fromCommunityPage
                commName={community.name}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  joinGroup = () => {
    this.setState({
      isGroupMember: true
    })
  }

  handleStatusChange = (userInput) => {
    this.setState({
      wantsToLeave: userInput,
    })
  }

  handleSubmitLeaveGroup = () => {
    const {userRole} = this.props
    const {userWasLearningSkill, wantsToLeave} = this.state
    const community = {
      cmid: '1234',
      name: 'Houdini',
      type: 'skills',
    }
    this.setState({
      isSubmittingLeaveGroup: true,
    })
    if (wantsToLeave == 1) {
      // Leave group without tweaking user profile
      this.setState({
        isSubmittingLeaveGroup: false,
        updateLeaveGroupSuccess: true,
      })
    } else if (wantsToLeave == 2) {
      if (community.type == 'industry' && userRole == 'mentee') {
        console.log("remove industry from industries of interest in users profile")
        // Dex needs to remove industry from industrys of interest in users profile
      } else if (community.type == 'skills' && userWasLearningSkill == true) {
        console.log("remove skill from learningArr in users profile")
        // Dex needs to remove skill from learningArr in users profile
      }
      this.setState({
        isSubmittingLeaveGroup: false,
        updateLeaveGroupSuccess: true,
      })
    } else { // user wanted to stay
      this.setState({
        isSubmittingLeaveGroup: false,
        updateLeaveGroupSuccess: true,
      })
    }
  }

  resetLeaveGroup = () => {
    const {wantsToLeave} = this.state
    this.setState({
      isGroupMember: wantsToLeave != 1 && wantsToLeave != 2,
      isSubmittingLeaveGroup: false,
      updateLeaveGroupSuccess: false,
      wantsToLeave: null,
    })
  }

  renderTab = (community, commURL) => {
    const {userRole, isLoggedIn, updatePathName, checkHasAccess, noAccessHandler, maxViewsReached, handleUnlockBtnClick, updateFeedScrollPos} = this.props;
    const {tabToView, isGroupMember, mentorsSorted, companiesOfTopMentors} = this.state;

    const contentArr = [ // Answers
    /*  {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1'], // no answers yet
        industriestopostto: ['99999','19','11','3','2'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: false,
        votes: ['123','234','345','456'],
        mentorseen: ['123','234','345','456'],
        menteeseen: ['123'],
        prseen: [],
        uid: '123',
        isanon: 0,
        isPr: 0,
        authorinsttype: 'sch',
        fname: 'Emma',
        lname: 'Sullivan',
        hidden: 1,
        profilepic: '',
        url: "/what-wear-to-interview"
      },
      {
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19','10','99999'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: true,
        votes: [],
        mentorseen: ['123','234'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 0,
        isPr: 0,
        authorinsttype: 'uni',
        fname: 'Dexter',
        lname: 'Boyce',
        profilepic: '',
        url: "/what-wear-to-interview-2"
      },
      {
        qid: '123458',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: false,
        votes: [],
        mentorseen: ['123','234','345','456'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 1,
        isPr: 0,
        authorinsttype: 'job',
        fname: 'John',
        lname: 'Smith',
        profilepic: '',
        url: "/what-wear-to-interview-3"
      },*/
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        isPr: 0,
        title: 'What is the best thing to wear to an interview?',
        industriestopostto: ['99999','19'],
        authorinst: '',
        authorinstfreetext: 'Really Long Institution Name',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: 'BSc (Hons) Business Administration',
        authortraining: '',
        authorinsttype: 'uni',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: '~This <b>is</b>~ ~This <b>is</b>~ _This <b>is</b>_ ** *bold* **bold* ***bold* ****bold* ~~ ~~~ ~~~~ ~yo~ ~~yo~ ~~~yo~ ~~~~yo~ my_profile my__profile my___profile my____profile _italics_ and ~*script* _emmas_ *message*~ \n- \n-></script> \n \nhttps://www.pr~ospel~a.com/myprofil_enumbe_r89__linesarebeforethis or https://www.prospela.com/myprofil_enumbe_r89__linsebefore https://prospela.com/my*profile* https://prospela.com/my~profile~yeah https://prospela.com/my~~profile~yeah',
        isanon: 0,
        votes: [],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: '/what-wear-to-interview/#firstanswer',
        type: 'answer',
        relatedqid: '123',
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '124', name: 'My PDF', type: 'application/pdf'},
          {fileid: '125', name: 'MyExcelspreadsheet.xls', type: 'application/vnd.ms-excel'},
          {fileid: '126', name: 'MyWorddocfilename.word', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
          {fileid: '127', name: 'MyPOWERPOINTBABY!', type: 'application/vnd-mspowerpoint'},
          {fileid: '128', name: 'My other doc format', type: 'other'}
        ],
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        isPr: 0,
        title: 'What is it like working at Pladis?',
        industriestopostto: ['99999','19'],
        authorinst: '',
        authorinstfreetext: '',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: '',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: '/what-wear-to-interview/#secondanswer',
        type: 'answer',
        relatedqid: '124'
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        title: 'When should I apply to grad schemes (what time of year)?',
        industriestopostto: ['99999','19'],
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        isanon: 0,
        votes: ['123','20'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: '/what-wear-to-interview/#thirdanswer',
        type: 'answer',
        relatedqid: '125',
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 1', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 2', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        ],
      },
      {
        hid: '1237',
        uid: '126',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        industriestopostto: ['99999','19'],
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'This is a general post about the news today. Wanted to talk about how the war in Ukraine is affecting VFX industry - there is so much inspiration for future content! SDFGKLJH SDLFJKH GSLKJDF GJK Hlkjh xdljfh gslkjdh fgkjls hdfglkj hsdfkljh gslkdfjglksjdh gjh skgsh kdhgksdfkldlfjhskfhgljdfhg jdfh gsjdhfkjshdgjhdfgkjshfglhsdflkghdfjh dkfjh g',
        isanon: 0,
        votes: ['123','20'],
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        type: 'general',
        wasDefaultRole: true,
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 1', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 2', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        ],
        postComments: [
          {cid: '1', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '234', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '2', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '3', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '4', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '5', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: [], relatedqid: '', relatedhid: ''},
          {cid: '6', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '7', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '8', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        ],
      },
      {
        hid: '1238',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        industriestopostto: ['99999','19'],
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'This is a general post about the news today. Wanted to talk about how the war in Ukraine is affecting VFX industry - there is so much inspiration for future content!',
        isanon: 0,
        votes: ['123','20'],
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        type: 'general',
        selectedFiles: [],
        postComments: [
          {cid: '1', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '125', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '2', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '234', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        ],
      }
    ]

  //  const contentArr = []
    switch (tabToView) {
      case 'overview':
        return <CommunityOverview isGroupMember={isGroupMember} joinGroup={this.joinGroup} companiesOfTopMentors={companiesOfTopMentors} renderCommunityActivity={this.renderCommunityActivity} updatePathName={updatePathName} isLoggedIn={isLoggedIn} userRole={userRole} community={community} commURL={commURL} contentArr={contentArr} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} handleCommunityFeedClick={this.handleCommunityFeedClick} updateTabToView={this.updateTabToView}/>
      case 'questions':
        return <CommunityQuestions isLoggedIn={isLoggedIn} userRole={userRole} community={community} commURL={commURL} contentArr={contentArr} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} handleCommunityFeedClick={this.handleCommunityFeedClick} updateTabToView={this.updateTabToView}/>
      case 'leaderboard':
        return <CommunityLeaderboard mentorsSorted={mentorsSorted} isGroupMember={isGroupMember} isCommPage updatePathName={updatePathName} isLoggedIn={isLoggedIn} userRole={userRole} community={community} commURL={commURL} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} updateTabToView={this.updateTabToView}/>
    }
  }

/*  {type: "chatFeedbackRec", timestamp: '2020-09-04T13:30:50.667Z', qTitle: null, qURL: null, mentorfname: 'Dexter', mentorlname: 'Boyce', mentorinsttype: 'job', mentorText: '11', menteefname: 'Barbara', mentoruid: '123'},
  {type: "question", timestamp: '2020-09-04T13:30:50.667Z', qTitle: "What to wear to an interview for the first time if you are nervous", qURL: "https://app.prospela.com/questions/1234/what-to-wear", mentorfname: null, mentorlname: null, mentorText: null, menteefname:'David', mentoruid: null},
  {type: "answer", timestamp: '2020-09-04T13:30:50.667Z', qTitle: "Where is the best part of London to work?", qURL: "https://app.prospela.com/questions/1234/what-to-wear", mentorfname: 'Samantha', mentorlname: 'Jones', mentorText: 'SATC', menteefname: null, mentoruid: '123'} */
  renderActivityType = (activity, isLast) => {
    const {checkHasAccess, noAccessHandler, updatePathName} = this.props
    switch(activity.type) {
      case 'newMatch':
        return (
          <div className="displayFlex marginBottom20" >
            <div className="activityIcon">
              <img
                className="groupDashImg"
                alt="Ask a question icon"
                src={cdn+"/images/NewMatch_SmlIcon_40.png"}
              />
            </div>
            <div className={"dashedTimeline" + (isLast ? " isLast" : "")} />
            <div className="marginLeft20 gridLeftColumn dispInlineBlock verticalAlignMiddle">
              <Avatar userID={activity.mentoruid} isAnon={false} userName={activity.mentorfname} showAsCircle picSize={360}/>
            </div>
            <div>
              <span className="darkGreyText fontSize14">
                {activity.mentorinsttype != 'sch' ? (
                  <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={activity.mentorfname + " " + activity.mentorlname}>
                    <MentorProfileContent />
                  </FullPageModal>
                ) : (
                  <span className="bold">{activity.mentorfname} {activity.mentorlname}</span>
                )}
              </span>
              <span className="fontSize14"> from {activity.mentorText} is matched with a new mentee</span>
              <span className="mediumGreyText textLeft fontSize12"> <DateCalc time={activity.timestamp} showPureDate /> at <TimeCalc time={activity.timestamp} /></span>
            </div>
          </div>
        )
      case 'chatFeedbackRec':
        return (
          <div className="displayFlex marginBottom20" >
            <div className="activityIcon">
              <img
                className="groupDashImg"
                alt="Completed feedback icon"
                src={cdn+"/images/CompleteFeedback_SmlIcon_40.png"}
              />
            </div>
            <div className={"dashedTimeline" + (isLast ? " isLast" : "")} />
            <div className="marginLeft20 gridLeftColumn dispInlineBlock verticalAlignMiddle">
              <Avatar userID={activity.mentoruid} isAnon={false} userName={activity.mentorfname} showAsCircle picSize={360}/>
            </div>
            <div>
              <span className="darkGreyText fontSize14">
                {activity.mentorinsttype != 'sch' ? (
                  <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={activity.mentorfname + " " + activity.mentorlname}>
                    <MentorProfileContent />
                  </FullPageModal>
                ) : (
                  <span className="bold">{activity.mentorfname} {activity.mentorlname}</span>
                )}
              </span>
              <span className="fontSize14"> from {activity.mentorText} just gave their mentee a reference</span>
              <span className="mediumGreyText textLeft fontSize12"> <DateCalc time={activity.timestamp} showPureDate /> at <TimeCalc time={activity.timestamp} /></span>
            </div>
          </div>
        )
      case 'question':
        return (
          // <Link to={{pathname: "/questions/" + post.qid + post.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}>
          <div className="displayFlex marginBottom20" >
            <div className="activityIcon">
              <img
                className="groupDashImg"
                alt="Answered a question icon"
                src={cdn+"/images/AskAQ_NoWhiteBackgroundIcon_60.png"}
              />
            </div>
            <div className={"dashedTimeline" + (isLast ? " isLast" : "")} />
            <div className="marginLeft20 gridLeftColumn dispInlineBlock verticalAlignMiddle">
              <Avatar userID={null} isAnon userName={activity.menteefname} showAsCircle picSize={360}/>
            </div>
            <div>
              <span className="darkGreyText fontSize14">
                <span className="bold">{activity.menteefname} </span>
              </span>
              <span className="fontSize14"> asked a question
                <span>
                  <Link to={{pathname: "/questions/" + activity.qid + activity.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}> {activity.qTitle}</Link>
                  <div className="mediumGreyText textLeft fontSize12"> <DateCalc time={activity.timestamp} showPureDate /> at <TimeCalc time={activity.timestamp} /></div>
                </span>
              </span>
            </div>
          </div>
        )
      case 'answer':
        return (
          <div className="displayFlex marginBottom20" >
            <div className="activityIcon">
              <img
                className="groupDashImg"
                alt="Answered a question icon"
                src={cdn+"/images/AskAQ_NoWhiteBackgroundIcon_60.png"}
              />
            </div>
            <div className={"dashedTimeline" + (isLast ? " isLast" : "")} />
            <div className="marginLeft20 gridLeftColumn dispInlineBlock verticalAlignMiddle">
              <Avatar userID={activity.mentoruid} isAnon={false} userName={activity.mentorfname} showAsCircle picSize={360}/>
            </div>
            <div>
              <span className="darkGreyText fontSize14">
                {activity.mentorinsttype != 'sch' ? (
                  <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={activity.mentorfname + " " + activity.mentorlname}>
                    <MentorProfileContent />
                  </FullPageModal>
                ) : (
                  <span className="bold">{activity.mentorfname} {activity.mentorlname}</span>
                )}
              </span>
              <span className="fontSize14"> from {activity.mentorText} answered a question
                <span>
                  <Link to={{pathname: "/questions/" + activity.relatedqid + activity.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}> {activity.qTitle}</Link>
                  <div className="mediumGreyText textLeft fontSize12"> <DateCalc time={activity.timestamp} showPureDate /> at <TimeCalc time={activity.timestamp} /></div>
                </span>
              </span>
            </div>
          </div>
        )
      default:
        return ''
    }
  }

/*  renderSteps = () => {
    const {isLoggedIn} = this.props
    const {userstep, userRole, showSuccessModal, showMentorFullAppModal, showMenteeFullAppModal, showMentorIDModal, showMentorCVModal, showMentorTrainingModal, showMenteeTrainingModal} = this.state;
    let wantsU18, mentorSteps, menteeSteps, isNonCoreCountry, isFromO18OnlyCountry, isU18
    let country = 'GBR'
    isNonCoreCountry = isLoggedIn && country != '' && (country != 'GBR' && country != 'USA' && country != 'CAN' && country != 'NZL' && country != 'AUS' && country != 'NLD' && country != 'DEU' && country != 'ESP' && country != 'FRA' && country != 'ITA' && country != 'BEL' && country != 'DNK' && country != 'SWE' && country != 'AUT' && country != 'BGR' && country != 'CZE')
    isFromO18OnlyCountry = isLoggedIn && country != '' && (country == 'NZL' || country == 'AUS' || country == 'NLD' || country == 'DEU' || country == 'ESP' || country == 'FRA' || country == 'ITA' || country == 'BEL' || country == 'DNK' || country == 'SWE' || country == 'AUT' || country == 'BGR' || country == 'CZE')

    if (userRole == 'mentor') {
      wantsU18 = false // Mentor wants to support U18s
      mentorSteps = [
        {stepText: 'Complete your full mentor application', modalToShow: 'MentorFullApp', isComplete: (userstep == 'didU18tf' || userstep == 'didIDUpload' || userstep == 'didFullSUtf' || userstep == 'didFullSUIDtf' || userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), reqStep: 'JoinAGroup', limitForNonCoreCountries: true, tooltiptextWhenLocked: (isNonCoreCountry == true ? 'Mentoring is not available in your country yet' : 'Join a mentoring programme to unlock this step'), validSteps: ['didShortSUtf']},
        ...(wantsU18 == true) ? [
          {stepText: 'Upload a selfie with your Photo ID', modalToShow: 'MentorID', isComplete: (userstep == 'didIDUpload' || (userstep == 'didFullSUIDtf') || userstep == 'fullSUidTrain'), reqStep: 'MentorFullApp', tooltiptextWhenLocked: 'Complete your full mentor application to unlock this step', validSteps: ['didU18tf']},
          {stepText: 'Upload your CV/Resume or LinkedIn URL', modalToShow: 'MentorCV', isComplete: ((userstep == 'didFullSUIDtf') || userstep == 'fullSUidTrain'), reqStep: 'MentorID', tooltiptextWhenLocked: 'Upload your selfie with Photo ID to unlock this step', validSteps: ['didIDUpload']},
        ] : [],
        {stepText: 'Complete your 5-min mentor training', modalToShow: 'MentorTraining', isComplete: (userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), reqStep: (wantsU18 == true ? 'MentorCV' : 'MentorFullApp'), tooltiptextWhenLocked: (wantsU18 == true ? 'Upload your CV/Resume or LinkedIn URL to uplock this step' : 'Complete your full mentor application to unlock this step'), validSteps: ['didFullSUtf', 'didFullSUIDtf']},
      ]
    }

    if (userRole == 'mentee' || isLoggedIn == false) {
      isU18 = false
      menteeSteps = [
        {stepText: 'Complete your full mentee application', modalToShow: 'MenteeFullApp', isComplete: (userstep == 'didFullSUtf' || userstep == 'didSafeG'), reqStep: 'JoinAGroup', O18CountriesOnly: true, limitForNonCoreCountries: true, tooltiptextWhenLocked: (isNonCoreCountry == true ? 'Mentoring is not available in your country yet' : ((isFromO18OnlyCountry == true && isU18 == true) ? 'Mentoring for under 18s is not available in your country yet' : 'Join a mentoring programme to unlock this step')), validSteps: ['didShortSUtf']},
        {stepText: 'Complete your 5-min mentee training', modalToShow: 'MenteeTraining', isComplete: userstep == 'didSafeG', reqStep: 'MenteeFullApp', tooltiptextWhenLocked: 'Complete your full mentee application to unlock this step', validSteps: ['didFullSUtf']},
      ]
    }

    const steps = (userRole && userRole == 'mentor') ? mentorSteps : menteeSteps
    const stepsLeftToDo = steps.filter(step => step.isComplete == 0).length
    const allStepsCompleted = stepsLeftToDo == 0

    if (allStepsCompleted) {
      return
    } else {
      return (
        <div className="marginTop10">
          {steps.map((step, index) => {
            const reqStepsComplete = ((step.limitForNonCoreCountries != null && step.limitForNonCoreCountries == true && isNonCoreCountry == true) || (step.O18CountriesOnly != null && step.O18CountriesOnly == true && isFromO18OnlyCountry == true && isU18 == true)) ? false : (step.reqStep != null ? steps.filter(x => x.modalToShow == step.reqStep)[0].isComplete : true)
            return (
              <div key={index} onClick={() => this.showModal(step.isComplete, reqStepsComplete, step.modalToShow, step.requireLogin)} className={reqStepsComplete != true ? "tooltip" : ""}>
                <Checkbox
                  label={step.stepText}
                  labelClassName={"checkbox-container homePage" + (step.isComplete == true ? " strikethrough greyText" : "") + (reqStepsComplete != true ? " greyText cursorText backgroundNone" : "")}
                  name="stepStatus"
                  className="SubmitMatch-input"
                  spanClassName={"checkmark" + (reqStepsComplete != true ? " disabled" : "")}
                  defaultChecked={step.isComplete == true}
                  disabled
                />
                {reqStepsComplete != true && (
                  <div className="tooltiptext checkboxTooltip">{step.tooltiptextWhenLocked}</div>
                )}
              </div>
            )
          })}
        </div>
      )
    }
  }
*/
  render() {
    const {tabToView, isGroupMember, userWasLearningSkill, wantsToLeave, isSubmittingLeaveGroup, updateLeaveGroupSuccess} = this.state
    const {userRole, isLoggedIn, updatePathName, highlightStepsBox} = this.props;
    const community = {
      cmid: '1234',
      /*  name: 'Houdini',
        type: 'skills',
        typeid: '425',*/
        name: 'Film, TV & VFX',
        type: 'skills',
        typeid: '19',
      experts: [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}],
      members: [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}, {uid: '5'}, {uid: '6'}, {uid: '7'}, {uid: '8'}],
    //  experts: [],
    ///  members: [],
      numUnanswered: 24
    }
    var loggedInUID = '1'

    let urlText, commItem, isNonCoreCountry, isFromO18OnlyCountry, isU18
    var country = 'GBR'

    isNonCoreCountry = isLoggedIn && country != '' && (country != 'GBR' && country != 'USA' && country != 'CAN' && country != 'NZL' && country != 'AUS' && country != 'NLD' && country != 'DEU' && country != 'ESP' && country != 'FRA' && country != 'ITA' && country != 'BEL' && country != 'DNK' && country != 'SWE' && country != 'AUT' && country != 'BGR' && country != 'CZE')
    isFromO18OnlyCountry = isLoggedIn && country != '' && (country == 'NZL' || country == 'AUS' || country == 'NLD' || country == 'DEU' || country == 'ESP' || country == 'FRA' || country == 'ITA' || country == 'BEL' || country == 'DNK' || country == 'SWE' || country == 'AUT' || country == 'BGR' || country == 'CZE')

    if (userRole == 'mentee') {
      isU18 = false
    }

    if (community.type == 'industry') {
      commItem = getIndustryDeets(community.typeid)
      urlText = commItem.urlText
    } else if (community.type == 'skills') {
      commItem = getSkillDeets(community.typeid)
      urlText = commItem.urlText
    } else {
      //get role details here
      //commItem = getRoleDeets(community.typeid)
      //urlText = commItem.urlText
    }
    const commURLending = "/community/" + community.type + '/' + urlText
    const commURL = "https://app.prospela.com" + commURLending
    const isMobile = checkMobile()

    // Add meta tags
    metaAdder('property="og:type"', "website")
    metaAdder('property="og:title"', community.name + " community - Prospela.com")
    metaAdder('name="title"', community.name + " community - Prospela.com")
    metaAdder('property="og:url"', commURL)
    metaAdder('property="og:image"', "https://files.prospela.com/images/AskAQ_Icon.png") // this meta tag required for LinkedIn sharing
    metaAdder('property="og:site_name"', "Prospela.com")

    //Add link tags to head
    var linkTag = document.getElementById('canonicalLink')
    if(!linkTag && commURL != "https://app.prospela.com/community/falsefalse") {
      var link = document.createElement('link');
      link.id = 'canonicalLink'
      link.rel = 'canonical';
      link.href = commURL
      document.head.appendChild(link);
    }

    let leaveGroupOptions

    if (community.type == 'industry' && userRole == 'mentee') {
      leaveGroupOptions = [
        {value: '0', label: 'No', detail: 'Let me stay', checkbox: true, isTitle: false},
        {value: '1', label: 'Yes', detail: 'Leave, but keep this industry as an interest on my profile', checkbox: true, isTitle: false},
        {value: '2', label: 'Yes', detail: 'Leave, and remove this industry as an interest on my profile', checkbox: true, isTitle: false},
      ]
    } else if (community.type == 'industry') {
      leaveGroupOptions = [
        {value: '0', label: 'No', detail: 'Let me stay', checkbox: true, isTitle: false},
        {value: '1', label: 'Yes', detail: 'Leave the group', checkbox: true, isTitle: false},
      ]
    } else if (community.type == 'skills' && userWasLearningSkill == true) {
      leaveGroupOptions = [
        {value: '0', label: 'No', detail: 'Let me stay', checkbox: true, isTitle: false},
        {value: '1', label: 'Yes', detail: 'Leave, but keep this skill on my profile', checkbox: true, isTitle: false},
        {value: '2', label: 'Yes', detail: 'Leave, and remove this skill from my profile', checkbox: true, isTitle: false},
      ]
    } else {
      leaveGroupOptions = [
        {value: '0', label: 'No', detail: 'Let me stay', checkbox: true, isTitle: false},
        {value: '1', label: 'Yes', detail: 'Leave the group', checkbox: true, isTitle: false},
      ]
    }

    return (
      <React.Fragment>
        <div className="tabWindow" id="communityFeedContainer">
          <div className="mainAndSideContainer">
            <div className="title-blankPage marginBottom20">
              <MenuNav />
              <div className="greyText fontSize12 marginBottom20 noBold">
                <i className="fas fa-home" /> &gt; Communities &gt; {community.type == 'skills' ? 'Skills' : (community.type == 'industry' ? 'Industries' : 'Roles')} &gt; {community.name}
              </div>
              <div className="paddingBtm marginBottom20">
                <div className="chatItemFlexContainer qTitle qaPage">
                  <div>
                    <span className="marginBottom20 breakWord"><strong>{community.name} <span className="mediumGreyText">community</span></strong></span>
                    <div className="qDetail normalLineheight fontSize13 noBold marginBottom20 breakWord">
                      {userRole == 'mentor' ? ('Support aspiring ' + community.name + ' learners from all walks of life, alongside other compassionate experts') : ('Discover ' + community.name + ': learn directly from real employees, alongside like-minded peers')}
                    </div>
                    <button type="button" className="button-unstyled qDetail fontSize14 marginBottom20 breakWord noBold" name="leaderboard" onClick={(e) => this.updateTabToView(e)} >
                      <i className="fas fa-user-friends" /> {community.members.length} members
                      {community.experts.length > 0 && (
                        <React.Fragment>
                          <svg viewBox="0 0 24 24" className="prCertifiedBadge marginRight0 marginLeft20">
                            <g>
                              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                            </g>
                          </svg>
                          <span> {community.experts.length} employee experts</span>
                        </React.Fragment>
                      )}
                    </button>
                  </div>
                  <span className="qCTA qaPage commPage">
                    {isLoggedIn && (
                      <React.Fragment>
                        <span className="marginRight8">
                          <ShareOptionsBox
                            id={community.cmid}
                            qURL={commURL}
                            contentType={community.type}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={community.name}
                            customClassName="topBtn"
                          />
                        </span>
                        {!isGroupMember && (
                          <button tabIndex="0" type="button" aria-label="Join group" className="ModalOpenBtn ModalOpenBtn-addHighlightQApage backgroundBlack" onClick={this.joinGroup}>
                            Join
                          </button>
                        )}
                        {isGroupMember && userRole == 'mentee' && (
                          <Modal {...AskQModalProps}>
                            <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee' fromCommunityPage commType={community.type} commName={community.name}/>
                          </Modal>
                        )}
                        {isGroupMember && userRole == 'mentor' && (
                          <Modal {...AddHighlightModalProps}>
                            <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole='mentor' fromCommunityPage commType={community.type} commName={community.name} updatePathName={updatePathName} updateTabToView={this.updateTabToView} commURLending={commURLending}/>
                          </Modal>
                        )}
                      </React.Fragment>
                    )}
                    {!isLoggedIn && (
                      <React.Fragment>
                        <div className="signUpPrompt-header isOnQAPage fontdarkGreyText marginBottom10 fontSize16">
                          <ShareOptionsBox
                            id={community.cmid}
                            qURL={commURL}
                            contentType={community.type}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={community.name}
                            customClassName="topBtn"
                          />
                          <a className="button link Submit-btn signUpPrompt" href={"https://app.prospela.com/signup?origin=" + community.type + "&communityid=" + community.typeid}>
                            Sign up
                          </a>
                        </div>
                      </React.Fragment>
                    )}

                  </span>
                </div>
              </div>
            </div>
            <div className="groupdash-menuBar borderBtm borderGrey commPage">
              <Link to={{pathname: commURLending, state: {prevPath: window.location.pathname}}}>
                <button type="button" name="overview" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
              </Link>
              <Link to={{pathname: commURLending + "/questions", state: {prevPath: window.location.pathname}}}>
                <button type="button" name="questions" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
              </Link>
              <Link to={{pathname: commURLending + "/leaderboard", state: {prevPath: window.location.pathname}}}>
                <button type="button" name="leaderboard" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'leaderboard' ? ' tabActive' : '')}><i className="fas fa-crown" /> Leaderboard</button>
              </Link>
            </div>
            <div className="marginTop20">
              <div className="sideBar sideBarContentHiddenOnShrink" role="complementary" aria-label="sidebar">
                { this.renderCommunityActivity(commURL, false) }
                {(userRole == 'mentor' && isNonCoreCountry != true) || !isLoggedIn || (userRole == 'mentee' && isNonCoreCountry != true && (isFromO18OnlyCountry != true || (isFromO18OnlyCountry == true && isU18 != true))) && (
                  <div className="thinGreyContentBox sideBarContentHiddenOnShrink">
                    <div className="title">My Next Steps</div>
                    <div className="padding20">
                       <Link to={{pathname: "/home", state: {prevPath: window.location.pathname}}} className="dispBlock" onClick={() => {updatePathName(), highlightStepsBox()}}>
                         <div>Apply to {(userRole == 'mentee' || !isLoggedIn) ? 'get a mentor' : 'to become a mentor'}</div>
                      </Link>
                    </div>
                  </div>
                )}
                {isLoggedIn && isGroupMember && !isMobile && (
                  <Modal {...LeaveGroupProps} handleLocalStateOnClose={() => this.resetLeaveGroup()}>
                    <div className="showSmallModalSize">
                      {updateLeaveGroupSuccess == false && (
                        <React.Fragment>
                          <div className="modal-title">
                            <div className="emoji-icon cross-emoji successBox" />
                            Are you sure you want to leave the group?
                          </div>
                          <div className="ideas-Title marginBottom20">
                            You&#39;re about to lose access to Community Insights and your place on the leaderboard
                          </div>
                          <div className="autocompleter">
                            <SelectBox
                              options={leaveGroupOptions}
                              name='selectLeaveGroup'
                              placeholder='Select yes or no:'
                              placeholderOnClick='Select yes or no:'
                              handleChange={this.handleStatusChange}
                              focusOnLoad
                              valueToShow='label' // This is the attribute of the array/object to be displayed to user
                              //showIcon
                              //iconToShow='iconFA'
                              showDetail
                              detailToShow='detail'
                            //  showCheckbox
                            //  defaultChecked={defaultInds}
                            />
                          </div>
                          <div className="pass-btn-container">
                            <button type="button" disabled={isSubmittingLeaveGroup == true ? true : false} onClick={this.handleSubmitLeaveGroup} className="Submit-btn">
                              {isSubmittingLeaveGroup === true && (
                                <LoadingSpinner />
                              )}
                              {isSubmittingLeaveGroup != true && (
                                <span>{wantsToLeave == 0 ? 'Stay in group' : 'Leave group'}</span>
                              )}
                            </button>
                          </div>
                        </React.Fragment>
                      )}
                      {updateLeaveGroupSuccess == true && (
                        <div className="modal-title">
                          <div className={"emoji-icon successBox" + (wantsToLeave == 0 ? ' heart-emoji' : ' sad-emoji')} />
                          {wantsToLeave == 0 ? 'Glad you\'re still here' : 'You left the group'}
                        </div>
                      )}
                    </div>
                  </Modal>
                )}
                {!isLoggedIn && (
                  <div className="thinPurpleContentBox sideBarContentHiddenOnShrink signUpPromptBanner onFeedSideBar">
                    <div className="bannerTextContainer">
                      <div className="prBannerSmallLogoContainer marginBottom20">
                        <img
                          className="prLogoImg"
                          alt="Prospela Logo"
                          srcSet={cdn+"/images/Prospela%20Logo_Dark.png 213w, "+cdn+"/images/Prospela%20Logo_Dark.png 314w, "+cdn+"/images/Prospela%20Logo_Dark.png 640w"}
                          sizes="(max-width: 1440px) 69px, 69px"
                          src={cdn+"/images/Prospela%20Logo_Dark.png"}
                        />
                      </div>
                      <div className="fontSize14">Career Q&A with industry experts, 1:1 mentoring & a lasting professional network at your fingertips</div>
                      <div className="marginBottom20 marginTop70 dispInlineBlock">
                        <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href={"https://app.prospela.com/signup?origin=" + community.type + "FeedSideBar"}>
                          Sign up (free)
                        </a>
                        <a className="dispBlock alignCenter fontSize13 electricPurpleText" href={"https://app.prospela.com/login?origin=" + community.type + "FeedSideBar"}>or Login</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mainBar" role="main" aria-label="rendered tab">
                { this.renderTab(community, commURL) }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CommunityPage;
