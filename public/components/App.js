import React, { Component} from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/
import "../css/App.css";
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
import LatestAdvice from "./LatestAdvice";
import LgdInUsrProfile from "./LgdInUsrProfile";
import LoginContent from "./LoginContent.js";
import LoginSUTemplate from "./LoginSUTemplate";
import MainMenu from "./MainMenu";
import MentorHomePage from './MentorHomePage.js';
import MenuModal from "./MenuModal";
import NotFound from "./NotFound";
import ProspelaBot from "./ProspelaBot";
import ProtectedChats from "./ProtectedChats";
import ProtectedRoute from "./ProtectedRoute";
import SubmitMatch from './PrSubmitMatches.js';
import Teams from "./Teams";
import Todo from "./Todo";
import TypeformSignUp from "./TypeformSignUp";
import UserMenuContent from "./UserMenuContent";
import VerifyEmail from "./VerifyEmail";

const MenuModalContent = (
  <UserMenuContent />
)

const SUContent = ('mentor or mentee?')
const MenteeSUContent = ('mentee SU')
const MentorSUContent = ('mentor SU')

class Dashboard extends Component{
  render(){
    const userRole = this.props.userRole;
    return(
      <BrowserRouter>
        <div className="clientUI">
          <div className="clientContainer">
            <div className="clientMenuContainer">
              <span className="notificationBell">
                <button className="button-unstyled bell-icon" type="button">
                  <i className="fa fa-bell" />
                </button>
              </span>
              <MenuModal >{MenuModalContent}</MenuModal>
              <div className="scrollArea">
                <div className="menuContainer">
                  <MainMenu />
                  <div className="menuBreak"/>
                  <ChatMenu chats={DUMMY_CHAT_LIST} />
                  <div className="menuBreak"/>
                  <div className="prLogoArea">
                    <div className="prLogoContainer">
                      <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer">
              <Switch>
                {{
                  ['mentee']: <Redirect exact from="/" to="/latest-advice" />,
                  ['mentor']: <Redirect exact from="/" to="/mentorhomepage" />,
                }[userRole]}
                <ProtectedRoute path="/latest-advice" roleAllowed="mentor" userRole="mentor" component={LatestAdvice}/>,
                <ProtectedRoute path="/mentee-profile" roleAllowed="mentor" userRole="mentor" component={LgdInUsrProfile}/>,
                <ProtectedRoute path="/to-do-list" roleAllowed="mentor" userRole="mentor" component={Todo}/>,
                <ProtectedRoute path="/teams" roleAllowed="mentor" userRole="mentor" component={Teams}/>
                <ProtectedRoute path="/mentorhomepage" roleAllowed="mentor" userRole="mentor" component={MentorHomePage}/>
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <Route path="/prospelahomepage" component={SubmitMatch}/>
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
    const loginServer = true;
    const loginSU = 'L';
    switch (loginServer) {
      case true:
        return (
          <div className="App">
            {{
              ['L']: <Login/>,
              ['SU']: <SignUp/>,
            }[loginSU]}
          </div>
        );
      case false:
        return (
          <div className="App">
            {{
              ['mentee']: <MenteeSteps userRole={userRole}/>,
              ['mentor']: <MentorSteps userRole={userRole}/>,
            }[userRole]}
          </div>
        );
    }
  }
}

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

function MenteeSteps({userRole}) {
  const step = 1;
//    const step = this.props.users.step;
      switch (step) {
        case 1:
          return (
            <BrowserRouter>
              <Switch>
                <Redirect exact from="/" to="/mentee-signup" />
                <ProtectedRoute path="/mentee-signup" roleAllowed="mentee" userRole="mentee" component={TypeformSignUp} />
              </Switch>
            </BrowserRouter>
          );
        case 2:
          return (
            <BrowserRouter>
              <Switch>
                <Redirect exact from="/" to="/verify-email" />
                <Route path="/verify-email" component={VerifyEmail} />
              </Switch>
            </BrowserRouter>
          );
        case 3:
          return <Dashboard userRole={userRole}/>
      }
}

function MentorSteps({userRole}) {
  const step = 1;
//    const step = this.props.users.step;
      switch (step) {
        case 1:
          return (
            <BrowserRouter>
              <Switch>
                <Redirect exact from="/" to="/mentor-signup" />
                <Route path="/mentor-signup" component={TypeformSignUp} />
              </Switch>
            </BrowserRouter>
          );
        case 2:
          return (
            <BrowserRouter>
              <Switch>
                <Redirect exact from="/" to="/verify-email" />
                <Route path="/verify-email" component={VerifyEmail} />
              </Switch>
            </BrowserRouter>
          );
        case 3:
          return <Dashboard userRole={userRole}/>
      }
}

// Dummy chat list data (this will eventually come from Postgres)
const DUMMY_CHAT_LIST = [
  {chatID: '10000', studentId: '12345', mentor: 'Dexter', matchedTimestamp: '20181219', status: 'Prospela'},
  {chatID: '10001', studentId: '12345', mentor: 'David', matchedTimestamp: '20181219', status: 'ended'},
  {chatID: '10002', studentId: '12345', mentor: 'Emily', matchedTimestamp: '20181219', status: 'ended'},
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
