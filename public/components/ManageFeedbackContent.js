// Dex last merged this code on 26th june 2021

import React, { Component } from "react";
import FeedbackPrivate from './Feedback-privateView.js';

class ManageFeedbackContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: 'received',
      feedbackReceivedArr: [],
    /*  feedbackReceivedArr: [
        {
          matchid: 12345,
          date_matched: '2021-03-21T00:00:00.000Z',
          mentorname: 'Emma',
          mentoruid: 2345,
          menteename: 'Dexter',
          menteeuid: 1234,
          eetstatus: 'job',
          schname: '',
          schnamefreetext: '', // If their school wasn't on the list
          uniname: '75',
          uninamefreetext: '', // If their school wasn't on the list
          degree: '',
          currrole: 'Head of Marketing',
          currco: 'Pladis',
          currtraining: '',
          currtrainingprovider: '',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee'
        },
      ],*/
      feedbackGivenArr: [
        {
          matchid: 12345,
          date_matched: '2021-03-21T00:00:00.000Z',
          mentorname: 'Emma',
          mentoruid: 2345,
          menteename: 'Dexter',
          menteeuid: 1234,
          eetstatus: 'job',
          schname: '',
          schnamefreetext: '', // If their school wasn't on the list
          uniname: '75',
          uninamefreetext: '', // If their school wasn't on the list
          degree: '',
          currrole: 'Head of Marketing',
          currco: 'Pladis',
          currtraining: '',
          currtrainingprovider: '',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee'
        },
      ],
    }
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    const {tabToView, isLoading, feedbackReceivedArr, feedbackGivenArr} = this.state;
    const userRole = 'mentee'

    switch (tabToView) {
      case 'received':
        return <FeedbackPrivate feedbackArr={feedbackReceivedArr} userRole={userRole}/>
      case 'given':
        return <FeedbackPrivate feedbackArr={feedbackGivenArr} userRole={userRole}/>
    }
  }

  render() {
    const {tabToView, feedbackReceivedArr, feedbackGivenArr} = this.state
    const numReceived = feedbackReceivedArr.length
    const numSent = feedbackGivenArr.length

    return (
      <React.Fragment>
        <div className="tabWindow modal">
          <div className="title-blankPage modal">
            <div><strong>Manage Feedback</strong></div>
          </div>
          <div className="groupdash-menuBar">
            <button type="button" name="received" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'received' ? ' tabActive' : '')}>Received ({numReceived})</button>
            <button type="button" name="given" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'given' ? ' tabActive' : '')}>Given ({numSent})</button>
          </div>
          { this.renderTab() }
        </div>
      </React.Fragment>
    );
  }
}

export default ManageFeedbackContent;
