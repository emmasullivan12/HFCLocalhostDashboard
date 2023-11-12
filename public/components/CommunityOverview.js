// Last merged this code on 8th nov 2023
/* eslint-disable no-unused-labels */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {cdn} from './CDN.js';
import Carousel from './Carousel.js';
import FeedContainer from "./FeedContainer.js";
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

  renderMentorWelcomeMsg = () => {
    const {community, goToUnansweredQs} = this.props
    if (community.numUnanswered > 0) {
      return (
        <div>
          The community is humming along nicely! But there&#39;s <strong>+{community.numUnanswered} unanswered questions</strong> students are waiting on. <span className="link purpleText linkUnderline" onClick={goToUnansweredQs}>Answer or share with a colleague &gt;&gt;</span>
        </div>
      )
    } else {
      return (
        <div>
          By golly, the {community.name} community is doing swell. You don&#39;t have any unanswered questions from students!
        </div>
      )
    }
  }

  renderMenteeWelcomeMsg = () => {
    const {community} = this.props
    return (
      <div>
        The community is humming along nicely! Know someone interested in learning from real employees? <strong>Invite them!</strong> (link above)
      </div>
    )
  }

  render() {
    const {userRole, isLoggedIn, community, updatePathName, contentArr, checkHasAccess, noAccessHandler, maxViewsReached, handleUnlockBtnClick, handleCommunityFeedClick} = this.props
    //const {activityArrToShow} = this.state
    const fname = 'Dexter' // loggedin users fname
    const isFirstVisit = false
    let menteeSkillsArray, menteeLearningSkillsArray, mentorSkillsArray, mentorLearningSkillsArray, popularIndustriesArray, popularRolesArray, subjectsArray
    const companiesArray = ['Pladis', 'EY', 'General Electric', 'Lond company name what happens']

    // Grab skills
    const menteeSkills = ['2','15','26','55']
    const menteeLearningSkills = ['62','155','246','555']
    const mentorSkills = ['25','177','276','575']
    const mentorLearningSkills = ['200','150','260','550']
    menteeSkillsArray = menteeSkills.map(skill => getSkillDeets(skill))
    menteeLearningSkillsArray = menteeLearningSkills.map(skill => getSkillDeets(skill))
    mentorSkillsArray = mentorSkills.map(skill => getSkillDeets(skill))
    mentorLearningSkillsArray = mentorLearningSkills.map(skill => getSkillDeets(skill))

    // Grab industries
    const popularIndustries = ['19','5','46','45']
    popularIndustriesArray = popularIndustries.map(ind => getIndustryDeets(ind))

    // Grab roles
    const popularRoles = ['149','514','446','452']
    popularRolesArray = popularRoles.map(role => getRoleDeets(role))

    // Grab subjects
    const subjects = ['139','122','1','55']
    subjectsArray = subjects.map(subject => getSubjectDeets(subject))

    return (
      <div>
        {isLoggedIn && (
          <div className="dash-welcomeContainer">
            <div className="col-9">
              <div className="dash-welcomeHeader"><strong>Welcome{isFirstVisit ? ' back' : ''}, {fname}!</strong></div>
              {(userRole == 'mentor' || userRole == 'mentor') && this.renderMentorWelcomeMsg()}
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
        <div className="marginTop20">
          {community.type == 'skill' && (
            <Carousel>
              <div className="dataCard card" data-target="card" id="card-0">
                <div className="padding10">
                  <strong><span role="img" aria-label="green-heart emoji">💚</span> Active companies</strong>
                  <div className="dispBlock marginTop10">
                    <div className="tagsList">
                      {companiesArray && companiesArray.map((company) => {
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
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "")} data-target="card" id="card-1">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong><span role="img" aria-label="fire emoji">🔥</span> Trending skills mentees learning</strong>
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
                  <div className="padding10">
                    <strong><span role="img" aria-label="fire emoji">🔥</span> Trending skills mentees learning</strong>
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {menteeLearningSkillsArray && menteeLearningSkillsArray.map((skill) => {
                          return (
                            <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill} className="link" onClick={updatePathName}>
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
                  </div>
                )}
              </div>
              <div className="dataCard card" data-target="card" id="card-2">
                <div className="padding10">
                  <strong><span role="img" aria-label="office emoji">🏢</span> Popular industries</strong>
                  <div className="dispBlock marginTop10">
                    <div className="tagsList">
                      {popularIndustriesArray && popularIndustriesArray.map((ind) => {
                        return (
                          <Link to={{pathname: "/community/industry/" + ind, state: {prevPath: window.location.pathname}}} key={ind} className="link" onClick={updatePathName}>
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
                </div>
              </div>
              <div className="dataCard card" data-target="card" id="card-3">
                <div className="padding10">
                  <strong><span role="img" aria-label="suitcase emoji">💼</span> Popular roles</strong>
                  <div className="dispBlock marginTop10">
                    <div className="tagsList">
                      {popularRolesArray && popularRolesArray.map((role) => {
                        return (
                          <span
                            className="multiple value paddingR"
                            id={role.value}
                            key={role.value}
                          >
                            {role.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "")} data-target="card" id="card-4">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong><span role="img" aria-label="book emoji">📖</span> Top school subjects studied</strong>
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
                  <div className="padding10">
                    <strong><span role="img" aria-label="book emoji">📖</span> Top school subjects studied</strong>
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
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "")} data-target="card" id="card-5">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong><span role="img" aria-label="tools emoji">🛠️</span> Skills mentees have</strong>
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
                  <div className="padding10">
                    <strong><span role="img" aria-label="tools emoji">🛠️</span> Skills mentees have</strong>
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {menteeSkillsArray && menteeSkillsArray.map((skill) => {
                          return (
                            <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill} className="link" onClick={updatePathName}>
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
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "")} data-target="card" id="card-6">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong><span role="img" aria-label="tools emoji">🛠️</span> Skills experts have</strong>
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
                  <div className="padding10">
                    <strong><span role="img" aria-label="tools emoji">🛠️</span> Skills experts have</strong>
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {mentorSkillsArray && mentorSkillsArray.map((skill) => {
                          return (
                            <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill} className="link" onClick={updatePathName}>
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
                  </div>
                )}
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " locked" : "")} data-target="card" id="card-7">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong><span role="img" aria-label="seed emoji">🌱</span> Skills experts are building</strong>
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
                  <div className="padding10">
                    <strong><span role="img" aria-label="seed emoji">🌱</span> Skills experts are building</strong>
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {mentorLearningSkillsArray && mentorLearningSkillsArray.map((skill) => {
                          return (
                            <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill} className="link" onClick={updatePathName}>
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
                  </div>
                )}
              </div>
            </Carousel>
          )}
        </div>
        <div className="marginTop20">
          <FeedContainer contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} updatePathName={updatePathName} handleFeedClick={(e) => handleCommunityFeedClick(e)}/>
        </div>
      </div>
    );
  }
}

export default CommunityOverview;
