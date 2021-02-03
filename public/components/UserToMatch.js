// Dex last merged this code on 11th nov 2020

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import {DateCalc, X, Check} from "./GeneralFunctions";
import FullPageModal from './FullPageModal.js';
import SelectBox from './Select.js';

const MatchingUsersProps = {
  triggerText: 'Match',
  usedFor: 'matchingUsers',
  backBtn: 'arrow',
}

// This shows the content within an individual row in the ChatMenu
class UserToMatch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      matchStatus: this.props.user.matchstatus,
    }
  }
  handleMatchStatusChange = (userInput) => {
    this.setState({
      matchStatus: userInput
    });
  }

  getMatchStatus = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)
    console.log(status)
    console.log(status[0].label)
    return status[0].label
  }

  getPriority = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].priority
  }

  render() {
    const {user, isFirstItem, matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const mentorroles = user.rolesexp + user.rolesexpfreetext;
    const menteeroles = user.roles + user.rolesfreetext;
    const priority = this.getPriority();
    const matchStatusName = this.getMatchStatus();
    let classNameSafeguarding = "userToMatch-sgStatus";
    let safeguardingText;
    let wantsU18;
    let prApproved;
    let isU18;

    if (user.role == 'mentee') {
      const birthdayts = user.birthday
      var ts = new Date(birthdayts);
      var today = new Date();
      let age;
      age = today.getFullYear() - ts.getFullYear()
      console.log("age: "+age)
      isU18 = age < 18;

      if (isU18 == true) {
        safeguardingText = '[AGE IN RED]'
        classNameSafeguarding += " redText";
      } else {
        safeguardingText = '[AGE IN GREY]'
        classNameSafeguarding += " greyText";
      }
    } else {
      wantsU18 = user.mentorsustep == 'didFullSUIDtf' || user.mentorsustep == 'didIDTrain';
      if (wantsU18 == true) {
        prApproved = true
        if (prApproved == true) {
          safeguardingText = <Check /> + 'ID Checked'
          classNameSafeguarding += " greenText";
        } else {
          safeguardingText = <X /> + 'Needs ID Check'
          classNameSafeguarding += " redText";
        }
      } else {
        safeguardingText = 'Over 18s only'
        classNameSafeguarding += " greyText";
      }
    }

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-match">Match</th>
              <th className="userToMatch-name">Name</th>
              <th className="userToMatch-status">Status</th>
              <th className="userToMatch-roles">Role(s)</th>
              <th className="userToMatch-group alignCenter">Group</th>
              <th className="userToMatch-activerole alignCenter">Active role</th>
              <th className="userToMatch-chats alignCenter">Chats</th>
              <th className="userToMatch-dateSignedup">Signed up</th>
              <th className="userToMatch-safeguarding">Safeguarding</th>
              <th className="userToMatch-notes">Notes</th>
            </tr>
          </thead>
        )}
        <tbody>
          <tr>
            <td>
              <FullPageModal {...MatchingUsersProps}>
                {/*<MatchingContent />*/}
                <div>matching users goes here</div>
              </FullPageModal>
            </td>
            <td>{user.fname} {user.lname}</td>
            <td>
              <div className={"userToMatch-changeStatus " + priority}>
                <SelectBox
                  options={matchStatusOptions}
                  name='selectStatus'
                  placeholder={matchStatusName}
                  placeholderOnClick="Select status to show:"
                  handleChange={this.handleMatchStatusChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                />
              </div>
            </td>
            <td>{user.role == 'mentor' ? mentorroles : menteeroles}</td>
            <td className="alignCenter">{user.group}</td>
            <td className="alignCenter">
              <div className={"rolebadge-"+user.role}>
                {user.role}
              </div>
            </td>
            <td className="alignCenter">{user.role == 'mentor' ? (user.no_mentees + ' / ' + user.maxmentees) : (user.no_mentors)}</td>
            <td className="userToMatch-dateSignedupText"><i><DateCalc time={user.datesignedup} showPureDate /></i></td> {/* user DateCalc from generalfunctions */}
            <td className={classNameSafeguarding}>{safeguardingText}</td>
            <td>{user.notesonuser}</td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default UserToMatch;
