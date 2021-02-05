// Dex last merged this code on 5th feb 2021

import React from "react";
import ReactDOM from "react-dom";

import Autocomplete from './Autocomplete.js';
import {Check} from './GeneralFunctions.js';
import roleOptions from './Roles.js';
import SelectBox from './Select.js';
import UserToMatch from './UserToMatch.js';

import "../css/Matching.css";

const matchStatusOptions = [
  {value: '2', label: 'VIP', priority: 'H'},
  {value: '3', label: 'Vocal', priority: 'H'},
  {value: '4', label: 'Has no match', priority: 'H'},
  {value: '5', label: 'Only has bad match', priority: 'H'},
  {value: '6', label: 'Wants another', priority: 'M'},
  {value: '7', label: 'Matched', priority: 'L'},
  {value: '1', label: 'Willing to wait', priority: 'L'},
  {value: '8', label: 'Not relevant', priority: 'L'},
  {value: '9', label: 'Non-responsive', priority: 'L'},
];

class MatchesToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToSearchFor: '',
      roles: ['Mentee', 'E-Mentor'],
      groups: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
      status: ['VIP', 'Vocal', 'Has no match', 'Only has bad match', 'Wants another', 'Matched', 'Willing to wait', 'Not relevant', 'Non-responsive'],
      rolesToShow: ['Mentee', 'E-Mentor'],
      groupsToShow: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
      statusToShow: ['VIP', 'Vocal', 'Has no match', 'Only has bad match', 'Wants another', 'Matched', 'Willing to wait', 'Not relevant', 'Non-responsive'],
    }
  }

  handleUserSearch = (userInput) => {
    this.setState({
      userToSearchFor: userInput,
    })
  }

  convertRole = (roles, rolesfreetext) => {
    let rolesFullText = [];

    const rolesArr = roleOptions
      .filter(role => roles.includes(role.value))

    rolesArr.forEach((x) => {
      rolesFullText.push(x.label)
    })
    rolesfreetext.forEach((y) => {
      rolesFullText.push(y)
    })

    return rolesFullText.join(", ")
  }

  onClickRoles = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.persist()
    const { roles } = this.state;
    const value = e.currentTarget.dataset.text;

    this.setState(prevState => {
      const [ ...rolesToShow ] = prevState.rolesToShow
      const index = rolesToShow.indexOf(value)

      if (index === -1) {
        rolesToShow.push(value)
      } else {
        rolesToShow.splice(index, 1)
      }

      return {
        rolesToShow: rolesToShow,
      }
    });
  }

  onClickGroups = (e) => {
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
        groupsToShow: groupsToShow,
      }
    });
  }

  onClickStatus = (userInput) => {
    const { statusToShow } = this.state;

    this.setState({
      statusToShow: userInput,
    })
  }

  /*getMatchStatus = (matchStatus) => {
    const {matchStatusOptions} = this.props;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }*/

  renderOptions(options, usedFor) {
    const { rolesToShow, groupsToShow } = this.state;

    return (
      <React.Fragment>
        <div className="dispInlineBlock">
          {options.map((option, index) => {
            const selected = usedFor == 'role' ? rolesToShow.includes(option) : (usedFor == 'group' ? groupsToShow.includes(option) : '');

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
                onClick={usedFor == 'role' ? this.onClickRoles : this.onClickGroups}
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

  render() {
    const { userToSearchFor, roles, groups, status, rolesToShow, groupsToShow, statusToShow } = this.state;
    var users = [
      {value: 'uuid123', name: 'Adam Ant', role: 'mentee'},{value: 'uuid124', name: 'Busy Bee', role: 'mentor'},{value: 'uuid125', name: 'Charlie Adams', role: 'mentee'},{value: 'uuid126', name: 'Derek David', role: 'mentor'},{value: 'uuid127', name: 'Emma Elephant', role: 'mentee'}
    ]
    const selected = true;
    const toBeMatched = [];

    const usersToMatch = [
      {uuid: 'uuid123', fname: 'Adam', lname: 'Ant', group: 'avfx', role: 'mentee', no_mentors: 0, gdprdivts: '2021-01-03T19:54:25.084Z', notesonuser: 'wants Houdini', roles: ['12', '98'], rolesfreetext: ['role3', 'role4'], birthday: '1995-01-01T00:00:00.000Z', matchstatus: 1},
      {uuid: 'uuid124', fname: 'Busy', lname: 'Bee', group: 'avfx', role: 'mentee', no_mentors: 1, gdprdivts: '2020-12-03T19:54:25.084Z', notesonuser: '', roles: ['12', '98'], rolesfreetext: [], birthday: '2005-01-01T00:00:00.000Z', matchstatus: 4},
      {uuid: 'uuid125', fname: 'Charlie', lname: 'Chaplin', group: 'intogames', role: 'mentor', no_mentees: 2, maxmentees: 5, gdprdivts: '2020-11-07T19:54:25.084Z', notesonuser: 'Really passionate about being Animator only.', rolesexp: ['14', '101'], rolesexpfreetext: ['roley', 'rollie'], matchstatus: 4, mentorsustep: 'didFullSUIDtf'},
    ];

    if (usersToMatch.length == 0) {
      toBeMatched.push(
        <div>Woohoo! Everyones matched!</div>
      );
    } else {

    /*  const filteredUsers = usersToMatch
        .filter(user => {
          rolesToShow.includes(user.role) &&
          groupsToShow.includes(user.group) &&
          statusToShow.includes(this.getMatchStatus(user.matchstatus))
        })
        */

      usersToMatch.forEach((user, index) => {
        toBeMatched.push(
          <UserToMatch
            user={user}
            key={user.uuid}
            isFirstItem={index == 0}
            matchStatusOptions={matchStatusOptions}
            convertRole={this.convertRole}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="searchBar">
            <div className="autocompleter">
              <Autocomplete
                suggestions={users}
                name='allUsersList'
                placeholder='Search all Prospela users by name'
              //  handleTabPress={this.handleTabPress}
                handleChange={this.handleUserSearch}
              //  handleMouseDown={this.handleMouseDown}
                focusOnLoad
                idValue='uuid'
                valueToShow='name' // This is the attribute of the array/object to be displayed to user
                showDetail
                detailToShow='role'
              />
            </div>
          </div>
          <div>
            <div className="paddingBtm">FILTER BY</div>
            <div className="filterSection dispInlineBlock">
              <span className="marginRight">ROLE</span>
              { this.renderOptions(roles, 'role') }
            </div>
            <div className="filterSection dispInlineBlock">
              <span className="marginRight">GROUP</span>
              { this.renderOptions(groups, 'group') }
            </div>
            <div className="filterSection">
              <span className="marginRight">STATUS</span>
              <div className="filterSelectBox dispInlineBlock">
                <SelectBox
                  multiple
              //    handleDone={this.handleDoneClickWorkEnv}
                  options={matchStatusOptions}
                  name='selectStatus'
                  placeholder='Select status to show:'
                  placeholderOnClick="Select as many as you like"
                  handleChange={this.onClickStatus}
                  defaultChecked={status}
              //    handleTabPress={this.handleTabPress}
                //  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                //  showIcon
                //  iconToShow='iconFA'
                  showCheckbox
                //  required
                />
              </div>
            </div>
          </div>
          <div className="toBeMatched-container">
            <div className="exclamation-icon-container grey">
              <i className="fas fa-exclamation-circle" />
              <span> Needs matching</span>
            </div>
            <div className="table-container">
              <table id="tobeMatched-table">
                {toBeMatched}
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MatchesToDo;
