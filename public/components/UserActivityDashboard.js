// Dex last merged this code on 7th mar 2022

import React from "react";
import ReactDOM from "react-dom";

import MenuNav from './MenuNav.js';
import MyContent from "./MyContent.js";

import '../css/GroupDash.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";

class UserActivityDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.userRole == 'mentee' ? 'questions' : 'answers',
    }
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    const {userRole} = this.props;
    const {tabToView} = this.state;

    switch (tabToView) {
    /*  case 'overview':
        return <GroupDashOverview /> */
      case 'questions':
      case 'answers':
      case 'generalPosts':
        return <MyContent userRole={userRole} contentType={tabToView}/>
    /*  case 'savedcontent':
        return <GroupDashPayment />
      case 'following':
        return <GroupDashSettings /> */
    }
  }

  render() {
    const {tabToView} = this.state
    const {userRole} = this.props;

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <MenuNav />
            <div><strong>My Activity</strong></div>
          </div>
          <div className="groupdash-menuBar">
            {userRole == 'mentee' && (
              <React.Fragment>
                {/*  <button type="button" name="overview" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button> */}
                <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
                {/*  <button type="button" name="savedcontent" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'savedcontent' ? ' tabActive' : '')}>Saved</button>
                <button type="button" name="following" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'following' ? ' tabActive' : '')}>Following</button> */}
              </React.Fragment>
            )}
            {userRole == 'mentor' && (
              <React.Fragment>
                <button type="button" name="answers" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'answers' ? ' tabActive' : '')}>Answers</button>
                <button type="button" name="generalPosts" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'generalPosts' ? ' tabActive' : '')}>General Posts</button>
              </React.Fragment>
            )}

          </div>
          { this.renderTab() }
        </div>
      </React.Fragment>
    );
  }
}

export default UserActivityDashboard;
