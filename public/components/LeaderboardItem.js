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
    const {user, key, isFirstItem, userTypeToShow} = this.props;
    const {isSortingTable} = this.state;

    const nameToShow = (userTypeToShow == 'mentor' || (userTypeToShow == 'mentee' && user.isU18 != true)) ? (user.fname + " " + user.lname) : (userTypeToShow == 'mentee' ? user.fname : user.companyname)
console.log(key)
    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="leaderboardItem-ranking hasSort" onClick={() => this.handleSortTable(0, 'number', (userTypeToShow + 'Leaderboard-table'))}>Ranking <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-name hasSort" onClick={() => this.handleSortTable(1, 'alphabetically', (userTypeToShow + 'Leaderboard-table'))}>Username <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-topContribution">Top contribution</th>
              <th className="leaderboardItem-numAnswers hasSort" onClick={() => this.handleSortTable(3, 'number', (userTypeToShow + 'Leaderboard-table'))}># Answers <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-numGenerals hasSort" onClick={() => this.handleSortTable(4, 'number', (userTypeToShow + 'Leaderboard-table'))}># General posts <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="leaderboardItem-numMentees hasSort" onClick={() => this.handleSortTable(5, 'number', (userTypeToShow + 'Leaderboard-table'))}># Mentees <span className="greyText"><i className="fas fa-sort"/></span></th>
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
            <td>
              {(key + 1 > 3) &&  (
                <span>{key + 1}</span>
              )}
              {(key + 1 == 1) &&  (
                <span className="goldText"><i className="fas fa-home" /></span>
              )}
              {(key + 1 == 2) &&  (
                <span className="silverText"><i className="fas fa-home" /></span>
              )}
              {(key + 1 == 3) &&  (
                <span className="bronzeText"><i className="fas fa-home" /></span>
              )}
            </td>
            <td>{nameToShow}</td>
            <td>
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
