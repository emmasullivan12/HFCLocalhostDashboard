// Dex last merged this code on 16th mar 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FeedbackReqPrompt extends Component {
  render() {
    const {userRole} = this.props
    const feedbackReqChatLink = "/community/20000/12345"

    return (
      <div className="alignCenter">
        <div className="placeholderPic small feedbackReq"/>
        <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
          It&#39;s chat feedback time!
        </h2>
        <p className="landingCTADesc marginBottom20 paddingL paddingR">
          You&#39;ve had some time to kick off your conversation. Now, take a few minutes to reflect on the experience so far, share some feedback and how you&#39;d like to engage with Dexter going forward.
        </p>
        <Link to={feedbackReqChatLink} className="link">
          <button type="button" className="button link Submit-btn dispInlineBlock">
            Complete Feedback
          </button>
        </Link>
      </div>
    );
  }
}

export default FeedbackReqPrompt;
