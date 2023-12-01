// Dex last merged this code on 24th nov 2023

import React, { Component} from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/
import "../css/App.css";
import "../css/General.css";
import {
  Route,
  NavLink,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
/*import store from "../store/configureStore";
import { usersFetchData } from "../actions/Users";*/

import AddHighlightModalContent from "./AddHighlightModalContent";
import {cdn} from './CDN.js';
import ChatMenu from "./ChatMenu";
import CommunityMenu from "./CommunityMenu";
import CommunityPage from "./CommunityPage";
import GroupsMenu from "./GroupsMenu";
import FullPageModal from './FullPageModal.js';
import LatestAdvice from "./LatestAdvice";
import LgdInUsrProfile from "./LgdInUsrProfile";
import {LoadingSpinner, showNotifFavicon, hideNotifFavicon, whichBrowser, isiOS} from './GeneralFunctions.js';
import MainMenu from "./MainMenu";
import UserActivityDashboard from "./UserActivityDashboard";
import HomePage from './HomePage.js';
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import NotFound from "./NotFound";
import ProspelaBot from "./ProspelaBot";
import ProspelaDashboard from "./ProspelaDashboard";
import QA from './QA.js';
import SettingsContent from './SettingsContent.js';
import SignUpPromptModalContent from './SignUpPromptModalContent.js'
import Teams from "./Teams";
import Todo from "./Todo";
import TypeformSignUp from "./TypeformSignUp";
import UserMenuContent from "./UserMenuContent";
import VerifyEmail from "./VerifyEmail";

/*
const SUContent = ('mentor or mentee?')
const MenteeSUContent = ('mentee SU')
const MentorSUContent = ('mentor SU')*/

const SettingsModalProps = {
  ariaLabel: 'Popup to manage your preferences and settings',
  triggerText: 'Preferences & Settings',
  usedFor: 'settings',
  backBtn: 'arrow',
  hideTrigger: true,
}

class LoadingSU extends Component{
  render(){
    const userRole = this.props.userRole;
    return(
      <BrowserRouter>
        <div className="clientUI">
          <div className="clientContainer">
            <div className="loadingSUContainer">
              <div id="loadingSU-welcome">
                <div className="loadingSUMsg">
                  <p className="loadingWelcomeMsg">
                    Loading sign-up form...
                  </p>
                  <div className="infiniteSpinner infiniteSpinner-medium">
                    <div className="LoaderLayout-sc-1eu50fy-0 eczmJS">
                      <div className="LoaderWrapper-sc-1eu50fy-1 iKvkDg">
                        <LoadingSpinner />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class LoadingDash extends Component{
  render(){
    const userRole = this.props.userRole;
    return(
      <BrowserRouter>
        <div className="clientUI">
          <div className="clientContainer">
            <div className="loadingMenuContainer">
              <div id="loading-menu">
                <div className="prLogoArea">
                  <div className="prLogoContainer">
                {/*}    <img
                      className="prLogoImg"
                      alt="Prospela Logo"
                      src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png"
                    />*/}
                    <img
                      className="prLogoImg"
                      alt="Prospela Logo"
                      srcSet={cdn+"/images/Prospela-Logo.png 213w, "+cdn+"/images/Prospela-Logo.png 314w, "+cdn+"/images/Prospela-Logo.png 640w"}
                      sizes="(max-width: 1440px) 69px, 69px"
                      src={cdn+"/images/Prospela-Logo.png"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="loadingContainer col-s-12">
              <div id="loading-welcome">
                <div className="loadingMsg">
                  <p className="loadingWelcomeMsg">
                    Loading message / quotes go here!
                  </p>
                  <div className="infiniteSpinner infiniteSpinner-medium">
                    <div className="LoaderLayout-sc-1eu50fy-0 eczmJS">
                      <div className="LoaderWrapper-sc-1eu50fy-1 iKvkDg">
                        <LoadingSpinner />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: '+ Highlight',
  usedFor: 'addHighlightMenuSml',
  changeInitFocus: true,
  wider: true,
}

const AddHighlightSmlMenteeModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: '+ Question',
  usedFor: 'addHighlightMenuSml',
  changeInitFocus: true,
  wider: true,
}

const NoAccessContentModalProps = {
  ariaLabel: 'No Access - Sign up or Login',
  triggerText: 'Sign up or Login',
  usedFor: 'noAccess',
  hideTrigger: true,
}

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollerBeingDragged: false,
      normalizedPosition: 0,
      contentPosition: 0,
      pathName: window.location.pathname,
      prevFeedScrollPos: 0,
      prevCommFeedScrollPos: 0,
      cameFromFeedUnlockBtn: false,
      highlightStepsBox: false,
  //    documentTitle: 'Prospela Dashboard',
  //    menuItemActive: '',
  //    menuItemActive: 'dashboard' //Homepage for any user
    }
    this.scrollBarRef = React.createRef();
    this.calculateScrollerHeight = this.calculateScrollerHeight.bind(this);
    this.createScroller = this.createScroller.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.updatePathName = this.updatePathName.bind(this);
  //  this.updateActiveMenu = this.updateActiveMenu.bind(this);
  }

  componentDidMount() {
    this.createScroller();
    window.addEventListener('resize', this.createScroller);
    this.setState({
      browser: whichBrowser()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {pathName} = this.state
    /*console.log(pathName)
    console.log("window.location.pathname: "+window.location.pathname)
    console.log(prevState.pathName)*/

    if (pathName == '' || (window.location.pathname != prevState.pathName)) {
      this.setState({
        pathName: window.location.pathname
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createScroller);
  }

  handleUnlockBtnClick = (e) => {
    const cameFromUnlockBtn = e.target.id == 'itemUnlockBtn' || e.target.id == 'itemUnlockIcon'
    this.setState({
      cameFromFeedUnlockBtn: cameFromUnlockBtn
    })
  }

  updateDocumentTitle = (newTitleText) => {
  /*  this.setState({
      documentTitle: newTitleText
    })*/
    document.title = newTitleText
  }

  moveScroller = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    var scroller = document.querySelector('.c-scrollbar__bar');

    var scrollPercentage = e.target.scrollTop / scrollContentWrapper.scrollHeight;
    let topPosition;

    topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
    scroller.style.transform = 'translateY(' + topPosition + 'px)';
  }

  startDrag = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
  //  contentPosition =  scrollContentWrapper.scrollTop;
    this.setState({
      scrollerBeingDragged: true,
      normalizedPosition: e.pageY,
      contentPosition: scrollContentWrapper.scrollTop
    });
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.scrollBarScroll);
  }

  stopDrag = (e) => {
    this.setState({
      scrollerBeingDragged: false,
    });
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('mousemove', this.scrollBarScroll);
  }

  scrollBarScroll = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    if (this.state.scrollerBeingDragged === true) {
      var mouseDifferential = e.pageY - this.state.normalizedPosition;
      var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
      scrollContentWrapper.scrollTop = this.state.contentPosition + scrollEquivalent;
    }
  }

  onKeyDown = (e) => {
    var key = e.key || e.keyCode
    // User pressed the backspace key (to prevent reloading / going back a page particularly in Firefox)
    if (key === 'Backspace' || key === 8) {
      var rx = /INPUT|SELECT|TEXTAREA|BUTTON/i;

      if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
        e.preventDefault()
      }
    }

    if (key === 'Enter' || key === 13) {
      this.closeMenu()
    }
  }

  onMouseDown = () => {
    showNotifFavicon(2)
  }

//  updateActiveMenu(e) {
//    e.persist()
//    this.closeMenu(e)
/*    const menuItemClicked = e.currentTarget.id

    this.setState({
      menuItemActive: menuItemClicked
    })*/
//  }
  showScroll = () => {
    var scrollTrack = document.querySelector('.c-scrollbar__track');
    scrollTrack.style.opacity = 1
  }

  hideScroll = () => {
    var scrollTrack = document.querySelector('.c-scrollbar__track');
    scrollTrack.style.opacity = 0
  }

  handleMenuItemClick = (e) => {
    e.persist()
    this.updatePathName()
    this.closeMenu(e)
  }

  updateFeedScrollPos = (prevScrollPos, userStepsIsOpen) => {
    this.setState({
      prevFeedScrollPos: prevScrollPos,
      userStepsWasOpenInFeed: userStepsIsOpen
    })
  }

  updateCommFeedScrollPos = (prevScrollPos) => {

    this.setState({
      prevCommFeedScrollPos: prevScrollPos,
    })
  }

  hasAccess = (requireLogin, allowedPermissions, callback) => {
    const checkPermissions = (userPermissions, allowedPermissions) => {
      if (allowedPermissions.length === 0) {
        return true;
      }

      return userPermissions.some(permission =>
        allowedPermissions.includes(permission)
      );
    };

    const userPermissions = ["maxViewsNotReached"] //To be linked to Redux
    const isLoggedIn = true //To be linked to Redux
    const permitted = (requireLogin == true ? isLoggedIn == true : true) && (allowedPermissions ? checkPermissions(userPermissions, allowedPermissions) : true)

    if (permitted == true) {
      if (callback) {
        callback(true)
      } else {
        return true
      }
    } else {
      if (callback) {
        callback(false)
      } else {
        return false
      }
    }
  }

  // To help track click origin for signuprompt modal.
  updateClickOrigin = (e, clickOrigin) => {
    // use of 'e' if child has multiple click options (e.g. on QA.js or HomePage, otherwise can provide function with text clickOrigin)
    let origin = (e && e.target && e.target.dataset.origin) ? e.target.dataset.origin : (clickOrigin ? clickOrigin : '')

    this.setState({
      clickOrigin: origin,
    });
  }

  showModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
      clickOrigin: '',
    });
  }

  highlightStepsBox = () => {
    this.setState({
      highlightStepsBox: true
    })
  }

  unHighlightStepsBox = () => {
    this.setState({
      highlightStepsBox: false
    })
  }

  updatePathName(){
    this.setState({
      pathName: window.location.pathname
    })
  }

  calculateScrollerHeight() {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
    return visibleRatio * scrollContainer.offsetHeight;
  }

  createScroller() {
    var scrollContainer = document.querySelector('.c-scrollbar');
    var scrollTrack = document.querySelector('.c-scrollbar__track');
    var scroller = document.querySelector('.c-scrollbar__bar');

    // determine how big scroller should be based on content
    var scrollerHeight =  this.calculateScrollerHeight();

    if (scrollerHeight / scrollContainer.offsetHeight < 1){
      // *If there is a need to have scroll bar based on content size
      scroller.style.height = scrollerHeight + 'px';

      // show scroll path divot
      scrollTrack.style.visibility = 'visible';

      // attach related draggable listeners
      scroller.addEventListener('mousedown', this.startDrag);
    } else {
      scrollTrack.style.visibility = 'hidden';
      scroller.removeEventListener('mousedown', this.startDrag);
    }
  }

  closeMenu(e) {
    const clientMenu = document.getElementById("clientMenu");
    const clientMenuBtn = document.getElementById("nav-mainMenu");

    if (window.innerWidth < 760 && clientMenu.style.left != "-220px" && !clientMenuBtn.contains(e.target)) {
      clientMenu.style.left = "-220px";
      clientMenu.style.zIndex = "0";
    }
  }

  render(){
    const userRole = this.props.userRole;
    const {browser, pathName, prevFeedScrollPos, prevCommFeedScrollPos, userStepsWasOpenInFeed, cameFromFeedUnlockBtn, showSignUpPromptModal, clickOrigin, highlightStepsBox} = this.state
  //  const fullsustep = 'justjoined';
    const {moveScroller, startDrag} = this;
    const groupsList = [
      {gid: 1234, isclass: true},
      {gid: 1235, isclass: false},
    ]
  //  const groupsList = []
    const numClasses = groupsList.filter(group => group.isclass == true).length
    const isClass = numClasses > 0
    const isQ = false
    const goToSettings = false // entryURL && entryURL.includes('/settings') ? 'Yes' : 'No';
    const isLoggedIn = true
    const oneMoreTilMaxViewsReached = false
    const maxViewsReached = false
    const maxDataViewsReached = true // already viewed one "ah-ha" data on a skills/industry page so now prompt sign up
    const reachedMaxFeedLength = false
    const isIphone = isiOS()
    const relatedQsArr = [ // Questions
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
      ]
    const trendingQsArr = [ // Questions
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
      ]

    return(
      <BrowserRouter>
      {/* The <div> element is just used to prevent reloading / going back a page i.e. Firefox bug  */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="clientUI" onKeyDown={this.onKeyDown}>
          <div className="clientContainer">
            <div className="clientMenuContainer" id="clientMenu">
              <button type="button" className="close-menu" aria-labelledby="Close Modal" onClick={this.closeMenu}>
                <span id="close-modal" className="u-hide-visually">Close</span>
                <svg className="menu-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
              </button>
              {userRole == 'mentor' && (
                <Modal {...AddHighlightSmlModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightMenuSml" userRole='mentor' updatePathName={this.updatePathName}/>
                </Modal>
              )}
              {(userRole == 'mentee' && isClass == true) && (
                <Modal {...AddHighlightSmlMenteeModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightMenuSml" userRole='mentee' updatePathName={this.updatePathName}/>
                </Modal>
              )}
              {!isLoggedIn && (
                <Modal {...AddHighlightSmlMenteeModalProps} checkHasAccess={this.hasAccess} requireLogin noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "addHighlightSmlTLMenu")}}>
                  <AddHighlightModalContent modalID="modal-addHighlightMenuSml" userRole='mentee' updatePathName={this.updatePathName}/>
                </Modal>
              )}
              <MenuModal changeInitFocus isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} requireLogin noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "menuModal")}}>
                <UserMenuContent userRole={userRole}/>
              </MenuModal>
              <div className="c-scrollbar">
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller} onMouseEnter={this.showScroll} onMouseLeave={this.hideScroll}>
                  <div className="menuContainer">
                {/*    <MainMenu userRole={userRole} onClick={this.closeMenu} onMouseDown={this.onMouseDown}/> */}
                    <MainMenu userRole={userRole} onMouseDown={this.onMouseDown} isLoggedIn={isLoggedIn} onClick={this.handleMenuItemClick} pathName={pathName} checkHasAccess={this.hasAccess} noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "mainMenu")}}/>
                    <div className="menuBreak"/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} chatGroup='Direct Messages' onClick={this.handleMenuItemClick}/>
                    <div className="menuBreak"/>
                    <GroupsMenu groups={DUMMY_GROUP_LIST} onClick={this.handleMenuItemClick} checkHasAccess={this.hasAccess} noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "groupsMenu")}}/>
                    <div className="menuBreak"/>
                    <CommunityMenu type="industry" groups={DUMMY_INDUSTRY_LIST} onClick={this.handleMenuItemClick} checkHasAccess={this.hasAccess} noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "industryMenu")}}/>
                    <div className="menuBreak"/>
                    <CommunityMenu type="skill" groups={DUMMY_SKILL_LIST} onClick={this.handleMenuItemClick} checkHasAccess={this.hasAccess} noAccessHandler={() => {this.showModal("SignUpPrompt"), this.updateClickOrigin(null, "skillsMenu")}}/>
                    <div className="menuBreak"/>
                    <div className="prLogoArea notLogin">
                      <div className="prLogoContainer">
                        <img
                          className="prLogoImg"
                          alt="Prospela Logo"
                          srcSet={cdn+"/images/Prospela-Logo.png 213w, "+cdn+"/images/Prospela-Logo.png 314w, "+cdn+"/images/Prospela-Logo.png 640w"}
                          sizes="(max-width: 1440px) 69px, 69px"
                          src={cdn+"/images/Prospela-Logo.png"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-scrollbar__track" id="scrollBar" onMouseEnter={this.showScroll} onMouseLeave={this.hideScroll}>
                  <div className="c-scrollbar__bar"/>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer col-s-12" role="button" id="clientWindowContainer" tabIndex={0} onKeyDown={this.handleKeyDown} onClick={this.closeMenu}>
              <Switch>
            {/*    {{
                  ['mentee']: <Redirect exact from="/" to="/home" />,
                  ['mentor']: <Redirect exact from="/" to="/home" />,
                }[userRole]} */}
              {/*  <Redirect exact from="/" to="/home" />
                {isQ == true && (
                  <Redirect exact from="/home" to="/questions/123456" />
                )} */}
                <Route exact path="/">
                  {isQ == true ? <Redirect to="/questions/123456" /> : <Redirect to="/home" />}
                </Route>
              {/*  <Route path="/latest-advice" component={LatestAdvice}/>, */}
                <Route path="/mentee-profile" component={LgdInUsrProfile}/>,
                <Route path="/to-do-list" component={Todo}/>,
                <Route path="/teams" component={Teams}/>
                <Route exact path="/home" render={(props) => <HomePage {...props} browser={browser} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} isLoggedIn={isLoggedIn} maxViewsReached={maxViewsReached} reachedMaxFeedLength={reachedMaxFeedLength} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} unHighlightStepsBox={this.unHighlightStepsBox} showHighlightStepsBox={highlightStepsBox} updateFeedScrollPos={this.updateFeedScrollPos} prevFeedScrollPos={prevFeedScrollPos} userStepsWasOpenInFeed={userStepsWasOpenInFeed}/>}/>
                <Route exact path="/questions" render={(props) => <HomePage {...props} browser={browser} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} isLoggedIn={isLoggedIn} maxViewsReached={maxViewsReached} reachedMaxFeedLength={reachedMaxFeedLength} handleUnlockBtnClick={this.handleUnlockBtnClick} tabToView="questions" updatePathName={this.updatePathName} unHighlightStepsBox={this.unHighlightStepsBox} showHighlightStepsBox={highlightStepsBox} updateFeedScrollPos={this.updateFeedScrollPos} prevFeedScrollPos={prevFeedScrollPos} userStepsWasOpenInFeed={userStepsWasOpenInFeed}/>}/>
                <Route path="/questions/:qid" render={(props) => <QA {...props} updateDocumentTitle={this.updateDocumentTitle} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} isLoggedIn={isLoggedIn} oneMoreTilMaxViewsReached={oneMoreTilMaxViewsReached} maxViewsReached={maxViewsReached} cameFromFeedUnlockBtn={cameFromFeedUnlockBtn} updatePathName={this.updatePathName} relatedQsArr={relatedQsArr} trendingQsArr={trendingQsArr} />}/>
                <Route exact path="/my-activity" render={(props) => <UserActivityDashboard {...props} userRole={userRole} updatePathName={this.updatePathName}/>}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <Route path="/messages/:chatid" render={(props) => <ProspelaBot {...props} isGroup={false} />}/>
                <Route path="/community/industry/:indname/leaderboard" render={(props) => <CommunityPage {...props} type="industry" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="leaderboard" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/industry/:indname/questions" render={(props) => <CommunityPage {...props} type="industry" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="questions" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/industry/:indname" render={(props) => <CommunityPage {...props} type="industry" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="overview" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/skills/:skillsname/leaderboard" render={(props) => <CommunityPage {...props} type="skills" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="leaderboard" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/skills/:skillsname/questions" render={(props) => <CommunityPage {...props} type="skills" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="questions" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/skills/:skillsname" render={(props) => <CommunityPage {...props} type="skills" updateFeedScrollPos={this.updateCommFeedScrollPos} prevFeedScrollPos={prevCommFeedScrollPos} userRole={userRole} initialTabToView="overview" isLoggedIn={isLoggedIn} checkHasAccess={this.hasAccess} noAccessHandler={(e, origin) => {this.showModal("SignUpPrompt"), this.updateClickOrigin(e, origin)}} maxViewsReached={maxViewsReached} handleUnlockBtnClick={this.handleUnlockBtnClick} updatePathName={this.updatePathName} highlightStepsBox={this.highlightStepsBox} updateDocumentTitle={this.updateDocumentTitle} />}/>
                <Route path="/community/:groupid" render={(props) => <ProspelaBot {...props} isGroup />}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
            {showSignUpPromptModal && (
              <Modal {...NoAccessContentModalProps} handleLocalStateOnClose={() => this.closeModal("SignUpPrompt")}>
                <SignUpPromptModalContent clickOrigin={clickOrigin} isIphone={isIphone} />
              </Modal>
            )}
            {goToSettings == true && (
              <FullPageModal {...SettingsModalProps} handleLocalStateOnClose={() => this.closeModal("settings")}>
                <SettingsContent userRole={userRole}/>
              </FullPageModal>
            )}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class App extends Component{
  constructor () {
    super();
//    this.checkBackspace = this.checkBackspace.bind(this);
  }

  componentDidMount() {
    window.addEventListener("focus", this.onFocus)
    window.addEventListener("blur", this.onBlur)
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.onFocus)
    window.removeEventListener("blur", this.onBlur)
  }

  // Checking if user clicks on tab
  onFocus = () => {
    // console.log("tab is focused")
  }

  // Checking if user has clicked off the tab, but tab is still open
  onBlur = () => {
    // console.log("tab is BLURRED")
  }

  render() {
    const userRole = 'mentee' /*this.props.users.role*/;
/*    switch (loginServer) {
      case true:
        return (
          <div className="App">
            {{
              ['L']: <Login/>,
              ['SU']: <SignUp/>,
            }[loginSU]}
          </div>
        );
      case false: */
      return (
        <div className="App">
          {{
            ['mentee']: <MenteeSteps userRole={userRole}/>,
            ['mentor']: <MentorSteps userRole={userRole}/>,
            ['prospela']: <ProspelaDashboard userRole={userRole}/>,
            ['']: <Dashboard />,
          }[userRole]}
        </div>
      );
  }
}

/*
function SignUp() {
  return (
    <LoginSUTemplate>
      <SUContent />
    </LoginSUTemplate>
  );
}

function Login() {
  return (
    <LoginSUTemplate>
      <LoginContent />
    </LoginSUTemplate>
  );
}
*/
function MenteeSteps({userRole}) {
  const step = 'didSafeG';
  const emailSentForReview = ''; // Need to update this based on if needs Prospela to review email format
  const eduSentForReview = ''; // Need to update this based on if needs Prospela to review school/uni typed in manually

      switch (step) {
        case 'loading':
          return <LoadingSU userRole={userRole}/>
        case 'did1stSU':
        case 'didCountry':
        case 'updatingEdu':
        case 'didEdu':
        case 'didIndRole':
        case 'didDiversity':
        case 'didEduEmail':
        case 'didEmailVerifNeedsRev':
          return (
            <BrowserRouter>
              <Switch>
                <Route component={TypeformSignUp} step={step} />
              </Switch>
            </BrowserRouter>
          );
        case 'didEmailVerif':
        case 'didReviewVerif':
        case 'autoEnroll':
        case 'joinedProg':
        case 'didFullSUtf':
        case 'didSafeG': // only required for under 18s
          return <Dashboard userRole={userRole}/>
      }
}

function MentorSteps({userRole}) {
  const step = 'fullSUidTrain';
//    const step = this.props.users.step;
      switch (step) {
        case 'IFSTATEMENT':
          return (
            <BrowserRouter>
              <Switch>
                <Redirect exact from="/" to="/verify-email" />
                <Route path="/verify-email" component={VerifyEmail} step={step} />
              </Switch>
            </BrowserRouter>
          );
          case 'didEmailVerif':
          case 'didCountry':
            return (
              <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/mentor-signup" />
                  <Route path="/mentor-signup" component={TypeformSignUp} step={step} />
                </Switch>
              </BrowserRouter>
            );
          case 5:
            return <LoadingDash userRole={userRole}/>
          case 'didShortSUtf':
          case 'didFullSUtf':
          case 'didTrain':
          case 'didU18tf':
          case 'fullSUTrain':
          case 'fullSUidTrain':
            return <Dashboard userRole={userRole} step={step}/>
        }
}

// Dummy chat list data (this will eventually come from Postgres)
const DUMMY_CHAT_LIST = [
  {chatid: '10000', studentId: '12345', mentor: 'Dexter', mentee: 'Mentee', matchedTimestamp: '20181219', status: 'Prospela'},
  {chatid: '10001', studentId: '12345', mentor: 'David', mentee: 'Mentee', matchedTimestamp: '20181219', status: 'ended'},
  {chatid: '10002', studentId: '12345', mentor: 'Emily', mentee: 'Mentee', matchedTimestamp: '20181219', status: 'ended'},
];

const DUMMY_GROUP_LIST = [
  {gid: '20000', groupname: 'Villiers High School', status: 'active', groupavatarurl: '/vhs-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'hello-intros', chlid: '12347', type: 'intros'},{name: 'resources', chlid: '12346', type: 'resources'}]},
  {gid: '20001', groupname: 'Into Games', status: 'active', groupavatarurl: '/intogames-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'leaderboard', chlid: '13347', type: 'leaderboard'},{name: 'social', chlid: '22347', type: 'social'},{name: 'other', chlid: '12348', type: 'other'}]},
  {gid: '20002', groupname: 'ACCESS:VFX', status: 'active', groupavatarurl: '/avfx-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20003', groupname: 'BAME in Games', status: 'active', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20004', groupname: 'Animated Women UK', status: 'active', groupavatarurl: '/aw-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
];

const DUMMY_INDUSTRY_LIST = [
  {gid: '19'},
  {gid: '20'},
  {gid: '15'},
  {gid: '2'},
];

const DUMMY_SKILL_LIST = [
 {gid: '5'},
 {gid: '28'}
];

/* App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(usersFetchData())
  };
};
*/
export default App;
