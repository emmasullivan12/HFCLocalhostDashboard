// Last merged this code on 8th nov 2023
/* eslint-disable no-unused-labels */

import React from "react";
import ReactDOM from "react-dom";

import {cdn} from './CDN.js';
import Carousel from './Carousel.js';
import {timeSince, getEmployerName} from './UserDetail.js';

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
    const {userRole, isLoggedIn, community} = this.props
    //const {activityArrToShow} = this.state
    const fname = 'Dexter' // loggedin users fname
    const isFirstVisit = false

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
                  <strong><span role="img" aria-label="fire emoji">🔥</span> Popular companies</strong>
                  <div>Companies hashtags go here</div>
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " hidden" : "")} data-target="card" id="card-1">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong className="darkGreyText"><span role="img" aria-label="brain emoji">🧠</span> Mentees also learning:</strong>
                    <div>
                      <div className="feedItemUnlockSection marginTop10 marginBottom10">
                        <div className="feedItemUnlockSection-btnContainer" >
                          <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                            <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10">
                    <strong><span role="img" aria-label="brain emoji">🧠</span> Mentees also learning:</strong>
                    <div>Mentee skills go here</div>
                  </div>
                )}
              </div>
              <div className="dataCard card" data-target="card" id="card-2">
                <div className="padding10">
                  <strong><span role="img" aria-label="office emoji">🏢</span> Popular industries</strong>
                  <div>Industries go here</div>
                </div>
              </div>
              <div className="dataCard card" data-target="card" id="card-3">
                <div className="padding10">
                  <strong><span role="img" aria-label="suitcase emoji">💼</span> Popular roles</strong>
                  <div>Roles go here</div>
                </div>
              </div>
              <div className={"dataCard card" + (!isLoggedIn ? " hidden" : "")} data-target="card" id="card-4">
                {!isLoggedIn ? (
                  <div className="padding10">
                    <strong className="darkGreyText"><span role="img" aria-label="book emoji">📖</span> Subjects people stud</strong>
                    <div>
                      <div className="feedItemUnlockSection marginTop10 marginBottom10">
                        <div className="feedItemUnlockSection-btnContainer" >
                          <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                            <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="padding10">
                    <strong><span role="img" aria-label="book emoji">📖</span> Subjects people stud</strong>
                    <div>Subjects go here</div>
                  </div>
                )}
              </div>
              <div className="dataCard card" data-target="card" id="card-5">
                BOX 6
              </div>
            </Carousel>
          )}
          {community.type == 'industry' && (
            <Carousel>
              <div className="dataCard card" data-target="card" id="card-0">
                BOX 1
              </div>
              <div className="dataCard card" data-target="card" id="card-1">
                BOX 2
              </div>
              <div className="dataCard card" data-target="card" id="card-2">
                BOX 3
              </div>
              <div className="dataCard card" data-target="card" id="card-3">
                BOX 4
              </div>
              <div className="dataCard card" data-target="card" id="card-4">
                BOX 5
              </div>
              <div className="dataCard card" data-target="card" id="card-5">
                BOX 6
              </div>
            </Carousel>
          )}
        </div>
      </div>
    );
  }
}

export default CommunityOverview;
