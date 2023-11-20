// Last merged this code on 20th nov 2023

import React from "react";
import ReactDOM from "react-dom";

import AskAQPrompt from "./AskAQPrompt";
import LeaderboardItem from "./LeaderboardItem";
import {LoadingSpinner} from "./GeneralFunctions";
import SelectBox from './Select.js';

const userTypeOptions = [
  {value: '0', label: 'Mentor'},
  {value: '1', label: 'Mentee'},
  {value: '2', label: 'Company'},
];

class CommunityLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilteringTable: false,
      filterBy: 'last7days',
      userTypeToShow: 'mentor',
    }
  }

  filterBy = (e) => {
    this.setState({
      isFilteringTable: true
    })

    const {filterBy} = this.state
    e.stopPropagation()
    this.setState({
      filterBy: e.currentTarget.value
    })
  }

  filterUserType = (userInput) => {
    this.setState({
      isFilteringTable: true
    })

    const { userTypeToShow } = this.state;
    this.setState({
      userTypeToShow: userInput,
    })
  }

  render() {
    const {community, isCommPage, updatePathName, isLoggedIn, userRole, commURL, checkHasAccess, noAccessHandler, updateTabToView} = this.props
    const {isFilteringTable, userTypeToShow, filterBy} = this.state

    const rankedUsers = [];

    const mentors = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentee: 2, isU18: false},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentee: 1, isU18: false},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentee: 5, isU18: false},
    ];

    const mentees = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentee: 2, isU18: true},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentee: 1, isU18: false},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentee: 5, isU18: true},
    ];

    const companies = [
      {uid: 'uuid123', companyname: 'EY', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentee: 2, isU18: false},
      {uid: 'uuid124', companyname: 'Pladis', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentee: 1, isU18: false},
      {uid: 'uuid125', companyname: 'Framestore', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentee: 5, isU18: false},
    ];

    if (community.members.length > 0) {
      if (userTypeToShow == 'mentor') {
        mentors.forEach((user, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={user}
              key={user.uid}
              isFirstItem={index == 0}
              userTypeToShow={userTypeToShow}
            />
          );
        }, () => {
          console.log("turn isFilteringTable back to false here in test server")
        });
      } else if (userTypeToShow == 'mentee') {
        return
      } else { // is a company filter
        companies.forEach((company, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={company}
              key={company.uid}
              isFirstItem={index == 0}
              userTypeToShow={userTypeToShow}
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
        <div className="contentBox">
          <div className="fontSize15"><span className="fontSize20" role="img" aria-label="heart-hands emoji">🫶</span> A ranking of members by their contributions to elevating this community. Board updated daily.</div>
          <div className="filterFeed-container textRight marginBottom20">
            <button type="button" className={"filter-btn " + (filterBy == "last7days" ? "isActive" : "")} value="last7days" onClick={(e) => this.filterBy(e)}>
              <div>
                <span>Last 7 days</span>
              </div>
            </button>
            <button type="button" className={"filter-btn " + (filterBy == "last30days" ? "isActive" : "")} value="last30days" onClick={(e) => this.filterBy(e)}>
              <div>
                <span>Last 30 days</span>
              </div>
            </button>
            <button type="button" className={"filter-btn " + (filterBy == "last12m" ? "isActive" : "")} value="last12m" onClick={(e) => this.filterBy(e)}>
              <div>
                <span>Last 12 months</span>
              </div>
            </button>
            <button type="button" className={"filter-btn " + (filterBy == "allTime" ? "isActive" : "")} value="allTime" onClick={(e) => this.filterBy(e)}>
              <div>
                <span>All time</span>
              </div>
            </button>
            <div className="filterSection">
              <div className="filterSelectBox dispInlineBlock">
                <SelectBox
                  options={userTypeOptions}
                  name='selectUserType'
                  placeholder='Mentors:'
                  placeholderOnClick="Select leaderboard to show"
                  handleChange={this.filterUserType}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                />
              </div>
            </div>
          </div>
          <div className="table-container">
            {(userTypeToShow == "mentor" || userTypeToShow == "company") && (
              <table id={userTypeToShow == "mentor" ? "mentorLeaderboard-table" : "companyLeaderboard-table"}>
                {isFilteringTable == true && (
                  <div className="spinner-container">
                    <LoadingSpinner />
                  </div>
                )}
                {rankedUsers}
              </table>
            )}
            {userTypeToShow == "mentee" && (
              <table id="menteeLeaderboard-table">
                {isFilteringTable == true && (
                  <div className="spinner-container">
                    <LoadingSpinner />
                  </div>
                )}
                Mentee ranking goes here
              </table>
            )}
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default CommunityLeaderboard;
