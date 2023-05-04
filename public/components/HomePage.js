// Last merged this code on 21st apr 2023

import React, { Component } from 'react';
import {Link} from "react-router-dom";
/*import React, { Component, useCallback } from 'react';
import {Link, useHistory} from "react-router-dom";*/

import AddHighlightModalContent from "./AddHighlightModalContent";
import AutoEnrollPrompt from "./AutoEnrollPrompt";
import {cdn} from './CDN.js';
import Checkbox from './Checkbox.js';
import FeedbackReqPrompt from "./FeedbackReqPrompt";
import FeedContainer from "./FeedContainer.js";
import FeedHeader from './FeedHeader.js';
import Form from './Form.js';
import FullPageModal from './FullPageModal.js';
import GroupCircle from "./GroupCircle";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import MenteeFullSignUp from './MenteeFullSignUp.js';
import MentorFullSignUp from './MentorFullSignUp.js';
import MenteeTraining from './MenteeTraining.js';
import MentorTraining from './MentorTraining.js';
import Modal from './Modal';
import NewAnswerToQPrompt from "./NewAnswerToQPrompt";
import NewMatchPrompt from "./NewMatchPrompt";
import UpdateExpertiseContent from './UpdateExpertiseModalContent.js';
import U18CameraUploadContent from './U18CameraUploadContent.js';
import U18FileUploadContent from './U18FileUploadContent.js';
import {percentageCircle, checkMobile, ChevronDown, ChevronUp} from './GeneralFunctions.js';
import skillsOptions from './Skills.js';
import "../css/HomePage.css";
import "../css/HomepageCTAContainer.css";

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSmlHome',
  changeInitFocus: true
}

const JoinProgrammeStepModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSmlHome',
  hideTrigger: true,
  changeInitFocus: true
}

const SuccessModalProps = {
  ariaLabel: 'Successfully submitted',
  triggerText: 'Successfully submitted',
  usedFor: 'success',
  hideTrigger: true,
  changeInitFocus: true
}

const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: '+ Posts',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

const AddQModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Post Question',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddQSmlModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: '+ Question',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

const MentorSkillsLearningPromptProps = {
  ariaLabel: 'Add your key skills >>',
  triggerText: 'Add your key skills >>',
  usedFor: 'skillsLearningForm',
  backBtn: 'arrow',
  hideTrigger: true,
  changeInitFocus: true,
}
const MenteeSkillsLearningPromptProps = {
  ariaLabel: 'Add what you want to learn >>',
  triggerText: 'Add what you want to learn >>',
  usedFor: 'skillsLearningForm',
  backBtn: 'arrow',
  hideTrigger: true,
  changeInitFocus: true,
}
const AnswerQModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addHighlightDashboard',
  hideTrigger: true,
  changeInitFocus: true,
  wider: true
}
const AskQModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'askQuestionDashboard',
  hideTrigger: true,
  changeInitFocus: true,
  wider: true
}
const U18CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  triggerText: 'Take Selfie with Photo ID >>',
  usedFor: 'U18picContainer',
  hideTrigger: true,
}
const U18CameraUploadFromModalModalProps = {
  ariaLabel: 'Upload a picture',
  triggerText: 'Take Selfie with Photo ID >>',
  usedFor: 'U18picContainer',
  hideTrigger: false,
}
const U18FileUploadModalProps = {
  ariaLabel: 'Upload a CV/Resume or URL of your LinkedIn profile)',
  triggerText: 'Upload CV / LinkedIn >>',
  usedFor: 'U18fileContainer',
  changeInitFocus: true,
  hideTrigger: true,
}
const MentorTrainingModalProps = {
  ariaLabel: 'Complete your 5-min Mentor Training',
  triggerText: 'Complete your 5-min Mentor Training >>',
  usedFor: 'trainingModal',
  hideTrigger: true,
//  changeInitFocus: true,
}
const MenteeTrainingModalProps = {
  ariaLabel: 'Complete your 5-min Mentee Training',
  triggerText: 'Complete your 5-min Mentee Training >>',
  usedFor: 'trainingModal',
  hideTrigger: true,
}

