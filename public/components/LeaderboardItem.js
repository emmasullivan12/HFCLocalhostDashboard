// Dex last merged this code on 5th nov 2021

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import {sortTable, LoadingSpinner, DateCalc, X, Check} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class LeaderboardItem extends Component {
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

  render() {
    const {user, index, isFirstItem, userTypeToShow} = this.props;
    const {isSortingTable} = this.state;

    const nameToShow = (userTypeToShow == '0' || (userTypeToShow == '1' && user.isU18 != true)) ? (user.fname + " " + user.lname) : (userTypeToShow == 'mentee' ? user.fname : user.companyname)
    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="leaderboardItem-ranking hasSort alignCenter" onClick={() => this.handleSortTable(0, 'number', (userTypeToShow + 'Leaderboard-table'))}><span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-name hasSort textLeft" onClick={() => this.handleSortTable(1, 'alphabetically', (userTypeToShow + 'Leaderboard-table'))}>Username <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-topContribution">Top contribution</th>
              <th className="leaderboardItem-numAnswers hasSort alignCenter" onClick={() => this.handleSortTable(3, 'number', (userTypeToShow + 'Leaderboard-table'))}>Answers <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-numGenerals hasSort alignCenter" onClick={() => this.handleSortTable(4, 'number', (userTypeToShow + 'Leaderboard-table'))}>General posts <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-numMentees hasSort alignCenter" onClick={() => this.handleSortTable(5, 'number', (userTypeToShow + 'Leaderboard-table'))}>No. Mentees <span className="greyText"><i className="fas fa-sort"/></span></th>
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
            <td className="alignCenter">
              {(index + 1 > 3) && (
                <span>{index + 1}</span>
              )}
              {(index + 1 == 1) && (
                <span className="goldText"><i className="fas fa-trophy" /></span>
              )}
              {(index + 1 == 2) && (
                <span className="silverText"><i className="fas fa-trophy" /></span>
              )}
              {(index + 1 == 3) && (
                <span className="bronzeText"><i className="fas fa-trophy" /></span>
              )}
            </td>
            <td className="textLeft">{nameToShow}</td>
            <td className="textLeft">
              {user.topContributionType}
            </td>
            <td className="alignCenter">{user.numAnswers}</td>
            <td className="alignCenter">{user.numGenerals}</td>
            <td className="alignCenter">{(userTypeToShow == 'mentor' || userTypeToShow == 'company') ? user.numMentees : user.numMentors}</td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default LeaderboardItem;
