// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import MentorCardMatches from "./MentorCard";

class MentorMatches extends Component {
  render() {
    const matchstatus = 1;

    switch (matchstatus) {
      case 1:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic mentorMatches"/>
              <h2 className="landingCTATitle">
                <span className="emoji-icon stopwatch-emoji titleLeft" />
                Your matches are on their way!
              </h2>
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us. We&#39;ll notify you as soon as possible, so make sure your notification settings are switched on.
              </p>
            </div>
          </section>
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