class HomePage extends Component {
  observer = null

  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.tabToView ? this.props.tabToView : 'all',
      userStepsIsOpen: true,
      userstep: 'somethingElse', //didU18tf
      userRole: 'mentee',
      source: 'vhs',
      filterBy: 'latest',
      searchText: '',
      showSuccessModal: false,
      showAddSkillsModal: false,
      showAnswerAQModal: false,
      showAskAQModal: false,
      showMentorFullAppModal: false,
      showMenteeFullAppModal: false,
      showJoinAGroupModal: false,
      showMentorIDModal: false,
      showMentorCVModal: false,
      showMentorTrainingModal: false,
      showMenteeTrainingModal: false,
      isUserSearch: false,
      seenQIDsArr: [],
      seenHIDsArr: [],
      windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // grab window size
      userIsClickingStepsBox: false,
      cameFromAddHighlightBtn: false,
      hideKeyNotifBox: false,
      numResults: 0,
      prevFeedScrollPos: this.props.prevFeedScrollPos ? this.props.prevFeedScrollPos : 0,
      userStepsWasOpenInFeed: this.props.userStepsWasOpenInFeed != null ? this.props.userStepsWasOpenInFeed : null,
      newPostsAbove: true,
      newPostsBannerSeen: false,
    }
  }

  componentDidMount() {
    document.getElementById("clientWindowContainer").classList.add('overflowYHidden')
    window.addEventListener("resize", this.updateShowStepsInSideBar);

    const {prevFeedScrollPos, userStepsWasOpenInFeed} = this.state

    if (prevFeedScrollPos != 0) {
      const homepageContainer = document.getElementById("homepageContainer")
      if (userStepsWasOpenInFeed != null) {
        this.setStepsBoxAsWasPrev(userStepsWasOpenInFeed)
      }
      homepageContainer.scrollTo({ top: prevFeedScrollPos, behavior: 'auto' });
    }

    // Create observer to detect which feed items have been viewed in viewport
    this.observer = this.createFeedItemObserver()

    // Track all feed items currently loaded
    document.getElementById("feedItems").querySelectorAll('.feedItem').forEach((item) => {
      this.observer.observe(item);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {tabToView} = this.props; // This comes from Dashboard.js
    const {isUserSearch, justResetSearch, userStepsIsOpen, windowWidth, userIsClickingStepsBox, cameFromAddHighlightBtn, hideKeyNotifBox} = this.state
    if (this.props.location.state && this.props.location.state.fromAddHighlightBtn == true) {
      this.setState({
        cameFromAddHighlightBtn: true
      }, () => {
        this.props.history.push({
          state: { fromAddHighlightBtn:false }
        })
      })
    }
    const sideBarIsShowing = windowWidth > 1080

    // Scroll to top of feed if click the "Q&A" add highlight button
    if (cameFromAddHighlightBtn == true) {
      if (isUserSearch == true) {
        this.resetSearch()
      }
      if (this.state.searchText != '') {
        this.resetSearchTextChange()
      }

      this.setState({
        userStepsIsOpen: false,
        hideKeyNotifBox: true
      })

      const homepageContainer = document.getElementById("homepageContainer")
      homepageContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if ((isUserSearch == true || cameFromAddHighlightBtn == true) && sideBarIsShowing != true && (userStepsIsOpen == true || hideKeyNotifBox == false) && userIsClickingStepsBox == false && prevState.userIsClickingStepsBox != true) {
      this.setState({
        userStepsIsOpen: false,
        hideKeyNotifBox: true
      })
    }

    // Maybe use this to determine whether to trigger or not https://stackoverflow.com/questions/69806279/how-to-know-a-react-link-component-has-been-clicked
    if (tabToView == "questions" && tabToView != this.state.tabToView && isUserSearch != true && justResetSearch != true) {

      this.setState({
        tabToView: tabToView,
      })

      if (!sideBarIsShowing) {
        this.setState({
          userStepsIsOpen: false
        })
      }
    }

    if (cameFromAddHighlightBtn == true) {
      this.setState({
        cameFromAddHighlightBtn: false // reset back to false
      })
    }

    if (justResetSearch == true) {
      this.setState({
        justResetSearch: false,
        hideKeyNotifBox: false
      })
    }

    if (userIsClickingStepsBox == true) {
      this.setState({
        userIsClickingStepsBox: false
      })
    }

    // Observe new feed items that are loaded
    if (this.state.newFeedItemsLoaded == true) {
      // Firstly, stop observing all prev feed items. Might not need to do this because I already unobserve each individual item once it becomes visible
      this.observer.disconnect()

      // Observe those new items
      this.state.newFeedItemArr.map((item) => {
        this.observer.observe(item);
      })
    }
  }

  componentWillUnmount() {
    // Unobserve all feed items
    // const observer = this.createFeedItemObserver()
    /*document.getElementById("feedItems").querySelectorAll('.feedItem').forEach((item) => {
      this.observer.unobserve(item);
    });*/
    this.observer.disconnect()

  /*  this.props.history.push({
      state: { currFeedScrollPos: document.scrollTop }
    }, () => { */
    //  console.log("currFeedScrollPos onCLOSE: ")
    //  console.log(this.props.location.state && this.props.location.state.currFeedScrollPos)
//    })

    document.getElementById("clientWindowContainer").classList.remove('overflowYHidden')
    window.removeEventListener("resize", this.updateShowStepsInSideBar);
  }

  // If screen is resized to show sizebar, always have the steps box open
  updateShowStepsInSideBar = () => {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth // grab window size
    const sideBarIsShowing = w > 1080
    this.setState({
      windowWidth: w,
      userStepsIsOpen: sideBarIsShowing
    })
  }

  hideNewPostsNotif = (e) => {
    if (e != null) {
      // If clicked 'x'
      if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
        this.markAsSeen();
      }
    }
    this.setState({
      newPostsAbove: false
    })
  }

  loadNewPosts = (e) => {
    // If user clicks on 'x' to close/ignore the button then do nothing
    if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
      return
    } else {
      console.log("Dex to load new posts")
    }
  }

  markAsSeen = (hideNewMsgsBelowBtn) => {
    this.setState({
      newPostsBannerSeen: true
    })
  }

  createFeedItemObserver = () => {
    let options = {
      threshold: 1
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target
        const itemId = el.dataset.itemid
        const itemType = el.dataset.itemtype

        if (entry.intersectionRatio > 0) {
          if (itemType == "question") {
            // Stop observing the item as we don't need to anymore
            this.observer.unobserve(el);

            this.setState(prevState => ({
              seenQIDsArr: [...prevState.seenQIDsArr, itemId],
            //  seenQIDsArr: [...prevState.seenQIDsArr, {"itemId": itemId}]
            //}), () => {
            //  console.log(this.state.seenQIDsArr)
            //  console.log(this.observer)
            }))
          } else if (itemType == "answer" || itemType == "general") {
            // Stop observing the item as we don't need to anymore
            this.observer.unobserve(el);

            this.setState(prevState => ({
              seenHIDsArr: [...prevState.seenHIDsArr, itemId],
            //  seenHIDsArr: [...prevState.seenHIDsArr, {"itemId": itemId}]
            //}), () => {
            //  console.log(this.state.seenHIDsArr)
            }))
          }

          // Update scroll position
        /*  this.setState({
            currScrollPos:
          }) */
        }

      // Might need to add something for switching tabs i.e. from "All" to "Questions" tab on feed

      });
    }, options);

    return observer
  }

  showUpdateTabBtns = () => {
    const {tabToView, isUserSearch} = this.state

    return (
      <div className={isUserSearch == true ? "marginTop20" : ""}>
        <Link to="/home">
          <button type="button" name="all" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'all' ? ' tabActive' : '')}>All</button>
        </Link>
        <Link to="/questions">
          <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
        </Link>
      </div>
    )
  }

  // If has hardcoded "all" or "questions" then means <Link> wasnt clicked but needs to be redirected to that tab
  updateTabToView = (e) => {
    const {isUserSearch} = this.state
    const {updatePathName} = this.props

  /*  if (!isUserSearch) {
      this.updateActiveClasslists()
    }*/

    this.setState({
      tabToView: e == 'all' ? 'all' : (e == 'questions' ? 'questions' : e.target.name),
      filterBy: 'latest' // Sort posts by "latest" by default on tab change
    }, () => {
      if (isUserSearch == true) {
        if (e == 'all') {
          this.props.history.push('/home');
        } else if (e == 'questions') {
          this.props.history.push('/questions');
        }
        updatePathName()
      }
    })
  }

  filterBy = (e) => {
    const {filterBy} = this.state
    e.stopPropagation()

    /* eslint-disable no-restricted-syntax */
  /*  for (let sibling of e.currentTarget.parentNode.children) {
      if (sibling !== e.currentTarget) {
        sibling.classList.remove('isActive');
      }
    } */

    this.setState({
      filterBy: e.currentTarget.value
    })

  //  e.currentTarget.classList.add('isActive')

    // Update URL with searchParams i.e. "?filter=Unanswered"
    const url = new URL(window.location);
    url.searchParams.set('filter', e.currentTarget.value);
    history.pushState({}, '', url) // eslint-disable-line no-restricted-globals

    // Actually do the filtering here
  }

  /*updateActiveClasslists = () => {
    const {tabToView} = this.state;
    const filterBtns = document.querySelectorAll(".filter-btn");

    for(var i=0; i < filterBtns.length; i++){
      if (tabToView == 'all' && filterBtns[i].value == 'latest') {
        filterBtns[i].classList.add('isActive');
      } else if (tabToView == 'questions' && filterBtns[i].value == 'latest') {
        filterBtns[i].classList.add('isActive');
      } else {
        filterBtns[i].classList.remove('isActive');
      }
    }
  }*/

  handleSearchTextChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  resetSearchTextChange = () => {
    this.setState({
      searchText: ''
    })
  }

  handleSearchResults = () => {
    this.setState({
      isUserSearch: true,
    }, () => {
      this.updateTabToView('all')
    })
  }

  resetSearch = () => {
    const {cameFromAddHighlightBtn} = this.state
  //  const cameFromAddHighlightBtn = this.props.location.state && this.props.location.state.fromAddHighlightBtn

    if (cameFromAddHighlightBtn == true) {
      this.updateTabToView('questions')
    } else {
      this.updateTabToView('all')
    }

    this.resetSearchTextChange()

    this.setState({
      justResetSearch: true,
      isUserSearch: false,
    }, () => {
      document.getElementById("mainSearchBox").focus();
    })
  }

  /*closeSucessModal = () => {
    this.setState({
      showSuccessModal: false
    });
  } */

  showSuccessModal = (successModalToShow) => {
    this.setState({
      showSuccessModal: true,
      successModalToShow: successModalToShow
    });
  }

  handleFeedClick = (e) => {
    e.stopPropagation()

    const feedItems = document.getElementById('feedItems')

    // Only if item is on the feed, otherwise is probably in a modal
    if (feedItems.contains(e.target)){
      const {userStepsIsOpen} = this.state
      const {updateFeedScrollPos} = this.props
      const prevScrollPos = e.target.closest('#homepageContainer').scrollTop
      updateFeedScrollPos(prevScrollPos, userStepsIsOpen)

    // Is probably within a modal i.e. not directly clicking on feed
    } else {
      return
    }

  }

  renderTab = () => {
    const {tabToView, userRole, isUserSearch, filterBy, numResults} = this.state;
    const {updatePathName, isLoggedIn, maxViewsReached, handleUnlockBtnClick, checkHasAccess, noAccessHandler} = this.props
  //  const contentArr = []
  /* const contentArr = [ // Questions
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriestopostto: ['99999','19'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'questions',
        hasacceptedanswer: false,
        votes: ['123','234','345','456'],
        mentorseen: ['123','234','345','456'],
        menteeseen: ['123'],
        prseen: [],
        uid: '123',
        isanon: 0,
        authorinsttype: 'sch',
        fname: 'Emma',
        lname: 'Sullivan',
        profilepic: '',
        url: "/what-wear-to-interview"
      },
      {
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'questions',
        hasacceptedanswer: true,
        votes: [],
        mentorseen: ['123','234'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 0,
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
        type: 'questions',
        hasacceptedanswer: false,
        votes: [],
        mentorseen: ['123','234','345','456'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 1,
        authorinsttype: 'job',
        fname: 'John',
        lname: 'Smith',
        profilepic: '',
        url: "/what-wear-to-interview-3"
      },
    ] */
    const contentArr = [ // Answers
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
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
      },
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

    switch (tabToView) {
      case 'all':
        return (
          <div>
            {!isUserSearch && (
              <React.Fragment>
                <div className="filterFeed-container textRight marginBottom20">
                  <button type="button" className={"filter-btn " + (filterBy == "latest" ? "isActive" : "")} value="latest" onClick={(e) => this.filterBy(e)}>
                    <div>
                      <span role="img" aria-label="latest">⏱️</span>
                      <span>Latest</span>
                    </div>
                  </button>
                  <button type="button" className={"filter-btn " + (filterBy == "trending" ? "isActive" : "")} value="trending" onClick={(e) => this.filterBy(e)}>
                    <div>
                      <span role="img" aria-label="trending">🔥</span>
                      <span>Trending</span>
                    </div>
                  </button>
                </div>
              </React.Fragment>
            )}
            {isUserSearch && (
              <div className="marginTop20">
                Search results: {(numResults > 40 ? "(40+)" : ("(" + numResults + ")"))}
              </div>
            )}
            { this.showUpdateTabBtns() }
            <FeedContainer contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} isUserSearch={isUserSearch} updatePathName={updatePathName} handleFeedClick={(e) => this.handleFeedClick(e)}/>
          </div>
        )
      case 'questions':
        return (
          <div>
            {!isUserSearch && (
              <React.Fragment>
                <div className="filterFeed-container textRight marginBottom20">
                  <button type="button" className={"filter-btn " + (filterBy == "latest" ? "isActive" : "")} value="latest" onClick={(e) => this.filterBy(e)}>
                    <div>
                      <span role="img" aria-label="latest">⏱️</span>
                      <span>Latest</span>
                    </div>
                  </button>
                  {isLoggedIn == true && userRole != 'mentee' && (
                    <button type="button" className={"filter-btn " + (filterBy == "unanswered" ? "isActive" : "")} value="unanswered" onClick={(e) => this.filterBy(e)}>
                      <div>
                        <span role="img" aria-label="question icon">❓</span>
                        <span>Unanswered</span>
                      </div>
                    </button>
                  )}
                  <button type="button" className={"filter-btn " + (filterBy == "trending" ? "isActive" : "")} value="trending" onClick={(e) => this.filterBy(e)}>
                    <div>
                      <span role="img" aria-label="trending">🔥</span>
                      <span>Trending</span>
                    </div>
                  </button>
                </div>
              </React.Fragment>
            )}
            {isUserSearch && (
              <div className="marginTop20">
                Search results: {(numResults > 40 ? "(40+)" : ("(" + numResults + ")"))}
              </div>
            )}
            { this.showUpdateTabBtns() }
            <FeedContainer contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} isUserSearch={isUserSearch} updatePathName={updatePathName} handleFeedClick={(e) => this.handleFeedClick(e)}/>
          </div>
        )
    }
  }

  renderKeyNotif = (pendingMatchRequest, hasUnreadAnswers, hasFeedbackToComplete) => {
    const {userstep, userRole, source} = this.state
    const {updatePathName} = this.props

    if (pendingMatchRequest == true) {
      return (
        <NewMatchPrompt userRole={userRole}/>
      )
    } else if (userstep == 'autoEnroll') {
      return (
        <AutoEnrollPrompt source={source}/>
      )
    } else if (hasUnreadAnswers == true) {
      return (
        <NewAnswerToQPrompt updatePathName={updatePathName}/>
      )
    } else if (hasFeedbackToComplete == true) {
      return (
        <FeedbackReqPrompt />
      )
    } else return

  }

  setStepsBoxAsWasPrev = (wasOpenPrev) => {
    this.setState({
      userStepsIsOpen: wasOpenPrev,
    })
  }

  toggleStepsBox = (e) => {
    const currentState = this.state.userStepsIsOpen;
    this.setState({
      userStepsIsOpen: !currentState,
      userIsClickingStepsBox: true
    })
  }

  onKeyDown = e => {
    var key = e.key || e.keyCode

    // User pressed the enter key
    if (key === 'Enter' || key === 13) {
      const currentState = this.state.userStepsIsOpen;

      this.setState({
        userStepsIsOpen: !currentState,
      })
    }
  }

  handleSuccessModalFromFPModal = (modalTypeToClose, successModalToShow) => {
    this.showSuccessModal(successModalToShow)
    this.closeModal(modalTypeToClose)
  }

  cleanUpModals = () => {
    this.closeModal("MentorID")
    this.closeModal("Success")
  }

  renderSuccessModalContent = () => {
    const {successModalToShow, userRole} = this.state
    const wantsU18 = true
    switch(successModalToShow) {
      case 'skillsUpdated':
        return (
          <React.Fragment>
            <div className="modal-title">
              <div className="emoji-icon tada-emoji successBox" />
              Success!
            </div>
            <div className="success-container">
              <div className="ideas-Title">
                You&#39;ve updated your skills.
              </div>
            </div>
          </React.Fragment>
        );
      case 'fullSUcompletedWantsU18':
        return (
          <React.Fragment>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Almost there!
            </div>
            <div className="success-container">
              <div className="ideas-Title">
                Now upload your PhotoID selfie
              </div>
              <p className="landingCTADesc">
                <Modal {...U18CameraUploadFromModalModalProps} handleLocalStateOnClose={() => this.cleanUpModals()}>
                  <U18CameraUploadContent />
                </Modal>
              </p>
            </div>
          </React.Fragment>
        )
      case 'fullSUcompleted':
        return (
          <React.Fragment>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Application submitted!
            </div>
            <div className="success-container">
              <div className="ideas-Title">
                Your matches are on their way.
              </div>
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us. It can take a few weeks to find a relevant match, and we&#39;ll notify you as soon as possible.
              </p>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <div className="modal-title">
              <div className="emoji-icon tada-emoji successBox" />
              Success!
            </div>
            <div className="success-container">
              <div className="ideas-Title">
                You&#39;ve updated your info.
              </div>
            </div>
          </React.Fragment>
        )
    }
  }

  showModal = (stepIsComplete, reqStepsComplete, modalType, requireLogin, allowedPermissions) => {
    if (stepIsComplete || reqStepsComplete != true) { return }

    const {checkHasAccess, noAccessHandler} = this.props;

    // If there is an access requirement
    if (checkHasAccess) {
      checkHasAccess(requireLogin, allowedPermissions ? allowedPermissions : null, (hasAccess) => {
        if (hasAccess == false) {
          return noAccessHandler ? noAccessHandler(null, "modal-"+modalType) : null
        } else {
          return this.setState({
            ["show"+modalType+"Modal"]: true,
          });
        }
      })

    // There was na ccess requirement
    } else {
      this.setState({
        ["show"+modalType+"Modal"]: true,
      });
    }
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  renderSteps() {
    const {isLoggedIn} = this.props
    const {userStepsIsOpen, userstep, userRole, showSuccessModal, showAddSkillsModal, showAnswerAQModal, showAskAQModal, showMentorFullAppModal, showMenteeFullAppModal, showJoinAGroupModal, showMentorIDModal, showMentorCVModal, showMentorTrainingModal, showMenteeTrainingModal} = this.state;
  //  const groupName = 'AVFX' // If step is 'autoenroll' then show the groupname
  //  const hasJoinedAutoEnrollGroup = false
    let expertise, learning, userHIDs, userQIDs, numUserQs, numUserAnswers, wantsU18, userGroups, hasMatch, mentorSteps, menteeSteps, isNonCoreCountry, isFromO18OnlyCountry, isU18
    let country = 'GBR'
    learning = []
    userGroups = ['123']
  //  userGroups = []
    hasMatch = false
    isNonCoreCountry = isLoggedIn && country != '' && (country != 'GBR' && country != 'USA' && country != 'CAN' && country != 'NZL' && country != 'AUS' && country != 'NLD' && country != 'DEU' && country != 'ESP' && country != 'FRA' && country != 'ITA' && country != 'BEL' && country != 'DNK' && country != 'SWE')
    isFromO18OnlyCountry = isLoggedIn && country != '' && (country == 'NZL' || country == 'AUS' || country == 'NLD' || country == 'DEU' || country == 'ESP' || country == 'FRA' || country == 'ITA' || country == 'BEL' || country == 'DNK' || country == 'SWE')

    if (userRole == 'mentor') {
      expertise = []
      userHIDs = []
    //  userHIDs = [{hid: '1234', type: 'qa'}, {hid: '1235', type: 'highlight'}]
      numUserAnswers = userHIDs.length == 0 ? 0 : userHIDs.length /* userHIDs.filter(hid => hid.type == 'qa').length ... We decided to count either 'qa' or 'general' highlights because we wanted to orient mentor to what a highlight is when they click "answer a question" in the "complete sign up steps" box */
      wantsU18 = false // Mentor wants to support U18s
      mentorSteps = [
        {stepText: 'Visit your feed', modalToShow: '', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
        {stepText: 'Add your key skills', modalToShow: 'AddSkills', isComplete: (expertise.length > 0 && learning.length > 0), validSteps: ['didEduEmailVerif', 'didReviewVerif']},
        /*... (userstep == 'autoEnroll') ? [
          {stepText: 'Accept your invite to join the ' + groupName + ' group', isComplete: hasJoinedAutoEnrollGroup, validSteps: ['autoEnroll']},
        ] : [],*/
        {stepText: 'Answer a question', modalToShow: 'AnswerAQ', isComplete: numUserAnswers > 0, validSteps: ['didShortSUtf']},
        {stepText: (isNonCoreCountry == true ? 'Join a programme' : 'Join a mentoring programme'), modalToShow: 'JoinAGroup', isComplete: userGroups.length > 0, validSteps: ['didShortSUtf']},
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
      userQIDs = []
      numUserQs = userQIDs && userQIDs.length == 0 ? 0 : userQIDs && userQIDs.length
      menteeSteps = [
        {stepText: 'Visit your feed', modalToShow: '', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
        {stepText: 'Add skills you want to learn', modalToShow: 'AddSkills', isComplete: learning && learning.length > 0, validSteps: ['didEduEmailVerif', 'didReviewVerif'], requireLogin: true},
        {stepText: 'Ask a question', modalToShow: 'AskAQ', isComplete: numUserQs && numUserQs > 0, validSteps: ['didShortSUtf'], requireLogin: true},
        {stepText: ((isNonCoreCountry == true || (isFromO18OnlyCountry && isU18)) ? 'Join a programme' : 'Join a mentoring programme'), modalToShow: 'JoinAGroup', isComplete: userGroups && userGroups.length > 0, validSteps: ['didShortSUtf'], requireLogin: true},
        {stepText: 'Complete your full mentee application', modalToShow: 'MenteeFullApp', isComplete: (userstep == 'didFullSUtf' || userstep == 'didSafeG'), reqStep: 'JoinAGroup', O18CountriesOnly: true, limitForNonCoreCountries: true, tooltiptextWhenLocked: (isNonCoreCountry == true ? 'Mentoring is not available in your country yet' : ((isFromO18OnlyCountry == true && isU18 == true) ? 'Mentoring for under 18s is not available in your country yet' : 'Join a mentoring programme to unlock this step')), validSteps: ['didShortSUtf']},
        {stepText: 'Complete your 5-min mentee training', modalToShow: 'MenteeTraining', isComplete: userstep == 'didSafeG', reqStep: 'MenteeFullApp', tooltiptextWhenLocked: 'Complete your full mentee application to unlock this step', validSteps: ['didFullSUtf']},
      ]
    }

    const steps = (userRole && userRole == 'mentor') ? mentorSteps : menteeSteps
    const stepsLeftToDo = steps.filter(step => step.isComplete == 0).length
    const allStepsCompleted = stepsLeftToDo == 0

    if (allStepsCompleted && hasMatch == true) {return}

    if (allStepsCompleted == true) {
      return (
        <div className="thinPurpleContentBox withBorderTop">
          <div className="padding20">
            <div className="marginTop20">
              <div>
                <h2 className="landingCTATitle">
                  <span className="emoji-icon stopwatch-emoji titleLeft" />
                  Your matches are on their way!
                </h2>
                <p className="landingCTADesc">
                  Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us.
                </p>
                <p className="landingCTADesc">
                  It can take a few weeks to find a relevant match, and we&#39;ll notify you as soon as possible.
                </p>
                {/*<p className="landingCTADesc">In the meantime...</p>
                <Modal {...AddHighlightModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole}/>
                </Modal>*/}
              </div>
            </div>
          </div>
        </div>
      )
    }

    const pctStepsCompleted = Math.round((1 - (stepsLeftToDo / steps.length)) * 100)

    var questionsSkillsHobbies = [
      {q: 'OK ... on to the good stuff!', detail: (userRole == 'mentee' ? 'You\'ve already told us which industry & roles you\'re interested in, but what about particular skills you want to develop' : 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do'), aType: 'interim', name: 'interim'},
      ...(userRole == 'mentor' && expertise && expertise.length == 0) ? [
        {q: 'What would you say your "key skills" are?', detailSmall: 'e.g. C++/Python etc, 2D/3D Animation, Financial Modelling, Strategy, Leadership, Entrepreneurship etc.', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'expertise', idValue: 'value', valueToShow: 'label', options: [
          ...skillsOptions
        ]},
      ] : [],
      ...(learning && learning.length == 0) ? [
        {q: 'What are the skills / areas of interest you are currently looking to build?', detail: (userRole == 'mentee' ? 'Help us show you the right advice' : 'Help us demonstrate to students that careers evolve over time!'), aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'learning', idValue: 'value', valueToShow: 'label', options: [
          ...skillsOptions
        ]},
      ] : [],
    ]

    return (
      <div className="thinPurpleContentBox withBorderTop">
        <div className="padding20">
          <div className="userStepsTitle" onClick={this.toggleStepsBox} onKeyDown={this.onKeyDown}>
            <span><strong>Finish setting up your account</strong></span>
            <div className="selectContainer">
              <span className="arrow">
                { userStepsIsOpen ? <ChevronUp /> : <ChevronDown /> }
              </span>
            </div>
          </div>
          {userStepsIsOpen && (
            <React.Fragment>
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
              <div id="pctCircleContainer-userSteps">
                { percentageCircle(pctStepsCompleted,"purple") }
              </div>
              {(showAddSkillsModal == true && userRole == 'mentee') && (
                <FullPageModal {...MenteeSkillsLearningPromptProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")}>
                  <Form
                    questions={questionsSkillsHobbies}
                    usedFor="skillsLearningForm"
                    formTitle="Tell us what you want to learn"
                    onSubmit={() => this.handleSuccessModalFromFPModal("AddSkills", "skillsUpdated")}
                  />
                </FullPageModal>
              )}
              {(showAddSkillsModal == true && userRole == 'mentor') && (
                <FullPageModal {...MentorSkillsLearningPromptProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")} >
                  <Form
                    questions={questionsSkillsHobbies}
                    usedFor="skillsLearningForm"
                    formTitle='Tell us your key skills'
                    onSubmit={() => this.handleSuccessModalFromFPModal("AddSkills", "skillsUpdated")}
                  />
                </FullPageModal>
              )}
              {showAnswerAQModal == true && (
                <Modal {...AnswerQModalProps} handleLocalStateOnClose={() => this.closeModal("AnswerAQ")}>
                  <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole} updatePathName={this.props.updatePathName}/>
                </Modal>
              )}
              {showAskAQModal == true && (
                <Modal {...AskQModalProps} handleLocalStateOnClose={() => this.closeModal("AskAQ")}>
                  <AddHighlightModalContent modalID="modal-askQuestionDashboard" userRole={userRole}/>
                </Modal>
              )}
              {showMentorFullAppModal == true && (
                <MentorFullSignUp
                  handleLocalStateOnClose={() => this.closeModal("MentorFullApp")}
                  onSubmit={() => this.handleSuccessModalFromFPModal("MentorFullApp", (wantsU18 == true ? "fullSUcompletedWantsU18" : "fullSUcompleted"))}
                />
              )}
              {showMenteeFullAppModal == true && (
                <MenteeFullSignUp
                  handleLocalStateOnClose={() => this.closeModal("MenteeFullApp")}
                  onSubmit={() => this.handleSuccessModalFromFPModal("MenteeFullApp", "fullSUcompleted")}
                />
              )}
              {showSuccessModal == true && (
                <Modal {...SuccessModalProps} handleLocalStateOnClose={() => this.closeModal("Success")}>
                  {this.renderSuccessModalContent()}
                </Modal>
              )}
              {showJoinAGroupModal == true && (
                <Modal {...JoinProgrammeStepModalProps} handleLocalStateOnClose={() => this.closeModal("JoinAGroup")}>
                  <JoinProgrammeModalContent userRole={userRole}/>
                </Modal>
              )}
              {showMentorIDModal == true && (
                <Modal {...U18CameraUploadModalProps} handleLocalStateOnClose={() => this.closeModal("MentorID")}>
                  <U18CameraUploadContent/>
                </Modal>
              )}
              {showMentorCVModal == true && (
                <Modal {...U18FileUploadModalProps} handleLocalStateOnClose={() => this.closeModal("MentorCV")}>
                  <U18FileUploadContent/>
                </Modal>
              )}
              {showMentorTrainingModal == true && (
                <Modal {...MentorTrainingModalProps} handleLocalStateOnClose={() => this.closeModal("MentorTraining")}>
                  <MentorTraining />
                </Modal>
              )}
              {showMenteeTrainingModal == true && (
                <Modal {...MenteeTrainingModalProps} handleLocalStateOnClose={() => this.closeModal("MenteeTraining")}>
                  <MenteeTraining />
                </Modal>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  render(){
    const {isLoggedIn, checkHasAccess, noAccessHandler, reachedMaxFeedLength, browser} = this.props
    const {tabToView, userStepsIsOpen, userstep, userRole, source, isUserSearch, searchText, hideKeyNotifBox, newPostsAbove, newPostsBannerSeen} = this.state
    const usersGroups = [
      {
        gid: '20000',
        groupname: 'Villiers High School',
        status: 'active',
        groupavatarurl: '/vhs-avatar.png',
        channels: [
          {
            name: 'mentor-general',
            chlid: '12345',
            type: 'general'
          },
          {
            name: 'hello-intros',
            chlid: '12347',
            type: 'intros'
          },
          {
            name: 'resources',
            chlid: '12346',
            type: 'resources'
          }
        ]
      },
      {gid: '20001', groupname: 'Into Games', status: 'active', groupavatarurl: '/intogames-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'leaderboard', chlid: '13347', type: 'leaderboard'},{name: 'social', chlid: '22347', type: 'social'},{name: 'other', chlid: '12348', type: 'other'}]},
      {gid: '20002', groupname: 'ACCESS:VFX', status: 'active', groupavatarurl: '/avfx-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
      {gid: '20003', groupname: 'BAME in Games', status: 'active', channels: [{name: 'hello-mentors', chatid: '12345',type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
      {gid: '20004', groupname: 'Animated Women UK', status: 'active', groupavatarurl: '/aw-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
    ];
    const groups = [];
    const hasMatch = true
    const pendingMatchRequest = false
    const hasUnreadAnswers = true
    const hasFeedbackToComplete = true
    const hasKeyNotif = userstep == 'autoEnroll' || pendingMatchRequest == true || hasUnreadAnswers == true || hasFeedbackToComplete == true
  //  const contentArr = []
    const contentArr = [
      {name: 'HELLO'},
      {name: 'yO'}
    ]

    if (usersGroups != null || usersGroups.length != 0) {
      usersGroups.forEach((group) => {
        const channels = group.channels && group.channels
          .filter(x => x.type == 'general');
        const generalChannel = channels && channels.length > 0 && channels[0];
        const navlink = channels && channels.length > 0 && `/community/${group.groupname}/${group.gid}/${generalChannel.chlid}`
        const showAsLink = (channels && channels.length > 0) ? true : false;
        groups.push(
          <GroupCircle
            showAsLink={showAsLink}
            group={group}
            key={group.gid}
            navlink={navlink}
          />
        );
      })
    }

//navlink={`/community/${group.gid}/${generalChannel.chlid}`}

    return (
      <React.Fragment>
        <div className="tabWindow paddingL30 paddingR30 overflowYHidden displayFlex flexDirColumn" id="homepageContainer">
          <FeedHeader isLoggedIn={isLoggedIn} browser={browser} handleSearchResults={this.handleSearchResults} searchText={searchText} handleSearchTextChange={this.handleSearchTextChange} resetSearch={this.resetSearch} isUserSearch={isUserSearch}/>
          {/*<div className="mainAndSideContainer marginTop20 overflowYScroll"> */}
          <div className="mainAndSideContainer marginTop20" id="mainAndSideContainer">
            {contentArr.length > 0 && newPostsAbove == true && newPostsBannerSeen === false && (
              <div className="feedTopBanner pointerCursor" id="newMsgsAboveBtn" onClick={(e) => this.loadNewPosts(e)}>
                <div className="separator__text go2NewMsgs">
                  <i className="fas fa-arrow-up" />
                  <span>New posts above</span>
                  <button type="button" className="close-chatAlert-container" aria-labelledby="Close Flex Container" onClick={(e) => this.hideNewPostsNotif(e)}>
                    <span id="close-modal" className="u-hide-visually">Close</span>
                    <svg className="menu-close-icon chatAlert" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                  </button>
                </div>
              </div>
            )}
            <div className="sideBar" role="complementary" aria-label="sidebar">
              {hasKeyNotif == true && hideKeyNotifBox == false && (
                <div className="thickPurpleContentBox withBorderTop">
                  {/* <div className="sideBar-header" /> */}
                  <div className="padding20">
                    { this.renderKeyNotif(pendingMatchRequest, hasUnreadAnswers, hasFeedbackToComplete) }
                  </div>
                </div>
              )}
              { this.renderSteps() }
              <div className="thinGreyContentBox sideBarContentHiddenOnShrink">
                <div className="title">My Groups</div>
                <div className="padding20">
                  <div className={"groupsContainer" + (groups.length == 0 ? " dispInline": "")}>
                    {groups.length > 0 && (
                      groups
                    )}
                    {groups.length == 0 && (
                      <span className="greyText fontSize13">Join a group</span>
                    )}
                    <Modal {...JoinProgrammePlusModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                      <JoinProgrammeModalContent />
                    </Modal>
                  </div>
                </div>
              </div>
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
                      <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href="https://app.prospela.com/signup?origin=feedSideBar">
                        Sign up (free)
                      </a>
                      <a className="dispBlock alignCenter fontSize13 electricPurpleText" href="https://app.prospela.com/login?origin=feedSideBar">or Login</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mainBar" role="main" aria-label="question and answers">
              { this.renderTab() }
              {(!isLoggedIn && reachedMaxFeedLength == true) && (
                <div className="signUpPromptBanner withAnimation reachedMaxFeed">
                  <div className="bannerTextContainer">
                    <div className="prBannerLogoContainer marginBottom20">
                      <img
                        className="prLogoImg"
                        alt="Prospela Logo"
                        srcSet={cdn+"/images/Prospela%20Logo_Dark.png 213w, "+cdn+"/images/Prospela%20Logo_Dark.png 314w, "+cdn+"/images/Prospela%20Logo_Dark.png 640w"}
                        sizes="(max-width: 1440px) 69px, 69px"
                        src={cdn+"/images/Prospela%20Logo_Dark.png"}
                      />
                    </div>
                    <div className="signUpBannerTopText fontSize13">CREATE A FREE ACCOUNT TO GET UNLIMITED ACCESS TO ANSWERS</div>
                    <div className="signUpPromptTitle fontSize30 marginBottom20"><strong>Unlimited access to insider insights from real employees</strong></div>
                    <div className="marginBottom20 dispInlineBlock">
                      <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href="https://app.prospela.com/signup?origin=maxFeedScroll">
                        Sign up (free)
                      </a>
                      <a className="dispBlock alignCenter fontSize13 electricPurpleText" href="https://app.prospela.com/login?origin=maxFeedScroll">or Login</a>
                    </div>
                    <div className="signUpBannerExtraText fontSize13">Career Q&A with industry experts, 1:1 mentoring & a lasting professional network at your fingertips</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {userRole == 'mentor' && (
            <React.Fragment>
              <Modal {...AddHighlightModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentor' updatePathName={this.props.updatePathName}/>
              </Modal>
              <Modal {...AddHighlightSmlModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlightSml" userRole='mentor' updatePathName={this.props.updatePathName}/>
              </Modal>
            </React.Fragment>
          )}
          {(userRole == 'mentee') && (
            <React.Fragment>
              <Modal {...AddQModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentee'/>
              </Modal>
              <Modal {...AddQSmlModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlightSml" userRole='mentee'/>
              </Modal>
            </React.Fragment>
          )}
          {(isLoggedIn == false) && (
            <React.Fragment>
              <Modal {...AddQModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentee'/>
              </Modal>
              <Modal {...AddQSmlModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                <AddHighlightModalContent modalID="modal-addHighlightSml" userRole='mentee'/>
              </Modal>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
