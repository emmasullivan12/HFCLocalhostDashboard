// Dex last merged this code on 25th mar 2021

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
        let statusOfMatchText;
        let rejReasons;
        let dateCalc;
        let date;
        var role_relevance = 0
        var no_similar_interests = 1
        var skills_relevance = 1
        var busy = 1

        switch(match.status_of_match) {
          case 1: // 1 = 'profile sent'
            if (userRole == 'mentee') {
              statusOfMatchText = 'Pending Match: Sent profile of mentor'
            } else {
              statusOfMatchText = 'Pending Match: Profile sent to mentee'
            }
            date = match.date_matched
            break;
          case 2: // 2 = 'mentee timed out'
            var dateMatched = new Date(match.date_matched)
            statusOfMatchText = 'Match timed out: Mentee did not reply'
            dateCalc = dateMatched.setDate(dateMatched.getDate() + 9)
            date = new Date(dateCalc).toISOString();
            break;
          case 3: // 3 = 'mentee accepted'
            statusOfMatchText = 'Pending Match: Mentee accepted, waiting for mentor reply'
            date = match.mentee_replied_date
            break;
          case 4: // 4 = 'mentee rejected'
            rejReasons = (role_relevance == 1 ? ' Role not relevant,' : '') + (no_similar_interests == 1 ? ' No similar interests,' : '') + (skills_relevance == 1 ? ' No skills mentee wanted to learn,' : '')
            statusOfMatchText = 'Null Match: Mentee rejected. Reason:' + rejReasons + ' Mentee Said: "' + match.mentee_pass_comments + '"'
            date = match.mentee_replied_date
            break;
          case 5: // 5 = 'mentor timed out'
            var menteeReplyDate = new Date(match.mentee_replied_date)
            statusOfMatchText = 'Match timed out: Mentor did not reply'
            dateCalc = menteeReplyDate.setDate(menteeReplyDate.getDate() + 9)
            date = new Date(dateCalc).toISOString();
            break;
          case 6: // 6 = 'mentor accepted'
            statusOfMatchText = 'Matched & Chat started'
            date = match.mentor_replied_date
            break;
          case 7: // 7 = 'mentor rejected'
            rejReasons = (role_relevance == 1 ? ' Mentee career interests not relevant to mentor role,' : '') + (no_similar_interests == 1 ? ' No similar interests,' : '') + (skills_relevance == 1 ? ' Wants to learn skills mentor doesn\'t have,' : '') + (busy == 1 ? ' Was too busy to take on new mentee,' : '')
            statusOfMatchText = 'Null Match: Mentor rejected. Reason:' + rejReasons + ' Mentor Said: "' + match.mentor_pass_comments + '"'
            date = match.mentor_replied_date
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
