// Dex last merged this code on 7th mar 2022

import React, { Component } from 'react';
import {Link} from "react-router-dom";

import Checkbox from './Checkbox.js';
import FeedHeader from './FeedHeader.js';
import "../css/HomePage.css";
import "../css/General.css";

const DUMMY_GROUP_LIST = [
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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.tabToView ? this.props.tabToView : 'all',
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
          </div>
        )
    }
  }

  render(){
    const {tabToView} = this.state
    const userstep = 'didEduEmailVerif'
    const groupName = 'AVFX' // If step is 'autoenroll' then show the groupname
    const hasJoinedAutoEnrollGroup = false
    const expertise = ''
    const learning = ''
    const userHIDs = [{hid: '1234', type: 'qa'}, {hid: '1235', type: 'highlight'}]
    const numUserAnswers = userHIDs.filter(hid => hid.type == 'qa').length
    const wantsU18 = true // Mentor wants to support U18s

    const steps = [
      {stepText: 'Visit your feed', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      {stepText: 'Add your key skills', isComplete: (expertise != '' && learning != ''), validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      ... (userstep == 'autoEnroll') ? [
        {stepText: 'Accept your invite to join the ' + groupName + 'group', isComplete: hasJoinedAutoEnrollGroup, validSteps: ['autoEnroll']},
      ] : [],
      {stepText: 'Answer a question', isComplete: numUserAnswers > 0, validSteps: ['didShortSUtf']},
      {stepText: 'Complete your mentor profile / full application', isComplete: (userstep == 'didU18tf' || userstep == 'didIDUpload' || userstep == 'didFullSUtf' || userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), validSteps: ['didShortSUtf']},
      ... (wantsU18 == true) ? [
        {stepText: 'Upload a selfie with your Photo ID', isComplete: (userstep == 'didIDUpload' || (wantsU18 && userstep == 'didFullSUtf') || userstep == 'fullSUidTrain'), validSteps: ['didU18tf']},
        {stepText: 'Upload your CV/Resume or LinkedIn URL', isComplete: ((wantsU18 && userstep == 'didFullSUtf') || userstep == 'fullSUidTrain'), validSteps: ['didIDUpload']},
      ] : [],
      {stepText: 'Complete your 5-min Mentor training', isComplete: (userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), validSteps: ['didFullSUtf']},
    ]

//navlink={`/community/${group.gid}/${generalChannel.chlid}`}

    return (
      <React.Fragment>
        {/*}<PageHeader {...PageHeaderProps} />
        <div className="page-panel">
          <MentorHomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div> */}
        <div className="tabWindow paddingL20 paddingR20 overflowYHidden displayFlex flexDirColumn">
          <FeedHeader />
          <div className="marginTop20 overflowYScroll">
            <div className="sideBar" role="complementary" aria-label="sidebar">
              <div className="thickPurpleSideBar">
                {/* <div className="sideBar-header" /> */}
                <div className="padding20">
                  <strong>Finish setting up your account</strong>
                  <div className="marginTop20">
                    {steps.map((step, index) => {
                      return (
                        <div key={index}>
                          <Checkbox
                            label={step.stepText}
                            labelClassName={"checkbox-container" + (step.isComplete == true ? " strikethrough greyText" : "")}
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
                </div>
                <Link to="/questions/1234">
                  <button type="button">
                    Click to view Answer #1234
                  </button>
                </Link>
              </div>
            </div>
            <div className="mainBar" role="main" aria-label="question and answers">
              <div>
                <Link to="/home">
                  <button type="button" name="all" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn alignCenter width50pc marginRight0' + (tabToView == 'all' ? ' tabActive' : '')}>All</button>
                </Link>
                <Link to="/questions">
                  <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn alignCenter width50pc marginRight0' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
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
