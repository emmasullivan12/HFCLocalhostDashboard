// Dex last merged this code on 17th Sept 2019

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

import ChatMenu from "./ChatMenu";
import GroupsMenu from "./GroupsMenu";
import LatestAdvice from "./LatestAdvice";
import LgdInUsrProfile from "./LgdInUsrProfile";
import MainMenu from "./MainMenu";
import MentorHomePage from './MentorHomePage.js';
import MenuModal from "./MenuModal";
import NotFound from "./NotFound";
import ProspelaBot from "./ProspelaBot";
import ProspelaDashboard from "./ProspelaDashboard";
import ProtectedChats from "./ProtectedChats";
import ProtectedRoute from "./ProtectedRoute";
import Teams from "./Teams";
import Todo from "./Todo";
import TypeformSignUp from "./TypeformSignUp";
import UserMenuContent from "./UserMenuContent";
import VerifyEmail from "./VerifyEmail";

/*
const SUContent = ('mentor or mentee?')
const MenteeSUContent = ('mentee SU')
const MentorSUContent = ('mentor SU')*/

class Loading extends Component{
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
                    <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" />
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
                        <div className="SpinnerWrapper-sc-1eu50fy-2 ebrxGH">
                          <span color="currentColor" className="SVGInline SpinnerSvg-jjs2a1-0 dtuFiT">
                            <svg className="SVGInline-svg SpinnerSvg-jjs2a1-0-svg dtuFiT-svg" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <title>loader</title>
                              <g fill="#2F2F26" fillrule="evenodd">
                                <rect transform="rotate(22.5 26.506 4.294)" x="25.506" y="1.294" width="2" height="6" rx="1"/>
                                <rect transform="rotate(45 32.02 7.98)" x="31.021" y="4.979" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-112.5 35.706 13.494)" x="34.706" y="10.494" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-90 37 20)" x="36" y="17" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-67.5 35.706 26.506)" x="34.706" y="23.506" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-45 32.02 32.02)" x="31.021" y="29.021" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-22.5 26.506 35.706)" x="25.506" y="32.706" width="2" height="6" rx="1"/>
                                <rect x="19" y="34" width="2" height="6" rx="1"/>
                                <rect transform="rotate(22.5 13.494 35.706)" x="12.494" y="32.706" width="2" height="6" rx="1"/>
                                <rect transform="rotate(45 7.98 32.02)" x="6.979" y="29.021" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-112.5 4.294 26.506)" x="3.294" y="23.506" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-90 3 20)" x="2" y="17" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-67.5 4.294 13.494)" x="3.294" y="10.494" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-45 7.98 7.98)" x="6.979" y="4.979" width="2" height="6" rx="1"/>
                                <rect transform="rotate(-22.5 13.494 4.294)" x="12.494" y="1.294" width="2" height="6" rx="1"/>
                                <rect x="19" width="2" height="6" rx="1"/>
                              </g>
                            </svg>
                          </span>
                        </div>
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

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollerBeingDragged: false,
      normalizedPosition: 0,
      contentPosition: 0
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

  closeMenu() {
//    document.getElementById("clientMenu").style.width = "0px";
    document.getElementById("clientMenu").style.left = "-220px";
    document.getElementById("clientMenu").style.zIndex = "0";
  //  this.openMenuRef.focus();
  }

  render(){
    const userRole = this.props.userRole;
  //  const fullsustep = 'justjoined';
    const {moveScroller, startDrag} = this;
    return(
      <BrowserRouter>
        <div className="clientUI">
          <div className="clientContainer">
            <div className="clientMenuContainer" id="clientMenu">
              <button type="button" className="close-menu" aria-labelledby="Close Modal" onClick={this.closeMenu}>
                <span id="close-modal" className="u-hide-visually">Close</span>
                <svg className="menu-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
              </button>
              <MenuModal>
                <UserMenuContent userRole={userRole}/>
              </MenuModal>
              <div className="c-scrollbar">
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller}>
                  <div className="menuContainer">
                    <MainMenu userRole={userRole}/>
                    <div className="menuBreak"/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} chatGroup='Direct Messages'/>
                    <div className="menuBreak"/>
                    <GroupsMenu groups={DUMMY_GROUP_LIST}/>
                    <div className="menuBreak"/>
                    <div className="prLogoArea notLogin">
                      <div className="prLogoContainer">
                        <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-scrollbar__track">
                  <div className="c-scrollbar__bar"/>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer col-s-12">
              <Switch>
                {{
                  ['mentee']: <Redirect exact from="/" to="/latest-advice" />,
                  ['mentor']: <Redirect exact from="/" to="/mentor-homepage" />,
                }[userRole]}
                <ProtectedRoute path="/latest-advice" roleAllowed="mentee" userRole="mentee" component={LatestAdvice}/>,
                <ProtectedRoute path="/mentee-profile" roleAllowed="mentee" userRole="mentee" component={LgdInUsrProfile}/>,
                <ProtectedRoute path="/to-do-list" roleAllowed="mentee" userRole="mentee" component={Todo}/>,
                <ProtectedRoute path="/teams" roleAllowed="mentor" userRole="mentor" component={Teams}/>
                <ProtectedRoute path="/mentor-homepage" roleAllowed="mentor" userRole="mentor" component={MentorHomePage}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <ProtectedChats chats={DUMMY_CHAT_LIST} />
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
  /* componentDidMount() {
    this.props.fetchData();
  } */
  render() {
    const userRole = 'mentor' /*this.props.users.role*/;
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
  const step = 'didShortSU';
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
                  <Redirect exact from="/" to="/mentee-signup" />
                  <ProtectedRoute path="/mentee-signup" roleAllowed="mentee" userRole="mentee" step={step} component={TypeformSignUp} />
                </Switch>
              </BrowserRouter>
            );
          case 'didShortSU':
          case 'autoEnroll':
          case 'joinedProg':
          case 'didFullSUtf':
          case 'didTrain':
            return <Dashboard userRole={userRole}/>
      }
}

function MentorSteps({userRole}) {
  const step = 'skippedTrain';
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
          case 'didSUtf':
          case 'didU18tf':
            return (
              <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/mentor-signup" />
                  <Route path="/mentor-signup" component={TypeformSignUp} step={step} />
                </Switch>
              </BrowserRouter>
            );
          case 'didU18pref':
            return (
              <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/training" />
                  <Route path="/mentor-training" component={TypeformSignUp} step={step} />
                </Switch>
              </BrowserRouter>
            );
          case 5:
            return <Loading userRole={userRole}/>
          case 'skippedTrain':
          case 'didTrain':
            return <Dashboard userRole={userRole} step={step}/>
        }
}

// Dummy chat list data (this will eventually come from Postgres)
const DUMMY_CHAT_LIST = [
  {chatID: '10000', studentId: '12345', mentor: 'Dexter', matchedTimestamp: '20181219', status: 'Prospela'},
  {chatID: '10001', studentId: '12345', mentor: 'David', matchedTimestamp: '20181219', status: 'ended'},
  {chatID: '10002', studentId: '12345', mentor: 'Emily', matchedTimestamp: '20181219', status: 'ended'},
];

const DUMMY_GROUP_LIST = [
  {groupID: '10000', name: 'Villiers High School', status: 'active'},
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
