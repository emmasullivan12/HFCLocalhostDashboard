// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";

import "../css/UserBadge.css";

class UserBadge extends Component {
  render() {
    const {isProspela} = this.props;

    return (
      <React.Fragment>
      {isProspela && (
        <div className="badge isProspela">
          <div className="tickIconContainer badge">
            <i className="fas fa-check" />
          </div>
          Prospela team
        </div>
      )}
      </React.Fragment>
    );
  }
}

export default UserBadge;
