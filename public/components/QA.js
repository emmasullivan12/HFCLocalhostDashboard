// Dex last merged this code on 14th dec 022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddHighlightModalContent from "./AddHighlightModalContent";
import Avatar from './Avatar.js';
import {metaAdder, checkMobile, whichBrowser, Check, ChevronUp, DateCalc, TimeCalc, LoadingSpinner, X} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import MenuNav from './MenuNav.js';
import Modal from './Modal';
import QAThreads from './QAThreads.js';
import TextParser from './TextParser.js';
import UserBadge from './UserBadge.js';
import {getIndustryDeets, getVerifLevelArr, convertHashtags, getCredText, timeSince} from './UserDetail.js';

import "../css/QA.css";

const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
  usedFor: 'mentee-profile-qaItem',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  usedFor: 'mentor-profile-qaItem',
  backBtn: 'arrow'
}

const AddHighlightModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}
const AddAnswerModalProps = {
  ariaLabel: 'Add Answer',
  triggerText: 'Add Answer',
  usedFor: 'addAnswerQApage',
  changeInitFocus: true,
  wider: true
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteQ',
}

class QA extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
      isMobile: checkMobile(),
      qidHasAcceptedAnswer: false,
      //qidHasAcceptedAnswer: qaItem && qaItem.hasacceptedanswer ? qaItem.hasacceptedanswer : false,
      acceptedAnswerHID: '',
      //votes: this.props.qaItem.votes,
      //votes: 10,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.isMobile);
    const qaItem = {
      qid: '123456',
      uid: '123',
      hasacceptedanswer: false,
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2022-02-02T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer',
      //hids: [], // no answers yet
      hids: ['1234','1235'],
      //industriestopostto: ['2','19'],
      industriestopostto: ['2','19','1','3','4','5','6','7','8','9','10'],
      hashtags: ['23','20','1','2','0',],
      hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
      isanon: 0,
      isPr: 0,
      authorUserRole: 'mentee',
      authorinst: '',
      authorinstfreetext: 'Really Long Institution Name',
      authorrole: '',
    //  authorroleishidden: 0,
      authordegree: 'BSc (Hons) Business Administration',
      authortraining: '',
      authorinsttype: 'uni',
      authorstate: 'Bedf',
      authorcountry: 'GBR',
      votes: ['123','234','345','456'],
    //  reactions jsonb
    /*  seen: [
          mentors: [
            {uid: uid, ts: ts}
          ],
          mentees: [
            {uid: uid, ts: ts}
          ]
        ]*/
    //  followers jsonb
    //  deleted jsonb
    //  reported jsonb
    //  reportedstatus jsonb
    }
    const hidsArr = [
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        isPr: 0,
        authorUserRole: 'mentor',
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
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#firstanswer',
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        isPr: 0,
        authorUserRole: 'mentor',
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
        text: 'second answer',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 1,
        authorUserRole: 'mentor',
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
        url: 'google.com/answer/#thirdanswer',
      }
    ]
    this.countVotes(qaItem.qid, qaItem.votes)
    hidsArr.map((hid) => {
      return this.countVotes(hid.hid, hid.votes)
    });

    // On load, scroll to answer & show animation
    const hash = window.location.hash
    const id = hash.split('#')[1]
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: "smooth"});
      element.classList.add("highlighted-post")
    }

  /*  const acceptedAnswer = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer == true)
    console.log("about to update hasacceptedanswerHID in CDM to: "+acceptedAnswer.hid)
    this.setState({
      acceptedAnswerHID: acceptedAnswer.hid
    })*/

    /* this.setState({
      [qaItem.qid+"-userUpvoted"]: NEED TO DETECT IF USER HAS UPVOTED??
      [FOR EACH hid.hid+"-userUpvoted"]: NEED TO DETECT IF USER HAS UPVOTED??
    }) */
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.isMobile);
  }

  toggleUpvote = (postId) => {
    const currentState = this.state[postId+"-userUpvoted"];

    this.setState(prevState => {
      let newVotes, newIsUpvoted
      if (currentState == false || currentState == undefined) {
        newVotes = prevState[postId+'-votes'] + 1
        newIsUpvoted = true
      } else {
        newVotes = prevState[postId+'-votes'] - 1
        newIsUpvoted = false
      }

      return {
        [postId+"-userUpvoted"]: newIsUpvoted,
        [postId+'-votes']: newVotes
      }
    })
  }

  toggleAcceptedAnswer = (hid) => {
    const {qidHasAcceptedAnswer} = this.state

    if (qidHasAcceptedAnswer == true) {
      this.setState({
        acceptedAnswerHID: '',
        qidHasAcceptedAnswer: false
      })
    } else {
      this.setState({
        acceptedAnswerHID: hid,
        qidHasAcceptedAnswer: true
      })
    }
  }

  countVotes = (hid, votes) => {
    const myID = '123'; //223456
    this.setState({
      [hid+'-votes']: votes.length,
      [hid+'-userUpvoted']: votes.includes(myID)
    })
  }

  isMobile = () => {
    this.setState({
      isMobile: checkMobile()
    })
  }

  render() {
    const {isMobile, isLoading, acceptedAnswerHID, qidHasAcceptedAnswer} = this.state;
    const {updatePathName} = this.props
    const qaItem = {
      qid: '123456',
      uid: '123',
      fname: 'Emma',
      lname: 'Sullivan',
      isPr: 0,
      hasacceptedanswer: false,
      authorUserRole: 'mentee',
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2022-02-02T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer',
      //hids: [], // no answers yet
      hids: ['1234','1235'],
      //industriestopostto: ['2','19'],
      industriestopostto: ['2','19','1','3','4','5','6','7','8','9','10'],
      hashtags: ['23','20','1','2','0',],
      hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
      isanon: 0,
      authorinst: '',
      authorinstfreetext: 'Villiers High School',
      authorrole: '',
    //  authorroleishidden: 0,
      authordegree: '',
      authortraining: '',
      authorinsttype: 'sch',
      authorstate: 'Bedf',
      authorcountry: 'GBR',
      votes: ['123','234','345','456'],
      mentorseen: ['123','234','345','456'],
      menteeseen: ['123'],
      prseen: [],
      comments: [
        {cid: '1', text: 'comment 1', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '', datecreated: '234345345', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
        {cid: '2', text: 'comment 2', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        {cid: '3', text: 'comment 3', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        {cid: '4', text: 'comment 4', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        {cid: '5', text: 'comment 5', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
        {cid: '6', text: 'comment 6', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''}
      ],
      url: "what-best-wear-to-interview"
    //  reactions jsonb
    /*  seen: [
          mentors: [
            {uid: uid, ts: ts}
          ],
          mentees: [
            {uid: uid, ts: ts}
          ]
        ]*/
    //  followers jsonb
    //  deleted jsonb
    //  reported jsonb
    //  reportedstatus jsonb
    }
    const myID = '123'; //223456
    const userRole = 'pr'
    const prevURL = this.props.location.state && this.props.location.state.prevPath
  /*  const user = {
      birthday: '2015-02-02T13:30:50.667Z'
    }
    var ts = new Date(user.birthday);
    var today = new Date();
    const age = today.getFullYear() - ts.getFullYear()
    const isU18 = age < 18;*/
    const qIsMe = (qaItem.uid === myID) ? 'isMe' : 'isntMe';
  //  const hidsArr = []
    const hidsArr = [
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        isPr: 0,
        authorUserRole: 'mentor',
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
        votes: ['12','23'],
        isacceptedanswer:  true,
        hashtags: ['23','20'],
        hashtagsfreetext: ['my free text hashtag',],
        url: 'google.com/answer/#firstanswer',
        files: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '124', name: 'My PDF', type: 'application/pdf'},
          {fileid: '125', name: 'MyExcelspreadsheet.xls', type: 'application/vnd.ms-excel'},
          {fileid: '126', name: 'MyWorddocfilename.word', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
          {fileid: '127', name: 'MyPOWERPOINTBABY!', type: 'application/vnd-mspowerpoint'},
          {fileid: '128', name: 'My other doc format', type: 'other'}
        ]
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        isPr: 0,
        authorUserRole: 'mentor',
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
        text: 'second answer',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: [],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 1,
        authorUserRole: 'mentor',
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
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: ['123','20','2'],
        hashtagsfreetext: [],
        url: 'google.com/answer/#thirdanswer',
      }
    ]
    const acceptedAnswer = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer == true)
    const suggestedAnswers = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer != true)
    const suggestedAnswersStructured = suggestedAnswers && suggestedAnswers.map(hid => {
      const answer = {
        "@type": "Answer",
      }

      answer.text = hid.text
      answer.upvoteCount = hid.votes.length
      if (hid.url != '') {
        answer.url = "https://app.prospela.com/questions/" + hid.url
      }

      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        },*/

      return answer
    })
    let qURL = "https://app.prospela.com/questions/" + qaItem.qid + qaItem.url
    const qaStructuredData = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "url": qURL,
      "mainEntity": {
        "@type": "Question",
        "name": qaItem.title,
        "text": qaItem.textdetail,
        "answerCount": qaItem.hids.length,
        "upvoteCount": qaItem.votes.length,
      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        }, */
        ...(acceptedAnswer.length > 0 && {
          "acceptedAnswer": {
            "@type": "Answer",
            "text": acceptedAnswer[0].text,
          /*  "author": {
              "@type": "Person",
              "name": "New Baking User"
            },*/
            "upvoteCount": acceptedAnswer[0].votes.length,
            ...(acceptedAnswer[0].url != '' && {
              "url": "https://app.prospela.com/questions/" + acceptedAnswer[0].url, // This is not required, but strongly recommended
            })
          },
        }),
        ...(suggestedAnswers.length > 0 && {
          "suggestedAnswer": suggestedAnswersStructured
        })
      }
    }

    // Add meta tags
    metaAdder('property="og:type"', "website")
    metaAdder('property="og:title"', qaItem.title + " - Prospela.com")
    metaAdder('name="title"', qaItem.title + " - Prospela.com")
    metaAdder('property="og:url"', qURL)
    metaAdder('property="og:site_name"', "Prospela.com")
    if(qaItem.textdetail) {
      metaAdder('name="description"', qaItem.textdetail)
      metaAdder('property="og:description"', qaItem.textdetail)
    }

    const credentialText = getCredText(qaItem.authorinsttype, qaItem.authorrole, qaItem.authorroleishidden, qaItem.authorinst, qaItem.authorinstfreetext, qaItem.authortraining, qaItem.authordegree, qaItem.authorstate, qaItem.authorcountry)
    let activeDatesArr = []

    if (qaItem) {
      activeDatesArr.push(qaItem.lastupdated)
    }

    let suggestedAnswersSorted = suggestedAnswers && suggestedAnswers.sort((a, b) => {
      return b.votes.length - a.votes.length || new Date(b.lastupdated) - new Date(a.lastupdated);
    });
    let hidsArrSorted = [
      ...(acceptedAnswer.length > 0 ? acceptedAnswer : []),
      ...(suggestedAnswersSorted.length > 0 ? suggestedAnswersSorted : []),
    ]
    if (hidsArrSorted && hidsArrSorted.length > 0) {
      hidsArrSorted.map((hid) => {
        return activeDatesArr.push(hid.lastupdated)
      });
    }
    const mostRecentActivityDate = activeDatesArr.sort().slice(-1)

    //Prioritise showing similar industries to viewer
    const viewersIndustries = ['2','11']
    //const viewersIndustries = userRole == 'mentee' ? this.props.users.industries : this.props.users.industriesexp
    const indToPostTo = qaItem.industriestopostto
    let indArrToShow
    if (indToPostTo && indToPostTo.length <= 2) {
      indArrToShow = indToPostTo
    } else {
      const indToPostToFiltered = indToPostTo && indToPostTo.filter(ind => viewersIndustries.includes(ind))
      if (indToPostToFiltered && indToPostToFiltered.length == 0) {
        indArrToShow = indToPostTo.slice(0,2) // Will just show the poster's first 2 industries
      } else if (indToPostToFiltered && indToPostToFiltered.length >= 2) {
        indArrToShow = indToPostToFiltered.slice(0,2) // Will show the first 2 relevant industries
      } else {
        indArrToShow = indToPostToFiltered // Will only show the relevant industry even if there are more
      }
    }

    const hashtagsCommaString = (qaItem.hashtags.length > 0 || qaItem.hashtagsfreetext.length > 0) ? convertHashtags(qaItem.hashtags, qaItem.hashtagsfreetext) : []
    const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
    const numViews = (qaItem.mentorseen && qaItem.mentorseen.length) + (qaItem.menteeseen && qaItem.menteeseen.length) + (qaItem.prseen && qaItem.prseen.length)
    const numViewsFormatted = numViews < 1000 ? numViews : ((Math.round(numViews / 100) / 10) + 'k')
    const isSafari = whichBrowser() == 'safari'
    let aIsMe, aCredentialText, aAuthorinsttype

    return (
      <React.Fragment>
        <script type="application/ld+json">
          {JSON.stringify(qaStructuredData)}
        </script>
        {isLoading == true ? (
          <div className="padding25 marginTop20">
            <LoadingSpinner />
          </div>
        ) : (
          <React.Fragment>
            <div className="padding25 marginTop40">
            {/*  <MenuNav /> */}
              <Link to={prevURL ? prevURL : "/home"} onClick={updatePathName}>
                <div className="absolute marginTopMinus30 darkGreyText dispInlineBlock fontSize14" id="qaCloseBtn">
                  <span className="dispInlineBlock"><X /></span>
                {/*  <span><i className="fas fa-arrow-left"/></span> */}
                  <span> Close</span>
                </div>
              </Link>
              <div className="borderBtm borderGrey paddingBtm marginBottom20">
                <div className={isMobile == true ? "" : "chatItemFlexContainer"}>
                  <span className="qTitle qaPage marginBottom20 breakWord"><strong>{qaItem.title}</strong></span>
                  <span className={isMobile == true ? "dispBlock" : "absolute right20"}>
                    {userRole == 'mentee' && (
                      <Modal {...AddHighlightModalProps}>
                        <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                      </Modal>
                    )}
                    {userRole == 'mentor' && (
                      <Modal {...AddAnswerModalProps}>
                        <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole='mentor' isAddAnswer/>
                      </Modal>
                    )}
                  </span>
                </div>
                <div className="darkGreyText fontSize13">
                  <div>
                    Asked {timeSince(qaItem.datecreated)} in <span className="bubbleContainer">
                      {indArrToShow.map((indID) => {
                        let industryItem, icon, indName
                        if (indID == '99999') {
                          icon = 'fas fa-hashtag'
                          indName = 'General Advice'
                        } else {
                          industryItem = getIndustryDeets(indID)
                          icon = industryItem.fa
                          indName = industryItem.label
                        }
                        return <div className="bubble noBackground" key={indID}><i className={icon} /> {indName}</div>
                      })}
                    </span>{qaItem.industriestopostto.length > 2 ? 'and other groups' : ''}
                  </div>
                  <div>
                    <span className="paddingR20">Active {timeSince(mostRecentActivityDate)}</span>
                    <span><span className="greyText"><i className="fas fa-eye"/></span> Viewed {numViewsFormatted} times</span>
                  </div>
                  <div className={"fontSize20 marginTop10 marginBottom5 " + (this.state[qaItem.qid+"-userUpvoted"] == true ? "electricPurpleText" : "darkGreyText")}>
                    <button type="button" className={"button-unstyled alignCenter " + (this.state[qaItem.qid+"-userUpvoted"] == true ? "opacity1" : "")} onClick={() => this.toggleUpvote(qaItem.qid)}>
                      <span className="paddingR5">
                        {this.state[qaItem.qid+"-userUpvoted"] == true && (
                          <i className="fas fa-bell" />
                        )}
                        {this.state[qaItem.qid+"-userUpvoted"] != true && (
                          <i className="far fa-bell" />
                        )}
                      </span>
                      <span className="fontSize12 verticalAlignMiddle noSelect">{this.state[qaItem.qid+"-userUpvoted"] == true ? 'Following' : 'Follow'}</span>
                    </button>
                    {/*  {this.state[qaItem.qid+"-votes"]} */}
                  </div>
                </div>
              </div>
            {/*  <div className="mainBar" role="main" aria-label="question and answers"> */}
              <div role="main" aria-label="question and answers">
                <div className="gridContainer">
                  <div className="gridRightColumn">
                    {qaItem.textdetail && (
                      <div className="qDetailContainer marginBottom20">
                        <TextParser text={qaItem.textdetail} />
                      </div>
                    )}
                    {hashtagsArray.length > 0 && (
                      <div className="tagsList">
                        {hashtagsArray.map((hashtag) => {
                          return (
                            <span
                              key={hashtag}
                              className="multiple value paddingR"
                              id={hashtag}
                            >
                              {hashtag}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    <div className="marginTop20 marginBottom20 qActionsContainer">
                      {/*<div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20"> */}
                      {/*  <div className="marginRight8">Share</div>
                        <div className="marginRight8">Follow</div> */}
                      {/*  {qIsMe == 'isMe' && (
                          <Modal {...DeleteContentModalProps}>
                            <DeleteContentModalContent />
                          </Modal>
                        )} */}
                      {/*  <div className="marginLeft8">Report</div> */}
                      {/* </div> */}
                      <div className="credentialSuperContainer">
                        <div className="credentialPreviewContainer">
                          <div className="textLeft greyText fontSize12">asked <DateCalc time={qaItem.datecreated} showPureDate /> at <TimeCalc time={qaItem.datecreated} /></div>
                          <div className="gridContainer marginTop10">
                            <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                              <Avatar userID={qaItem.uid} isAnon={qaItem.isanon} userName={qaItem.isanon ? 'Anonymous' : qaItem.fname} showAsCircle picSize={360}/>
                            </div>
                            <div className="gridRightColumn textLeft whiteSpace fontSize12">
                              {qaItem.isanon != true && qaItem.isPr != true && qaItem.authorinsttype != 'sch' && (
                                <div>
                                {/*  <strong>{qaItem.isanon ? "" : (qaItem.fname + (qaItem.authorinsttype == 'sch' ? "" : (" " + qaItem.lname)))}</strong> */}
                                  {qaItem.authorUserRole == 'mentee' ? (
                                      <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={qaItem.fname + (qaItem.authorinsttype == 'sch' ? "" : (" " + qaItem.lname))}>
                                        <MenteeProfileContent />
                                      </FullPageModal>
                                      )
                                    : (
                                      <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={qaItem.fname + (qaItem.authorinsttype == 'sch' ? "" : (" " + qaItem.lname))}>
                                        <MentorProfileContent />
                                      </FullPageModal>
                                    )
                                  }
                                </div>
                              )}
                              {(qaItem.isPr == true || qaItem.authorinsttype == 'sch') && (
                                <div className="tooltip">
                                  <strong>{qaItem.isanon ? "" : (qaItem.fname + (qaItem.authorinsttype == 'sch' ? "" : (" " + qaItem.lname)))}</strong>
                                  <span className={"tooltiptext hiddenProf below" + (isSafari == true ? " fontSize11" : "")}>
                                    This profile cannot be viewed
                                  </span>
                                </div>
                              )}
                              <div className="darkGreyText">{credentialText}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <QAThreads comments={qaItem.comments} originalPostAuthorID={qaItem.uid} />
                    </div>
                  </div>
                </div>
                <br />
                <div>
                {/*  {qaItem.hids.length == 0 ? (
                    <div className="qTitle qaPage marginBottom20 breakWord"><strong>Know someone who can answer?</strong> Share a link to this question via email or Twitter.</div>
                  ) : (*/}
                  {qaItem.hids.length > 0 && (
                    <div className="qTitle qaPage marginBottom20 breakWord"><strong>{qaItem.hids.length} Answers</strong></div>
                  )}
                </div>
                {hidsArrSorted.map((hid) => {
                  const aHashtagsCommaString = (hid.hashtags.length > 0 || hid.hashtagsfreetext.length > 0) ? convertHashtags(hid.hashtags, hid.hashtagsfreetext) : []
                  const aHashtagsArray = aHashtagsCommaString.length == 0 ? [] : aHashtagsCommaString.split(', ')
                  const hashURL = hid.url.split('#')[1] // Get the bit after the hash '#' in the saved URL

                  let isProspelaTeam, verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, verifTypesArr, hasMinVerif
                  let userRoleOfAuthor = 'mentor'

                  if (userRoleOfAuthor == 'mentor') {
                    const mentor = {
                      verifiedtype: '1',
                      eduemailverif: '',
                      profemailverif: '',
                      mentorsustep: '',
                      tsapproved: ''
                    }
                    isProspelaTeam = false
                    verifiedType = mentor.verifiedtype
                    eduemailverif = mentor.eduemailverif;
                    profemailverif = mentor.profemailverif;
                    mentorSUStep = mentor.mentorsustep;
                    tsapproved = mentor.tsapproved // THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND
                    verifTypesArr = getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, isProspelaTeam)
                  }

                  hasMinVerif = userRoleOfAuthor == 'mentee' ? false : (verifTypesArr && verifTypesArr.length > 0)

                  aIsMe = (hid.uid === myID) ? 'isMe' : 'isntMe';
                  aAuthorinsttype = hid.authorinsttype
                  aCredentialText = getCredText(hid.authorinsttype, hid.authorrole, hid.authorroleishidden, hid.authorinst, hid.authorinstfreetext, hid.authortraining, hid.authordegree, hid.authorstate, hid.authorcountry)

                  return (
                    <div key={hid.hid} id={hashURL} className="gridContainer borderBtm borderGrey paddingBtm marginBottom20">
                      <div className="gridLeftColumn paddingR20">
                        <div className="displayFlex flexDirColumn alignCenter">
                          <div className={"fontSize28 marginBottom5 " + (this.state[hid.hid+"-userUpvoted"] == true ? "electricPurpleText" : "darkGreyText")}>
                            <button type="button" className={"button-unstyled " + (this.state[hid.hid+"-userUpvoted"] == true ? "opacity1" : "")} onClick={() => this.toggleUpvote(hid.hid)}>
                              <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                                <path d="M2 25h32L18 9 2 25Z"/>
                              </svg>
                            </button>
                          </div>
                          {this.state[hid.hid+'-votes']}
                          {/* {hid.isacceptedanswer == true && ( */}
                          {hid.hid == acceptedAnswerHID && (
                            <div className={"greenText marginTop10 fontSize25 tooltip" + ((userRole == 'pr' || qIsMe == true) ? " pointerCursor" : "")} onClick={(userRole == 'pr' || qIsMe == true) ? () => this.toggleAcceptedAnswer(hid.hid) : null}>
                              <Check />
                              <span className="tooltiptext acceptedAnswer">
                                Accepted answer
                              </span>
                            </div>
                          )}
                        {/*  {qaItem.hasacceptedanswer == false && (userRole == 'pr' || qIsMe == true) && ( */}
                          {qidHasAcceptedAnswer == false && (userRole == 'pr' || qIsMe == true) && (
                            <div className="lightGreyText marginTop10 fontSize25 tooltip pointerCursor" onClick={() => this.toggleAcceptedAnswer(hid.hid)}>
                              <Check />
                              <span className="tooltiptext acceptedAnswer">
                                Mark as Accepted answer?
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="gridRightColumn">
                        <div className="qDetailContainer marginBottom20">
                          <TextParser text={hid.text} />
                        </div>
                        {hid.files && hid.files.length > 0 && (
                          <div className="answerFilesContainer marginBottom20">
                            {hid.files.map((file, index) => {
                              return (
                                <div className="extra-content-container" key={file.fileid}>
                                  <DisplayMsgFile
                                    file={file}
                                    isQA
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {aHashtagsArray.length > 0 && (
                          <div className="tagsList">
                            {aHashtagsArray.map((hashtag) => {
                              return (
                                <span
                                  key={hashtag}
                                  className="multiple value paddingR"
                                  id={hashtag}
                                >
                                  {hashtag}
                                </span>
                              )
                            })}
                          </div>
                        )}
                        <div className="marginTop20 marginBottom20 qActionsContainer">
                          <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20">
                          {/*  <div className="marginRight8">Share</div>
                            <div className="marginRight8">Follow</div> */}
                            {aIsMe == 'isMe' && (
                              <Modal {...DeleteContentModalProps}>
                                <DeleteContentModalContent />
                              </Modal>
                            )}
                          {/*  <div className="marginLeft8">Report</div> */}
                          </div>
                          <div className="credentialSuperContainer">
                            <div className="credentialPreviewContainer">
                              <div className="textLeft greyText fontSize12">answered <DateCalc time={hid.datecreated} showPureDate /> at <TimeCalc time={hid.datecreated} /></div>
                              <div className="gridContainer marginTop10">
                                <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                                  <Avatar userID={hid.uid} isAnon={hid.isanon} userName={hid.isanon ? 'Anonymous' : hid.fname} showAsCircle picSize={360}/>
                                </div>
                                <div className="gridRightColumn textLeft whiteSpace fontSize12">
                                  {hid.isanon != true && hid.isPr != true && hid.authorinsttype != 'sch' && (
                                    <div>
                                    {/*  <strong>{hid.isanon ? "" : (hid.fname + (aAuthorinsttype == 'sch' ? "" : (" " + hid.lname)))}</strong> */}
                                      {hid.authorUserRole == 'mentee' ? (
                                          <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={hid.fname + (aAuthorinsttype == 'sch' ? "" : (" " + hid.lname))}>
                                            <MenteeProfileContent />
                                          </FullPageModal>
                                          )
                                        : (
                                          <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={hid.fname + (aAuthorinsttype == 'sch' ? "" : (" " + hid.lname))}>
                                            <MentorProfileContent />
                                          </FullPageModal>
                                        )
                                      }
                                      {hasMinVerif == true && (
                                        <span className="tooltip fontSize18">
                                          <UserBadge badgeType='pr-certified' />
                                          <span className="tooltiptext onQA below">
                                            <strong>Prospela Certified Mentor</strong>
                                          </span>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {(hid.isanon == true || hid.isPr == true || hid.authorinsttype == 'sch') && (
                                    <div>
                                      <strong>{hid.isanon ? "Anonymous" : (hid.fname + (aAuthorinsttype == 'sch' ? "" : (" " + hid.lname)))}</strong>
                                      {hasMinVerif == true && (
                                        <span className="tooltip fontSize18">
                                          <UserBadge badgeType='pr-certified' />
                                          <span className={"tooltiptext onQA below" + (hid.isanon ? " anonymous" : "")} >
                                            <strong>Prospela Certified Mentor</strong>
                                          </span>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  <div className="darkGreyText">{aCredentialText}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  )
                })}
                <div className="marginBottom50 marginTop20">
                  {userRole == 'mentee' && (
                    <div>
                      <div className="qTitle marginBottom5"><strong>Not the answer you were looking for?</strong> Ask your own question</div>
                      <Modal {...AddHighlightModalProps}>
                        <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                      </Modal>
                    </div>
                  )}
                  {userRole == 'mentor' && (
                    <div>
                      <div className="qTitle marginBottom5"><strong>{qaItem.hids.length == 0 ? 'Can you answer?' : 'Got something to add?'}</strong> The Prospela community would love to hear {qaItem.hids.length == 0 ? 'what you have to say!' : 'it!'}</div>
                      <Modal {...AddAnswerModalProps}>
                        <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole='mentor' isAddAnswer/>
                      </Modal>
                    </div>
                  )}
                </div>
              </div>
              {/*}<div className="sideBar" role="complementary" aria-label="sidebar">
                SIDEBAR PLACEHOLDER
              </div>*/}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QA;
