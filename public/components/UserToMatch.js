// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import {DateCalc, X, Check} from "./GeneralFunctions";
import FullPageModal from './FullPageModal.js';
import MatchingContent from './MatchingContent.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import SetUnavailabilityContent from './SetUnavailabilityContent.js';

const MatchingUsersProps = {
  triggerText: 'Match',
  usedFor: 'matchingUsers',
  backBtn: 'arrow',
  title: 'Match User'
}

const SetUnavailableProps = {
  ariaLabel: 'Set Unavailability',
  triggerText: 'Set Unavailability',
  usedFor: 'settingUnavailability',
  hideTrigger: true,
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class UserToMatch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      matchStatus: this.props.user.matchstatus,
      editingNotes: false,
      notes: this.props.user.notesonuser,
      showUnavailableModal: false,
    }
  }

  sortTable = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tobeMatched-table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  setCaret = () => {
    var el = this.editableNotes;
    var range = document.createRange()
    var sel = window.getSelection()
    range.setStart(el.lastChild, el.lastChild != null ? el.lastChild.length : 0)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  updateNotes = () => {
    this.editableNotes.contentEditable = 'true'
    this.setState({
      editingNotes: true
    })

    this.editableNotes.focus();
    if (this.state.notes != '') {
      this.setCaret();
    }
  }

  saveNewNotes = (evt) => {
    const pText = this.editableNotes.innerHTML;
//    const pText = evt.target.previousSibling.innerHTML;
    this.setState({
      notes: pText,
      editingNotes: false,
    }, () => {
      this.updateNotesBtn.focus();
      this.editableNotes.contentEditable = 'false'
    })
  }

  showEditBtn =() => {
    const {editingNotes} = this.state;
    if (editingNotes == false) {
      this.updateNotesBtn.style.visibility = 'visible'
    }
  }

  hideEditBtn =() => {
    const {editingNotes} = this.state;
    if (editingNotes == false) {
      this.updateNotesBtn.style.visibility = 'hidden'
    }
  }

  handleMatchStatusChange = (userInput) => {
    this.setState({
      matchStatus: userInput,
      showUnavailableModal: userInput == '9' ? true : false // if selects user status as "unavailable" i.e. #9
    });
  }

  closeAvailabilityModal = () => {
    this.setState({
      showUnavailableModal: false
    });
  }

  getMatchStatus = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  getPriority = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].priority
  }

  render() {
    const {user, isFirstItem, matchStatusOptions, matchStatusOptionsAll, convertRole, convertHobbies, grabSchOrUni} = this.props;
    const {matchStatus, editingNotes, notes, showUnavailableModal} = this.state;

    const userroles = user.role == 'mentor' ? convertRole(user.rolesexp, user.rolesexpfreetext) : convertRole(user.roles, user.rolesfreetext)
    const priority = this.getPriority();
    const matchStatusName = this.getMatchStatus();
    const name = user.fname + " " + user.lname;
    let classNameSafeguarding = "userToMatch-sgStatus";
    let safeguardingText;
    let wantsU18;
    let prApproved;
    let isU18;

    if (user.role == 'mentee') {
      const birthdayts = user.birthday
      var ts = new Date(birthdayts);
      var today = new Date();
      let age;

      age = today.getFullYear() - ts.getFullYear()
      isU18 = age < 18;

      if (isU18 == true) {
        safeguardingText = age + " years (U18)"
        classNameSafeguarding += " redText";
      } else {
        safeguardingText =  age + " years"
        classNameSafeguarding += " greyText";
      }
    } else {
      wantsU18 = user.mentorsustep == 'didFullSUIDtf' || user.mentorsustep == 'didIDTrain';
      if (wantsU18 == true) {
        prApproved = true
        if (prApproved == true) {
          safeguardingText = ' ID Checked'
          classNameSafeguarding += " greenText";
        } else {
          safeguardingText = ' Needs ID Check'
          classNameSafeguarding += " redText";
        }
      } else {
        safeguardingText = 'Over 18s only'
        classNameSafeguarding += " greyText";
      }
    }

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-match">Match</th>
              <th className="userToMatch-name" onClick={() => this.sortTable(1)}>Name <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-status">Status</th>
              <th className="userToMatch-roles">Role(s)</th>
              <th className="userToMatch-group alignCenter" onClick={() => this.sortTable(4)}>Group <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-activerole alignCenter">Active role</th>
              <th className="userToMatch-chats alignCenter">Chats</th>
              <th className="userToMatch-dateSignedup">Signed up</th>
              <th className="userToMatch-safeguarding">Safeguarding</th>
              <th colSpan="2" className="userToMatch-notes">Notes</th>
            </tr>
          </thead>
        )}
        <tbody>
          <tr>
            <td>
              <FullPageModal {...MatchingUsersProps}>
                <MatchingContent
                  matchStatusOptions={matchStatusOptions}
                  matchStatusOptionsAll={matchStatusOptionsAll}
                  matchStatus={matchStatus}
                  convertRole={convertRole}
                  convertHobbies={convertHobbies}
                  userName={name}
                  userToMatchNotes={notes}
                  birthdayts={user.birthday}
                  grabSchOrUni={grabSchOrUni}
                />
              </FullPageModal>
            </td>
            <td>{name}</td>
            <td>
              <div className={"userToMatch-changeStatus " + priority}>
                <SelectBox
                  options={matchStatusOptions}
                  name='selectStatus'
                  placeholder={matchStatusName}
                  placeholderOnClick="Change status:"
                  handleChange={this.handleMatchStatusChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                />
              </div>
            </td>
            <td>{userroles}</td>
            <td className="alignCenter">{user.group}</td>
            <td className="alignCenter">
              <div className={"rolebadge-"+user.role}>
                {user.role}
              </div>
            </td>
            <td className="alignCenter">{user.role == 'mentor' ? (user.no_mentees + ' / ' + user.maxmentees) : (user.no_mentors)}</td>
            <td className="userToMatch-dateSignedupText"><i><DateCalc time={user.gdprdivts} showPureDate /></i></td> {/* user DateCalc from generalfunctions */}
            <td className={classNameSafeguarding}>
              {user.role == 'mentor' && wantsU18 == true && prApproved == true && (
                <Check />
              )}
              {user.role == 'mentor' && wantsU18 == true && prApproved == false && (
                <X />
              )}
              {safeguardingText}
            </td>
            <td onMouseOver={this.showEditBtn} onMouseLeave={this.hideEditBtn} onFocus={this.showEditBtn}>
              <p contentEditable="false" ref={n => this.editableNotes = n} className={"editableText-userNotes noMarginBlockEnd noMarginBlockStart" + (editingNotes == true ? ' editing' : '')} value={notes}>{user.notesonuser != '' ? user.notesonuser : ''}</p>
            </td>
            <td className="userToMatch-editingNotes" onMouseOver={this.showEditBtn} onMouseLeave={this.hideEditBtn} onFocus={this.showEditBtn}>
              {editingNotes == true && (
                <button type="button" className="button-unstyled userToMatch-updateNotesBtn greenText" onClick={this.saveNewNotes}>Update</button>
              )}
              {editingNotes == false && (
                <button type="button" className="button-unstyled userToMatch-editNotesBtn" ref={n => this.updateNotesBtn = n} onClick={this.updateNotes}><i className="fas fa-pencil-alt"/></button>
              )}
            </td>
          </tr>
        </tbody>
        {showUnavailableModal == true && (
          <Modal {...SetUnavailableProps} handleLocalStateOnClose={this.closeAvailabilityModal}>
            <SetUnavailabilityContent
              name={name}
            />
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default UserToMatch;
