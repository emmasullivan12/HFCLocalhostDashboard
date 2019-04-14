import React, { Component } from "react";
import "../css/MentorUsrProfile.css";

class MentorUsrProfile extends Component {
  render() {
    const mentor = this.props.match;
    return (
      <div className="mtchd-usr-container">
        <div className="mtch-usr-name">{mentor.mentorName}</div>
        <div className="mtch-avatar-container">
          <img
            className="mtch-thumb img-circle"
            src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
            alt={mentor.mentorName}
          />
        </div>
        <div className="mtch-role-empl">{mentor.role} &#64; {mentor.company}</div>
        <ol>
          <li><strong>Skills:</strong>{mentor.skills}</li>
          <li><strong>Interests:</strong>{mentor.interests}</li>
          <li><strong>Currently learning:</strong>{mentor.learning}</li>
        </ol>
      </div>
    );
  }
}

export default MentorUsrProfile;
