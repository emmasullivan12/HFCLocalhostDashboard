// Last merged this code on 20th nov 2023

import React from "react";
import ReactDOM from "react-dom";

import AskAQPrompt from "./AskAQPrompt";
import LeaderboardItem from "./LeaderboardItem";
import {sortTable, LoadingSpinner} from "./GeneralFunctions";
import SelectBox from './Select.js';

const userTypeOptions = [
  {value: '0', label: 'Mentors'},
  {value: '1', label: 'Mentees'},
  {value: '2', label: 'Company'},
];

class CommunityLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilteringTable: false,
      isSortingTable: false,
      filterBy: 'last7days',
      userTypeToShow: '0', // 0 = mentor / 1 = mentee / 2 = company
    }
  }

  filterBy = (e) => {
  /*  this.setState({
      isFilteringTable: true
    })*/

    const {filterBy} = this.state
    e.stopPropagation()
    this.setState({
      filterBy: e.currentTarget.value
    })
  }

  filterUserType = (userInput) => {
  /*  this.setState({
      isFilteringTable: true
    })*/

    const { userTypeToShow } = this.state;

    this.setState({
      userTypeToShow: userInput,
    })
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
    const {community, isCommPage, updatePathName, isLoggedIn, userRole, commURL, checkHasAccess, noAccessHandler, updateTabToView} = this.props
    const {isFilteringTable, isSortingTable, userTypeToShow, filterBy} = this.state

    const rankedUsers = [];

    const mentors = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: false},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false},
      {uid: 'uuid126', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: false},
      {uid: 'uuid127', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: 'uuid128', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false},
    ];

    const mentees = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: true},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: true},
    ];

    const companies = [
      {uid: 'uuid123', companyname: 'EY', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: false},
      {uid: 'uuid124', companyname: 'Pladis', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: 'uuid125', companyname: 'Framestore', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false},
    ];

    if (community.members.length > 0) {
      if (userTypeToShow == '0') { // mentors
        mentors.forEach((user, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={user}
              key={user.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
            />
          );
        }, () => {
          console.log("turn isFilteringTable back to false here in test server")
        });
      } else if (userTypeToShow == '1') { // mentees
        return
      } else { // is a company filter
        companies.forEach((company, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={company}
              key={company.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
            />
          );
        }, () => {
          console.log("turn isFilteringTable back to false here in test server")
        });
      }
    }

    return (
      <div>
      {community.members.length == 0 ? (
        <AskAQPrompt community={community} commURL={commURL} isCommPage={isCommPage} userRole={userRole} isLeaderboard updatePathName={updatePathName} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} updateTabToView={updateTabToView}/>
      ) : (
        <div>
          <div className="displayFlex flexEnd marginBottom20">
            <div className="filterFeed-container">
              <button type="button" className={"filter-btn " + (filterBy == "last7days" ? "isActive" : "")} value="last7days" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>Last 7 days</span>
                </div>
              </button>
              <button type="button" className={"filter-btn " + (filterBy == "last30days" ? "isActive" : "")} value="last30days" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>Last month</span>
                </div>
              </button>
              <button type="button" className={"filter-btn " + (filterBy == "last12m" ? "isActive" : "")} value="last12m" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>Last year</span>
                </div>
              </button>
              <button type="button" className={"filter-btn " + (filterBy == "allTime" ? "isActive" : "")} value="allTime" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>All time</span>
                </div>
              </button>
            </div>
            <div className="marginLeft10">
              <div className="dispInlineBlock">
                <SelectBox
                  options={userTypeOptions}
                  name='selectUserType'
                  placeholder='Mentors:'
                  handleChange={this.filterUserType}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  customClassName="smallSelect"
                />
              </div>
            </div>
          </div>
          <div className="contentBox">
            <div className="fontSize15 marginBottom20"><span role="img" aria-label="green-heart emoji">💚</span> A ranking of members by their contributions to elevating this community. Board updated daily.</div>
            <div className="table-container marginLeftMinus5">
              {(userTypeToShow == "0" || userTypeToShow == "2") && (
                <table id={userTypeToShow == "0" ? "mentorLeaderboard-table" : "companyLeaderboard-table"}>
                  <thead>
                    <tr>
                      <th className="leaderboardItem-ranking hasSort alignCenter" onClick={() => this.handleSortTable(0, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}><span className="greyText hidden showOnHover"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-name textLeft" />
                      <th className="leaderboardItem-topContribution textLeft">Top contribution</th>
                      <th className="leaderboardItem-numAnswers hasSort alignCenter" onClick={() => this.handleSortTable(3, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>Answers <span className="greyText"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-numGenerals hasSort alignCenter" onClick={() => this.handleSortTable(4, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>General posts <span className="greyText"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-numMentees hasSort alignCenter" onClick={() => this.handleSortTable(5, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>No. Mentees <span className="greyText"><i className="fas fa-sort"/></span></th>
                    </tr>
                  </thead>
                  {(isFilteringTable == true || isSortingTable == true) && (
                    <div className="spinner-container">
                      <LoadingSpinner />
                    </div>
                  )}
                  <tbody>
                    {rankedUsers}
                  </tbody>
                </table>
              )}
              {userTypeToShow == "1" && (
                <table id="menteeLeaderboard-table">
                  {(isFilteringTable == true || isSortingTable == true) && (
                    <div className="spinner-container">
                      <LoadingSpinner />
                    </div>
                  )}
                  Mentee ranking goes here
                </table>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default CommunityLeaderboard;
