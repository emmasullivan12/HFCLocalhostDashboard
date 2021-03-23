// Dex last merged this code on 8th mar 2021

import React from "react";
import ReactDOM from "react-dom";

import PendingMatch from "./PendingMatch.js";
import {LoadingSpinner, Check} from "./GeneralFunctions";

class MatchesInProg extends React.Component {
/*  constructor(props) {
    super(props);
    this.state = {
      isFilteringTable: false,
      groups: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
      groupsToShow: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
    }
  }

  onClickGroups = (e) => {
    this.setState({
      isFilteringTable: true
    })
    e.preventDefault()
    e.stopPropagation()
    e.persist()
    const { groups } = this.state;
    const value = e.currentTarget.dataset.text;

    this.setState(prevState => {
      const [ ...groupsToShow ] = prevState.groupsToShow
      const index = groupsToShow.indexOf(value)

      if (index === -1) {
        groupsToShow.push(value)
      } else {
        groupsToShow.splice(index, 1)
      }

      return {
        groupsToShow: groupsToShow
      }
    });
  }

  renderOptions(options, usedFor) {
    const { groupsToShow } = this.state;

    return (
      <React.Fragment>
        <div className="dispInlineBlock">
          {options.map((option, index) => {
            const selected = groupsToShow.includes(option)

            let className = "dispInlineBlock"

            if (selected) {
              className += " selectedCheckbox"
            }

            if (index === options.length) className += " lastItem"

            return (
              <div
                key={option}
                data-id={option}
                data-text={option}
                data-usedfor={usedFor}
                className={className}
          //      onFocus={this.onHoverOption} // placeholder as was erroring without this
          //      onMouseOver={this.onHoverOption}
                onClick={this.onClickGroups}
                role="button"
              //  onFocus={this.onFocus}
              //  onMouseOver={this.onHoverOption}
              >
                <span className="checkbox">
                  { selected ? <Check /> : null }
                </span>
                <span className="checkboxText filters overflow-ellipsis">
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    )
  }
*/
  render() {
    const pendingMatches = [];

    // Grab pending matches
    // Matchstatus: 1=profile sent, 2=mentee timed out, 3=mentee accepted, 4=menteerejected, 5=mentor timed out, 6=mentor accepted, 7=mentor rejected
    const matches = [
      {matchid: 'uuid123', menteegroups: ['5'], mentorgroups: ['5'], status_of_match: '1', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_Date: '', date_matched: '2021-01-02T16:54:25.084Z'},
  //    {matchid: 'uuid124', menteegroups: ['1'], mentorgroups: ['1'], status_of_match: '2', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '2021-01-05T16:54:25.084Z', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '', mentor_replied_Date: '', date_matched: '2021-01-02T16:54:25.084Z'},
      {matchid: 'uuid125', menteegroups: ['4'], mentorgroups: ['3'], status_of_match: '3', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_Date: '', date_matched: '2021-01-01T16:54:25.084Z'},
  //    {matchid: 'uuid126', menteegroups: ['2'], mentorgroups: ['1'], status_of_match: '4', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '', mentor_replied_Date: '', date_matched: '2021-01-02T16:54:25.084Z'},
  //    {matchid: 'uuid126', menteegroups: ['2'], mentorgroups: ['2'], status_of_match: '5', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '2021-01-06T16:54:25.084Z', mentorchaser2: '2021-01-08T16:54:25.084Z', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_Date: '', date_matched: '2021-01-02T16:54:25.084Z'},
      {matchid: 'uuid126', menteegroups: ['3'], mentorgroups: ['3'], status_of_match: '6', menteechaser1: '2021-01-03T16:54:25.084Z', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '2021-01-06T16:54:25.084Z', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_Date: '', date_matched: '2021-01-03T16:54:25.084Z'},
  //    {matchid: 'uuid126', menteegroups: ['4'], mentorgroups: ['4'], status_of_match: '7', menteechaser1: '', menteechaser2: '', mentee_to_reply_by: '2021-01-06T16:54:25.084Z', mentee_replied_date: '', mentorchaser1: '', mentorchaser2: '', mentor_reply_by: '2021-01-09T16:54:25.084Z', mentor_replied_Date: '', date_matched: '2021-01-02T16:54:25.084Z'},
    ];

    matches.sort(function(a,b) {
      if(a.status_of_match > b.status_of_match) { return -1; }
      if(a.status_of_match < b.status_of_match) { return 1; }
      return 0;
    });

    if (matches.length > 0) {
      matches.forEach((match, index) => {
        pendingMatches.push(
          <PendingMatch
            match={match}
            key={match.matchid}
            isFirstItem={index == 0}
          />
        );
      }, () => {
        console.log("turn isFilteringTable back to false here in test server")
      });
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <span role="img" aria-label="clockEmoji">⏱️</span> <strong>Matches In Progress...</strong> <span role="img" aria-label="clockEmoji">⏱️</span>
          </div>
        {/*}  <div>
            <div className="paddingBtm">FILTER BY</div>
            <div className="filterSection dispInlineBlock">
              <span className="marginRight">GROUP</span>
              { this.renderOptions(groups, 'group') }
            </div>
          </div>*/}
          <div className="toBeMatched-container">
            <div className="exclamation-icon-container grey">
              <i className="fas fa-user-clock" />
              <span> No action needed - pending user response</span>
            </div>
            <div className="table-container">
              {matches.length == 0 && (
                <div>No Matches currently pending...</div>
              )}
              {matches.length > 0 && (
                <table id="pendingMatches-table">
                {/*}  {isFilteringTable == true && (
                    <div className="spinner-container">
                      <LoadingSpinner />
                    </div>
                  )}*/}
                  {pendingMatches}
                </table>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MatchesInProg;
