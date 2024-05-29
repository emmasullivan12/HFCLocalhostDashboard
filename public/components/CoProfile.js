// Last merged this code on 29th may 2024 

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {cdn, groupImgFolder} from './CDN.js';

import {checkMobile, metaAdder, LoadingSpinner} from './GeneralFunctions.js';
import AddHighlightModalContent from "./AddHighlightModalContent";
import CoProfileOverview from './CoProfileOverview.js'
import BuyCoProfileModalContent from './BuyCoProfileModalContent.js';
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import industryOptions from './Industries.js';
import JobsContainer from "./JobsContainer.js";
import MenuNav from './MenuNav.js';
import Modal from './Modal.js';
import roleOptions from './Roles.js';
import SelectBox from './Select.js';
import ShareOptionsBox from './ShareOptionsBox.js';
import skillsOptions from './Skills.js';
import TextParser from './TextParser.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import {getIndustryDeets, getCompanyDeets, userFlagEmoji} from './UserDetail.js';

import "../css/CoProfile.css";
import '../css/CommunityPage.css';

const EditLifeAtCompanyDescFPModalProps = {
  ariaLabel: 'Add / Edit Life at Company section',
  triggerText: '+ Add / Edit description',
  backBtn: 'arrow'
}

const EditLifeAtCompanyDescModalProps = {
  ariaLabel: 'Edit Life at Company section',
  triggerText: '+ Edit description',
  usedFor: 'addTextDescCoProfile',
  changeInitFocus: true,
}

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Company Logo',
  triggerText: 'Add/Edit Company Logo',
  usedFor: 'addPicBtn userMenuPlus',
  triggerHasAutoFocus: true
}

const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addAnswerQApage',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: '+ Post',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

const SuccessModalProps = {
  ariaLabel: 'Successfully submitted',
  triggerText: 'Successfully submitted',
  usedFor: 'success',
  hideTrigger: true,
  changeInitFocus: true
}

const ClaimFreeCoProfileModalProps = {
  ariaLabel: 'Claim Company Profile',
  triggerText: 'Claim Company Profile',
  usedFor: 'freeCoProfileClaim',
  hideTrigger: true,
  backBtn: 'arrow'
}

const UnsubscribeProps = {
  ariaLabel: 'Unsubscribe',
  triggerText: 'Unsubscribe',
  usedFor: 'leaveGroup',
  changeInitFocus: true,
  removeOverflowY: true
}

const UnsubscribeMobileProps = {
  ariaLabel: 'Unsubscribe',
  triggerText: 'Unsubscribe',
  usedFor: 'leaveGroup',
  changeInitFocus: true,
  removeOverflowY: true
}

const ChooseProfileTypeModalProps = {
  ariaLabel: 'Choose Company Profile Type',
  usedFor: 'addTextDescCoProfile',
  changeInitFocus: true,
}

const ChooseProfileTypeSideBarModalPropsFromThisCo = {
  ariaLabel: 'Choose Company Profile Type',
  changeInitFocus: true,
}

const ChooseProfileTypeSideBarModalProps = {
  ariaLabel: 'Choose Company Profile Type',
  triggerText: '+ Add / Edit description',
  usedFor: 'addTextDescCoProfile',
  changeInitFocus: true,
}

