// Last merged this code on 4th apr 2022

import React from "react";
import ReactDOM from "react-dom";

import AddHighlightModalContent from "./AddHighlightModalContent";
import Modal from './Modal';
import MenuNav from './MenuNav.js';
import MyContent from "./MyContent.js";
import '../css/GroupDash.css';
//import {LoadingSpinner, Check} from "./GeneralFunctions";

const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: '+ Post',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

class UserActivityDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.userRole == 'mentee' ? 'question' : 'answer',
    }
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    const {userRole, updatePathName} = this.props;
    const {tabToView} = this.state;

    switch (tabToView) {
    /*  case 'overview':
        return <GroupDashOverview /> */
      case 'question':
      case 'answer':
      case 'general':
      case 'following':
        return <MyContent userRole={userRole} contentType={tabToView} updatePathName={updatePathName}/>
    /*  case 'savedcontent':
        return <GroupDashPayment />
      case 'settings':
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
            <button type="button" name="question" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'question' ? ' tabActive' : '')}>Questions</button>
            <button type="button" name="answer" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'answer' ? ' tabActive' : '')}>Answers</button>
            <button type="button" name="general" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'general' ? ' tabActive' : '')}>General Posts</button>
            <button type="button" name="following" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'following' ? ' tabActive' : '')}>Following</button>
          </div>
          { this.renderTab() }
          <Modal {...AddHighlightModalProps}>
            <AddHighlightModalContent modalID="modal-addHighlight" userRole={userRole} updatePathName={this.props.updatePathName}/>
          </Modal>
          <Modal {...AddHighlightSmlModalProps}>
            <AddHighlightModalContent modalID="modal-addHighlightSml" userRole={userRole} updatePathName={this.props.updatePathName}/>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default UserActivityDashboard;
