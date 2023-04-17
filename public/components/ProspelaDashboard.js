// Dex last merged this code on 17th apr 2023

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
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import GroupDashboard from "./GroupDashboard";
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

const SetUpClassModalProps = {
  ariaLabel: 'Create New Class',
  triggerText: 'Create New Class >>',
  usedFor: 'setUpClassGroup',
  backBtn: 'arrow',
  changeInitFocus: true,
}

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
    const {moveScroller, startDrag} = this;
    const isLoggedIn = true

    var teacherQuestions = [
      {q: 'Teacher\'s First Name:', aType: 'text', req: 1, maxLength: 35, placeholder: 'Type first name...', name: 'classteacherfname'},
      {q: 'Teacher\'s Last Name:', aType: 'text', req: 1, maxLength: 35, placeholder: 'Type last name...', name: 'classteacherlname'},
      {q: 'Teacher\'s Email:', aType: 'text', req: 1, maxLength: 350, placeholder: 'Type email...', name: 'classemailtonotify'},
      {q: 'Are you from a School/College or University?', conditionalParent: 1, aType: 'select', req: 1, placeholder: 'Select option...', name: 'eduType', valueToShow: 'label', options: [
        {value: '0', label: 'School/College'},
        {value: '1', label: 'University'},
      ]},
      {q: 'Which School/College do you work at?', conditionalOn: 'eduType', showIf: [0], aType: 'autocomplete', req: 1, placeholder: 'Type your School name...', name: 'schinst', componentUpdatesState: 'ukSchsList', fileToRender: 'UKSchs', idValue: 'value', valueToShow: 'label', showDetail: true, detailToShow: 'location', noSuggestionsCTAclass: 'ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn'},
      {q: 'Which University do you work at?', conditionalOn: 'eduType', showIf: [1], aType: 'autocomplete', req: 1, placeholder: 'Type your University name...', name: 'uniinst', componentUpdatesState: 'ukUnisList', fileToRender: 'UKUnis', idValue: 'value', valueToShow: 'label', showDetail: true, detailToShow: 'location', noSuggestionsCTAclass: 'ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn'},
      {q: 'Class Name:', detail: 'e.g. Mr. Elvie\'s Music Class, Year 12 Maths', aType: 'text', req: 1, maxLength: 50, placeholder: 'Type Class name...', name: 'groupname'},
      {q: 'Does this group relate to a particular subject (leave blank if not)?', aType: 'autocompleteMulti', req: 0, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subject...', placeholderOnClick: 'Choose your main subject specialism:', name: 'classsubject', idValue: 'value', valueToShow: 'label', options: [
        {value: '0', label: 'Accounting'},
        {value: '1', label: 'Afrikaans'},
        {value: '2', label: 'Ancient History'},
        {value: '3', label: 'Anthropology'},
        {value: '4', label: 'Applied Science'},
        {value: '5', label: 'Arabic'},
        {value: '6', label: 'Archaeology'},
        {value: '7', label: 'Architecture'},
        {value: '8', label: 'Art and Design'},
        {value: '9', label: 'Anatomy'},
        {value: '10', label: 'Bengali'},
        {value: '11', label: 'Biblical Hebrew'},
        {value: '12', label: 'Biology'},
        {value: '13', label: 'Business Studies'},
        {value: '14', label: 'Chemistry'},
        {value: '15', label: 'Citizenship Studies'},
        {value: '16', label: 'Classical Civilisation'},
        {value: '17', label: 'Classical Greek'},
        {value: '18', label: 'Classical Studies'},
        {value: '19', label: 'Communication and Culture'},
        {value: '20', label: 'Computer Science'},
        {value: '21', label: 'Computing'},
        {value: '22', label: 'Criminology'},
        {value: '23', label: 'Critical Thinking'},
        {value: '24', label: 'Dance'},
        {value: '25', label: 'Design and Technology'},
        {value: '26', label: 'Design and Textiles'},
        {value: '27', label: 'Digital Media and Design'},
        {value: '28', label: 'Digital Technology'},
        {value: '29', label: 'Divinity'},
        {value: '30', label: 'Drama'},
        {value: '31', label: 'Drama and Theatre'},
        {value: '32', label: 'Dutch'},
        {value: '33', label: 'Economics'},
        {value: '34', label: 'Electronics'},
        {value: '35', label: 'Engineering'},
        {value: '36', label: 'English Language'},
        {value: '37', label: 'English Language and Literature'},
        {value: '38', label: 'English Literature'},
        {value: '39', label: 'Environmental Science'},
        {value: '40', label: 'Environmental Studies'},
        {value: '41', label: 'Environmental Technology'},
        {value: '42', label: 'Fashion and Textiles'},
        {value: '43', label: 'Film Studies'},
        {value: '44', label: 'Food Studies'},
        {value: '45', label: 'Food Technology'},
        {value: '46', label: 'French'},
        {value: '47', label: 'Further Mathematics'},
        {value: '48', label: 'General Studies'},
        {value: '49', label: 'Geography'},
        {value: '50', label: 'Geology'},
        {value: '51', label: 'German'},
        {value: '52', label: 'Global Development'},
        {value: '53', label: 'Global Perspectives and Research'},
        {value: '54', label: 'Government and Politics'},
        {value: '116', label: 'Graphics'},
        {value: '55', label: 'Greek'},
        {value: '56', label: 'Gujarati'},
        {value: '57', label: 'Health and Social Care'},
        {value: '58', label: 'Hindi'},
        {value: '59', label: 'Hinduism'},
        {value: '60', label: 'History'},
        {value: '61', label: 'History of Art'},
        {value: '62', label: 'Home Economics'},
        {value: '63', label: 'Human Biology'},
        {value: '64', label: 'Humanities'},
        {value: '65', label: 'Information Technology / ICT'},
        {value: '66', label: 'Irish'},
        {value: '67', label: 'Islamic Studies'},
        {value: '68', label: 'Italian'},
        {value: '69', label: 'Japanese'},
        {value: '70', label: 'Journalism'},
        {value: '71', label: 'Latin'},
        {value: '72', label: 'Law'},
        {value: '73', label: 'Leisure Studies'},
        {value: '74', label: 'Life and Health Sciences'},
        {value: '75', label: 'Marine Science'},
        {value: '76', label: 'Mathematics'},
        {value: '77', label: 'Media Studies'},
        {value: '78', label: 'Modern Hebrew'},
        {value: '79', label: 'Moving Image Arts'},
        {value: '80', label: 'Music'},
        {value: '81', label: 'Music Technology'},
        {value: '82', label: 'Nutrition and Food Science'},
        {value: '83', label: 'Punjabi'},
        {value: '84', label: 'Performance Studies'},
        {value: '85', label: 'Performing Arts'},
        {value: '86', label: 'Persian'},
        {value: '87', label: 'Philosophy'},
        {value: '88', label: 'Photography'},
        {value: '89', label: 'Physical Education'},
        {value: '90', label: 'Physics'},
        {value: '91', label: 'Polish'},
        {value: '92', label: 'Politics'},
        {value: '93', label: 'Portuguese'},
        {value: '94', label: 'Product Design'},
        {value: '95', label: 'Psychology'},
        {value: '96', label: 'Pure Mathematics'},
        {value: '97', label: 'Quantitative Methods'},
        {value: '98', label: 'Religious Studies'},
        {value: '99', label: 'Russian'},
        {value: '100', label: 'Science in Society'},
        {value: '101', label: 'Sociology'},
        {value: '102', label: 'Software Systems Development'},
        {value: '103', label: 'Spanish'},
        {value: '104', label: 'Sports Science'},
        {value: '105', label: 'Statistics'},
        {value: '106', label: 'Systems and Control Technology'},
        {value: '107', label: 'Telugu'},
        {value: '108', label: 'Tamil'},
        {value: '109', label: 'Technology and Design'},
        {value: '110', label: 'Thinking Skills'},
        {value: '111', label: 'Travel and Tourism'},
        {value: '112', label: 'Turkish'},
        {value: '113', label: 'Urdu'},
        {value: '114', label: 'Welsh'},
        {value: '115', label: 'World Development'},
      ]},
    ]

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
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller} onMouseEnter={this.showScroll} onMouseLeave={this.hideScroll}>
                  <div className="menuContainer">
                    <Modal {...SubmitMatchModalProps}>
                      <SubmitMatchContent />
                    </Modal>
                    <Modal {...SendNotifModalProps}>
                      <SendNotifModalContent />
                    </Modal>
                    <FullPageModal {...SetUpClassModalProps}>
                      <Form
                        questions={teacherQuestions}
                        usedFor="setUpClassGroup"
                        renderComponentsInitialState='ukUnisList'
                        renderComponentsInitialState2='ukSchsList'
                        formTitle="Set up a new Class"
                      />
                    </FullPageModal>
                    <div className="menuBreak"/>
                    <div className="mainMenu">
                      <NavLink exact to="/prospela-dashboard" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Dashboard</NavLink>
                      <NavLink exact to="/review-signups" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Approve Signups</NavLink>
                      <NavLink exact to="/background-checks" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Background Checks</NavLink>
                      <NavLink exact to="/group/dashboard" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={this.closeMenu}>Group Dashboard</NavLink>
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
                      {/*}  <span className="menuItemIconContainer chat">
                          <i className="fas fa-link" />
                        </span>*/}
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
                <div className="c-scrollbar__track" onMouseEnter={this.showScroll} onMouseLeave={this.hideScroll}>
                  <div className="c-scrollbar__bar"/>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer col-s-12" role="button" tabIndex={0} onKeyDown={this.handleKeyDown} onClick={this.closeMenu}>
              <Switch>
                <Redirect exact from="/" to="/prospela-dashboard" />,
                <Route path="/prospela-dashboard" render={(props) => <PrDashboard {...props} isLoggedIn={isLoggedIn} />}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <Route path="/messages/:chatid" render={(props) => <ProspelaBot {...props} isGroup={false} />}/>
                <Route path="/community/:groupid" render={(props) => <ProspelaBot {...props} isGroup />}/>
                <Route path="/group/dashboard" component={GroupDashboard}/>
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
