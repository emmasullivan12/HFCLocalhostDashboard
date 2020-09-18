// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

class MenteeUsrProfile extends Component {
  render() {
    const mentee = this.props.match;
    return (
      <div className="mtchd-usr-container">
        <div className="mtch-usr-name">{mentee.fname}</div>
        <div className="mtch-avatar-container">
          <img
            className="mtch-thumb img-circle"
            src="https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg"
            alt={mentee.fname}
          />
        </div>
        <ol>
          <li><strong>Desired Career:</strong>{mentee.desiredCareer}</li>
          <li><strong>Why Mentoring:</strong>{mentee.whymentoring}</li>
        </ol>
      </div>
    );
  }
}

export default MenteeUsrProfile;
