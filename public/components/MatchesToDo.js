// Dex last merged this code on 8th feb 2021

import React from "react";
import ReactDOM from "react-dom";

import Autocomplete from './Autocomplete.js';
import {Check} from './GeneralFunctions.js';
import Modal from './Modal.js';
import roleOptions from './Roles.js';
import SelectBox from './Select.js';
import UpdateUserStatusContent from './UpdateUserStatusContent.js';
import UserToMatch from './UserToMatch.js';

import "../css/Matching.css";

const StartMatchProps = {
  ariaLabel: 'Match user',
  triggerText: 'Match user',
  usedFor: 'matchingUser',
  hideTrigger: true,
  changeInitFocus: true
}

const UpdateStatusProps = {
  ariaLabel: 'Update user Status',
  triggerText: 'Update user Status',
  usedFor: 'updateUserStatus',
  hideTrigger: true,
  changeInitFocus: true
}

// We can filter by these in the "To be matched" tab (We would have already filtered out matched, non-responsive etc)
const matchStatusOptionsToFilter = [
  {value: '2', label: 'VIP', priority: 'H'},
  {value: '3', label: 'Vocal', priority: 'H'},
  {value: '4', label: 'Has no match', priority: 'H'},
  {value: '5', label: 'Only has bad match', priority: 'H'},
  {value: '6', label: 'Wants another', priority: 'M'},
//  {value: '7', label: 'Matched', priority: 'L'},
  {value: '1', label: 'Willing to wait', priority: 'L'},
//  {value: '8', label: 'Not relevant', priority: 'L'},
//  {value: '9', label: 'Unavailable', priority: 'L'},
];

// We can set user status as these
const matchStatusOptionsToSet = [
  {value: '2', label: 'VIP', priority: 'H'},
  {value: '3', label: 'Vocal', priority: 'H'},
  {value: '4', label: 'Has no match', priority: 'H'},
  {value: '5', label: 'Only has bad match', priority: 'H'},
  {value: '6', label: 'Wants another', priority: 'M'},
//  {value: '7', label: 'Matched', priority: 'L'},
  {value: '1', label: 'Willing to wait', priority: 'L'},
  {value: '8', label: 'Not relevant', priority: 'L'},
  {value: '9', label: 'Unavailable', priority: 'L'},
];

// We can set user status as these
const matchStatusOptionsToSetNoUnavail = [
  {value: '2', label: 'VIP', priority: 'H'},
  {value: '3', label: 'Vocal', priority: 'H'},
  {value: '4', label: 'Has no match', priority: 'H'},
  {value: '5', label: 'Only has bad match', priority: 'H'},
  {value: '6', label: 'Wants another', priority: 'M'},
//  {value: '7', label: 'Matched', priority: 'L'},
  {value: '1', label: 'Willing to wait', priority: 'L'},
  {value: '8', label: 'Not relevant', priority: 'L'},
//  {value: '9', label: 'Unavailable', priority: 'L'},
];

class MatchesToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToSearchFor: '',
      roles: ['mentee', 'mentor'],
      groups: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
      status: ['VIP', 'Vocal', 'Has no match', 'Only has bad match', 'Wants another', 'Willing to wait'],
      rolesToShow: ['mentee', 'mentor'],
      groupsToShow: ['avfx', 'intogames', 'aw', 'big', 'vhs'],
      statusToShow: ['VIP', 'Vocal', 'Has no match', 'Only has bad match', 'Wants another', 'Willing to wait'],
      showUpdateStatusModal: false,
    //  showStartMatchModal: false,
      userToUpdate: '',
    //  userToMatch: ''
    }
  }

  handleUserSearch = (userInput) => {
    this.setState({
      userToSearchFor: userInput,
    })
  }

  convertRole = (roles, rolesfreetext) => {
    let rolesFullText = [];
    const stringifyRoles = JSON.stringify(roles);

    const rolesArr = roleOptions
      .filter(role => stringifyRoles.includes(role.value))

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

  refreshUsers = () => {
    // Dex to use
  }

  launchUpdateStatusModal = (e) => {
    this.setState({
      showUpdateStatusModal: true,
      userToUpdate: e.target.dataset.id
    });
  }

  closeUpdateStatusModal = () => {
    this.setState({
      showUpdateStatusModal: false,
      userToUpdate: ''
    });
  }

/*  launchStartMatchModal = (e) => {
    this.setState({
      showStartMatchModal: true,
    //  userToMatch: e.target.dataset.id
    });
  }

  closeStartMatchModal = () => {
    this.setState({
      showStartMatchModal: false,
      userToMatch: ''
    });
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
    const { userToSearchFor, roles, groups, status, rolesToShow, groupsToShow, statusToShow, showStartMatchModal, showUpdateStatusModal, userToUpdate, userToMatch } = this.state;
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

    if (usersToMatch.length > 0) {
      usersToMatch.forEach((user, index) => {
        toBeMatched.push(
          <UserToMatch
            user={user}
            key={user.uuid}
            isFirstItem={index == 0}
            matchStatusOptions={matchStatusOptionsToSet}
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
                idValue='value'
                valueToShow='name' // This is the attribute of the array/object to be displayed to user
                showDetail
                detailToShow='role'
                showCTA1
                cta1ClickHandler={this.launchUpdateStatusModal}
                cta1Text="Update"
              //  showCTA2
              //  cta2ClickHandler={this.launchStartMatchModal}
              //  cta2Text="Match"
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
                  options={matchStatusOptionsToFilter}
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
          <button type="button" onClick={this.refreshUsers} className="Submit-btn refreshTobeMatched">
            <i className="fas fa-sync-alt" />  Refresh List
          </button>
          <div className="toBeMatched-container">
            <div className="exclamation-icon-container grey">
              <i className="fas fa-exclamation-circle" />
              <span> Needs matching</span>
            </div>
            <div className="table-container">
              {usersToMatch.length == 0 && (
                <div>Woohoo! Everyones matched!</div>
              )}
              {usersToMatch.length > 0 && (
                <table id="tobeMatched-table">
                  {toBeMatched}
                </table>
              )}
            </div>
          </div>
        </div>
    {/*    {showStartMatchModal == true && (
          <Modal {...StartMatchProps} handleLocalStateOnClose={this.closeStartMatchModal}>
            <StartMatchContent name={user.fname + ' ' + user.lname} />
          </Modal>
        )}*/}
        {showUpdateStatusModal == true && (
          <Modal {...UpdateStatusProps} handleLocalStateOnClose={this.closeUpdateStatusModal}>
            <UpdateUserStatusContent
              userToUpdate={userToUpdate}
              matchStatusOptions={matchStatusOptionsToSetNoUnavail}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default MatchesToDo;
