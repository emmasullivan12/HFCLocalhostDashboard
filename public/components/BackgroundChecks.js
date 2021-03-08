// Dex last merged this code on 8th mar 2021

import React from "react";
import ReactDOM from "react-dom";

import Autocomplete from './Autocomplete.js';
import {Check} from './GeneralFunctions.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import UpdateUserStatusContent from './UpdateUserStatusContent.js';
import {convertRole, convertHobbies} from './UserDetail.js';
import UserToCheck from './UserToBackgroundCheck.js';

import "../css/Matching.css";
import "../css/BackgroundChecks.css";

class BackgroundCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ukSchsList: '',
      ukUnisList: '',
    }
  }

  grabSchOrUni = (schOrUni, schUniNum) => {
    const {ukSchsList, ukUnisList} = this.state;
    return 'Fake School or Uni'
    /*if (schOrUni == 'sch') {
      const sch = ukSchsList && ukSchsList.filter(sch => {
        return sch.value == schUniNum;
      })
      const schName = sch[0].label;
      return schName;

    } else if (schOrUni == 'uni') {
      let uni;
      uni = ukUnisList && ukUnisList.filter(uni => {
        return uni.value == schUniNum;
      })
      const uniName = uni[0].label;
      return uniName;
    }*/
  }

  refreshUsers = () => {
    // Dex to use
  }

  render() {
    const toBeChecked = [];

    const usersToCheck = [
      {uuid: 'uuid123', fname: 'Anxious', lname: 'Ant', state: 'CA', country: 'USA', ukConv: null, usConv1: 1, usConv2: null, usConv3: null, usConv4: null, idpic: '', profurl: 'www.google.com', cv: 'www.google.com', eetstatus: 'job', schname: '', schnamefreetext: '', currrole: 'Animator', currco: 'Framestore', currtraining: '', currtrainingprovider: ''},
      {uuid: 'uuid124', fname: 'Big', lname: 'Boris', state: 'Suss', country: 'GBR', ukConv: 1, usConv1: null, usConv2: null, usConv3: null, usConv4: null, idpic: '', profurl: '', cv: 'www.google.com', eetstatus: 'job', schname: '', schnamefreetext: '', currrole: '2D Animator', currco: 'DNEG', currtraining: '', currtrainingprovider: ''},
      {uuid: 'uuid125', fname: 'Crumbly', lname: 'Carol', state: 'QC', country: 'CAN', ukConv: null, usConv1: 1, usConv2: 1, usConv3: null, usConv4: null, idpic: '', profurl: 'www.google.com', cv: 'www.google.com', eetstatus: 'job', schname: '', schnamefreetext: '', currrole: '3D Animator', currco: 'ILM', currtraining: '', currtrainingprovider: ''},
      {uuid: 'uuid126', fname: 'Dickhead', lname: 'Dec', state: 'IL', country: 'USA', ukConv: null, usConv1: null, usConv2: null, usConv3: null, usConv4: null, idpic: '', profurl: 'www.google.com', cv: '', eetstatus: 'sch', schname: '', schnamefreetext: 'Rah', currrole: '', currco: '', currtraining: 'Compositing', currtrainingprovider: 'Training Provider'},
      {uuid: 'uuid127', fname: 'Enormous', lname: 'Eugine', state: 'LdHa', country: 'GBR', ukConv: null, usConv1: null, usConv2: null, usConv3: null, usConv4: null, idpic: '', profurl: 'www.google.com', cv: '', eetstatus: 'train', schname: '', schnamefreetext: '', currrole: '', currco: '', currtraining: 'Houdini Course', currtrainingprovider: 'Online provider'},
      {uuid: 'uuid128', fname: 'Fat', lname: 'Froggy', state: 'BC', country: 'CAN', ukConv: null, usConv1: null, usConv2: null, usConv3: null, usConv4: null, idpic: '', profurl: 'www.google.com', cv: 'www.google.com', eetstatus: 'none', schname: '', schnamefreetext: '', currrole: '', currco: '', currtraining: '', currtrainingprovider: ''},
    ];

    if (usersToCheck.length > 0) {
      usersToCheck.forEach((user, index) => {
        toBeChecked.push(
          <UserToCheck
            user={user}
            key={user.uuid}
            isFirstItem={index == 0}
            convertRole={convertRole}
            convertHobbies={convertHobbies}
            grabSchOrUni={this.grabSchOrUni}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <span role="img" aria-label="warningEmoji">⚠️🚨</span> <strong>Users to Background Check</strong> <span role="img" aria-label="warningEmoji">🚨⚠️</span>
          </div>
          <div className="checklistBox greyText">
            <div className="paddingBtm">CHECKLIST</div>
            <ul className="background-checklist">
              <li>Check Selfie matches Photo ID</li>
              <li>Check Name & Location on ID matches signup form</li>
              <li>Check Name & Role on LinkedIn / CV matches signup form</li>
              <li>Has criminal record? Check seriousness with user i.e. misdemeanour generally okay, felony more serious. We only care if could be a child safeguarding issue</li>
            </ul>
          </div>
          <div className="toBeMatched-container">
            <div className="exclamation-icon-container grey">
              <i className="fas fa-exclamation-circle" />
              <span> Needs Background Check</span>
            </div>
            <div className="table-container">
              {usersToCheck.length == 0 && (
                <div>Woohoo! No one to check!</div>
              )}
              {usersToCheck.length > 0 && (
                <table id="tobeMatched-table">
                  {toBeChecked}
                </table>
              )}
            </div>
          </div>
          <div className="greyText"><i>*Conviction (UK): Convictions, cautions, reprimands or final warnings that are not “Protected” as defined by the Rehabilitation of Offenders Act 1974 (Exceptions) Order 1975 (as amended in 2013)</i></div>
        </div>
      </React.Fragment>
    );
  }
}
/*
const mapStateToProps = (state) => {
  return {
    ukSchsList: state.ukSchsList,
    ukUnisList: state.ukUnisList
  };
};
*/
export default BackgroundCheck;
