// Dex last merged this code on 7th mar 2022

import React, { Component } from 'react';
import {Link} from "react-router-dom";

import AutoEnrollPrompt from "./AutoEnrollPrompt";
import Checkbox from './Checkbox.js';
import FeedHeader from './FeedHeader.js';
import GroupCircle from "./GroupCircle";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import Modal from './Modal';
import {ChevronDown, ChevronUp} from './GeneralFunctions.js';
import "../css/HomePage.css";
import "../css/HomepageCTAContainer.css";

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSmlHome',
  changeInitFocus: true
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.tabToView ? this.props.tabToView : 'all',
      userStepsIsOpen: true,
      userstep: 'autoEnroll',
    }
  }

  componentDidMount() {
    document.getElementById("clientWindowContainer").classList.add('overflowYHidden')
  }

  componentDidUpdate() {
    const {tabToView} = this.props;

    // Maybe use this to determine whether to trigger or now https://stackoverflow.com/questions/69806279/how-to-know-a-react-link-component-has-been-clicked
    if (tabToView == "questions" && tabToView != this.state.tabToView) {
      this.setState({
        tabToView: tabToView
      })
    }
  }

  componentWillUnmount() {
    document.getElementById("clientWindowContainer").classList.remove('overflowYHidden')
  }

  updateTabToView = (e) => {
    this.updateActiveClasslists()

    this.setState({
      tabToView: e.target.name
    })
  }

  filterBy = (e) => {
    e.stopPropagation()

    for (let sibling of e.currentTarget.parentNode.children) {
        if (sibling !== e.currentTarget) {
          sibling.classList.remove('isActive');
        }
    }

    e.currentTarget.classList.add('isActive')

    // Update URL with searchParams i.e. "?filter=Unanswered"
    const url = new URL(window.location);
    url.searchParams.set('filter', e.currentTarget.value);
    history.pushState({}, '', url)
  }

  updateActiveClasslists = () => {
    const {tabToView} = this.state;
    const filterBtns = document.querySelectorAll(".filter-btn");

    for(var i=0; i < filterBtns.length; i++){
      if (tabToView == 'all' && filterBtns[i].value == 'latest') {
        filterBtns[i].classList.add('isActive');
      } else if (tabToView == 'questions' && filterBtns[i].value == 'latest') {
        filterBtns[i].classList.add('isActive');
      } else {
        filterBtns[i].classList.remove('isActive');
      }
    }
  }

  renderTab = () => {
    const {tabToView} = this.state;

    switch (tabToView) {
      case 'all':
        return (
          <div>
            <div className="filterFeed-container textRight marginTop20">
              <button type="button" className="filter-btn isActive" value="latest" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span role="img" aria-label="latest">⏱️</span>
                  <span>Latest</span>
                </div>
              </button>
              <button type="button" className="filter-btn" value="trending" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span role="img" aria-label="trending">🔥</span>
                  <span>Trending</span>
                </div>
              </button>
            </div>
            <p>Home feed with all posts here</p>
          </div>
        )
      case 'questions':
        return (
          <div>
            <div className="filterFeed-container textRight marginTop20">
              <button type="button" className="filter-btn isActive" value="latest" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span role="img" aria-label="latest">⏱️</span>
                  <span>Latest</span>
                </div>
              </button>
              <button type="button" className="filter-btn" value="unanswered" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span role="img" aria-label="question icon">❓</span>
                  <span>Unanswered</span>
                </div>
              </button>
              <button type="button" className="filter-btn" value="trending" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span role="img" aria-label="trending">🔥</span>
                  <span>Trending</span>
                </div>
              </button>
            </div>
            <p>Questions only here</p>
            <Link to="/questions/1234">
              <button type="button">
                Click to view Answer #1234
              </button>
            </Link>
          </div>
        )
    }
  }

  onClick = (e) => {
    const currentState = this.state.userStepsIsOpen;

    this.setState({
      userStepsIsOpen: !currentState,
    })
  }

  onKeyDown = e => {
    var key = e.key || e.keyCode

    // User pressed the enter key
    if (key === 'Enter' || key === 13) {
      const currentState = this.state.userStepsIsOpen;

      this.setState({
        userStepsIsOpen: !currentState,
      })
    }
  }

  renderSteps() {
    const {userStepsIsOpen, userstep} = this.state;
    const groupName = 'AVFX' // If step is 'autoenroll' then show the groupname
    const hasJoinedAutoEnrollGroup = false
    const expertise = ''
    const learning = ''
    const userHIDs = [{hid: '1234', type: 'qa'}, {hid: '1235', type: 'highlight'}]
    const numUserAnswers = userHIDs.filter(hid => hid.type == 'qa').length
    const wantsU18 = false // Mentor wants to support U18s

    const steps = [
      {stepText: 'Visit your feed', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      {stepText: 'Add your key skills', isComplete: (expertise != '' && learning != ''), validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      /*... (userstep == 'autoEnroll') ? [
        {stepText: 'Accept your invite to join the ' + groupName + ' group', isComplete: hasJoinedAutoEnrollGroup, validSteps: ['autoEnroll']},
      ] : [],*/
      {stepText: 'Answer a question', isComplete: numUserAnswers > 0, validSteps: ['didShortSUtf']},
      {stepText: 'Complete your full mentor application', isComplete: (userstep == 'didU18tf' || userstep == 'didIDUpload' || userstep == 'didFullSUtf' || userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), validSteps: ['didShortSUtf']},
      ... (wantsU18 == true) ? [
        {stepText: 'Upload a selfie with your Photo ID', isComplete: (userstep == 'didIDUpload' || (wantsU18 && userstep == 'didFullSUtf') || userstep == 'fullSUidTrain'), validSteps: ['didU18tf']},
        {stepText: 'Upload your CV/Resume or LinkedIn URL', isComplete: ((wantsU18 && userstep == 'didFullSUtf') || userstep == 'fullSUidTrain'), validSteps: ['didIDUpload']},
      ] : [],
      {stepText: 'Complete your 5-min mentor training', isComplete: (userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), validSteps: ['didFullSUtf']},
    ]

  /*  const steps = [
      {stepText: 'Visit your feed', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      {stepText: 'Add your key skills', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      /*... (userstep == 'autoEnroll') ? [
        {stepText: 'Accept your invite to join the ' + groupName + 'group', isComplete: 1, validSteps: ['autoEnroll']},
      ] : [],*/
    /*  {stepText: 'Answer a question', isComplete: 1, validSteps: ['didShortSUtf']},
      {stepText: 'Complete your full mentor application', isComplete: 1, validSteps: ['didShortSUtf']},
      ... (wantsU18 == true) ? [
        {stepText: 'Upload a selfie with your Photo ID', isComplete: 1, validSteps: ['didU18tf']},
        {stepText: 'Upload your CV/Resume or LinkedIn URL', isComplete: 0, validSteps: ['didIDUpload']},
      ] : [],
      {stepText: 'Complete your 5-min mentor training', isComplete: 1, validSteps: ['didFullSUtf']},
    ]*/

    const allStepsCompleted = steps.filter(step => step.isComplete == 0).length == 0

    if (allStepsCompleted == true) {
      return (
        <div className="marginTop20">
          <div>
            <h2 className="landingCTATitle">
              <span className="emoji-icon stopwatch-emoji titleLeft" />
              Your matches are on their way!
            </h2>
            <p className="landingCTADesc">
              Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us. It can take a few weeks to find a relevant match, and we&#39;ll notify you as soon as possible.
            </p>
            {/*<p className="landingCTADesc">In the meantime...</p>
            <Modal {...AddHighlightModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole}/>
            </Modal>*/}
          </div>
        </div>

      )
    }

    return (
      <React.Fragment>
        <div className="userStepsTitle" onClick={this.onClick} onKeyDown={this.onKeyDown}>
          <span><strong>Finish setting up your account</strong></span>
          <div className="selectContainer">
            <span className="arrow">
              { userStepsIsOpen ? <ChevronUp /> : <ChevronDown /> }
            </span>
          </div>
        </div>
        {userStepsIsOpen && (
          <div className="marginTop20">
            {steps.map((step, index) => {
              return (
                <div key={index}>
                  <Checkbox
                    label={step.stepText}
                    labelClassName={"checkbox-container homePage" + (step.isComplete == true ? " strikethrough greyText" : "")}
                    name="stepStatus"
                    className="SubmitMatch-input"
                    spanClassName="checkmark greenTick"
                    defaultChecked={step.isComplete}
                    disabled
                  />
                </div>
              )
            })}
          </div>
        )}
      </React.Fragment>
    )
  }

  render(){
    const {tabToView, userStepsIsOpen, userstep} = this.state
    const usersGroups = [
      {
        gid: '20000',
        groupname: 'Villiers High School',
        status: 'active',
        groupavatarurl: '/vhs-avatar.png',
        channels: [
          {
            name: 'mentor-general',
            chlid: '12345',
            type: 'general'
          },
          {
            name: 'hello-intros',
            chlid: '12347',
            type: 'intros'
          },
          {
            name: 'resources',
            chlid: '12346',
            type: 'resources'
          }
        ]
      },
      {gid: '20001', groupname: 'Into Games', status: 'active', groupavatarurl: '/intogames-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'leaderboard', chlid: '13347', type: 'leaderboard'},{name: 'social', chlid: '22347', type: 'social'},{name: 'other', chlid: '12348', type: 'other'}]},
      {gid: '20002', groupname: 'ACCESS:VFX', status: 'active', groupavatarurl: '/avfx-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
      {gid: '20003', groupname: 'BAME in Games', status: 'active', channels: [{name: 'hello-mentors', chatid: '12345',type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
      {gid: '20004', groupname: 'Animated Women UK', status: 'active', groupavatarurl: '/aw-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
    ];
    const groups = [];
    const hasKeyNotif = true
    const source = 'vhs'

    if (usersGroups != null || usersGroups.length != 0) {
      usersGroups.forEach((group) => {
        const channels = group.channels && group.channels
          .filter(x => x.type == 'general');
        const generalChannel = channels && channels.length > 0 && channels[0];
        const navlink = channels && channels.length > 0 && `/community/${group.groupname}/${group.gid}/${generalChannel.chlid}`
        const showAsLink = (channels && channels.length > 0) ? true : false;
        groups.push(
          <GroupCircle
            showAsLink={showAsLink}
            group={group}
            key={group.gid}
            navlink={navlink}
          />
        );
      })
    }

//navlink={`/community/${group.gid}/${generalChannel.chlid}`}

    return (
      <React.Fragment>
        {/*}<PageHeader {...PageHeaderProps} />
        <div className="page-panel">
          <MentorHomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div> */}
        <div className="tabWindow paddingL30 paddingR30 overflowYHidden displayFlex flexDirColumn">
          <FeedHeader />
          <div className="marginTop20 overflowYScroll">
            <div className="sideBar" role="complementary" aria-label="sidebar">
              {hasKeyNotif == true && (
                <div className="thickPurpleContentBox">
                  {/* <div className="sideBar-header" /> */}
                  <div className="padding20">
                    {userstep == 'autoEnroll' && (
                      <AutoEnrollPrompt source={source}/>
                    )}
                  </div>
                </div>
              )}

              <div className="thickPurpleContentBox">
                {/* <div className="sideBar-header" /> */}
                <div className="padding20">
                  { this.renderSteps() }
                </div>
              </div>
              <div className="thinGreyContentBox">
                <div className="title">My Groups</div>
                <div className="padding20">
                  <div className="groupsContainer">
                    {groups}
                    <Modal {...JoinProgrammePlusModalProps}>
                      <JoinProgrammeModalContent />
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="mainBar" role="main" aria-label="question and answers">
              <div>
                <Link to="/home">
                  <button type="button" name="all" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'all' ? ' tabActive' : '')}>All</button>
                </Link>
                <Link to="/questions">
                  <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
                </Link>
              </div>
              { this.renderTab() }
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default HomePage;
