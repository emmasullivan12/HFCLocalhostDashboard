// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

class UserHistoryItem extends Component {

  render() {
    const {historyItem} = this.props;
    const date = new Date(historyItem.date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var dateToShow = day + '/' + month + '/' + year

    switch (historyItem.type) {
      case 'signedUp':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div>{dateToShow}</div>
            <div className="historyItemNote normalLineheight greyText">Signed up to Prospela</div>
          </div>
        );
      case 'accMatch':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div>{dateToShow}</div>
            <div className="historyItemNote normalLineheight greyText"><strong>Accepted match</strong> with {historyItem.accMatchName}</div>
          </div>
        );
      case 'rejMatch':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div>{dateToShow}</div>
            <div className="historyItemNote normalLineheight greyText"><strong>Rejected match</strong> with {historyItem.rejMatchName} because: <i>{historyItem.rejReason}</i></div>
          </div>
        );
    }
  }
}

export default UserHistoryItem;
