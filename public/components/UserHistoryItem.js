// Dex last merged this code on 25th mar 2021

import React, { Component } from "react";

class UserHistoryItem extends Component {

  render() {
    const {historyItem} = this.props;
    const itemDate = new Date(historyItem.date);
    const reminderDate = historyItem.reminderToChase ? new Date(historyItem.reminderToChase) : '';

    function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var dateToShow = day + ' / ' + month + ' / ' + year
      return dateToShow
    }

    switch (historyItem.type) {
      case 'signedUp':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div className="userHistory-date">{formatDate(itemDate)}</div>
            <div className="historyItemNote normalLineheight">Signed up to Prospela</div>
          </div>
        );
      case 'matchStatus':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div className="userHistory-date">{formatDate(itemDate)}</div>
            <div className="historyItemNote normalLineheight">{historyItem.text}</div>
          </div>
        );
    /*  case 'menteeAcc':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div>{formatDate(itemDate)}</div>
            <div className="historyItemNote normalLineheight greyText"><strong>Accepted match</strong> with {historyItem.accMatchName}</div>
          </div>
        );
      case 'mentorRej':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div>{formatDate(itemDate)}</div>
            <div className="historyItemNote normalLineheight greyText"><strong>Rejected match</strong> with {historyItem.rejMatchName} because: <i>{historyItem.rejReason}</i></div>
          </div>
        );*/
      case 'unavail':
        return (
          <div className="displayFlex normalLineheight paddingBtm">
            <div className="userHistory-date">{formatDate(itemDate)}</div>
            <div className="historyItemNote normalLineheight"><strong>Set us Unresponsive</strong> {reminderDate != '' && (<i>[Reminder to chase set for: {formatDate(reminderDate)}]</i>)}</div>
          </div>
        );
    }
  }
}

export default UserHistoryItem;
