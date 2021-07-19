// Dex last merged this code on 19th july 2021

import React, { Component } from "react";

import Avatar from './Avatar.js';
import {DateCalc, LoadingSpinner} from './GeneralFunctions.js';

import "../css/Feedback.css";

class FeedbackPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  renderFeedback = () => {
    const {feedbackArr, userRoleToView, fname, isProfile} = this.props;

    // Show newest matches first
    feedbackArr.sort(function(a,b){
      if(a.date_matched < b.date_matched) { return -1; }
      if(a.date_matched > b.date_matched) { return 1; }
      return 0;
    })

    return (
      <React.Fragment>
        {feedbackArr.map((item, index) => {
          const userName = userRoleToView == 'mentee' ? item.menteename : item.mentorname
          const matchName = userRoleToView == 'mentee' ? item.mentorname : item.menteename
          const matchuid = userRoleToView == 'mentee' ? item.mentoruid : item.menteeuid
          const eetStatus = item.eetstatus
          return (
            <div key={item.matchid} className={(isProfile != true ? "feedbackItem row" : "paddingTop")}>
              <div className={(isProfile != true ? "col-4 col-s-12 paddingR" : "displayFlex marginBottom5")}>
                <Avatar userID={matchuid} userName={matchName}/>
                <div>
                  <div className={"bold" + (isProfile != true ? " lineHeight16" : "")}>{matchName}</div>
                  <div className="marginBottom5 smallFont">
                    {eetStatus == 'sch' && (
                      <div><span className="roleText">Student</span></div>
                    )}
                    {eetStatus == 'uni' && (
                      <div><span>{item.degree} </span>{isProfile != true ? <div>@ {item.uniname}</div> : <span>@ {item.uniname}</span>}</div>
                    )}
                    {eetStatus == 'job' && (
                      <div><span>{item.currrole} </span>{isProfile != true ? <div>@ {item.currco}</div> : <span>@ {item.currco}</span>}</div>
                    )}
                    {eetStatus == 'train' && (
                      <div><span>{item.currtraining} </span>{isProfile != true ? <div>@ {item.currtrainingprovider}</div> : <span>@ {item.currtrainingprovider}</span>}</div>
                    )}
                    {eetStatus == 'none' && (
                      <div><span>Looking for opportunities</span></div>
                    )}
                  </div>
                  {isProfile != true && (
                    <div className="fontSize12 greyText normalLineheight marginBottom5">{matchName} was {userName}&#39;s {userRoleToView == 'mentee' ? 'mentor' : 'mentee'} since <DateCalc time={item.date_matched} showPureDate /></div>
                  )}
                </div>
              </div>
              <div className={(isProfile != true ? "col-8 col-s-12" : "")}>
                {userRoleToView == 'mentee' && item.referenceForMentee != '' && (
                  <div className={"marginBottom5" + (isProfile != true ? " lineHeight16" : "")}><i className="fas fa-quote-left"/> {item.referenceForMentee}</div>
                )}
                {userRoleToView == 'mentor' && item.noteToMentor != '' && (
                  <div className={"marginBottom5" + (isProfile != true ? " lineHeight16" : "")}><i className="fas fa-quote-left"/> {item.noteToMentor}</div>
                )}
              </div>
              {isProfile == true && (
                <div className="fontSize12 italic normalLineheight marginBottom20">{userName}&#39;s {userRoleToView == 'mentee' ? 'mentor' : 'mentee'} since <DateCalc time={item.date_matched} showPureDate /></div>
              )}
            </div>
          )
        })}
      </React.Fragment>
    )

  }

  render() {
    const {isLoading} = this.state;

    return (
      <React.Fragment>
        {isLoading == true && (
          <div className="loadingPotentialMatches">
            <p>
              Loading...
            </p>
            <LoadingSpinner />
          </div>
        )}
        {isLoading == false && (
          <div className="feedbackContainer">
            { this.renderFeedback() }
          </div>
        )}
      </React.Fragment>
    )

  }
}

export default FeedbackPublic;
