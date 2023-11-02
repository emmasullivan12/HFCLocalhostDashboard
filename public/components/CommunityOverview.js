// Last merged this code on 4th apr 2022

import React from "react";
import ReactDOM from "react-dom";

import {cdn} from './CDN.js';

class CommunityOverview extends React.Component {
  render() {
    const {userrole, community, goToUnansweredQs} = this.props
    const fname = 'Dexter'

    return (
      <div>
        <div className="dash-welcomeContainer">
          <div className="col-8">
            <div className="dash-welcomeHeader"><strong>Welcome back, {fname}!</strong></div>
            {community.numUnanswered > 0 ? (
              <div>
                The community is humming along nicely! But there&#39;s <strong>+{community.numUnanswered} unanswered questions</strong> students are waiting on. <span className="link purpleText linkUnderline" onClick={goToUnansweredQs}>Answer or share with a colleague &gt;&gt;</span>
              </div>
              )
            : (
              <div>
                By golly, the {community.name} community is doing swell. You don&#39;t have any unanswered questions from students!
              </div>
            )}
          </div>
          <div className="col-4">
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
      </div>
    );
  }
}

export default CommunityOverview;
