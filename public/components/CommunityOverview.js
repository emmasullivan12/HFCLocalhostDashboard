// Last merged this code on 20th nov 2023
/* eslint-disable no-unused-labels */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {cdn} from './CDN.js';
import Carousel from './Carousel.js';
import FeedContainer from "./FeedContainer.js";
import ShareOptionsBox from './ShareOptionsBox.js';
import {getRoleDeets, getSkillDeets, getIndustryDeets, getSubjectDeets, timeSince, getEmployerName} from './UserDetail.js';

class CommunityOverview extends React.Component {
/*  constructor() {
    super();
    this.state = {
      activityArrToShow: [],
    }
  }*/

  /*componentDidMount = () => {
    const {contentArr} = this.props

    const notableRecActivity = [
      {type: "newMatch", datecreated: '2020-09-04T13:30:50.667Z', mentorfname: 'John', mentorinsttype: 'job', mentorinstfreetext: 'Pladis', mentorinst: null, menteefname: 'Bob'},
      {type: "chatFeedbackRec", datecreated: '2020-09-04T13:30:50.667Z', mentorfname: 'Dexter', mentorinsttype: 'uni', mentorinstfreetext: null, mentorinst: 11, menteefname: 'Barbara'},
      {type: "newMatch", datecreated: '2020-09-04T13:30:50.667Z', mentorfname: 'Lily', mentorinsttype: 'train', mentorinstfreetext: 'TrainingCo', mentorinst: null, menteefname: 'Bill'},
    ]

    const numContentToShow = (5 - notableRecActivity.length)

    // Sort contentArr latest first
    var slicedContent = contentArr && contentArr
      .filter(item => item.type != 'general')
      /*.sort((a,b)=> {
        if(a.datecreated < b.datecreated) { return -1; }
        if(a.datecreated > b.datecreated) { return 1; }
        return 0;
      }*/
  /*    .slice(0, numContentToShow)


    notableRecActivity.forEach((activity) => {
      var mentorText = getEmployerName(activity.mentorinsttype, activity.mentorinstfreetext, activity.mentorinst, false)
      var newelement = {type: activity.type, timestamp: activity.datecreated, qTitle: null, qURL: null, mentorfname: activity.mentorfname, mentorlname: null, mentorinsttype: activity.mentorinsttype, mentorText: mentorText, menteefname: activity.menteefname}
      this.setState(prevState => {
        activityArrToShow: [...prevState.activityArrToShow, newelement]
      }, () => {
        console.log(this.state.activityArrToShow)
      })
    });

    slicedContent && slicedContent.forEach((activity) => {
      let qid, newelement
      if (activity.type == 'question') {
        qid = activity.qid
        newelement = {type: activity.type, timestamp: activity.datecreated, qTitle: activity.title, qURL: ("https://app.prospela.com/questions/" + activity.qid + "/" + activity.url), mentorfname: null, mentorlname: null, mentorinsttype: null, mentorText: null, menteefname: activity.fname}
        this.setState(prevState => {
          activityArrToShow: [...prevState.activityArrToShow, newelement]
        }, () => {
          console.log(this.state.activityArrToShow)
        })
      } else { // its an answer
        qid = activity.relatedqid
        var mentorText = getEmployerName(activity.authorinsttype, activity.authorinstfreetext, activity.authorinst, false)
        newelement = {type: activity.type, timestamp: activity.datecreated, qTitle: activity.title, qURL: ("https://app.prospela.com/questions/" + activity.qid + "/" + activity.url), mentorfname: activity.fname, mentorlname: activity.lname, mentorinsttype: activity.authorinsttype, mentorText: mentorText, menteefname: null}
        this.setState(prevState => {
          activityArrToShow: [...prevState.activityArrToShow, newelement]
        }, () => {
          console.log(this.state.activityArrToShow)
        })
      }
    })
  }*/

