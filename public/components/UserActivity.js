// Dex last merged this code on 11th August 2019

import React, { Component } from "react";

import "../css/Emoji.css";

class UserActivity extends Component {
  render() {
  const {activity, fname} = this.props;

    return (
      <React.Fragment>
          <div>
            <div>
              {activity.type === 'newRead' || activity.type === 'newQuote' && (
                <span>&#43;</span>
              )}
              {activity.type === 'highlight' && (
                <i className="emoji-icon purpleHeart-emoji"/>
              )}
              {activity.type === 'newMatch' && (
                <i className="emoji-icon chat-emoji"/>
              )}
              <div>{activity.ts}</div>
            </div>
            <div>{fname}{activity.text}</div>
          </div>
      </React.Fragment>
    )
  }
}

export default UserActivity;
