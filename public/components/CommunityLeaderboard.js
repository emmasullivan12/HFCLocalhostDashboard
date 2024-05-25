// Last merged this code on 24th may 2024

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
      isLoadingTable: false,
      isFilteringTable: false,
      isSortingTable: false,
      filterBy: 'last30days',
      isMobile: checkMobile(),
      userTypeToShow: '0', // 0 = mentor / 1 = mentee / 2 = company
      loggedInUserRanking: '5',
      isLoadingMoreUsers: false,
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
    this.props.checkLeaderboardTimelineType(e.currentTarget.value)
  }

  filterUserType = (userInput) => {
  /*  this.setState({
      isFilteringTable: true
    })*/

    const { userTypeToShow } = this.state;

    this.setState({
      userTypeToShow: userInput,
    })
    this.props.checkLeaderboardUserType(userInput)
  }

  handleSortTable = (n, sortType, tableId) => {
    this.setState({
      isSortingTable: true
    }, () => {
      sortTable(n, sortType, tableId, () => {
        this.setState({
          isSortingTable: false
        })
      })
    })
  }

  render() {
    const {mentorsSorted, isGroupMember, community, isCommPage, updatePathName, isLoggedIn, userRole, commURL, checkHasAccess, noAccessHandler, updateTabToView} = this.props
    const {isLoadingMoreUsers, isLoadingTable, isFilteringTable, isSortingTable, userTypeToShow, filterBy, isMobile, loggedInUserRanking} = this.state
    const loggedInUID = 'uuid128'

    const rankedUsers = [];

    const mentees = [
      {uid: 'uuid1234', fname: 'Adam', lname: 'Ant', topContributionType: 'answer', topContributionID: '123', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 0, isU18: true, eetstatus: 'uni', currco: '', currcofreetext: '', currtrainingprovider: '', uninamefreetext: 'FreeTextUniName', uniname: '', currrole: '', currtraining: '', degree: 'MA Animation & VFX', state: '', country: ''},
      {uid: 'uuid1245', fname: 'Busy', lname: 'Bee', topContributionType: 'general', topContributionID: '234', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 1, isU18: false, eetstatus: 'sch', currco: '', currcofreetext: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid1256', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 1, isU18: true, eetstatus: 'none', currco: '', currcofreetext: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'CA', country: 'USA'},
      {uid: 'uuid1267', fname: 'Adam', lname: 'Bant', topContributionType: 'answer', topContributionID: '123', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 3, isU18: true, eetstatus: 'job', currco: '6', currcofreetext: '', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: 'Barista', currtraining: '', degree: '', state: '', country: ''},
      {uid: 'uuid1278', fname: 'Charlie', lname: 'Chaplin', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 2, isU18: false, eetstatus: 'job', currco: '', currcofreetext: 'Companyfreetextname', currtrainingprovider: '', uninamefreetext: '', uniname: '', currrole: '', currtraining: '', degree: '', state: 'NY', country: 'USA'},
      {uid: 'uuid1289', fname: 'Busy', lname: 'Cee', topContributionType: 'general', topContributionID: '234', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 1, isU18: false, eetstatus: 'train', currco: '', currcofreetext: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
      {uid: 'uuid1210', fname: 'Busy', lname: 'Dee', topContributionType: 'general', topContributionID: '234', numAnswers: 0, numGenerals: 0, numQs: 0, numMentees: 0, numMentors: 0, isU18: true, eetstatus: 'train', currco: '', currcofreetext: '', currtrainingprovider: 'Escape Studios', uninamefreetext: '', uniname: '', currrole: '', currtraining: '3D Compositing', degree: '', state: '', country: ''},
    ];

    const companies = [
      {uid: '123', companyname: 'EY', topContributionType: 'answer', topContributionID: '123', numAnswers: 4, numGenerals: 0, numMentees: 2, isU18: false},
      {uid: '124', companyname: 'Pladis', topContributionType: 'general', topContributionID: '234', numAnswers: 14, numGenerals: 2, numMentees: 1, isU18: false},
      {uid: '125', companyname: 'Framestore', topContributionType: '', topContributionID: '', numAnswers: 0, numGenerals: 0, numMentees: 5, isU18: false},
    ];

    if (community.members.length > 0) {
      if (userTypeToShow == '0') { // mentors

        mentorsSorted && mentorsSorted.length > 0 && mentorsSorted.forEach((user, index) => {
          const isMe = user.uid == loggedInUID
          rankedUsers.push(
            <LeaderboardItem
              user={user}
              key={user.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
              isMobile={isMobile}
              isFirstItem={(index + 1) == 1}
              isLastItem={(index + 1) == mentorsSorted.length}
              isLoggedInUser={isMe}
            />
          );
        }, () => {
          this.setState({
            isLoadingTable: false,
          })
          console.log("turn isFilteringTable back to false here in test server")
        });
      } else if (userTypeToShow == '1') { // mentees sorted alphabetically for now
        const menteesSorted = mentees.sort((a,b)=> {
          if(b.fname > a.fname) { return -1; }
          if(b.fname < a.fname) { return 1; }
          if (b.lname > a.lname) return -1;
          if (b.lname < a.lname) return 1;
          return 0;
        })

        menteesSorted.forEach((user, index) => {
          const isMe = user.uid == loggedInUID
          rankedUsers.push(
            <LeaderboardItem
              user={user}
              key={user.uid}
              index={index}
              userTypeToShow={userTypeToShow}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
              isMobile={isMobile}
              isFirstItem={(index + 1) == 1}
              isLastItem={(index + 1) == menteesSorted.length}
              isLoggedInUser={isMe}
            />
          );
        }, () => {
          this.setState({
            isLoadingTable: false,
          })
          console.log("turn isFilteringTable back to false here in test server")
        });
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
              isFirstItem={(index + 1) == 1}
              isLastItem={(index + 1) == companiesSorted.length}
            />
          );
        }, () => {
          this.setState({
            isLoadingTable: false,
          })
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
            <div className="fontSize15 marginBottom20">
              <span role="img" aria-label="green-heart emoji">💚</span> A ranking of members by their contributions to elevating this community. Board updated daily.
              {isGroupMember && (
                <div className="marginTop10"><strong className="electricPurpleText"> You are currently ranked #{loggedInUserRanking}</strong></div>
              )}
              {!isGroupMember && userTypeToShow != "2" && (
                <div className="marginTop10"><strong className="electricPurpleText"> Join the group to get a ranking =)</strong></div>
              )}
            </div>
            <div className={"table-container marginLeftMinus5" + (isMobile == true ? " isMobile" : "")} id="commPageLeaderboard-tableContainer" >
              {(userTypeToShow == "0" || userTypeToShow == "2" || (userTypeToShow == "1" && isLoggedIn)) && (
                <React.Fragment>
                  <table id={userTypeToShow == "0" ? "mentorLeaderboard-table" : (userTypeToShow == '1' ? "menteeLeaderboard-table" : "companyLeaderboard-table")}>
                    <thead>
                      <tr className={(isMobile == true ? "isMobile" : "")}>
                        <th className="leaderboardItem-ranking hasSort alignCenter" onClick={() => this.handleSortTable(0, 'number', ((userTypeToShow == "0" ? 'mentor' : (userTypeToShow == '1' ? 'mentee' : 'company')) + 'Leaderboard-table'))}><span className="greyText hidden showOnHover"><i className="fas fa-sort"/></span></th>
                        <th className="leaderboardItem-name textLeft" />
                      {/*  <th className="leaderboardItem-topContribution textLeft">Top contribution</th>*/}
                        <th className="leaderboardItem-numAnswers hasSort alignCenter" onClick={() => this.handleSortTable(2, 'number', ((userTypeToShow == "0" ? 'mentor' : (userTypeToShow == '1' ? 'mentee' : 'company')) + 'Leaderboard-table'))}>Answers <span className="greyText"><i className="fas fa-sort"/></span></th>
                        <th className="leaderboardItem-numGenerals hasSort alignCenter" onClick={() => this.handleSortTable(3, 'number', ((userTypeToShow == "0" ? 'mentor' : (userTypeToShow == '1' ? 'mentee' : 'company')) + 'Leaderboard-table'))}>General posts <span className="greyText"><i className="fas fa-sort"/></span></th>
                        {userTypeToShow == '1' && (
                          <th className="leaderboardItem-numQs hasSort alignCenter" onClick={() => this.handleSortTable(4, 'number', ((userTypeToShow == "0" ? 'mentor' : (userTypeToShow == '1' ? 'mentee' : 'company')) + 'Leaderboard-table'))}>Questions <span className="greyText"><i className="fas fa-sort"/></span></th>
                        )}
                        {userTypeToShow != '1' && (
                          <th className="leaderboardItem-numMentees hasSort alignCenter" onClick={() => this.handleSortTable(4, 'number', ((userTypeToShow == "0" ? 'mentor' : (userTypeToShow == '1' ? 'mentee' : 'company')) + 'Leaderboard-table'))}>Mentees <span className="greyText"><i className="fas fa-sort"/></span></th>
                        )}
                      </tr>
                    </thead>
                    {(isLoadingTable == true || isFilteringTable == true || isSortingTable == true) && (
                      <div className="spinner-container">
                        <LoadingSpinner />
                      </div>
                    )}
                    <tbody>
                      {rankedUsers}
                    </tbody>
                  </table>
                  {isLoadingMoreUsers == true && (
                    <div className="marginTop20 marginBottom20">
                      <LoadingSpinner />
                    </div>
                  )}
                </React.Fragment>
              )}
              {userTypeToShow == "1" && !isLoggedIn && (
                <div className="overflowHidden fullWidth height400px positionRel">
                  <div className="blurryText">
                    <div className="marginBottom10"><span className="marginRight8">1</span><span className="marginRight8">User Name</span><span className="marginRight8">100pts</span><span>100</span></div>
                    <div className="marginBottom10"><span className="marginRight8">2</span><span className="marginRight8">User Name</span><span className="marginRight8">80pts</span><span>80</span></div>
                    <div className="marginBottom10"><span className="marginRight8">3</span><span className="marginRight8">User Name</span><span className="marginRight8">60pts</span><span>60</span></div>
                    <div className="marginBottom10"><span className="marginRight8">4</span><span className="marginRight8">User Name</span><span className="marginRight8">50pts</span><span>50</span></div>
                    <div className="marginBottom10"><span className="marginRight8">5</span><span className="marginRight8">User Name</span><span className="marginRight8">40pts</span><span>40</span></div>
                    <div className="marginBottom10"><span className="marginRight8">6</span><span className="marginRight8">User Name</span><span className="marginRight8">20pts</span><span>20</span></div>
                  </div>
                  <div className="leaderboardUnlockSection-btnContainer paddingL20 absolute top35">
                    <a href="https://app.prospela.com/signup?origin=commsPageLeaderboard">
                      <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                        <i className="fas fa-lock" id="itemUnlockIcon" /> Sign up to unlock
                      </button>
                    </a>
                  </div>
                </div>
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
