// Dex last merged this code on 3rd nov 2020

import React, { Component } from "react";

import "../css/UserBadge.css";

class UserBadge extends Component {
  render() {
    const {badgeType} = this.props;

    switch (badgeType) {
      case 'isPrBot':
        return (
          <div className="badge isPrBot">
            <div className="tickIconContainer badge">
              <i className="fas fa-check" />
            </div>
            Bot
          </div>
        );
      case 'isPrTeam':
        return (
          <div className="badge isPrTeam">
            <div className="tickIconContainer badge">
              <i className="fas fa-check" />
            </div>
            Prospela
          </div>
        );
      case 'founder':
        return (
          <div className="badge founder">
            Founder
          </div>
        );
      case 'pm':
        return (
          <div className="badge pm">
            Admin
          </div>
        );
    }
  }
}

export default UserBadge;
