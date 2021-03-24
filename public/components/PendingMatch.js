// Dex last merged this code on 24th mar 2021

import React, { Component } from "react";
import {getGroupName} from "./UserDetail.js";
import {LoadingSpinner, sortTable, DateCalc, X, Check} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class PendingMatch extends Component {
  constructor () {
    super();
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

  render() {
    const {match, isFirstItem} = this.props;
    const {isSortingTable} = this.state;

    const menteename = "Billy Bob";
    const mentorname = "Dilly Dally";
    const menteegroup = getGroupName(match.menteegroups[0], 'short')
    const mentorgroup = getGroupName(match.mentorgroups[0], 'short')

// Matchstatus: 1=profile sent, 2=mentee timed out, 3=mentee accepted, 4=menteerejected, 5=mentor timed out, 6=mentor accepted, 7=mentor rejected

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(0, 'date', 'pendingMatches-table')}>Date Matched <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(1, 'alphabetically', 'pendingMatches-table')}>Mentee <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name alignCenter hasSort" onClick={() => this.handleSortTable(2, 'alphabetically', 'pendingMatches-table')}>Mentee Group <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name hasSort" onClick={() => this.handleSortTable(3, 'alphabetically', 'pendingMatches-table')}>E-Mentor <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-name alignCenter hasSort" onClick={() => this.handleSortTable(4, 'alphabetically', 'pendingMatches-table')}>E-Mentor Group <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-dates alignCenter">Sent Profile to Mentee<div className="greyText description">T</div></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(6, 'byIcon', 'pendingMatches-table')}>Mentee Chaser 1 <span className="greyText"><i className="fas fa-sort"/></span><div className="greyText description">T + 3 days</div></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(7, 'byIcon', 'pendingMatches-table')}>Mentee Chaser 2 <span className="greyText"><i className="fas fa-sort"/></span><div className="greyText description">T + 7 days</div></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(8, 'byIcon', 'pendingMatches-table')}>Mentee Response <span className="greyText"><i className="fas fa-sort"/></span><div className="greyText description">T</div></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(9, 'byIcon', 'pendingMatches-table')}>E-Mentor Chaser 1 <span className="greyText"><i className="fas fa-sort"/></span><div className="greyText description">T + 3 days</div></th>
              <th className="userToMatch-dates alignCenter hasSort" onClick={() => this.handleSortTable(10, 'byIcon', 'pendingMatches-table')}>E-Mentor Chaser 2 <span className="greyText"><i className="fas fa-sort"/></span><div className="greyText description">T + 7 days</div></th>
              <th className="userToMatch-dates alignCenter">E-Mentor Response</th>
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
              : (
                <div className="greyText">-</div>
              )}
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default PendingMatch;
