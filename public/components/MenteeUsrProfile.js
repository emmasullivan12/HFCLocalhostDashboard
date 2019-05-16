// Dex last merged this code on 16th May 2019

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
            src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
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