  renderMentorWelcomeMsg = (numQs, numUnanswered) => {
    const {community, commURL} = this.props
    var commURLending = commURL.split("https://app.prospela.com")[1]

    if (numUnanswered > 0) {
      return (
        <div>
          The community is humming along nicely! But there&#39;s <strong>+{numUnanswered} unanswered question{numUnanswered > 1 ? 's' : ''}</strong> students are waiting on. <Link to={{pathname: commURLending + "/questions?filter=trending", state: {prevPath: window.location.pathname}}}><span className="link purpleText linkUnderline">Answer or share with a colleague &gt;&gt;</span></Link>
        </div>
      )
    } else if (numQs > 0) {
      return (
        <div>
          By golly, the {community.name} community is doing swell. You don&#39;t have any unanswered questions from students.
        </div>
      )
    } else {
      return (
        <div>
          It&#39;s quiet in the {community.name} community right now. Why not share a general post for students to see when they arrive?
        </div>
      )
    }
  }

  renderMenteeWelcomeMsg = () => {
    const {community, commURL} = this.props
    return (
      <div>
        The community is humming along nicely! Know someone interested in learning from real employees? <span className="marginRight8">
          <ShareOptionsBox
            id={community.cmid}
            qURL={commURL}
            contentType={community.type}
            authorinsttype={null}
            authorinstfreetext={null}
            authorinst={null}
            buttonToShow="freeTextElectricPurple"
            fromCommunityPage
            commName={community.name}
            buttonTextToShow="Invite them!"
          />
        </span>
      </div>
    )
  }

  handleZindex = (e) => {
    const parentCarousel = e.currentTarget.closest(".carousel")
    const parentDataCard = e.currentTarget.closest(".dataCard")

    for (let sibling of parentCarousel.children) {
      sibling.classList.remove('zIndex1')
    }
    parentDataCard.classList.add("zIndex1");

  }

  copyURL = (url, tooltipID) => {
    // Copy text to clipboard
    navigator.clipboard.writeText(url)
    document.execCommand("copy");

    var el = document.getElementById(tooltipID)
    el.innerHTML = "Copied!";
  }

  handleBlur = (tooltipID) => {
    var el = document.getElementById(tooltipID)
    el.innerHTML = "Copy community URL";
  }

