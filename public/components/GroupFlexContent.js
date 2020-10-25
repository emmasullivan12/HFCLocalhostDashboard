// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
import MentorUsrProfile from './MentorUsrProfile.js';
import MenteeUsrProfile from './MenteeUsrProfile.js';

class GroupFlexContent extends Component {
  render() {
  const match = {DUMMY_MATCH_DATA};
  const userRole = 'mentee';
    return (
      <React.Fragment>
        {match && ({
          ['mentee']: <MentorUsrProfile match={DUMMY_MATCH_DATA}/>,
          ['mentor']: <MenteeUsrProfile match={DUMMY_MATCH_DATA}/>,
        }[userRole])}
      </React.Fragment>
    );
  }
}

const DUMMY_MATCH_DATA = {
  mentorName: "I'm a group!",
  id: "12345",
  skills: "Committment to getting the job done",
  interests: "Politics, Remaining",
  role: "Prime Minister",
  company: "UK Government",
  learning: "Employee retention, negotiating skills e.g. BATNA",
  pr_top_match: 't',
  role_vs_role_desired: 't',
  hobbies_and_interests: 't',
  skills_want_to_develop: 't',
  industry_pref: 't',
  latest_actions_on_student_todo_list: 't',
  prospela_match_comments: "Hi soandso, Theresa is a great match for you because of XYZ. They've also had experience working with and give presentations regularly to senior clients!"
}

export default GroupFlexContent;
