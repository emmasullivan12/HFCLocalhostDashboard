// Dex last merged this code on 25th mar 2021

import React, { Component } from "react";

import Checkbox from './Checkbox.js';
import {getGroupName} from "./UserDetail.js";
import {sortTable, LoadingSpinner, DateCalc, X, Check} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class CompletedMatch extends Component {
  constructor (props) {
    super(props);
    this.state = {
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

  copyEmail = (uid) => {
    const email = 'user@gmail.com'

    // Copy text to clipboard
    navigator.clipboard.writeText(email)
    document.execCommand("copy");

    document.getElementById("tooltip-" + uid).innerHTML = "Copied!";
  }

  handleBlur = (uid) => {
    document.getElementById("tooltip-" + uid).innerHTML = "Copy Email";
  }

  render() {
    const {match, isFirstItem} = this.props;
    const {isSortingTable} = this.state;

    const menteename = "Billy Bob";
    const mentorname = "Dilly Dally";
    var menteegroup = getGroupName(match.menteegroups[0], "short");
    var mentorgroup = getGroupName(match.mentorgroups[0], "short");

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
              <th className="userToMatch-group alignCenter hasSort" onClick={() => this.handleSortTable(5, 'alphabetically', 'pendingMatches-table')}>Matched By <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(6, 'date', 'pendingMatches-table')}>Date Last Active <span className="greyText"><i className="fas fa-sort"/></span></th>
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
            <td>
              <a className="link greyText tooltip" onMouseLeave={() => this.handleBlur(match.menteeuid)} onClick={() => this.copyEmail(match.menteeuid)}>
                {menteename}
                <div className="tooltiptext compact" id={"tooltip-"+match.menteeuid}>
                  Copy Email
                </div>
              </a>
            </td>
            <td className="alignCenter">{menteegroup}</td>
            <td>
              <a className="link greyText tooltip" onMouseLeave={() => this.handleBlur(match.mentoruid)} onClick={() => this.copyEmail(match.mentoruid)}>
                {mentorname}
                <div className="tooltiptext compact" id={"tooltip-"+match.mentoruid}>
                  Copy Email
                </div>
              </a>
            </td>
            <td className="alignCenter">{mentorgroup}</td>
            <td>{match.matchedby}</td>
            <td><i><DateCalc time={match.date_lastactive} showPureDate /></i></td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default CompletedMatch;