  render() {
    const {renderCommunityActivity, userRole, isLoggedIn, community, commURL, updatePathName, contentArr, checkHasAccess, noAccessHandler, maxViewsReached, handleUnlockBtnClick, handleCommunityFeedClick, updateTabToView} = this.props
    //const {activityArrToShow} = this.state
    const fname = 'Dexter' // loggedin users fname
    const isFirstVisit = false
    let menteeSkillsArray, menteeLearningSkillsArray, mentorSkillsArray, mentorLearningSkillsArray, popularIndustriesArray, popularRolesArray, subjectsArray, questionsArr, numQs, numUnanswered

    const companiesArray = ['Pladis', 'EY', 'General Electric', 'Lond company name what happens']
    const menteeSkills = ['2','15','26','55']
    const menteeLearningSkills = ['62','155','246','555']
    const mentorSkills = ['25','177','276','575']
    const mentorLearningSkills = ['200','150','260','550']
    const popularIndustries = ['19','5','46','45']
    const popularRoles = ['149','514','446','452']
    const subjects = ['139','122','1','55']

  /*  const companiesArray = []
    const menteeSkills = []
    const menteeLearningSkills = []
    const mentorSkills = []
    const mentorLearningSkills = []
    const popularIndustries = []
    const popularRoles = []
    const subjects = []*/

    // Grab skills
    menteeSkillsArray = menteeSkills.length > 0 ? menteeSkills.map(skill => getSkillDeets(skill)) : []
    menteeLearningSkillsArray = menteeLearningSkills.length > 0 ? menteeLearningSkills.map(skill => getSkillDeets(skill)) : []
    mentorSkillsArray = mentorSkills.length > 0 ? mentorSkills.map(skill => getSkillDeets(skill)) : []
    mentorLearningSkillsArray = mentorLearningSkills.length > 0 ? mentorLearningSkills.map(skill => getSkillDeets(skill)) : []

    // Grab industries
    popularIndustriesArray = popularIndustries.length > 0 ? popularIndustries.map(ind => getIndustryDeets(ind)) : []

    // Grab roles
    popularRolesArray = popularRoles.length > 0 ? popularRoles.map(role => getRoleDeets(role)) : []

    // Grab subjects
    subjectsArray = subjects.length > 0 ? subjects.map(subject => getSubjectDeets(subject)) : []

    // Work out unanswered questions
    questionsArr = contentArr.filter(x => x.qid != null);
    numQs = questionsArr != null ? questionsArr.length : 0
    numUnanswered = questionsArr != null ? questionsArr.filter(x => (x.hids == null || x.hids.length == 0)).length : 0

    return (
      <div>
        {isLoggedIn && (
          <div className="dash-welcomeContainer marginBottom20">
            <div className="col-9">
              <div className="dash-welcomeHeader"><strong>Welcome{isFirstVisit ? ' back' : ''}, {fname}!</strong></div>
              {(userRole == 'mentor' || userRole == 'mentor') && this.renderMentorWelcomeMsg(numQs, numUnanswered)}
              {userRole == 'mentee' && this.renderMenteeWelcomeMsg()}
            </div>
            <div className="col-3">
              <div className="dash-welcomeImg-container commPage">
                <img
                  className="groupDashImg"
                  alt="Team meeting"
                  srcSet={cdn+"/images/Dashboard-Community%20Managers_Sml.png 235w, "+cdn+"/images/Dashboard-Community%20Managers.png 1039w"}
                  sizes="(min-width: 859px) 1039px, 235px"
                  src={cdn+"/images/Dashboard-Community%20Managers_Sml.png"}
                />
              </div>
            </div>
          </div>
        )}
        <div>
          {community.type == 'skill' && (
            <Carousel>
              <div className={"dataCard card" + (!isLoggedIn ? " green" : "") + (companiesArray.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-0" onBlur={() => this.handleBlur("tooltip-share-comm-link-0")}>
                <span className={"tooltip more-info-icon"+ (!isLoggedIn ? " darkGreyText " : " mediumGreyText ")}>
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    Companies with the most active employee experts in this community
                  </span>
                </span>
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="green-heart emoji">💚</span> </div>
                    <div className="displayInlineBlock"><strong>Active companies</strong></div>
                  </div>
                  {companiesArray.length > 0 && (
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {companiesArray.map((company) => {
                          return (
                            <span
                              className="multiple value paddingR"
                              id={company}
                              key={company}
                            >
                              {company}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {companiesArray.length == 0 && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-0")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-0">
                              Copy community URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "") + (menteeLearningSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-1" onBlur={() => this.handleBlur("tooltip-share-comm-link-2")}>
                <span className="tooltip mediumGreyText more-info-icon">
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    {community.type == 'skill' ? "Other skills" : "Skills"} mentees in this community are learning
                  </span>
                </span>
                {!isLoggedIn ? (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="fire emoji">🔥</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills mentees are building</strong></div>
                    </div>
                    <div>
                      <div className="dataItemUnlockSection marginTop10 marginBottom10">
                        <div className="dataItemUnlockSection-btnContainer" >
                          <a href="https://app.prospela.com/signup?origin=skillsPageDataBox">
                            <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                              <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="fire emoji">🔥</span></div>
                      <div className="displayInlineBlock"><strong>Top skills mentees are building</strong></div>
                    </div>
                    {menteeLearningSkills.length > 0 && (
                      <div className="dispBlock marginTop10">
                        <div className="tagsList">
                          {menteeLearningSkillsArray.length > 0 && menteeLearningSkillsArray.map((skill) => {
                            return (
                              <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link" onClick={updatePathName}>
                                <span
                                  className="multiple clickable value paddingR"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {menteeLearningSkills.length == 0 && (
                      <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                        <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                          ...not enough people here yet.
                          <div className="marginTop20">
                            <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-1")}>
                              Invite some!
                              <div className="tooltiptext compact" id="tooltip-share-comm-link-1">
                                Copy community URL
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " red" : "") + (popularIndustries.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-2" onBlur={() => this.handleBlur("tooltip-share-comm-link-2")}>
                <span className={"tooltip more-info-icon"+ (!isLoggedIn ? " darkGreyText " : " mediumGreyText ")}>
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    Industries that use this skill most regularly, based on employee expert data
                  </span>
                </span>
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="office emoji">🏢</span> </div>
                    <div className="displayInlineBlock"><strong>Popular industries</strong></div>
                  </div>
                  {popularIndustries.length > 0 && (
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {popularIndustriesArray && popularIndustriesArray.map((ind) => {
                          return (
                            <Link to={{pathname: "/community/industry/" + ind, state: {prevPath: window.location.pathname}}} key={ind.value} className="link" onClick={updatePathName}>
                              <span
                                className="multiple clickable value paddingR"
                                id={ind.value}
                              >
                                {ind.label}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {popularIndustries.length == 0 && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-2")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-2">
                              Copy community URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " purple" : "") + (popularRoles.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-3" onBlur={() => this.handleBlur("tooltip-share-comm-link-3")}>
                <span className={"tooltip more-info-icon"+ (!isLoggedIn ? " darkGreyText " : " mediumGreyText ")}>
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    Roles that use this skill most regularly, based on employee expert data
                  </span>
                </span>
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="suitcase emoji">💼</span> </div>
                    <div className="displayInlineBlock"><strong>Popular roles</strong></div>
                  </div>
                  {popularRoles.length > 0 && (
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {popularRolesArray && popularRolesArray.map((role) => {
                          var roleURL = "/home?shared=Yes&tagged=Yes&filter=latest&searchText=["+ role.label + "]"
                          return (
                            <Link to={{pathname: roleURL, state: {prevPath: window.location.pathname}}} key={role.value} className="link" onClick={updatePathName}>
                              <span
                                className="multiple clickable value paddingR"
                                id={role.value}
                                key={role.value}
                              >
                                {role.label}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {popularRoles.length == 0 && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-3")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-3">
                              Copy community URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "") + (subjects.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-4" onBlur={() => this.handleBlur("tooltip-share-comm-link-4")}>
                <span className="tooltip mediumGreyText more-info-icon">
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    Subjects most frequently studied at school by people with this skill
                  </span>
                </span>
                {!isLoggedIn ? (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="book emoji">📖</span> </div>
                      <div className="displayInlineBlock"><strong>Top subjects</strong></div>
                    </div>
                    <div>
                      <div className="dataItemUnlockSection marginTop10 marginBottom10">
                        <div className="dataItemUnlockSection-btnContainer" >
                          <a href="https://app.prospela.com/signup?origin=skillsPageDataBox">
                            <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                              <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="book emoji">📖</span> </div>
                      <div className="displayInlineBlock"><strong>Top subjects</strong></div>
                    </div>
                    {subjects.length > 0 && (
                      <div className="dispBlock marginTop10">
                        <div className="tagsList">
                          {subjectsArray && subjectsArray.map((subject) => {
                            return (
                              <span
                                className="multiple value paddingR"
                                id={subject.value}
                                key={subject.value}
                              >
                                {subject.label}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {subjects.length == 0 && (
                      <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                        <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                          ...not enough people here yet.
                          <div className="marginTop20">
                            <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-4")}>
                              Invite some!
                              <div className="tooltiptext compact" id="tooltip-share-comm-link-4">
                                Copy community URL
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "") + (menteeSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-5" onBlur={() => this.handleBlur("tooltip-share-comm-link-5")}>
                <span className="tooltip mediumGreyText more-info-icon">
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    The top skills mentees in this community tell us they have
                  </span>
                </span>
                {!isLoggedIn ? (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills mentees have</strong></div>
                    </div>
                    <div>
                      <div className="dataItemUnlockSection marginTop10 marginBottom10">
                        <div className="dataItemUnlockSection-btnContainer" >
                          <a href="https://app.prospela.com/signup?origin=skillsPageDataBox">
                            <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                              <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills mentees have</strong></div>
                    </div>
                    {menteeSkills.length > 0 && (
                      <div className="dispBlock marginTop10">
                        <div className="tagsList">
                          {menteeSkillsArray && menteeSkillsArray.map((skill) => {
                            return (
                              <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link" onClick={updatePathName}>
                                <span
                                  className="multiple clickable value paddingR"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {menteeSkills.length == 0 && (
                      <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                        <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                          ...not enough people here yet.
                          <div className="marginTop20">
                            <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-5")}>
                              Invite some!
                              <div className="tooltiptext compact" id="tooltip-share-comm-link-5">
                                Copy community URL
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "") + (mentorSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-6" onBlur={() => this.handleBlur("tooltip-share-comm-link-6")}>
                <span className="tooltip mediumGreyText more-info-icon">
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    The top skills employee experts in this community tell us they have
                  </span>
                </span>
                {!isLoggedIn ? (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills experts have</strong></div>
                    </div>
                    <div>
                      <div className="dataItemUnlockSection marginTop10 marginBottom10">
                        <div className="dataItemUnlockSection-btnContainer" >
                          <a href="https://app.prospela.com/signup?origin=skillsPageDataBox">
                            <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                              <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills experts have</strong></div>
                    </div>
                    {mentorSkills.length > 0 && (
                      <div className="dispBlock marginTop10">
                        <div className="tagsList">
                          {mentorSkillsArray && mentorSkillsArray.map((skill) => {
                            return (
                              <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link" onClick={updatePathName}>
                                <span
                                  className="multiple clickable value paddingR"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {mentorSkills.length == 0 && (
                      <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                        <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                          ...not enough people here yet.
                          <div className="marginTop20">
                            <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-6")}>
                              Invite some!
                              <div className="tooltiptext compact" id="tooltip-share-comm-link-6">
                                Copy community URL
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "") + (mentorLearningSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-7" onBlur={() => this.handleBlur("tooltip-share-comm-link-7")}>
                <span className="tooltip mediumGreyText more-info-icon">
                  <i className="fas fa-info-circle"/>
                  <span className="tooltiptext below">
                    The top skills employee experts in this community tell us they are currently learning
                  </span>
                </span>
                {!isLoggedIn ? (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="seed emoji">🌱</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills experts are building</strong></div>
                    </div>
                    <div>
                      <div className="dataItemUnlockSection marginTop10 marginBottom10">
                        <div className="dataItemUnlockSection-btnContainer" >
                          <a href="https://app.prospela.com/signup?origin=skillsPageDataBox">
                            <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                              <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10 paddingR0">
                    <div className="paddingR displayFlex">
                      <div className="displayInlineBlock marginRight3"><span role="img" aria-label="seed emoji">🌱</span> </div>
                      <div className="displayInlineBlock"><strong>Top skills experts are building</strong></div>
                    </div>
                    {mentorLearningSkills.length > 0 && (
                      <div className="dispBlock marginTop10">
                        <div className="tagsList">
                            {mentorLearningSkillsArray && mentorLearningSkillsArray.map((skill) => {
                              return (
                                <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link" onClick={updatePathName}>
                                  <span
                                    className="multiple clickable value paddingR"
                                    id={skill.value}
                                  >
                                    {skill.label}
                                  </span>
                                </Link>
                              )
                            })}
                        </div>
                      </div>
                    )}
                    {mentorLearningSkills.length == 0 && (
                      <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                        <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                          ...not enough people here yet.
                          <div className="marginTop20">
                            <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(commURL, "tooltip-share-comm-link-7")}>
                              Invite some!
                              <div className="tooltiptext compact" id="tooltip-share-comm-link-7">
                                Copy community URL
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Carousel>
          )}
        </div>
        { renderCommunityActivity(commURL, true) }
        <div>
          <div className="bold darkGreyText marginBottomMinus10 fontSize16">Latest posts</div>
          <FeedContainer community={community} commURL={commURL} isCommPage contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} updatePathName={updatePathName} handleFeedClick={handleCommunityFeedClick} updateTabToView={updateTabToView}/>
        </div>
      </div>
    );
  }
}

export default CommunityOverview;
