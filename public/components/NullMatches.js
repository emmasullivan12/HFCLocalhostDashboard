// Dex last merged this code on 8th mar 2021

import React from "react";
import ReactDOM from "react-dom";

import NullMatch from "./NullMatch.js";

class NullMatches extends React.Component {

  render() {
    const pendingMatches = [];

    // Grab pending matches
    // Matchstatus: 1=profile sent, 2=mentee timed out, 3=mentee accepted, 4=menteerejected, 5=mentor timed out, 6=mentor accepted, 7=mentor rejected
    const matches = [
  //    {matchid: 'uuid123', menteegroups: ['5'], mentorgroups: ['5'], status_of_match: '1', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_date: '', date_matched: '2021-01-02T16:54:25.084Z'},
      {matchid: 'uuid124', menteegroups: ['1'], mentorgroups: ['1'], status_of_match: '2', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '2021-01-05T16:54:25.084Z', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '', mentor_replied_date: '2021-01-09T16:54:25.084Z', date_matched: '2021-01-02T16:54:25.084Z'},
  //    {matchid: 'uuid125', menteegroups: ['4'], mentorgroups: ['3'], status_of_match: '3', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_date: '', date_matched: '2021-01-02T16:54:25.084Z'},
      {matchid: 'uuid126', menteegroups: ['2'], mentorgroups: ['1'], status_of_match: '4', mentee_pass_comments: 'Not the mentor I want. I want to chat with xyz', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '2021-01-06T16:54:25.084Z', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '', mentor_replied_date: '2021-01-09T16:54:25.084Z', date_matched: '2021-01-02T16:54:25.084Z', role_relevance: '1', no_similar_interests: '1', skills_relevance: '1', busy: '', other: '1'},
      {matchid: 'uuid126', menteegroups: ['2'], mentorgroups: ['2'], status_of_match: '5', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '2021-01-06T16:54:25.084Z', mentorchaser2: '2021-01-08T16:54:25.084Z', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_date: '2021-01-09T16:54:25.084Z', date_matched: '2021-01-02T16:54:25.084Z'},
  //    {matchid: 'uuid126', menteegroups: ['3'], mentorgroups: ['3'], status_of_match: '6', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '2021-01-06T16:54:25.084Z', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_date: '', date_matched: '2021-01-02T16:54:25.084Z'},
      {matchid: 'uuid126', menteegroups: ['4'], mentorgroups: ['4'], status_of_match: '7', mentor_pass_comments: 'Just not for me mate! I want to chat with xyz', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_date: '2021-01-09T16:54:25.084Z', date_matched: '2021-01-02T16:54:25.084Z', role_relevance: '', no_similar_interests: '', skills_relevance: '', busy: '1', other: ''},
    ];

    matches.sort(function(a,b) {
      if(a.status_of_match > b.status_of_match) { return -1; }
      if(a.status_of_match < b.status_of_match) { return 1; }
      return 0;
    });

    if (matches.length > 0) {
      matches.forEach((match, index) => {
        pendingMatches.push(
          <NullMatch
            match={match}
            key={match.matchid}
            isFirstItem={index == 0}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <span role="img" aria-label="clockEmoji">❌</span> <strong>Null / Rejected Matches...</strong> <span role="img" aria-label="clockEmoji">❌</span>
          </div>
          <div className="toBeMatched-container">
            <div className="exclamation-icon-container grey">
              <i className="fas fa-user-clock" />
              <span> No action needed - pending user response</span>
            </div>
            <div className="table-container">
              {matches.length == 0 && (
                <div>No Matches currently pending...</div>
              )}
              {matches.length > 0 && (
                <table id="pendingMatches-table">
                  {pendingMatches}
                </table>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NullMatches;