class CoProfile extends React.Component {

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.state = {
      tabToView: this.props.initialTabToView ? this.props.initialTabToView : 'overview',
      prevFeedScrollPos: this.props.prevFeedScrollPos ? this.props.prevFeedScrollPos : 0,
      isPageManager: false,
      fromThisCo: false,
      approvalStatus: '',
      isMobile: '',
      showSuccessModal: false,
      updateUnsubscribeSuccess: false,
      companyItem: null,
    }
  }

  componentDidMount() {
    const {updateDocumentTitle, isLoggedIn} = this.props
    const {prevFeedScrollPos} = this.state
    const isMobile = checkMobile()
    const company = {
      coid: '0',
      approvalstatus: '8',
      name: 'pladis Global',
      pagemanagers: [{uid: '7'}, {uid: '8'}],
    }
    const companyItem = getCompanyDeets(company.coid)
    const companyName = companyItem && companyItem.label

    if(company != null){
      updateDocumentTitle("Explore " + companyName + " careers & advice - Prospela.com")
    }
    const loggedInUID = '8'
    const isPageManager = isLoggedIn && company.pagemanagers.some(e => e.uid == loggedInUID);
    const fromThisCo = true // isLoggedIn && users.workexp && users.workexp.map(x => x.co).includes(company.coid) //

    this.setState({
      isMobile: isMobile,
      isPageManager: isPageManager,
      approvalStatus: company.approvalstatus,
      companyItem: companyItem,
      fromThisCo: fromThisCo,
    })
    if (prevFeedScrollPos != 0) {
      const commContainer = document.getElementById("companyFeedContainer")
      commContainer.scrollTo({ top: prevFeedScrollPos, behavior: 'auto' });
    }
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

  handleStatusChange = (userInput) => {
    this.setState({
      wantsToLeave: userInput,
    })
  }

  handleSubmitUnsubscribe = () => {
    const {wantsToLeave} = this.state
    this.setState({
      isUnsubscribing: true,
    })
    if (wantsToLeave == 1) {
      this.setState({
        isUnsubscribing: false,
        updateUnsubscribeSuccess: true,
      })
    } else { // user wanted to stay
      this.setState({
        isUnsubscribing: false,
        updateUnsubscribeSuccess: true,
      })
    }
  }

  handleCommunityFeedClick = (e) => {
    e.stopPropagation()

    const feedItems = document.getElementById('feedItems')

    // Only if item is on the feed, otherwise is probably in a modal
    if (feedItems.contains(e.target)){
      const {updateFeedScrollPos} = this.props
      const prevScrollPos = e.target.closest('#companyFeedContainer').scrollTop
      updateFeedScrollPos(prevScrollPos)

    // Is probably within a modal i.e. not directly clicking on feed
    } else {
      return
    }

  }

  resetUnsubscribe = () => {
    const {wantsToLeave} = this.state
    this.setState({
      isUnsubscribing: false,
      updateUnsubscribeSuccess: false,
      wantsToLeave: null,
    })
  }

  renderTab = (company, companyName, companyURL, loggedInFname, upgradeCoProfileQuestions, fullCoProfileQuestions, listJobQuestions) => {
    const {userRole, isLoggedIn, checkHasAccess, noAccessHandler, maxViewsReached, updatePathName} = this.props;
    const {tabToView, isPageManager, approvalStatus, fromThisCo} = this.state;

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
        authorinstfreetext: 'pladis Global',
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
        authorinstfreetext: 'pladis Global',
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
  //  const jobsArr = []
    const jobsArr = [
      {
        oid: '0',
        roletitle: 'Head of Finance',
        description: 'Here is an extensive list of your CFO duties, but remember, you are only a Head of Finance.',
        datecreated: '2020-09-04T13:30:50.667Z',
        salarycurrency: 'GBP',
        salary: '',
        country: 'GBR',
        city: 'London',
        locationtype: '1',
        roletype: '2',
        industries: [],
        roles: [],
        skills: [],
        enddate : '2020-09-04T13:30:50.667Z',
        url: 'google.com',
        coidrelatesto: '13'
      },{
        oid: '1',
        roletitle: 'Head of Finance',
        description: '~This <b>is</b>~ ~This <b>is</b>~ _This <b>is</b>_ ** *bold* **bold* ***bold* ****bold* ~~ ~~~ ~~~~ ~yo~ ~~yo~ ~~~yo~ ~~~~yo~ my_profile my__profile my___profile my____profile _italics_ and ~*script* _emmas_ *message*~ \n- \n-></script> \n \nhttps://www.pr~ospel~a.com/myprofil_enumbe_r89__linesarebeforethis or https://www.prospela.com/myprofil_enumbe_r89__linsebefore https://prospela.com/my*profile* https://prospela.com/my~profile~yeah https://prospela.com/my~~profile~yeah',
        datecreated: '2020-09-04T13:30:50.667Z',
        salarycurrency: 'GBP',
        salary: '',
        country: 'GBR',
        city: 'London',
        locationtype: '1',
        roletype: '2',
        industries: [],
        roles: [],
        skills: [],
        enddate : '2020-09-04T13:30:50.667Z',
        url: 'google.com',
        coidrelatesto: '13'
      },{
        oid: '2',
        roletitle: 'Head of Finance',
        description: '~This <b>is</b>~ ~This <b>is</b>~ _This <b>is</b>_ ** *bold* \n **bold* ***bold* ****bold* ~~ ~~~ ~~~~ ~yo~ ~~yo~ ~~~yo~ ~~~~yo~ my_profile my__profile my___profile my____profile \n _italics_ and ~*script* _emmas_ *message*~ \n- \n-></script> \n \nhttps://www.pr~ospel~a.com/myprofil_enumbe_r89__linesarebeforethis or https://www.prospela.com/myprofil_enumbe_r89__linsebefore https://prospela.com/my*profile* https://prospela.com/my~profile~yeah https://prospela.com/my~~profile~yeah',
        datecreated: '2020-09-04T13:30:50.667Z',
        salarycurrency: 'GBP',
        salary: '',
        country: 'GBR',
        city: 'London',
        locationtype: '1',
        roletype: '2',
        industries: [],
        roles: [],
        skills: [],
        enddate : '2020-09-04T13:30:50.667Z',
        url: 'google.com',
        coidrelatesto: '13'
      },{
        oid: '3',
        roletitle: 'Head of Finance',
        description: 'Here is an extensive list of your CFO duties, but remember, you are only a Head of Finance.',
        datecreated: '2020-09-04T13:30:50.667Z',
        salarycurrency: 'GBP',
        salary: '',
        country: 'GBR',
        city: 'London',
        locationtype: '1',
        roletype: '2',
        industries: [],
        roles: [],
        skills: [],
        enddate : '2020-09-04T13:30:50.667Z',
        url: 'google.com',
        coidrelatesto: '13'
      }
    ]

    switch (tabToView) {
      case 'overview':
        return <CoProfileOverview renderFromThisCoPromptModal={this.renderFromThisCoPromptModal} fromThisCo={fromThisCo} formToShow={this.formToShow} renderCoProfileSideBar={this.renderCoProfileSideBar} company={company} companyName={companyName} companyURL={companyURL} isLoggedIn={isLoggedIn} updateTabToView={this.updateTabToView} updatePathName={updatePathName} approvalStatus={approvalStatus} fname={loggedInFname} isPageManager={isPageManager} contentArr={contentArr} userRole={userRole} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleCommunityFeedClick={this.handleCommunityFeedClick} upgradeCoProfileQuestions={upgradeCoProfileQuestions} fullCoProfileQuestions={fullCoProfileQuestions}/>
      case 'jobs':
      return (
        <div>
          <div className="bold darkGreyText marginBottomMinus10 fontSize16"><span role="img" aria-label="briefcase emoji">💼</span> Latest opportunities <span role="img" aria-label="briefcase emoji">💼</span> </div>
          <JobsContainer companyName={companyName} fromThisCo={fromThisCo} isPageManager={isPageManager} approvalStatus={approvalStatus} jobsArr={jobsArr} renderFromThisCoPromptModal={this.renderFromThisCoPromptModal} handleFeedClick={this.handleCommunityFeedClick} listJobQuestions={listJobQuestions}/>
        </div>
      )
    }
  }

  showModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  formToShow = (formType) => {
    if (formType == 'Free') {
      this.showModal("Claim"+formType+"ProfileForm")
    }
  }

  handleSuccessModalFromFPModal = (modalTypeToClose, modalToShow) => {
    this.showModal(modalToShow)
    this.closeModal(modalTypeToClose)
  }

  renderFromThisCoPromptModal = (usedFor, triggerText) => {
    return (
      <Modal {...ChooseProfileTypeSideBarModalPropsFromThisCo} wider usedFor={usedFor} triggerText={triggerText}>
        <BuyCoProfileModalContent
          modalTitle='Upgrade to access this feature'
          modalSubTitle='Choose between Free, Premium or Enterprise access'
          showStd
          showPrem
          showSuperPrem
          stdCourseLink=''
          premCourseLink='www.stripe.com'
          superPremCourseLink=''
          stdDesc='Get started by adding basic company info'
          premDesc='Everything in Free + Job / event listings, enhanced employer branding and more!'
          superPremDesc='Want to discuss your needs? Contact us!'
          stdPrice='£0/mth'
          premPrice='£100/mth'
          superPremPrice='Contact Sales'
          showBottomTxt
          formToShow={this.formToShow}
        />
      </Modal>
    )
  }

  renderCoProfileSideBar = (company, upgradeCoProfileQuestions, fullCoProfileQuestions, isMainBar, fromThisCo, approvalStatus) => {
    const {isPageManager} = this.state

    return (
      <div className={isMainBar == true ? "isSideDivOnMain marginBottom40" : ""}>
        <div className="dash-welcomeContainer whiteBackground heightUnset marginBottom40">
          <div className="positionRel">
            <div className="dash-welcomeHeader electricPurpleText"><strong>Tips for Candidates</strong></div>
            {company.tipsforcandidates != '' && (
              <div className="darkGreyText"><TextParser text={company.tipsforcandidates} /></div>
            )}
            {fromThisCo && fromThisCo && company.tipsforcandidates == '' && approvalStatus == '0' && (
              <div className="darkGreyText">
                {this.renderFromThisCoPromptModal('addTextDescCoProfile', '+ Add / Edit description')}
              </div>
            )}
            {isPageManager && company.tipsforcandidates == '' && approvalStatus == '1' && ( // Only has free but not yet approved
              <div className="darkGreyText">NOTE: This is a Premium Feature. Once your Free profile has been approved, you&#39;ll be able to upgrade and add this content.</div>
            )}
            {isPageManager && company.tipsforcandidates == '' && approvalStatus == '2' && ( // Only has free (approved)
              <div className="darkGreyText">
                <Modal {...ChooseProfileTypeSideBarModalProps} wider={false}>
                  <BuyCoProfileModalContent
                    modalTitle='Upgrade to access this feature'
                    modalSubTitle='Choose between Premium or Enterprise access'
                    showStd={false}
                    showPrem
                    showSuperPrem
                    stdCourseLink=''
                    premCourseLink='www.stripe.com'
                    superPremCourseLink=''
                    stdDesc='Get started by adding basic company info'
                    premDesc='Everything in Free + Job / event listings, enhanced employer branding and more!'
                    superPremDesc='Want to discuss your needs? Contact us!'
                    stdPrice='£0/mth'
                    premPrice='£100/mth'
                    superPremPrice='Contact Sales'
                    showBottomTxt
                    formToShow={null}
                  />
                </Modal>
              </div>
            )}
            {isPageManager && company.tipsforcandidates == '' && approvalStatus == '3' && ( // Paid for upgrade but not completed
              <FullPageModal {...EditLifeAtCompanyDescFPModalProps} usedFor="addTextDescCoProfile">
                <Form
                  questions={upgradeCoProfileQuestions}
                  usedFor="addTextDescCoProfile"
                  formTitle="Update your Company Profile"
                  onSubmit={() => this.showModal("Success")}
                />
              </FullPageModal>
            )}
            {isPageManager && (approvalStatus == '4' || approvalStatus == '7') && ( // Has paid for premium and provided info but not yet approved
              <div className="darkGreyText">NOTE: This is a Premium Feature. Once your Premium profile has been approved, you&#39;ll see your content here.</div>
            )}
            {isPageManager && company.tipsforcandidates == '' && approvalStatus == '6' && ( // Paid for full premium profile but not completed
              <FullPageModal {...EditLifeAtCompanyDescFPModalProps} usedFor="addTextDescCoProfile">
                <Form
                  questions={fullCoProfileQuestions}
                  usedFor="addTextDescCoProfile"
                  formTitle="Update your Company Profile"
                  onSubmit={() => this.showModal("Success")}
                />
              </FullPageModal>
            )}
            {isPageManager && company.tipsforcandidates != '' && (approvalStatus == '5' || approvalStatus == '8') && (
              <Modal {...EditLifeAtCompanyDescModalProps}>
                <div className="postTypeContainer marginAuto">
                  <div>To make any changes, please email <strong className="electricPurpleText">talktous@prospela.com</strong></div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderClaimCoProfileContent = (approvalStatus) => {
    const {isMobile, isPageManager, fromThisCo} = this.state
    const {checkHasAccess, noAccessHandler} = this.props
    let buttonText, showStd, showPrem, showSuperPrem, stdCourseLink, premCourseLink, superPremCourseLink, stdDesc, premDesc, superPremDesc, stdPrice, premPrice, superPremPrice, modalTitle, modalSubTitle, showWider, showBottomTxt

    stdDesc = 'Get started by adding basic company info'
    premDesc = 'Everything in Free + Job / event listings, enhanced employer branding and more!'
    superPremDesc = 'Want to discuss your needs? Contact us!'
    stdPrice = '£0/mth'
    premPrice = '£100/mth'
    superPremPrice = 'Contact Sales'
    stdCourseLink = ''
    premCourseLink = 'www.stripe.com'
    superPremCourseLink = ''

    switch(approvalStatus) {
      case 0: // not claimed
        buttonText = 'Claim your free listing'
        showStd = true
        showPrem = true
        showSuperPrem = true
        modalTitle = 'Select your Company profile type'
        modalSubTitle = 'Choose between Free, Premium or Enterprise access'
        showWider = true
        showBottomTxt = true
        break;
      case 1: // free but not approved
      case 2: // free approved
        buttonText = 'Get Premium Access'
        showStd = false
        showPrem = true
        showSuperPrem = true
        modalTitle = 'Upgrade your Company profile type'
        modalSubTitle = 'Choose between Premium or Enterprise access'
        showWider = false
        showBottomTxt = true
        break;
      case 3: // upgrade paid but not completed
      case 4: // upgrade completed but not approved
      case 5: // upgrade approved
      case 6: // premium paid but not completed
      case 7: // premium completed but not approved
      case 8: // premium approved
        buttonText = 'Get Enterprise Access'
        showStd = false
        showPrem = false
        showSuperPrem = true
        modalTitle = 'Upgrade your Company profile type'
        modalSubTitle = 'Choose Enterprise Access'
        showWider = false
        showBottomTxt = false
        break;
      }
      return (
        <React.Fragment>
          {approvalStatus == '0' && (
            <span className="profileClaimStatus">
              <span className={fromThisCo == true ? "redText" : ""}>Unclaimed</span>
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div className="textCursor">This company profile is unclaimed. Companies who claim their profile can list jobs, access enhanced employer branding and more!</div>
                <div className="marginTop10 lightPurpleText">
                  <Modal {...ChooseProfileTypeModalProps} triggerText="Claim your free profile" wider={showWider} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                    <BuyCoProfileModalContent
                      modalTitle={modalTitle}
                      modalSubTitle={modalSubTitle}
                      showStd={showStd}
                      showPrem={showPrem}
                      showSuperPrem={showSuperPrem}
                      stdCourseLink={stdCourseLink}
                      premCourseLink={premCourseLink}
                      superPremCourseLink={superPremCourseLink}
                      stdDesc={stdDesc}
                      premDesc={premDesc}
                      superPremDesc={superPremDesc}
                      stdPrice={stdPrice}
                      premPrice={premPrice}
                      superPremPrice={superPremPrice}
                      showBottomTxt={showBottomTxt}
                      formToShow={this.formToShow}
                    />
                  </Modal>
                </div>
              </div>
            </span>
          )}
          {(approvalStatus == '1' || approvalStatus == '2') && (
            <React.Fragment>
              <svg viewBox="0 0 24 24" className="prCertifiedBadge greenFill marginRight0">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </g>
              </svg> <span className="profileClaimStatus">{(isPageManager && approvalStatus != '1') ? 'Upgrade' : 'Claimed'}</span>
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div>{(isPageManager && approvalStatus != '1') ? 'Someone from this company manages this profile. Upgrade to enjoy job listings, enhanced employer branding and more' : 'Someone from this company manages this profile.'}</div>
                {(isPageManager && approvalStatus != '1') && (
                  <div className="marginTop10 lightPurpleText">
                    <Modal {...ChooseProfileTypeModalProps} triggerText="Upgrade" wider={showWider}>
                      <BuyCoProfileModalContent
                        modalTitle={modalTitle}
                        modalSubTitle={modalSubTitle}
                        showStd={showStd}
                        showPrem={showPrem}
                        showSuperPrem={showSuperPrem}
                        stdCourseLink={stdCourseLink}
                        premCourseLink={premCourseLink}
                        superPremCourseLink={superPremCourseLink}
                        stdDesc={stdDesc}
                        premDesc={premDesc}
                        superPremDesc={superPremDesc}
                        stdPrice={stdPrice}
                        premPrice={premPrice}
                        superPremPrice={superPremPrice}
                        showBottomTxt={showBottomTxt}
                        formToShow={this.formToShow}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
          {(approvalStatus != '0' && approvalStatus != '1' && approvalStatus != '2') && (
            <React.Fragment>
              <svg viewBox="0 0 24 24" className="prCertifiedBadge greenFill marginRight0">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </g>
              </svg> <span className="profileClaimStatus">{(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) ? 'Upgrade' : 'Claimed'}</span>
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div>{(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) ? 'Looking for more personalised features to meet your hiring and employer branding needs?' : 'Someone from this company manages this profile.'}</div>
                {(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) && (
                  <div className="marginTop10 lightPurpleText">
                    <Modal {...ChooseProfileTypeModalProps} triggerText="Contact Sales" wider={showWider}>
                      <BuyCoProfileModalContent
                        modalTitle={modalTitle}
                        modalSubTitle={modalSubTitle}
                        showStd={showStd}
                        showPrem={showPrem}
                        showSuperPrem={showSuperPrem}
                        stdCourseLink={stdCourseLink}
                        premCourseLink={premCourseLink}
                        superPremCourseLink={superPremCourseLink}
                        stdDesc={stdDesc}
                        premDesc={premDesc}
                        superPremDesc={superPremDesc}
                        stdPrice={stdPrice}
                        premPrice={premPrice}
                        superPremPrice={superPremPrice}
                        showBottomTxt={showBottomTxt}
                        formToShow={this.formToShow}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>

      )
  }

  render() {
    const {fromThisCo, companyItem, tabToView, isPageManager, approvalStatus, wantsToLeave, isUnsubscribing, updateUnsubscribeSuccess, isMobile, showClaimFreeProfileFormModal, showSuccessModal} = this.state
    const {userRole, isLoggedIn} = this.props;
    const company = {
      coid: '0',
      approvalstatus: '8',
    //  logo: '',
      logo: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
      description: 'Ernst & Young provides audit, consulting, tax, business risk, technology and security risk services, and human capital services worldwide.',
      country: 'GBR',
      industries: ['6', '8'],
      type: 0,
      size: 0,
      website: '',
      //website: 'https://www.ey.com',
      pagemanagers: [{uid: '7'}, {uid: '8'}],
      experts: [{uid: '1'}, {uid: '2'},{uid: '3'}, {uid: '4'}],
      culture: '',
      tipsforcandidates: '',
    }
    const activeJobs = [
      {jid: '0'},
      {jid: '1'}
    ]
    const loggedInFname = 'Dexter' // loggedin users fname
    var loggedInUID = '5'
    let urlText

    urlText = companyItem != null ? companyItem.urlText : ''

    const companyURLending = "/companies/" + urlText
    const companyURL = "https://app.prospela.com" + companyURLending
    const companyName = companyItem && companyItem.label
    const logoURL = company.logo
    const hasLogoURL = logoURL != '' && logoURL != null && (approvalStatus >= '2' && approvalStatus != '6' && approvalStatus != "7")
    //const flagEmoji = userFlagEmoji(company.country);
    const companySizeOptions = [
      {value: '0', label: 'Micro (0-10 employees)'},
      {value: '1', label: 'Small (11-50 employeers)'},
      {value: '2', label: 'Medium (51-150 employees)'},
      {value: '3', label: 'Large (over 150 employees)'},
    ]
    const companyTypeOptions = [
      {value: '0', label: 'Charity / Non-profit'},
      {value: '1', label: 'For-profit'},
      {value: '2', label: 'Social Enterprise'},
      {value: '3', label: 'Education Institution'},
    ]
    const companySize = company && companySizeOptions
      .filter(x => x.value == company.size)[0].label
    const companyType = company && companyTypeOptions
      .filter(x => x.value == company.type)[0].label
    const indArrToShow = company.industries.slice(0,2)

    let coLogo, coInitial

    if (hasLogoURL) {
      coLogo = cdn + '/' + groupImgFolder + logoURL
    } else {
      coInitial = companyItem && companyName.charAt(0).toUpperCase();
    }

    var countries = [
      {value: 'AFG', label: 'Afghanistan'},{value: 'ALA', label: 'Aland Islands'},{value: 'ALB', label: 'Albania'},{value: 'DZA', label: 'Algeria'},{value: 'ASM', label: 'American Samoa'},{value: 'AND', label: 'Andorra'},{value: 'AGO', label: 'Angola'},{value: 'AIA', label: 'Anguilla'},{value: 'ATA', label: 'Antarctica'},{value: 'ATG', label: 'Antigua & Barbuda'},{value: 'ARG', label: 'Argentina'},{value: 'ARM', label: 'Armenia'},{value: 'ABW', label: 'Aruba'},{value: 'AUS', label: 'Australia'},{value: 'AUT', label: 'Austria'},{value: 'AZE', label: 'Azerbaijan'},{value: 'BHS', label: 'Bahamas'},{value: 'BHR', label: 'Bahrain'},{value: 'BGD', label: 'Bangladesh'},{value: 'BRB', label: 'Barbados'},{value: 'BLR', label: 'Belarus'},{value: 'BEL', label: 'Belgium'},{value: 'BLZ', label: 'Belize'},{value: 'BEN', label: 'Benin'},{value: 'BMU', label: 'Bermuda'},{value: 'BTN', label: 'Bhutan'},{value: 'BOL', label: 'Bolivia'},{value: 'BES', label: 'Bonaire, Sint Eustatius and Saba'},{value: 'BIH', label: 'Bosnia & Herzegovina'},{value: 'BWA', label: 'Botswana'},{value: 'BVT', label: 'Bouvet Island'},{value: 'BRA', label: 'Brazil'},{value: 'IOT', label: 'British Indian Ocean Territory'},{value: 'VGB', label: 'British Virgin Islands'},{value: 'BRN', label: 'Brunei'},{value: 'BGR', label: 'Bulgaria'},{value: 'BFA', label: 'Burkina Faso'},{value: 'BDI', label: 'Burundi'},{value: 'KHM', label: 'Cambodia'},{value: 'CMR', label: 'Cameroon'},{value: 'CAN', label: 'Canada'},{value: 'CPV', label: 'Cape Verde'},{value: 'CYM', label: 'Cayman Islands'},{value: 'CAF', label: 'Central African Republic'},{value: 'TCD', label: 'Chad'},{value: 'CHL', label: 'Chile'},{value: 'CHN', label: 'China'},{value: 'CXR', label: 'Christmas Island'},{value: 'CCK', label: 'Cocos (Keeling) Islands'},{value: 'COL', label: 'Colombia'},{value: 'COM', label: 'Comoros'},{value: 'COG', label: 'Congo'},{value: 'COK', label: 'Cook Islands'},{value: 'CRI', label: 'Costa Rica'},{value: 'CIV', label: 'Cote d\'Ivoire'},{value: 'HRV', label: 'Croatia'},{value: 'CUB', label: 'Cuba'},{value: 'CUW', label: 'Curacao'},{value: 'CYP', label: 'Cyprus'},{value: 'CZE', label: 'Czech Republic'},{value: 'COD', label: 'Democratic Republic of Congo'},{value: 'DNK', label: 'Denmark'},{value: 'DJI', label: 'Djibouti'},{value: 'DMA', label: 'Dominica'},{value: 'DOM', label: 'Dominican Republic'},{value: 'ECU', label: 'Ecuador'},{value: 'EGY', label: 'Egypt'},{value: 'SLV', label: 'El Salvador'},{value: 'GNQ', label: 'Equatorial Guinea'},{value: 'ERI', label: 'Eritrea'},{value: 'EST', label: 'Estonia'},{value: 'SWZ', label: 'Eswatini'},{value: 'ETH', label: 'Ethiopia'},{value: 'FLK', label: 'Falkland Islands'},{value: 'FRO', label: 'Faroe Islands'},{value: 'FJI', label: 'Fiji'},{value: 'FIN', label: 'Finland'},{value: 'FRA', label: 'France'},{value: 'GUF', label: 'French Guiana'},{value: 'PYF', label: 'French Polynesia'},{value: 'ATF', label: 'French Southern Territories'},{value: 'GAB', label: 'Gabon'},{value: 'GMB', label: 'Gambia'},{value: 'GEO', label: 'Georgia'},{value: 'DEU', label: 'Germany'},{value: 'GHA', label: 'Ghana'},{value: 'GIB', label: 'Gibraltar'},{value: 'GRC', label: 'Greece'},{value: 'GRL', label: 'Greenland'},{value: 'GRD', label: 'Grenada'},{value: 'GLP', label: 'Guadeloupe'},{value: 'GUM', label: 'Guam'},{value: 'GTM', label: 'Guatemala'},{value: 'GGY', label: 'Guernsey'},{value: 'GIN', label: 'Guinea'},{value: 'GNB', label: 'Guinea-Bissau'},{value: 'GUY', label: 'Guyana'},{value: 'HTI', label: 'Haiti'},{value: 'HMD', label: 'Heard Island & McDonald Islands'},{value: 'HND', label: 'Honduras'},{value: 'HKG', label: 'Hong Kong'},{value: 'HUN', label: 'Hungary'},{value: 'ISL', label: 'Iceland'},{value: 'IND', label: 'India'},{value: 'IDN', label: 'Indonesia'},{value: 'IRN', label: 'Iran'},{value: 'IRQ', label: 'Iraq'},{value: 'IRL', label: 'Ireland'},{value: 'IMN', label: 'Isle of Man'},{value: 'ISR', label: 'Israel'},{value: 'ITA', label: 'Italy'},{value: 'JAM', label: 'Jamaica'},{value: 'JPN', label: 'Japan'},{value: 'JEY', label: 'Jersey'},{value: 'JOR', label: 'Jordan'},{value: 'KAZ', label: 'Kazakhstan'},{value: 'KEN', label: 'Kenya'},{value: 'KIR', label: 'Kiribati'},{value: 'RKS', label: 'Kosovo'},{value: 'KWT', label: 'Kuwait'},{value: 'KGZ', label: 'Kyrgyzstan'},{value: 'LAO', label: 'Laos'},{value: 'LVA', label: 'Latvia'},{value: 'LBN', label: 'Lebanon'},{value: 'LSO', label: 'Lesotho'},{value: 'LBR', label: 'Liberia'},{value: 'LBY', label: 'Libya'},{value: 'LIE', label: 'Liechtenstein'},{value: 'LTU', label: 'Lithuania'},{value: 'LUX', label: 'Luxembourg'},{value: 'MAC', label: 'Macau'},{value: 'MKD', label: 'Macedonia'},{value: 'MDG', label: 'Madagascar'},{value: 'MWI', label: 'Malawi'},{value: 'MYS', label: 'Malaysia'},{value: 'MDV', label: 'Maldives'},{value: 'MLI', label: 'Mali'},{value: 'MLT', label: 'Malta'},{value: 'MHL', label: 'Marshall Islands'},{value: 'MTQ', label: 'Martinique'},{value: 'MRT', label: 'Mauritania'},{value: 'MUS', label: 'Mauritius'},{value: 'MYT', label: 'Mayotte'},{value: 'MEX', label: 'Mexico'},{value: 'FSM', label: 'Micronesia'},{value: 'MDA', label: 'Moldova'},{value: 'MCO', label: 'Monaco'},{value: 'MNG', label: 'Mongolia'},{value: 'MNE', label: 'Montenegro'},{value: 'MSR', label: 'Montserrat'},{value: 'MAR', label: 'Morocco'},{value: 'MOZ', label: 'Mozambique'},{value: 'MMR', label: 'Myanmar'},{value: 'NAM', label: 'Namibia'},{value: 'NRU', label: 'Nauro'},{value: 'NPL', label: 'Nepal'},{value: 'NLD', label: 'Netherlands'},{value: 'ANT', label: 'Netherlands Antilles'},{value: 'NCL', label: 'New Caledonia'},{value: 'NZL', label: 'New Zealand'},{value: 'NIC', label: 'Nicaragua'},{value: 'NER', label: 'Niger'},{value: 'NGA', label: 'Nigeria'},{value: 'NIU', label: 'Niue'},{value: 'NFK', label: 'Norfolk Island'},{value: 'PRK', label: 'North Korea'},{value: 'MNP', label: 'Northern Mariana Islands'},{value: 'NOR', label: 'Norway'},{value: 'OMN', label: 'Oman'},{value: 'PAK', label: 'Pakistan'},{value: 'PLW', label: 'Palau'},{value: 'PSE', label: 'Palestine'},{value: 'PAN', label: 'Panama'},{value: 'PNG', label: 'Papua New Guinea'},{value: 'PRY', label: 'Paraguay'},{value: 'PER', label: 'Peru'},{value: 'PHL', label: 'Philippines'},{value: 'PCN', label: 'Pitcairn'},{value: 'POL', label: 'Poland'},{value: 'PRT', label: 'Portugal'},{value: 'PRI', label: 'Puerto Rico'},{value: 'QAT', label: 'Qatar'},{value: 'REU', label: 'Reunion'},{value: 'ROU', label: 'Romania'},{value: 'RUS', label: 'Russia'},{value: 'RWA', label: 'Rwanda'},{value: 'WSM', label: 'Samoa'},{value: 'SMR', label: 'San Marino'},{value: 'STP', label: 'Sao Tome and Principe'},{value: 'SAU', label: 'Saudi Arabia'},{value: 'SEN', label: 'Senegal'},{value: 'SRB', label: 'Serbia'},{value: 'SYC', label: 'Seychelles'},{value: 'SLE', label: 'Sierra Leone'},{value: 'SGP', label: 'Singapore'},{value: 'SXM', label: 'Sint Maarten'},{value: 'SVK', label: 'Slovakia'},{value: 'SVN', label: 'Slovenia'},{value: 'SLB', label: 'Solomon Islands'},{value: 'SOM', label: 'Somalia'},{value: 'ZAF', label: 'South Africa'},{value: 'SGS', label: 'South Georgia & the South Sandwich Islands'},{value: 'KOR', label: 'South Korea'},{value: 'SSD', label: 'South Sudan'},{value: 'ESP', label: 'Spain'},{value: 'LKA', label: 'Sri Lanka'},{value: 'BLM', label: 'St Barthélemy'},{value: 'SHN', label: 'St Helena, Ascension &d Tristan da Cunha'},{value: 'KNA', label: 'St Kitts & Nevis'},{value: 'LCA', label: 'St Lucia'},{value: 'MAF', label: 'St Martin'},{value: 'SPM', label: 'St Pierre & Miquelon'},{value: 'VCT', label: 'St Vincent & the Grenadines'},{value: 'SDN', label: 'Sudan'},{value: 'SUR', label: 'Suriname'},{value: 'SJM', label: 'Svalbard & Jan Mayen'},{value: 'SWE', label: 'Sweden'},{value: 'CHE', label: 'Switzerland'},{value: 'SYR', label: 'Syria'},{value: 'TWN', label: 'Taiwan'},{value: 'TJK', label: 'Tajikistan'},{value: 'TZA', label: 'Tanzania'},{value: 'THA', label: 'Thailand'},{value: 'TLS', label: 'Timor L\'este'},{value: 'TGO', label: 'Togo'},{value: 'TKL', label: 'Tokelau'},{value: 'TON', label: 'Tonga'},{value: 'TTO', label: 'Trinidad & Tobago'},{value: 'TUN', label: 'Tunisia'},{value: 'TUR', label: 'Turkey'},{value: 'TKM', label: 'Turkmenistan'},{value: 'TCA', label: 'Turks & Caicos'},{value: 'TUV', label: 'Tuvalu'},{value: 'UGA', label: 'Uganda'},{value: 'UKR', label: 'Ukraine'},{value: 'ARE', label: 'United Arab Emirates'},{value: 'GBR', label: 'United Kingdom (UK)'},{value: 'USA', label: 'United States of America'},{value: 'URY', label: 'Uruguay'},{value: 'VIR', label: 'US Virgin Islands'},{value: 'UZB', label: 'Uzbekistan'},{value: 'VUT', label: 'Vanuatu'},{value: 'VAT', label: 'Vatican City'},{value: 'VEN', label: 'Venezuela'},{value: 'VNM', label: 'Vietnam'},{value: 'WLF', label: 'Wallis & Futuna'},{value: 'YEM', label: 'Yemen'},{value: 'ZMB', label: 'Zambia'},{value: 'ZWE', label: 'Zimbabwe'}
    ]
    var listJobQuestions = [
      {q: 'Please enter the Job title', detail: 'This can be your own free text. You\'ll have a chance to tag your listing to specific role communities later on.', aType: 'text', req: 1, maxLength: 200, placeholder: 'Type Job title here...', name: 'title'},
      {q: 'Select the Job location type', aType: 'select', req: 1, placeholder: 'Select type...', name: 'locationtype', valueToShow: 'label', options: [
        {value: '0', label: 'On-site / In-person'},
        {value: '1', label: 'Hybrid'},
        {value: '2', label: 'Fully Remote'},
      ]},
      {q: 'Where is the role / employee to be based? (Country)', aType: 'select', req: 1, placeholder: 'Select Country...', name: 'country', valueToShow: 'label', options: [
        ...countries
      ]},
      {q: 'Where is the role / employee to be based? (City)', aType: 'text', req: 1, placeholder: 'Type City...', name: 'city', valueToShow: 'label'},
      {q: 'Select the Job type', aType: 'selectMulti', req: 1, showCheckbox: true, showIcon: true, placeholder: 'Select type...', placeholderOnClick: 'Choose from our list:', name: 'roletype', valueToShow: 'label', options: [
        {value: '0', label: 'Full-time'},
        {value: '1', label: 'Part-time'},
        {value: '2', label: 'Permanent'},
        {value: '3', label: 'Contract'},
        {value: '4', label: 'Temporary'},
        {value: '5', label: 'Volunteer'},
        {value: '6', label: 'Internship'},
        {value: '7', label: 'Other'},
      ]},
      {q: 'Please provide a job description', detail: 'e.g. responsiblities, salary, candidate requirements, details about the application process, etc. Formattinrg options: *bold* _italics_ ~highlight~ and ↑ Shift + ⤶ Enter for new line.', aType: 'textLong', req: 1, maxLength: 5000, placeholder: 'Type job description...', name: 'description'},
      {q: 'Where will candidates submit applications?', detail: 'This could be your website or Applicant Tracking System URL. Note: We will automatically add the source tag \'source=prospela\' to the end of your URL to help you track the referral source', aType: 'text', req: 1, placeholder: 'https://yourcompany.com/careers/jobid12345...', name: 'url'},
      {q: 'Now, let\'s help boost this roles discoverability!', detail: 'The next few questions help you tag this job so it will appear in specific skill, industry, and role communities on Prospela', aType: 'interim', name: 'interim'},
      {q: 'Which of Prospela\'s Industry communities would you like this role to appear in?', aType: 'selectMulti', req: 1, showCheckbox: true, showIcon: true, iconToShow: 'iconFA', placeholder: 'Select Industries...', placeholderOnClick: 'Choose from our list:', name: 'industries', valueToShow: 'label', options: [
        ...industryOptions
      ]},
      {q: 'Which of Prospela\'s Role communities would you like this role to appear in?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, showIcon: true, iconToShow: 'iconFA', placeholder: 'Select Roles...', placeholderOnClick: 'Choose from our list:', name: 'roles', valueToShow: 'label', options: [
        ...roleOptions
      ]},
      {q: 'Which of Prospela\'s Skills communities would you like this role to appear in?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, showIcon: true, iconToShow: 'iconFA', placeholder: 'Select Skills...', placeholderOnClick: 'Choose from our list:', name: 'skills', valueToShow: 'label', options: [
        ...skillsOptions
      ]},
      {q: 'Lastly, how long would you like this job listed for?', detail: 'Your listing will remain active until you choose, or until you end your company subscription (whichever is sooner).', aType: 'select', req: 1, placeholder: 'Select option...', name: 'listinglength', valueToShow: 'label', options: [
        {value: '0', label: '30 days'},
        {value: '1', label: '60 days'},
        {value: '2', label: '90 days'},
      ]},
    ]
    var freeCoProfileQuestions = [
      {q: 'Highly-engaged entry-level candidates are finding out about ' + companyName + ' on Prospela', detail: 'Participate in the conversation and showcase why you\'re a st great place to work. We\'ll aim to get your profile and content live within 48 hours', aType: 'interim', name: 'interim'},
      {q: 'What type of organisation are you?', aType: 'select', req: 1, placeholder: 'Select type...', showIcon: true, iconToShow: 'iconFA', name: 'type', valueToShow: 'label', options: [
        {value: '0', label: 'Charity / Non-profit', iconFA: 'fas fa-ribbon'},
        {value: '1', label: 'For-profit', iconFA: 'fas fa-chart-line'},
        {value: '2', label: 'Social Enterprise', iconFA: 'fas fa-seedling'},
        {value: '3', label: 'Education Institution', iconFA: 'fas fa-graduation-cap'}
      ]},
      {q: 'What size company are you?', aType: 'select', req: 1, placeholder: 'Select size...', name: 'size', valueToShow: 'label', options: [
        ...companySizeOptions
      ]},
      {q: 'What industries do you operate in?', detail: 'Select up to two relevant industries.', aType: 'selectMulti', req: 1, showCheckbox: true, showIcon: true, iconToShow: 'iconFA', placeholder: 'Select Industries...', placeholderOnClick: 'Choose from our list:', name: 'industries', valueToShow: 'label', options: [
        ...industryOptions
      ]},
      {q: 'Where is your Company HQ?', aType: 'select', req: 1, placeholder: 'Select Country...', name: 'country', valueToShow: 'label', options: [
        ...countries
      ]},
      {q: 'What\'s your Company website?', aType: 'text', req: 1, maxLength: 75, placeholder: 'https://www.yourcompany.com...', name: 'website'},
      {q: 'Lastly, please provide a short bio of your company', detail: 'Explain what your organisation does in simple, jargon-free terms', aType: 'textLong', req: 1, maxLength: 150, placeholder: 'Type your description here...', name: 'description'},
    ]
    var upgradeCoProfileQuestions = [
      {q: 'Congratulations on upgrading to a Premium. Let\'s add some life to your profile!', detail: 'You can now list jobs / opportunities, showcase life at your company and add tips for candidates looking to get their foot in the door.', aType: 'interim', name: 'interim'},
      {q: 'Please provide a short insight to what life is like at ' + companyName, detail: 'This could be details about your culture, benefits, and / or day-in-the-life insights', aType: 'textLong', req: 1, maxLength: 2000, placeholder: 'Type your description here...', name: 'culture'},
      {q: 'Please list some quick tips for candidates looking to break in to a career at ' + companyName, detail: 'This could be simple bullets on the application process, skills you look for, and / or how to succeed on the job', aType: 'textLong', req: 1, maxLength: 2000, placeholder: 'Type your tips here...', name: 'tipsforcandidates'},
    ]
    var fullCoProfileQuestions = [
      {q: 'Highly-engaged entry-level candidates are finding out about ' + companyName + ' on Prospela', detail: 'Participate in the conversation and showcase why you\'re a great place to work. We\'ll aim to get your profile and content live within 48 hours', aType: 'interim', name: 'interim'},
      {q: 'What type of organisation are you?', aType: 'select', req: 1, placeholder: 'Select type...', showIcon: true, iconToShow: 'iconFA', name: 'type', valueToShow: 'label', options: [
        {value: '0', label: 'Charity / Non-profit', iconFA: 'fas fa-ribbon'},
        {value: '1', label: 'For-profit', iconFA: 'fas fa-chart-line'},
        {value: '2', label: 'Social Enterprise', iconFA: 'fas fa-seedling'},
        {value: '3', label: 'Education Institution', iconFA: 'fas fa-graduation-cap'}
      ]},
      {q: 'What size company are you?', aType: 'select', req: 1, placeholder: 'Select size...', name: 'size', valueToShow: 'label', options: [
        ...companySizeOptions
      ]},
      {q: 'What industries do you operate in?', detail: 'Select up to two relevant industries.', aType: 'selectMulti', req: 1, showCheckbox: true, showIcon: true, iconToShow: 'iconFA', placeholder: 'Select Industries...', placeholderOnClick: 'Choose from our list:', name: 'industries', valueToShow: 'label', options: [
        ...industryOptions
      ]},
      {q: 'Where is your Company HQ?', aType: 'select', req: 1, placeholder: 'Select Country...', name: 'country', valueToShow: 'label', options: [
        ...countries
      ]},
      {q: 'What\'s your Company website?', aType: 'text', req: 1, maxLength: 75, placeholder: 'https://www.yourcompany.com...', name: 'website'},
      {q: 'Next, please provide a short bio of your company', detail: 'Explain what your organisation does in simple, jargon-free terms', aType: 'textLong', req: 1, maxLength: 150, placeholder: 'Type your description here...', name: 'description'},
      {q: 'Please provide a short insight to what life is like at ' + companyName, detail: 'This could be details about your culture, benefits, and / or day-in-the-life insights', aType: 'textLong', req: 1, maxLength: 2000, placeholder: 'Type your description here...', name: 'culture'},
      {q: 'Lastly, please list some quick tips for candidates looking to break in to a career at ' + companyName, detail: 'This could be simple bullets on the application process, skills you look for, and / or how to succeed on the job', aType: 'textLong', req: 1, maxLength: 2000, placeholder: 'Type your tips here...', name: 'tipsforcandidates'},
    ]

    // Add meta tags
    metaAdder('property="og:type"', "website")
    metaAdder('property="og:title"', "Explore " + companyName + " careers & advice - Prospela.com")
    metaAdder('name="title"', "Explore " + companyName + " careers & advice - Prospela.com")
    metaAdder('property="og:url"', companyURL)
    metaAdder('property="og:image"', "https://files.prospela.com/images/AskAQ_Icon.png") // this meta tag required for LinkedIn sharing
    metaAdder('property="og:site_name"', "Prospela.com")

    //Add link tags to head
    var linkTag = document.getElementById('canonicalLink')
    if(!linkTag && companyURL != "https://app.prospela.com/company/falsefalse") {
      var link = document.createElement('link');
      link.id = 'canonicalLink'
      link.rel = 'canonical';
      link.href = companyURL
      document.head.appendChild(link);
    }

    let unsubscribeOptions = [
      {value: '0', label: 'No', detail: 'Keep Premium', checkbox: true, isTitle: false},
      {value: '1', label: 'Yes', detail: 'Unsubscribe & lose access to Premium Employer features', checkbox: true, isTitle: false},
    ]

    return (
      <React.Fragment>
        <div className="tabWindow" id="companyFeedContainer" ref={this.scrollRef} onScroll={this.onScroll} >
          <div className="mainAndSideContainer">
            <div className="title-blankPage marginBottom20">
              <MenuNav />
              <div className="greyText fontSize12 marginBottom20 noBold">
                <i className="fas fa-home" /> &gt; Companies &gt; {companyName}
              </div>
              <div className="paddingBtm marginBottom20">
                <div className="chatItemFlexContainer qTitle qaPage">
                  <div>
                  {/*}  <div className={"groupsAvatarContainer coProfile " + (hasLogoURL ? "" : "noImg paddingTop5")}>
                      {hasLogoURL === true ?
                        <img className="logoImg" alt="Initiative Logo" src={coLogo}/>
                      : coInitial
                      }
                    </div>*/}
                    <div className="userMenu-thumb-container">
                      {hasLogoURL === true ? (
                        <div className="userMenu-thumb allowAddPic" style={hasLogoURL === true ? {backgroundImage:"url(" + coLogo + ")"} : null}>
                          {isPageManager && (
                            <Modal {...UploadProfPicProps}>
                              <UploadProfPicContent isCompany isPicSet={hasLogoURL === true} profPicSrc={logoURL} isMe='isMe' picSizeToShow={270} />
                            </Modal>
                          )}
                        </div>
                        )
                      : (
                        <div className="userMenu-thumb allowAddPic noPic isMe">
                          {isPageManager && (
                            <Modal {...UploadProfPicProps}>
                              <UploadProfPicContent isCompany isPicSet={hasLogoURL === true} userInitial={coInitial} isMe='isMe'/>
                            </Modal>
                          )}
                          <div className="userInitial userMenu-thumb">
                            {coInitial}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="chatItemFlexContainer marginBottom10 breakWord">
                      <span>
                        <strong>{companyName} <span className="mediumGreyText">overview</span></strong>
                        <span className="pointerCursor noBold marginLeft5 mediumGreyText fontSize12 padding5 tooltip dispInlineBlock">
                          {this.renderClaimCoProfileContent(approvalStatus)}
                        </span>
                      </span>

                    </span>
                  {/*}  {isLoggedIn && approvalStatus != '' && approvalStatus >= '3' && isPageManager && isMobile && (
                      <Modal {...UnsubscribeMobileProps} handleLocalStateOnClose={() => this.resetUnsubscribe()}>
                        <div className="showSmallModalSize">
                          {updateUnsubscribeSuccess == false && (
                            <React.Fragment>
                              <div className="modal-title">
                                <div className="emoji-icon cross-emoji successBox" />
                                Are you sure you want to unsubscribe?
                              </div>
                              <div className="ideas-Title marginBottom20">
                                You&#39;re about to lose access to Premium Employer features, such as job listings and enhanced employer branding
                              </div>
                              <div className="autocompleter">
                                <SelectBox
                                  options={unsubscribeOptions}
                                  name='selectUnsubscribe'
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
                                <button type="button" disabled={isUnsubscribing == true ? true : false} onClick={this.handleSubmitUnsubscribe} className="Submit-btn">
                                  {isUnsubscribing === true && (
                                    <LoadingSpinner />
                                  )}
                                  {isUnsubscribing != true && (
                                    <span>{wantsToLeave == 0 ? 'Keep Premium' : 'Cancel Subscription'}</span>
                                  )}
                                </button>
                              </div>
                            </React.Fragment>
                          )}
                          {updateUnsubscribeSuccess == true && (
                            <div className="modal-title">
                              <div className={"emoji-icon successBox" + (wantsToLeave == 0 ? ' heart-emoji' : ' sad-emoji')} />
                              {wantsToLeave == 0 ? 'Glad you\'re still here' : 'Please email talktous@prospela.com to request unsubscribe'}
                            </div>
                          )}
                        </div>
                      </Modal>
                    )}*/}
                    <div className="qDetail normalLineheight fontSize13 noBold marginBottom10 breakWord">
                      {company.description != '' ? company.description : ('Discover ' + companyName + ': learn directly from real employees, and explore work-life reality')}
                    </div>
                    {approvalStatus == '0' && fromThisCo && (
                      <div className={"darkGreyText fontSize12" + (isMobile ? " lineHeight40pc" : "")}>
                        <div className="dispInlineBlock">
                          <i className="fas fa-laptop" /> <div className="marginLeft5 profileClaimStatus dispInlineBlock">
                            <Modal {...ChooseProfileTypeModalProps} triggerText="+ Add Website" wider>
                              <BuyCoProfileModalContent
                                modalTitle='Select your Company profile type'
                                modalSubTitle='Choose between Free, Premium or Enterprise access'
                                showStd
                                showPrem
                                showSuperPrem
                                stdDesc='Get started by adding basic company info'
                                premDesc='Everything in Free + Job / event listings, enhanced employer branding and more!'
                                superPremDesc='Want to discuss your needs? Contact us!'
                                stdPrice='£0/mth'
                                premPrice='£100/mth'
                                superPremPrice='Contact Sales'
                                stdCourseLink=''
                                premCourseLink='www.stripe.com'
                                superPremCourseLink=''
                                showBottomTxt
                                formToShow={this.formToShow}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    )}
                    {(approvalStatus == '1' || approvalStatus == '2') && isPageManager && (
                      <div className={"darkGreyText fontSize12" + (isMobile ? " lineHeight40pc" : "")}>
                        <div className="dispInlineBlock">
                          <i className="fas fa-laptop" /> <div className="marginLeft5 profileClaimStatus dispInlineBlock">
                            <Modal {...ChooseProfileTypeModalProps} triggerText="+ Add Website" wider={false}>
                              <BuyCoProfileModalContent
                                modalTitle='Upgrade to access this feature'
                                modalSubTitle='Choose between Premium or Enterprise access'
                                showStd={false}
                                showPrem
                                showSuperPrem
                                stdCourseLink=''
                                premCourseLink='www.stripe.com'
                                superPremCourseLink=''
                                stdDesc='Get started by adding basic company info'
                                premDesc='Everything in Free + Job / event listings, enhanced employer branding and more!'
                                superPremDesc='Want to discuss your needs? Contact us!'
                                stdPrice='£0/mth'
                                premPrice='£100/mth'
                                superPremPrice='Contact Sales'
                                showBottomTxt
                                formToShow={this.formToShow}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    )}
                    {approvalStatus >= '2' && ( // i.e. has provided at least fere profile info and been approved
                      <div className={"button-unstyled qDetail fontSize12 breakWord noBold" + (isMobile ? " lineHeight40pc" : "")}>
                        <span>
                          <i className="fas fa-map-marker-alt" /> {company.country}
                        </span>
                        <span className="addLeftDivider">
                          <i className="fas fa-building" /> {companyType}
                        </span>
                        {(company.website != '' && approvalStatus >= '3') && (
                          <span className="addLeftDivider">
                            <Link to={company.website+"?utm_source=prospela.com"} className="link inheritColor">
                              <i className="fas fa-laptop" /> <span className="profileClaimStatus">Website</span>
                            </Link>
                          </span>
                        )}
                        <span className={isMobile == true ? 'dispBlock' : "addLeftDivider"}>
                          <i className="fas fa-user-friends" /> {companySize}
                        </span>
                      </div>
                    )}
                    <div className="marginBottom10">
                      <span className="bubbleContainer">
                        {indArrToShow.map((indID) => {
                          let industryItem, icon, indName
                          industryItem = getIndustryDeets(indID)
                          icon = industryItem.fa
                          indName = industryItem.label
                          return (
                            <Link to={{pathname: "/community/industry/" + industryItem.urlText, state: {prevPath: window.location.pathname}}} key={indID} className="bubble noBackground link noBold" onClick={this.props.updatePathName}>
                              <span><i className={icon} /> {indName}</span>
                            </Link>
                          )
                        })}
                      </span>
                    </div>
                  </div>
                  <span className="qCTA qaPage commPage">
                    {isLoggedIn && (
                      <React.Fragment>
                        <span className="marginRight8">
                          <ShareOptionsBox
                            id={company.coid}
                            qURL={companyURL}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={companyName}
                            customClassName="topBtn"
                          />
                        </span>
                        <Modal {...AddHighlightModalProps}>
                          <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole={userRole} updatePathName={this.props.updatePathName}/>
                        </Modal>
                        <Modal {...AddHighlightSmlModalProps}>
                          <AddHighlightModalContent modalID="modal-addHighlightSml" userRole={userRole} updatePathName={this.props.updatePathName}/>
                        </Modal>
                      </React.Fragment>
                    )}
                    {!isLoggedIn && (
                      <React.Fragment>
                        <div className="signUpPrompt-header isOnQAPage fontdarkGreyText marginBottom10 fontSize16">
                          <ShareOptionsBox
                            id={company.coid}
                            qURL={companyURL}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={companyName}
                            customClassName="topBtn"
                          />
                          <a className="button link Submit-btn signUpPrompt" href={"https://app.prospela.com/signup?origin=companyProfile&companyid=" + company.coid}>
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
              <Link to={{pathname: companyURLending, state: {prevPath: window.location.pathname}}}>
                <button type="button" name="overview" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
              </Link>
              <Link to={{pathname: companyURLending + "/jobs-and-opportunities", state: {prevPath: window.location.pathname}}}>
                <button type="button" name="jobs" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'jobs' ? ' tabActive' : '')}>
                  Jobs & Ops
                  {activeJobs.length > 0 && (
                    <div className="multiple green marginLeft5 paddingL10 fontSize10">Now hiring!</div>
                  )}
                </button>
              </Link>
            </div>
            <div className="marginTop20">
              <div className="sideBar sideBarContentHiddenOnShrink" role="complementary" aria-label="sidebar">
                {((isPageManager || fromThisCo || (!isPageManager && company.tipsforcandidates != '')) && tabToView == 'overview') && this.renderCoProfileSideBar(company, upgradeCoProfileQuestions, fullCoProfileQuestions, false, fromThisCo, approvalStatus) }
                {isLoggedIn && approvalStatus != '' && approvalStatus >= '3' && isPageManager && !isMobile && (
                  <Modal {...UnsubscribeProps} handleLocalStateOnClose={() => this.resetUnsubscribe()}>
                    <div className="showSmallModalSize">
                      {updateUnsubscribeSuccess == false && (
                        <React.Fragment>
                          <div className="modal-title">
                            <div className="emoji-icon cross-emoji successBox" />
                            Are you sure you want to unsubscribe?
                          </div>
                          <div className="ideas-Title marginBottom20">
                            You&#39;re about to lose access to Premium Employer features, such as job listings and enhanced employer branding
                          </div>
                          <div className="autocompleter">
                            <SelectBox
                              options={unsubscribeOptions}
                              name='selectUnsubscribe'
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
                            <button type="button" disabled={isUnsubscribing == true ? true : false} onClick={this.handleSubmitUnsubscribe} className="Submit-btn">
                              {isUnsubscribing === true && (
                                <LoadingSpinner />
                              )}
                              {isUnsubscribing != true && (
                                <span>{wantsToLeave == 0 ? 'Keep Premium' : 'Cancel Subscription'}</span>
                              )}
                            </button>
                          </div>
                        </React.Fragment>
                      )}
                      {updateUnsubscribeSuccess == true && (
                        <div className="modal-title">
                          <div className={"emoji-icon successBox" + (wantsToLeave == 0 ? ' heart-emoji' : ' sad-emoji')} />
                          {wantsToLeave == 0 ? 'Glad you\'re still here' : 'Please email talktous@prospela.com to request unsubscribe'}
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
                        <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href={"https://app.prospela.com/signup?origin=companyProfileSideBar&companyid=" + company.coid}>
                          Sign up (free)
                        </a>
                        <a className="dispBlock alignCenter fontSize13 electricPurpleText" href={"https://app.prospela.com/login?origin=companyProfileSideBar&companyid=" + company.coid}>or Login</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mainBar" role="main" aria-label="rendered tab">
                { this.renderTab(company, companyName, companyURL, loggedInFname, upgradeCoProfileQuestions, fullCoProfileQuestions, listJobQuestions) }
              </div>
            </div>
          </div>
        </div>
        {showClaimFreeProfileFormModal == true && (
          <FullPageModal {...ClaimFreeCoProfileModalProps} handleLocalStateOnClose={() => this.closeModal("ClaimFreeProfileForm")}>
            <Form
              questions={freeCoProfileQuestions}
              usedFor="freeCoProfileClaim"
              formTitle={"Claim your FREE " + companyName + " Profile"}
              onSubmit={() => this.handleSuccessModalFromFPModal("ClaimFreeProfileForm", "Success")}
            />
          </FullPageModal>
        )}
        {showSuccessModal == true && (
          <Modal {...SuccessModalProps} handleLocalStateOnClose={() => this.closeModal("Success")}>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Application submitted!
            </div>
            <div className="success-container">
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy reviewing your Company Profile updates and will notify you as soon as possible once it has been approved.
              </p>
              <p className="landingCTADesc">
                In the meantime, why not answer some Q&A or share a general post for mentees to see?
              </p>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default CoProfile;
