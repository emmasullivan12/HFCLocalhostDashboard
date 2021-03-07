// Dex last merged this code on 5th mar 2021

import React, { Component} from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/
import "../css/App.css";
import "../css/General.css";
import {
  Route,
  BrowserRouter,
  Redirect,
  NavLink,
  Switch
} from "react-router-dom";
/*import store from "../store/configureStore";
import { usersFetchData } from "../actions/Users";*/

import {cdn} from './CDN.js';
import BackgroundCheck from "./BackgroundChecks";
import ChatMenu from "./ChatMenu";
import MatchesToDo from "./MatchesToDo";
import MatchesInProg from "./MatchesInProg";
import MatchesCompleted from "./MatchesCompleted";
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import NotFound from "./NotFound";
import NullMatches from "./NullMatches";
import ProspelaBot from "./ProspelaBot";
import ReviewSignups from "./ReviewSignups";
import SendNotifModalContent from './SendNotifModalContent.js';
import SubmitMatchContent from './SubmitMatchContent.js';
import PrDashboard from "./PrDashboard.js";
import ProspelaMenuContent from "./ProspelaMenuContent";

const MenuModalContent = (
  <ProspelaMenuContent />
)

//This is for Prospela team to send notification to all or some users
const SendNotifModalProps = {
  ariaLabel: 'Popup for Prospela to send notifications to users',
  triggerText: 'Send Notification',
  usedFor: 'PrSendNotif'
}

//This includes props and title to be passed to RequestChatModal
const SubmitMatchModalProps = {
  ariaLabel: 'Popup for Prospela to submit mentor matches',
  triggerText: 'Submit new match',
  usedFor: 'SubmitMatch',
  changeInitFocus: true
}

// This includes all content to appear below Modal's title for the RequestChatModal
const SubmitMatchModalContent = (
  <SubmitMatchContent />
)

class ProspelaDashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollerBeingDragged: false,
      normalizedPosition: 0,
      contentPosition: 0,
    }
    this.scrollBarRef = React.createRef();
    this.calculateScrollerHeight = this.calculateScrollerHeight.bind(this);
    this.createScroller = this.createScroller.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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
    const {moveScroller, startDrag} = this;
    return(
      <BrowserRouter>
        <div className="clientUI" onKeyDown={this.onKeyDown}>
          <div className="clientContainer">
            <div className="clientMenuContainer" id="clientMenu">
            <button type="button" className="close-menu" aria-labelledby="Close Modal" onClick={this.closeMenu}>
              <span id="close-modal" className="u-hide-visually">Close</span>
              <svg className="menu-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
            </button>
              <MenuModal>
                {MenuModalContent}
              </MenuModal>
              <div className="c-scrollbar">
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller}>
                  <div className="menuContainer">
                    <Modal {...SubmitMatchModalProps}>
                      <SubmitMatchContent />
                    </Modal>
                    <Modal {...SendNotifModalProps}>
                      <SendNotifModalContent />
                    </Modal>
                    <div className="menuBreak"/>
                    <div className="mainMenu">
                      <NavLink exact to="/prospela-dashboard" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Dashboard</NavLink>
                      <NavLink exact to="/review-signups" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Approve Signups</NavLink>
                      <NavLink exact to="/background-checks" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Background Checks</NavLink>
                    </div>
                    <ChatMenu isProspelaTeam chatGroup='Mentee DMs' onClick={this.closeMenu}/>
                    <ChatMenu isProspelaTeam chatGroup='E-Mentor DMs' onClick={this.closeMenu}/>
                  {/*  <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='Prospela DMs' onClick={this.closeMenu}/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='U18 Chats to Monitor' onClick={this.closeMenu}/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='18+ Chats to Monitor' onClick={this.closeMenu}/>*/}
                    <div className="menuBreak"/>
                    <div className="chatMenu">
                      <div className="chatMenu-header overflow-ellipsis">
                        Matches
                        <span className="menuItemIconContainer chat">
                          <i className="fas fa-link" />
                        </span>
                      </div>
                      <div className="channelsContainer">
                        <NavLink to="/matches/to-be-matched" activeClassName="is-active" className="chatMenuItem link group" onClick={this.closeMenu}>
                          <div className="chatItemFlexContainer">
                            <div className="chatMenuLink overflow-ellipsis">
                              To be matched <span role="img" aria-label="linkEmoji">🔗</span>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink to="/matches/in-progress" activeClassName="is-active" className="chatMenuItem link group" onClick={this.closeMenu}>
                          <div className="chatItemFlexContainer">
                            <div className="chatMenuLink overflow-ellipsis">
                              In Progress <span role="img" aria-label="clockEmoji">⏱️</span>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink to="/matches/null-rejected" activeClassName="is-active" className="chatMenuItem link group" onClick={this.closeMenu}>
                          <div className="chatItemFlexContainer">
                            <div className="chatMenuLink overflow-ellipsis">
                              Null & Rejected <span role="img" aria-label="clockEmoji">❌</span>
                            </div>
                          </div>
                        </NavLink>
                        <NavLink to="/matches/completed" activeClassName="is-active" className="chatMenuItem link group" onClick={this.closeMenu}>
                          <div className="chatItemFlexContainer">
                            <div className="chatMenuLink overflow-ellipsis">
                              Completed
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="menuBreak"/>
                    <div className="prLogoArea notLogin">
                      <div className="prLogoContainer">
                      {/*  <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" /> */}
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
              {/*  <div className="scroller"/>*/}
                <div className="c-scrollbar__track">
                  <div className="c-scrollbar__bar"/>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer col-s-12" role="button" tabIndex={0} onKeyDown={this.handleKeyDown} onClick={this.closeMenu}>
              <Switch>
                <Redirect exact from="/" to="/prospela-dashboard" />,
                <Route path="/prospela-dashboard" component={PrDashboard}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <Route path="/messages/:chatid" render={(props) => <ProspelaBot {...props} isGroup={false} />}/>
                <Route path="/community/:groupid" render={(props) => <ProspelaBot {...props} isGroup />}/>
                <Route path="/review-signups" component={ReviewSignups}/>
                <Route path="/background-checks" component={BackgroundCheck}/>
                <Route path="/matches/to-be-matched" component={MatchesToDo}/>
                <Route path="/matches/in-progress" component={MatchesInProg}/>
                <Route path="/matches/null-rejected" component={NullMatches}/>
                <Route path="/matches/completed" component={MatchesCompleted}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// Dummy chat list data (this will eventually come from Postgres)
const DUMMY_CHAT_LIST = [
  {chatid: '10000', studentId: '12345', mentor: 'Dexter', matchedTimestamp: '20181219', status: 'Prospela'},
  {chatid: '10001', studentId: '12345', mentor: 'David', matchedTimestamp: '20181219', status: 'ended'},
  {chatid: '10002', studentId: '12345', mentor: 'Emily', matchedTimestamp: '20181219', status: 'ended'},
];

export default ProspelaDashboard;
