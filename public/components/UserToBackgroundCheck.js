// Dex last merged this code on 7th mar 2021

import React, { Component } from "react";

import {usercdn, userIDSelfiesFolder} from './CDN.js';
import Checkbox from './Checkbox.js';
import {sortTable} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class UserToCheck extends Component {
  constructor (props) {
    super(props);
    this.state = {
      approvePhoto: false,
      approveCV: false,
      approveSocialMedia: false,
      approveCrimRecord: false,
      approveSexOffenderReg: false,
    }
  }

  createIDSelfieURL = (string) => {
    return usercdn.concat('/',userIDSelfiesFolder,string,'-o');
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  chatToUser = () => {
    // Dex to launch chat with user
  }

  canBeSubmitted() {
    const {user} = this.props;
    const {approvePhoto, approveCV, approveSocialMedia, approveCrimRecord, approveSexOffenderReg} = this.state

    if (approvePhoto == true && approveCV == true && approveSocialMedia ==  true) {
      if (user.country == 'GBR') {

        if (user.ukConv == 1) {

          if (approveCrimRecord == true) {
            return true
          } else return false

        } else return true

      } else if (user.country == 'USA') {

        if (user.usConv1 == 1 || user.usConv2 == 1 || user.usConv3 == 1 || user.usConv4 == 1) {
          if (approveCrimRecord == true && approveSexOffenderReg == true) {
            return true
          } else return false

        } else if (approveSexOffenderReg == true) {
          return true

        } else return false

      } else if (user.usConv1 == 1 || user.usConv2 == 1 || user.usConv3 == 1 || user.usConv4 == 1) {

        if (approveCrimRecord == true) {
          return true
        } else return false
      }
    } else return false
  }

  render() {
    const {user, isFirstItem, grabSchOrUni} = this.props;
    const isEnabled = this.canBeSubmitted();

    const name = user.fname + " " + user.lname;
    const selfieURL = this.createIDSelfieURL(user.idpic);
    const hasNoConvictions = user.ukConv != 1 && user.usConv1 != 1 && user.usConv2 != 1 && user.usConv3 != 1 && user.usConv4 != 1;
    let classNameSafeguarding = "userToMatch-sgStatus";
    let safeguardingText;
    let eduName;

    if (user.eetstatus == 'sch') {
      eduName = " " + (user.schname != '' ? (grabSchOrUni('sch', user.schname)) : user.schnamefreetext)
    } else if (user.eetstatus == 'uni') {
      eduName = " " + (user.uniname != '' ? (grabSchOrUni('uni', user.uniname)) : user.uninamefreetext)
    }

    if (user.country == 'GBR') {
      if (user.ukConv == 1) {
        safeguardingText = "Convictions (UK)"
        classNameSafeguarding += " redText"
      } else {
        safeguardingText = 'None'
        classNameSafeguarding += " greyText";
      }
    } else if (user.usConv1 != 1 && user.usConv2 != 1 && user.usConv3 != 1 && user.usConv4 != 1) {
      safeguardingText = 'None'
      classNameSafeguarding += " greyText";
    } else {
      safeguardingText = (user.usConv1 == 1 ? 'Felony, ': '') + (user.usConv2 == 1 ? 'Misdemeanor, ': '') + (user.usConv3 == 1 ? 'Crime against Minor, ': '') + (user.usConv4 == 1 ? 'Volunteering warning' : '')
      classNameSafeguarding += " redText"
    }

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-name hasSort" onClick={() => sortTable(0, 'alphabetically', 'tobeMatched-table')}>Name <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-location">Location</th>
              <th className="userToMatch-roles">Situation</th>
              <th className="userToMatch-linkedin">LinkedIn</th>
              <th className="userToMatch-cv">CV</th>
              <th className="userToMatch-selfie">ID Selfie</th>
              <th className="userToMatch-safeguarding">Conviction History</th>
              <th className="">Photo OK</th>
              <th className="">LinkedIn/CV OK</th>
              <th className="">Social Media OK</th>
              <th className="">Criminal Record OK</th>
              <th className="">State Sex Offender Register (if USA) OK</th>
              <th className="userToMatch-match"/>
            </tr>
          </thead>
        )}
        <tbody>
          <tr>
            <td>
              <a className="link" onClick={this.chatToUser}>{name}</a>
            </td>
            <td>{user.state}, {user.country}</td>
            <td>
              {user.eetstatus == 'sch' ? ('Student @ ' + eduName) : ''}
              {user.eetstatus == 'uni' ? ('Student @ ' + eduName) : ''}
              {user.eetstatus == 'job' ? (user.currrole + ' @ ' + user.currco) : ''}
              {user.eetstatus == 'train' ? (user.currtraining + ' @ ' + user.currtrainingprovider) : ''}
              {user.eetstatus == 'none' ? 'NEET' : ''}
            </td>
            <td>
              {user.profurl != null && (
                <a className="link" href={user.profurl} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-link" />
                   Go to URL
                </a>
              )}
              {user.profurl == null && (
                <div>-</div>
              )}
            </td>
            <td className="alignCenter">
              {user.cv != null && (
                <div className="rolebadge-mentor">
                  <a className="link" href={user.cv} target="_blank" rel="noopener noreferrer">
                    View CV
                  </a>
                </div>
              )}
              {user.cv == null && (
                <div>-</div>
              )}
            </td>
            <td>
              <a href={selfieURL} target="_blank" rel="noopener noreferrer">
                <div className="selfie-container">
                  <i className="fas fa-portrait" />
                </div>
              </a>
            </td>
            <td className={classNameSafeguarding}>
              {safeguardingText}
            </td>
            <td>
              <Checkbox
          //      labelId="tncText"
                labelClassName="checkbox-container"
          //      label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
                id="checkedPhoto-Checkbox"
                name="approvePhoto"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName="checkmark left"
                spanId="checkedPhoto"
                required
              />
            </td>
            <td>
              <Checkbox
          //      labelId="tncText"
                labelClassName="checkbox-container"
          //      label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
                id="checkedPhoto-Checkbox"
                name="approveCV"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName="checkmark left"
                spanId="checkedPhoto"
                required
              />
            </td>
            <td>
              <Checkbox
          //      labelId="tncText"
                labelClassName="checkbox-container"
          //      label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
                id="checkedPhoto-Checkbox"
                name="approveSocialMedia"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName="checkmark left"
                spanId="checkedPhoto"
                required
              />
            </td>
            <td>
              <Checkbox
          //      labelId="tncText"
                labelClassName="checkbox-container"
          //      label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
                id="checkedPhoto-Checkbox"
                name="approveCrimRecord"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName={"checkmark left" + (hasNoConvictions ? ' disabled' : '')}
                spanId="checkedPhoto"
                required={user.ukConv == 1 || user.usConv1 == 1 || user.usConv2 == 1 || user.usConv3 == 1 || user.usConv4 == 1}
                disabled={hasNoConvictions}
              />
            </td>
            <td>
              <Checkbox
          //      labelId="tncText"
                labelClassName="checkbox-container"
          //      label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
                id="checkedPhoto-Checkbox"
                name="approveSexOffenderReg"
                value="1"
                onChange={this.toggleCheckbox}
                spanClassName={"checkmark left" + (user.country != 'USA' ? ' disabled' : '')}
                spanId="checkedPhoto"
                required={user.country == 'USA'}
                disabled={user.country != 'USA'}
              />
            </td>
            <td>
              <button className="Submit-btn backgroundCheck" type="button" disabled={!isEnabled}>Approve</button>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default UserToCheck;
