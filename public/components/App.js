// Dex last merged this code on 12th jan 2022

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
import GroupsMenu from "./GroupsMenu";
import LatestAdvice from "./LatestAdvice";
import LgdInUsrProfile from "./LgdInUsrProfile";
import {LoadingSpinner, showNotifFavicon, hideNotifFavicon} from './GeneralFunctions.js';
import MainMenu from "./MainMenu";
import MenteeActivityDashboard from "./MenteeActivityDashboard";
import MentorHomePage from './MentorHomePage.js';
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import NotFound from "./NotFound";
import ProspelaBot from "./ProspelaBot";
import ProspelaDashboard from "./ProspelaDashboard";
import Teams from "./Teams";
import Todo from "./Todo";
import TypeformSignUp from "./TypeformSignUp";
import UserMenuContent from "./UserMenuContent";
import VerifyEmail from "./VerifyEmail";

/*
const SUContent = ('mentor or mentee?')
const MenteeSUContent = ('mentee SU')
const MentorSUContent = ('mentor SU')*/

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

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollerBeingDragged: false,
      normalizedPosition: 0,
      contentPosition: 0,
  //    menuItemActive: '',
  //    menuItemActive: 'dashboard' //Homepage for any user
    }
    this.scrollBarRef = React.createRef();
    this.calculateScrollerHeight = this.calculateScrollerHeight.bind(this);
    this.createScroller = this.createScroller.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  //  this.updateActiveMenu = this.updateActiveMenu.bind(this);
  }

  componentDidMount() {
    this.createScroller();
    window.addEventListener('resize', this.createScroller);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createScroller);
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
  //  const fullsustep = 'justjoined';
    const {moveScroller, startDrag} = this;

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
              <Modal {...AddHighlightSmlModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlightMenuSml"/>
              </Modal>
              <MenuModal changeInitFocus>
                <UserMenuContent userRole={userRole}/>
              </MenuModal>
              <div className="c-scrollbar">
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller} onMouseEnter={this.showScroll} onMouseLeave={this.hideScroll}>
                  <div className="menuContainer">
                    <MainMenu userRole={userRole} onClick={this.closeMenu} onMouseDown={this.onMouseDown}/>
                    <div className="menuBreak"/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} chatGroup='Direct Messages' onClick={this.closeMenu}/>
                    <div className="menuBreak"/>
                    <GroupsMenu groups={DUMMY_GROUP_LIST} onClick={this.closeMenu}/>
                    <div className="menuBreak"/>
                    <div className="prLogoArea notLogin">
                      <div className="prLogoContainer">
{/*<img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" />*/}
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
            <div className="clientWindowContainer col-s-12" role="button" tabIndex={0} onKeyDown={this.handleKeyDown} onClick={this.closeMenu}>
              <Switch>
                {{
                  ['mentee']: <Redirect exact from="/" to="/latest-advice" />,
                  ['mentor']: <Redirect exact from="/" to="/mentor-homepage" />,
                }[userRole]}
                <Route path="/latest-advice" component={LatestAdvice}/>,
                <Route path="/mentee-profile" component={LgdInUsrProfile}/>,
                <Route path="/to-do-list" component={Todo}/>,
                <Route path="/teams" component={Teams}/>
                <Route path="/mentor-homepage" roleAllowed="mentor" userRole="mentor" component={MentorHomePage}/>
                <Route path="/my-activity" roleAllowed="mentee" userRole="mentee" component={MenteeActivityDashboard}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <Route path="/messages/:chatid" render={(props) => <ProspelaBot {...props} isGroup={false} />}/>
                <Route path="/community/:groupid" render={(props) => <ProspelaBot {...props} isGroup />}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
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
  const step = 'didShortSUtf';
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
