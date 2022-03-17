// Dex last merged this code on 16th mar 2022

import React, { Component } from 'react';
import {Link} from "react-router-dom";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AutoEnrollPrompt from "./AutoEnrollPrompt";
import Checkbox from './Checkbox.js';
import FeedContainer from "./FeedContainer.js";
import FeedHeader from './FeedHeader.js';
import GroupCircle from "./GroupCircle";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import Modal from './Modal';
import UpdateExpertiseContent from './UpdateExpertiseModalContent.js';
import {percentageCircle, checkMobile, ChevronDown, ChevronUp} from './GeneralFunctions.js';
import "../css/HomePage.css";
import "../css/HomepageCTAContainer.css";

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSmlHome',
  changeInitFocus: true
}

const AddHighlightModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: 'Highlight',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: '+ Highlight',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.tabToView ? this.props.tabToView : 'all',
      userStepsIsOpen: true,
      userstep: 'autoEnroll',
      userRole: 'mentor',
      showAddSkillsModal: false,
    }
  }

  componentDidMount() {
    document.getElementById("clientWindowContainer").classList.add('overflowYHidden')
  }

  componentDidUpdate() {
    const {tabToView} = this.props; // This comes from Dashboard.js

    // Maybe use this to determine whether to trigger or not https://stackoverflow.com/questions/69806279/how-to-know-a-react-link-component-has-been-clicked
    if (tabToView == "questions" && tabToView != this.state.tabToView) {
      const isMobile = checkMobile()
      this.setState({
        tabToView: tabToView,
      })

      if (isMobile) {
        this.setState({
          userStepsIsOpen: false
        })
      }
    }
  }

  componentWillUnmount() {
    document.getElementById("clientWindowContainer").classList.remove('overflowYHidden')
  }

  showUpdateTabBtns = () => {
    const {tabToView} = this.state

    return (
      <div>
        <Link to="/home">
          <button type="button" name="all" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'all' ? ' tabActive' : '')}>All</button>
        </Link>
        <Link to="/questions">
          <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn homePage alignCenter width50pc marginRight0' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
        </Link>
      </div>
    )
  }

  updateTabToView = (e) => {
    this.updateActiveClasslists()

    this.setState({
      tabToView: e.target.name
    })
  }

  filterBy = (e) => {
    e.stopPropagation()

    /* eslint-disable no-restricted-syntax */
    for (let sibling of e.currentTarget.parentNode.children) {
        if (sibling !== e.currentTarget) {
          sibling.classList.remove('isActive');
        }
    }

    e.currentTarget.classList.add('isActive')

    // Update URL with searchParams i.e. "?filter=Unanswered"
    const url = new URL(window.location);
    url.searchParams.set('filter', e.currentTarget.value);
    history.pushState({}, '', url) // eslint-disable-line no-restricted-globals
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
    const {tabToView, userRole} = this.state;
  //  const contentArr = []
    const contentArr = [ // Questions
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriestopostto: ['2','19'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'questions',
        hasacceptedanswer: false,
        votes: ['123','234','345','456'],
        mentorseen: ['123','234','345','456'],
        menteeseen: ['123'],
        prseen: [],
        uid: '123',
        isanon: 0,
        authorinsttype: 'sch',
        fname: 'Emma',
        lname: 'Sullivan',
        profilepic: '',
        url: "/what-wear-to-interview"
      },
      {
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'questions',
        hasacceptedanswer: true,
        votes: [],
        mentorseen: ['123','234'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 0,
        authorinsttype: 'uni',
        fname: 'Dexter',
        lname: 'Boyce',
        profilepic: '',
        url: "/what-wear-to-interview-2"
      },
      {
        qid: '123458',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'questions',
        hasacceptedanswer: false,
        votes: [],
        mentorseen: ['123','234','345','456'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 1,
        authorinsttype: 'job',
        fname: 'John',
        lname: 'Smith',
        profilepic: '',
        url: "/what-wear-to-interview-3"
      },
    ]
  /*  const contentArr = [ // Answers
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        title: 'What is the best thing to wear to an interview?',
        authorinst: '',
        authorinstfreetext: 'Really Long Institution Name',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: 'BSc (Hons) Business Administration',
        authortraining: '',
        authorinsttype: 'uni',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: 'first answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh ',
        isanon: 0,
        votes: [],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#firstanswer',
        type: 'answers'
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        title: 'What is it like working at Pladis?',
        authorinst: '',
        authorinstfreetext: '',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: '',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
        type: 'answers'
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        title: 'When should I apply to grad schemes (what time of year)?',
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        isanon: 0,
        votes: ['123','20'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#thirdanswer',
        type: 'answers'
      }
    ]*/

    switch (tabToView) {
      case 'all':
        return (
          <div>
            <div className="filterFeed-container textRight marginBottom20">
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
            { this.showUpdateTabBtns() }
            <FeedContainer contentArr={contentArr} userRole={userRole}/>
          </div>
        )
      case 'questions':
        return (
          <div>
            <div className="filterFeed-container textRight marginBottom20">
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
            { this.showUpdateTabBtns() }
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

  showModal = (stepIsComplete, reqStepsComplete, modalType) => {
    if (stepIsComplete || reqStepsComplete != true) { return }

    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  renderSteps() {
    const {userStepsIsOpen, userstep, userRole, showAddSkillsModal, showAnswerAQModal} = this.state;
  //  const groupName = 'AVFX' // If step is 'autoenroll' then show the groupname
  //  const hasJoinedAutoEnrollGroup = false
    const expertise = []
    const learning = []
    const userHIDs = []
  //  const userHIDs = [{hid: '1234', type: 'qa'}, {hid: '1235', type: 'highlight'}]
    const numUserAnswers = userHIDs.length == 0 ? 0 : userHIDs.length /* userHIDs.filter(hid => hid.type == 'qa').length ... We decided to count either 'qa' or 'general' highlights because we wanted to orient mentor to what a highlight is when they click "answer a question" in the "complete sign up steps" box */
    const wantsU18 = false // Mentor wants to support U18s
    const userGroups = []
    const hasMatch = false

    const steps = [
      {stepText: 'Visit your feed', modalToShow: '', isComplete: 1, validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      {stepText: 'Add your key skills', modalToShow: 'AddSkills', isComplete: (expertise.length > 0 && learning.length > 0), validSteps: ['didEduEmailVerif', 'didReviewVerif']},
      /*... (userstep == 'autoEnroll') ? [
        {stepText: 'Accept your invite to join the ' + groupName + ' group', isComplete: hasJoinedAutoEnrollGroup, validSteps: ['autoEnroll']},
      ] : [],*/
      {stepText: 'Answer a question', modalToShow: 'AnswerAQ', isComplete: numUserAnswers > 0, validSteps: ['didShortSUtf']},
      {stepText: 'Join a mentoring programme', modalToShow: 'JoinAGroup', isComplete: userGroups.length > 0, validSteps: ['didShortSUtf']},
      {stepText: 'Complete your full mentor application', modalToShow: 'MentorFullApp', isComplete: (userstep == 'didU18tf' || userstep == 'didIDUpload' || userstep == 'didFullSUtf' || userstep == 'didFullSUIDtf' || userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), reqStep: 'JoinAGroup', tooltiptextWhenLocked: 'Join a mentoring programme to unlock this step', validSteps: ['didShortSUtf']},
      ...(wantsU18 == true) ? [
        {stepText: 'Upload a selfie with your Photo ID', modalToShow: 'MentorID', isComplete: (userstep == 'didIDUpload' || (userstep == 'didFullSUIDtf') || userstep == 'fullSUidTrain'), validSteps: ['didU18tf']},
        {stepText: 'Upload your CV/Resume or LinkedIn URL', modalToShow: 'MentorCV', isComplete: ((userstep == 'didFullSUIDtf') || userstep == 'fullSUidTrain'), validSteps: ['didIDUpload']},
      ] : [],
      {stepText: 'Complete your 5-min mentor training', modalToShow: 'MentorTraining', isComplete: (userstep == 'fullSUTrain' || userstep == 'fullSUidTrain'), reqStep: 'MentorFullApp', tooltiptextWhenLocked: 'Complete your full mentor application to unlock this step', validSteps: ['didFullSUtf', 'didFullSUIDtf']},
    ]

  /*  const AddSkillsModalProps = {
      ariaLabel: 'Add / Edit skills',
      triggerText: '+ Add Key Skills',
      usedFor: 'addEditSkillsDashboard',
      hideTrigger: true,
      changeInitFocus: true
    }*/

    const MentorSkillsLearningPromptProps = {
      ariaLabel: 'Add your key skills >>',
      triggerText: 'Add your key skills >>',
      usedFor: 'skillsLearningForm',
      backBtn: 'arrow',
      hideTrigger: true,
      changeInitFocus: true,
    }
    const MenteeSkillsLearningPromptProps = {
      ariaLabel: 'Add what you want to learn >>',
      triggerText: 'Add what you want to learn >>',
      usedFor: 'skillsLearningForm',
      backBtn: 'arrow',
      hideTrigger: true,
      changeInitFocus: true,
    }
    const AnswerQModalProps = {
      ariaLabel: 'Add a Highlight',
      triggerText: 'Highlight',
      usedFor: 'addHighlightDashboard',
      hideTrigger: true,
      changeInitFocus: true,
      wider: true
    }

    const stepsLeftToDo = steps.filter(step => step.isComplete == 0).length
    const allStepsCompleted = stepsLeftToDo == 0

    if (allStepsCompleted && hasMatch == true) {return}

    if (allStepsCompleted == true) {
      return (
        <div className="thinPurpleContentBox withBorderTop">
          <div className="padding20">
            <div className="marginTop20">
              <div>
                <h2 className="landingCTATitle">
                  <span className="emoji-icon stopwatch-emoji titleLeft" />
                  Your matches are on their way!
                </h2>
                <p className="landingCTADesc">
                  Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us.
                </p>
                <p className="landingCTADesc">
                  It can take a few weeks to find a relevant match, and we&#39;ll notify you as soon as possible.
                </p>
                {/*<p className="landingCTADesc">In the meantime...</p>
                <Modal {...AddHighlightModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole}/>
                </Modal>*/}
              </div>
            </div>
          </div>
        </div>
      )
    }

    const pctStepsCompleted = Math.round((1 - (stepsLeftToDo / steps.length)) * 100)

    return (
      <div className="thinPurpleContentBox withBorderTop">
        <div className="padding20">
          <div className="userStepsTitle" onClick={this.onClick} onKeyDown={this.onKeyDown}>
            <span><strong>Finish setting up your account</strong></span>
            <div className="selectContainer">
              <span className="arrow">
                { userStepsIsOpen ? <ChevronUp /> : <ChevronDown /> }
              </span>
            </div>
          </div>
          {userStepsIsOpen && (
            <React.Fragment>
              <div className="marginTop10">
                {steps.map((step, index) => {
                  const reqStepsComplete = step.reqStep != null ? steps.filter(x => x.modalToShow == step.reqStep)[0].isComplete : true
                  return (
                    <div key={index} onClick={() => this.showModal(step.isComplete, reqStepsComplete, step.modalToShow)} className={reqStepsComplete != true ? "tooltip" : ""}>
                      <Checkbox
                        label={step.stepText}
                        labelClassName={"checkbox-container homePage" + (step.isComplete == true ? " strikethrough greyText" : "") + (reqStepsComplete != true ? " greyText cursorText backgroundNone" : "")}
                        name="stepStatus"
                        className="SubmitMatch-input"
                        spanClassName={"checkmark" + (reqStepsComplete != true ? " disabled" : "")}
                        defaultChecked={step.isComplete}
                        disabled
                      />
                      {reqStepsComplete != true && (
                        <div className="tooltiptext checkboxTooltip">{step.tooltiptextWhenLocked}</div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div id="pctCircleContainer-userSteps">
                { percentageCircle(pctStepsCompleted,"purple") }
              </div>
            {/*}  {showAddSkillsModal == true && userRole == 'mentee' && (
                <Modal {...AddSkillsModalProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")}>
                  <UpdateExpertiseContent modalTitle='Add new Skills / Expertise' expOrLearning='exp' expertise={(expertise && expertise.length > 0) ? expertise[0] : ''} learning={(learning && learning.length > 0) ? learning[0] : ''}/>
                </Modal>
                <FullPageModal {...MenteeSkillsLearningPromptProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")}>
                  <Form
                    questions={questionsSkillsHobbies}
                    usedFor="skillsLearningForm"
                    formTitle="Tell us what you want to learn"
                  />
                </FullPageModal>
              )}
              {showAddSkillsModal == true && userRole == 'mentor' && (
                <FullPageModal {...MentorSkillsLearningPromptProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")}>
                  <Form
                    questions={questionsSkillsHobbies}
                    usedFor="skillsLearningForm"
                    formTitle='Tell us your key skills'
                  />
                </FullPageModal>
              )}*/}
              {showAnswerAQModal == true && (
                <Modal {...AnswerQModalProps} handleLocalStateOnClose={() => this.closeModal("AnswerAQ")}>
                  <AddHighlightModalContent modalID="modal-addHighlight" userRole={userRole}/>
                </Modal>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  render(){
    const {tabToView, userStepsIsOpen, userstep, userRole} = this.state
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
    const hasMatch = true

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
          {/*<div className="mainAndSideContainer marginTop20 overflowYScroll"> */}
          <div className="mainAndSideContainer marginTop20">
            <div className="sideBar" role="complementary" aria-label="sidebar">
              {hasKeyNotif == true && (
                <div className="thickPurpleContentBox withBorderTop">
                  {/* <div className="sideBar-header" /> */}
                  <div className="padding20">
                    {userstep == 'autoEnroll' && (
                      <AutoEnrollPrompt source={source}/>
                    )}
                  </div>
                </div>
              )}
              { this.renderSteps() }
              <div className="thinGreyContentBox sideBarContentHiddenOnShrink">
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
              { this.renderTab() }
            </div>
          </div>
          <Modal {...AddHighlightModalProps}>
            <AddHighlightModalContent modalID="modal-addHighlight" userRole={userRole}/>
          </Modal>
          <Modal {...AddHighlightSmlModalProps}>
            <AddHighlightModalContent modalID="modal-addHighlightSml" userRole={userRole}/>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
