// Dex last merged this code on 19th july 2021

import React, { Component } from "react";

import Checkbox from './Checkbox.js';
import {getGroupName} from "./UserDetail.js";
import {sortTable, LoadingSpinner, DateCalc, X, Check} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class NullMatch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      emailChased: false,
      isSortingTable: false,
    }
  }

  handleSortTable = (n, sortType, tableId) => {
    this.setState({
      isSortingTable: true
    })
    sortTable(n, sortType, tableId, () => {
      this.setState({
        isSortingTable: false
      })
    })
  }

  copyEmail = (role, matchid) => {
    const email = role == 'mentee' ? 'mentee@gmail.com' : 'mentor@gmail.com'

    // Copy text to clipboard
    navigator.clipboard.writeText(email)
    document.execCommand("copy");

    document.getElementById("tooltip-"+matchid+"-"+role).innerHTML = "Copied!";
  }

  handleBlur = (role, matchid) => {
    document.getElementById("tooltip-"+matchid+"-"+role).innerHTML = "Copy Email";
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  render() {
    const {match, isFirstItem} = this.props;
    const {isSortingTable} = this.state;

    const disabled = true

    const menteename = "Billy Bob";
    const mentorname = "Dilly Dally";
    const menteegroup = getGroupName(match.menteegroups[0], 'short')
    const mentorgroup = getGroupName(match.mentorgroups[0], 'short')
    const dateEmailed = '2021-02-04T14:46:14.209Z'
// Matchstatus: 1=profile sent, 2=mentee timed out, 3=mentee accepted, 4=menteerejected, 5=mentor timed out, 6=mentor accepted, 7=mentor rejected

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(0, 'date', 'pendingMatches-table')}>Date Matched <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(1, 'alphabetically', 'pendingMatches-table')}>Mentee <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-group alignCenter hasSort" onClick={() => this.handleSortTable(2, 'alphabetically', 'pendingMatches-table')}>Mentee Group <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(3, 'alphabetically', 'pendingMatches-table')}>E-Mentor <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-group alignCenter hasSort" onClick={() => this.handleSortTable(4, 'alphabetically', 'pendingMatches-table')}>E-Mentor Group <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-dates alignCenter">Sent Profile to Mentee</th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(6, 'byIcon', 'pendingMatches-table')}>Mentee Chaser 1 <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(7, 'byIcon', 'pendingMatches-table')}>Mentee Chaser 2 <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th colSpan="2" className="userToMatch-userResponse hasSort" onClick={() => this.handleSortTable(8, 'byIcon', 'pendingMatches-table')}>Mentee Response <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(10, 'byIcon', 'pendingMatches-table')}>E-Mentor Chaser 1 <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(11, 'byIcon', 'pendingMatches-table')}>E-Mentor Chaser 2 <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th colSpan="2" className="userToMatch-userResponse hasSort" onClick={() => this.handleSortTable(12, 'byIcon', 'pendingMatches-table')}>E-Mentor Response <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th colSpan="2" className="userToMatch-group hasSort" onClick={() => this.handleSortTable(14, 'checked', 'pendingMatches-table')}>Emailed <span className="greyText"><i className="fas fa-sort"/></span></th>
            </tr>
          </thead>
        )}
        {isSortingTable == true && (
          <div className="spinner-container">
            <LoadingSpinner />
          </div>
        )}
        <tbody>
          <tr>
            <td><i><DateCalc time={match.date_matched} showPureDate /></i></td>
            <td>{menteename}</td>
            <td className="alignCenter">{menteegroup}</td>
            <td>{mentorname}</td>
            <td className="alignCenter">{mentorgroup}</td>
            <td className="alignCenter">
              <div className="greenText">
                <Check />
              </div>
            </td>
            <td className="alignCenter">
              {match.menteechaser1 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.menteechaser1} showPureDate /></i></span>

                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.menteechaser2 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.menteechaser2} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {(match.status_of_match == '3' || match.status_of_match > '4') ? (
                <div className="greenText">
                  <Check />
                </div>
              )
              : (match.status_of_match == '2') ? (
                <div className="greyText timeout">
                  <span role="img" aria-label="clockEmoji" className="timeout">⏱️</span>
                </div>
              )
              : (
                <div className="redText">
                  <X />
                </div>
              )}
            </td>
            <td>
              {match.status_of_match == '4' ? (
                <React.Fragment>
                  <div className="redText">
                    <strong>{match.mentee_pass_comments}</strong>
                  </div>
                  <div className="redText">
                    {(match.role_relevance != '' && match.no_similar_interests != '' && match.skills_relevance != '' && match.other != '') && (
                      <span>
                        They told us: {match.role_relevance != '' ? ' Role not relevant,' : ''}{match.no_similar_interests != '' ? ' Mentor had no similar interests,' : ''}{match.skills_relevance != '' ? ' Mentor had no relevant skills,' : ''}
                      </span>
                    )}
                     - <i><DateCalc time={match.mentee_replied_date} showPureDate /></i>
                  </div>
                </React.Fragment>
              )
              : (match.status_of_match == '2') ? (
                <a className="link greyText tooltip" onMouseLeave={() => this.handleBlur('mentee', match.matchid)} onClick={() => this.copyEmail('mentee', match.matchid)}>
                  <i>Timed out - <DateCalc time={match.mentee_to_reply_by} showPureDate /></i>
                  <div className="tooltiptext compact" id={"tooltip-"+match.matchid+'-mentee'}>
                    Copy Email
                  </div>
                </a>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.mentorchaser1 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.mentorchaser1} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.mentorchaser2 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.mentorchaser2} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.status_of_match == '6' ? (
                <div className="greenText">
                  <Check />
                </div>
              )
              : (match.status_of_match == '5') ? (
                <div className="greyText timeout">
                  <span role="img" aria-label="clockEmoji">⏱️</span>
                </div>
              )
              : (match.status_of_match == '7') ? (
                <div className="redText">
                  <X />
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td>
              {match.status_of_match == '7' ? (
                <React.Fragment>
                  <div className="redText">
                    <strong>{match.mentor_pass_comments}</strong>
                  </div>
                  <div className="redText">
                    {(match.role_relevance != '' && match.no_similar_interests != '' && match.skills_relevance != '' && match.busy != '' && match.other != '') && (
                      <span>
                        They told us: {match.role_relevance != '' ? 'Role not relevant, ' : ''}{match.no_similar_interests != '' ? 'Mentee had no similar interests, ' : ''}{match.skills_relevance != '' ? ' Mentee had no relevant skills, ' : ''}{match.busy != '' ? 'I\'m too busy right now ' : ''}
                      </span>
                    )}
                    - <i><DateCalc time={match.mentor_replied_date} showPureDate /></i>
                  </div>
                </React.Fragment>
              )
              : (match.status_of_match == '5') ? (
                <a className="link greyText tooltip" onMouseLeave={() => this.handleBlur('mentor', match.matchid)} onClick={() => this.copyEmail('mentor', match.matchid)}>
                  <i>Timed out - <DateCalc time={match.mentor_reply_by} showPureDate /></i>
                  <div className="tooltiptext compact" id={"tooltip-"+match.matchid+'-mentor'}>
                    Copy Email
                  </div>
                </a>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td>
              <Checkbox
                className='checkbox'
                labelClassName="checkbox-container"
                id="emailChased-Checkbox"
                name="emailChased"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName={"checkmark left" + (disabled ? ' disabled' : '')}
                spanId="checkedEmailChaser"
                disabled={disabled}
              />
            </td>
            <td>
              <i className="greyText dateEmailed"><DateCalc time={dateEmailed} showPureDate /></i>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default NullMatch;
