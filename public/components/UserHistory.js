// Dex last merged this code on 21st mar 2021

import React from "react";
import ReactDOM from "react-dom";

import UserHistoryItem from './UserHistoryItem.js';

class UserHistory extends React.Component {

  render() {
    const {userRole, isavailable, signedUpDate, usersMatches} = this.props;

    let historyItems = [];
    let userHistory = [
     {date: signedUpDate, type: 'signedUp'},
    ];

    // Add details re: when / by whom they were made unavailable (if applicable)
    if (isavailable.status == 0) {
     userHistory.push(
       {date: isavailable.dateUnavailable, type: 'unavail', setBy: isavailable.by, reminderToChase: isavailable.reminderDate},
     )
    }

    // Go through their list of matches and add to history
    if (usersMatches && usersMatches.length > 0) {
      usersMatches.forEach((match) => {

        const matchesName = userRole == 'mentee' ? 'Dave the Mentor' : 'Sally the Mentee'
        let statusOfMatchText

        switch(match.status_of_match) {
          case 1: // 1 = 'profile sent'
            if (userRole == 'mentee') {
              statusOfMatchText = 'Pending Match: Sent profile of mentor'
            } else {
              statusOfMatchText = 'Pending Match: Profile sent to mentee'
            }
            break;
          case 2: // 2 = 'mentee timed out'
            statusOfMatchText = 'Match timed out: Mentee did not reply'
            break;
          case 3: // 3 = 'mentee accepted'
            statusOfMatchText = 'Pending Match: Mentee accepted, waiting for mentor reply'
            break;
          case 4: // 4 = 'mentee rejected'
            statusOfMatchText = 'Null Match: Mentee rejected. Reason: "' + match.mentee_pass_comments + '"'
            break;
          case 5: // 5 = 'mentor timed out'
            statusOfMatchText = 'Match timed out: Mentor did not reply'
            break;
          case 6: // 6 = 'mentor accepted'
            statusOfMatchText = 'Matched & Chat started'
            break;
          case 7: // 7 = 'mentor rejected'
            statusOfMatchText = 'Null Match: Mentor rejected. Reason: "' + match.mentor_pass_comments + '"'
            break;
          default:
            statusOfMatchText = ''
        }

        userHistory.push(
          {date: match.date_matched, type: 'matchStatus', text: statusOfMatchText},
        )

      })
    }

    const userHistorySorted = userHistory.sort((a,b) => {
      const iso8601format_b = b.date;
      const iso8601format_a = a.date;
      const newb = new Date(iso8601format_b)
      const newa = new Date(iso8601format_a)
      return newb - newa
    })

    if (userHistory.length > 0) {
     userHistorySorted.forEach((item) => {
       historyItems.push(
         <UserHistoryItem
           historyItem={item}
           key={item.date}
         />
       );
     });
    }

    return (
      <div>
        {historyItems}
      </div>
    )
  }
}

export default UserHistory;
