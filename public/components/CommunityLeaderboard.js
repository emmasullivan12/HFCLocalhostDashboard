// Last merged this code on 20th nov 2023

import React from "react";
import ReactDOM from "react-dom";

import AskAQPrompt from "./AskAQPrompt";
import LeaderboardItem from "./LeaderboardItem";
import {sortTable, checkMobile, LoadingSpinner} from "./GeneralFunctions";
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
      isMobile: checkMobile(),
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
    const {isFilteringTable, isSortingTable, userTypeToShow, filterBy, isMobile} = this.state

    const rankedUsers = [];

    const mentors = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 14, numGenerals: 0, numMentees: 7, isU18: false, eetstatus: 'job', currco: 'Framestore', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: 'Compositor', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false, eetstatus: 'train', currco: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false, eetstatus: 'uni', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '11', currrole: '', currtraining: '', degree: 'BSc Business', state: '', country: ''},
      {uid: 'uuid126', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 14, numGenerals: 3, numMentees: 2, isU18: false, eetstatus: 'sch', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid127', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 3, numMentees: 1, isU18: false, eetstatus: 'none', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'CA', country: 'USA'},
      {uid: 'uuid128', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 4, isU18: false, eetstatus: 'uni', currco: '', currtrainingprovider: '', uninamefreetext: 'FreeTextUniName', uniname: '', currrole: '', currtraining: '', degree: 'MA Animation & VFX', state: '', country: ''},
    ];

    const mentees = [
      {uid: 'uuid123', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: true, eetstatus: 'uni', currco: '', currtrainingprovider: '', uninamefreetext: 'FreeTextUniName', uniname: '', currrole: '', currtraining: '', degree: 'MA Animation & VFX', state: '', country: ''},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false, eetstatus: 'sch', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: true, eetstatus: 'none', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'CA', country: 'USA'},
      {uid: 'uuid126', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: true, eetstatus: 'job', currco: 'Starbucks', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: 'Barista', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false, eetstatus: 'none', currco: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'NY', country: 'USA'},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false, eetstatus: 'train', currco: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
      {uid: 'uuid124', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: true, eetstatus: 'train', currco: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
    ];

    const companies = [
      {uid: 'uuid123', companyname: 'EY', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: false},
      {uid: 'uuid124', companyname: 'Pladis', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: 'uuid125', companyname: 'Framestore', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false},
    ];

    if (community.members.length > 0) {
      if (userTypeToShow == '0') { // mentors
        const mentorsSorted = mentors.sort((a,b)=> {
          if(b.numAnswers < a.numAnswers) { return -1; }
          if(b.numAnswers > a.numAnswers) { return 1; }
          if (b.numGenerals < a.numGenerals) return -1;
          if (b.numGenerals > a.numGenerals) return 1;
          if (b.numMentees < a.numMentees) return -1;
          if (b.numMentees > a.numMentees) return 1;
          return 0;
        })

        mentorsSorted.forEach((user, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={user}
              key={user.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
              isMobile={isMobile}
              isLastItem={(index + 1) == mentorsSorted.length}
            />
          );
        }, () => {
          console.log("turn isFilteringTable back to false here in test server")
        });
      } else if (userTypeToShow == '1') { // mentees
        return
      } else { // is a company filter
        const companiesSorted = companies.sort((a,b)=> {
          if(b.numAnswers < a.numAnswers) { return -1; }
          if(b.numAnswers > a.numAnswers) { return 1; }
          if (b.numGenerals < a.numGenerals) return -1;
          if (b.numGenerals > a.numGenerals) return 1;
          if (b.numMentees < a.numMentees) return -1;
          if (b.numMentees > a.numMentees) return 1;
          return 0;
        })

        companiesSorted.forEach((company, index) => {
          rankedUsers.push(
            <LeaderboardItem
              user={company}
              key={company.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
              isMobile={isMobile}
              isLastItem={(index + 1) == companiesSorted.length}
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
          <div className={isMobile == true ? "textRight marginBottom20" : "displayFlex flexEnd marginBottom20"}>
            <div className="filterFeed-container">
            {/*  <button type="button" className={"filter-btn " + (filterBy == "last7days" ? "isActive" : "")} value="last7days" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>Last 7 days</span>
                </div>
              </button>*/}
              <button type="button" className={"filter-btn " + (filterBy == "last30days" ? "isActive" : "")} value="last30days" onClick={(e) => this.filterBy(e)}>
                <div>
                  <span>Last 30 days</span>
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
            <div className={isMobile == true ? "marginTop10" : "marginLeft10"}>
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
          <div className={"contentBox padding1pt5rem" + (isMobile == true ? " isMobile" : "")}>
            <div className="fontSize15 marginBottom20"><span role="img" aria-label="green-heart emoji">💚</span> A ranking of members by their contributions to elevating this community. Board updated daily.</div>
            <div className={"table-container marginLeftMinus5" + (isMobile == true ? " isMobile" : "")}>
              {(userTypeToShow == "0" || userTypeToShow == "2") && (
                <table id={userTypeToShow == "0" ? "mentorLeaderboard-table" : "companyLeaderboard-table"}>
                  <thead>
                    <tr className={(isMobile == true ? "isMobile" : "")}>
                      <th className="leaderboardItem-ranking hasSort alignCenter" onClick={() => this.handleSortTable(0, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}><span className="greyText hidden showOnHover"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-name textLeft" />
                    {/*  <th className="leaderboardItem-topContribution textLeft">Top contribution</th>*/}
                      <th className="leaderboardItem-numAnswers hasSort alignCenter" onClick={() => this.handleSortTable(2, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>Answers <span className="greyText"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-numGenerals hasSort alignCenter" onClick={() => this.handleSortTable(3, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>General posts <span className="greyText"><i className="fas fa-sort"/></span></th>
                      <th className="leaderboardItem-numMentees hasSort alignCenter" onClick={() => this.handleSortTable(4, 'number', ((userTypeToShow == "0" ? 'mentor' : 'company') + 'Leaderboard-table'))}>No. Mentees <span className="greyText"><i className="fas fa-sort"/></span></th>
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
