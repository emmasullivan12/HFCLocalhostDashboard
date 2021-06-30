// Dex last merged this code on 30th june 2021

import React, { Component } from "react";
import FeedbackPrivate from './Feedback-privateView.js';

class ManageFeedbackContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: 'received',
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
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,2,3,4,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3
        },
        {
          matchid: 12346,
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
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,2,3,4,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3
        },
      ],
      /*feedbackReceivedArr: [
        {
          isPublic: false,
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
      feedbackReceivedArr: [
        {
          isPublic: true,
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
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3
        },
        {
          isPublic: false,
          matchid: 12346,
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
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [1,2,3,4,7],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3
        },
        {
          isPublic: false,
          matchid: 12347,
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
          noteToMentor: 'Thank you so much for being my mentor. You were amazing and I really appreciated when you told me X and taught my Y',
          referenceForMentee: 'You have shown punctuality in our conversations and great passion for this industry. Your showreel has come on leaps and bounds too with all your hard work - congrats',
          menteeComms: 0,
          menteeCurio: 1,
          menteeAmb: 1,
          menteeConf: 2,
          menteeNetw: 3,
          privNoteToMentee: 'this is a private note from mentor to mentee',
          menteeWantsMoreOf: [0],
          mentorCompFuture: 1,
          mentorRoleModel: 2,
          mentorHighPerf: 0,
          mentorIndivSupport: 3,
          mentorIntellStimu: 2,
          mentorDirLeader: 3
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
    const userRole = 'mentor'

    switch (tabToView) {
      case 'received':
        return <FeedbackPrivate feedbackArr={feedbackReceivedArr} userRole={userRole} feedbackType='received'/>
      case 'given':
        return <FeedbackPrivate feedbackArr={feedbackGivenArr} userRole={userRole} feedbackType='given'/>
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
