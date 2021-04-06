// Dex last merged this code on 23rd mar 2021

import React from "react";
import ReactDOM from "react-dom";

import GroupDashOverview from "./GroupDash-Overview";
import GroupDashMembers from "./GroupDash-Members";
import GroupDashPayment from "./GroupDash-Payment";
import GroupDashSettings from "./GroupDash-Settings";

import '../css/GroupDash.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";

class GroupDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: 'overview',
    }
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    switch (this.state.tabToView) {
      case 'overview':
        return <GroupDashOverview />
      case 'members':
        return <GroupDashMembers />
      case 'payment':
        return <GroupDashPayment />
      case 'settings':
        return <GroupDashSettings />
    }
  }

  render() {
    const {tabToView} = this.state

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <strong>Dashboard</strong>
          </div>
          <div className="groupdash-menuBar">
            <button type="button" name="overview" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
            <button type="button" name="members" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'members' ? ' tabActive' : '')}>Members</button>
            <button type="button" name="payment" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'payment' ? ' tabActive' : '')}>Payment</button>
            <button type="button" name="settings" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'settings' ? ' tabActive' : '')}>Settings</button>
          </div>
          { this.renderTab() }
        </div>
      </React.Fragment>
    );
  }
}

export default GroupDashboard;
