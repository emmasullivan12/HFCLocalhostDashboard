// Dex last merged this code on 11th August 2019

import React, { Component } from "react";

import "../css/Emoji.css";

class MentorReads extends Component {
  render() {
  const {reads} = this.props;

    return (
      <React.Fragment>
        {reads.type==='book' && (
          <div>
            <i className="emoji-icon book-emoji"/>
            <div>{reads.text}</div>
          </div>
        )}
        {reads.type==='link' && (
          <div>
            <div>
              <i className="emoji-icon link-emoji"/>
              <div>{reads.link}</div>
            </div>
            <div>{reads.text}</div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default MentorReads;
