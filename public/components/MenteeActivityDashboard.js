// Dex last merged this code on 20th apr 2021

import React from "react";
import ReactDOM from "react-dom";

import MenuNav from './MenuNav.js';
import MyQuestions from "./MyQuestions";

import '../css/GroupDash.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";

class MenteeActivityDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: 'questions',
    }
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    switch (this.state.tabToView) {
    /*  case 'overview':
        return <GroupDashOverview /> */
      case 'questions':
        return <MyQuestions />
    /*  case 'savedcontent':
        return <GroupDashPayment />
      case 'following':
        return <GroupDashSettings /> */
    }
  }

  render() {
    const {tabToView} = this.state

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <MenuNav />
            <div><strong>My Activity</strong></div>
          </div>
          <div className="groupdash-menuBar">
          {/*  <button type="button" name="overview" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button> */}
            <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
          {/*  <button type="button" name="savedcontent" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'savedcontent' ? ' tabActive' : '')}>Saved</button>
            <button type="button" name="following" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'following' ? ' tabActive' : '')}>Following</button> */}
          </div>
          { this.renderTab() }
        </div>
      </React.Fragment>
    );
  }
}

export default MenteeActivityDashboard;
