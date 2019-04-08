import React, { Component } from "react";
import { MentorCardWaiting, MentorCardMatches } from "./MentorCard";

class MentorMatches extends Component {
  render() {
    const matchstatus = 2;

    switch (matchstatus) {
      case 1:
        return (
          <div className="waitingForMatches-container">
            <p className="waitingForMatches-title">We&#39;ll message you when you&#39;re matched!</p>
            <MentorCardWaiting />
            <MentorCardWaiting />
            <MentorCardWaiting />
          </div>
        );
      case 2:
        return (
          <React.Fragment>
            <MentorCardMatches />
          </React.Fragment>
        );
      case 3:
        return <div> We will get back to you shortly on another mentor we think you might like :) </div>
      case 4:
        return <div> Awesome! We are now just waiting to her from your potential mentor!</div>
      case 5:
        return <div> That mentor decided they wer not best placed to help you at the current time,  we will get back to you shortly on another mentor we think you might like :) </div>
      case 6:
        return <div>  Mentor accepted</div>
      case 7:
        return <div>  Chat active </div>
      case 8:
        return <div>  Chat active, and can accept more! </div>
      default:
        return <div> Loading </div>
    }
  }
}

export default MentorMatches;
