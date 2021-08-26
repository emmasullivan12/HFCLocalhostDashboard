// Dex last merged this code on 26th aug 2021

import React, { Component } from "react";
import {usercdn, userAvatarsFolder} from './CDN.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateProfileOverviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      eetstatus: this.props.eetStatus,
//      currrole: this.props.currRole,
//      currco: this.props.currCo
    };
  }

/*  componentDidMount(){
    {this.props.currRole != null && (
      document.getElementById("currRoleInput").focus()
    )}
  */

  handleChange = (userInput) => {
    this.setState({
      eetstatus: userInput
    });
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  canBeSubmitted() {
    const {eetstatus} = this.state;
    const { eetStatus, currTrainingProvider, schInstName, uniInstName, currRole } = this.props;
    return (
      eetstatus != '' && eetstatus != undefined
      && (eetstatus != eetStatus) // Checks user has actually changed somethingcurrTrainingProvider == ''
      && ((eetstatus == 'sch' && schInstName != '') || (eetstatus == 'uni' && uniInstName != '') || (eetstatus == 'job' && currRole != '') || (eetstatus == 'train' && currTrainingProvider != '') || eetstatus == 'none')
    );
  }

  render() {
    const { isSubmitting, updateSuccess, eetstatus } = this.state;
    const { eetStatus, fName, lName, isPicSet, profPicSrc, schInstName, degree, uniInstName, currRole, currCo, currTraining, currTrainingProvider, country, profUserIsU18, viewerIsU18, hasMinVerif } = this.props;
    const isEnabled = this.canBeSubmitted();

    const eetStatusUKOptions = [
      {value: 'sch', label: 'I\'m at School / Sixth Form / College'},
      {value: 'uni', label: 'I\'m at University'},
      {value: 'job', label: 'I\'m in full-time employment'},
      {value: 'train', label: 'I\'m in Training'},
      {value: 'none', label: 'None'}
    ];
    const eetStatusNonUKOptions = [
      {value: 'sch', label: 'I\'m at High School'},
      {value: 'uni', label: 'I\'m at University / College'},
      {value: 'job', label: 'I\'m in full-time employment'},
      {value: 'train', label: 'I\'m in Training'},
      {value: 'none', label: 'None'}
    ];
    const eetStatusAusNzlOptions = [
      {value: 'sch', label: 'I\'m at High School'},
      {value: 'uni', label: 'I\'m at University'},
      {value: 'job', label: 'I\'m in full-time employment'},
      {value: 'train', label: 'I\'m in Training'},
      {value: 'none', label: 'None'}
    ];

    const optionsToUse = country === 'GBR' ? eetStatusUKOptions : ((country === 'AUS' || country === 'NZL') ? eetStatusAusNzlOptions : eetStatusNonUKOptions);

    function getEetStatusTxt(eetStatus, options) {

      const eetFromList = options
        .filter(eet => eet.value == eetStatus)

      const eetStatusLabel = eetFromList.map(value => value.label)

      return eetStatusLabel
    }

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          Edit Profile Overview
        </div>
        <form className="paddingR20 paddingL20">
          <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-eetStatus">Set your <strong>Employment or Education</strong> status:</label>
          <SelectBox
            options={optionsToUse}
            name='eetstatus'
            handleChange={this.handleChange}
            focusOnLoad
            valueToShow='label' // This is the attribute of the array/object to be displayed to user
            placeholder={(eetStatus != null || eetStatus!= '') ? getEetStatusTxt(eetStatus, optionsToUse) : 'Select one:'}
            placeholderIsDefaultValueIfNot='Select one:' // Changes font from grey to purple if is actually a default value
            required
          />
          <div className="descriptor">Preview:</div>
          <div className="profOverviewPreview">
            {((eetstatus == 'sch' && schInstName != '') || (eetstatus == 'uni' && uniInstName != '') || (eetstatus == 'job' && currRole != '') || (eetstatus == 'train' && currTrainingProvider != '') || eetstatus == 'none') && (
              <React.Fragment>
                <div className="profile-thumb-container">
                  {isPicSet ? (
                    <div className="profile-thumb img-circle">
                      <img
                        src={usercdn.concat('/',userAvatarsFolder,profPicSrc,'-360')}
                        alt="User profile pic"
                      />
                    </div>
                    )
                  : (
                    <div className="profile-thumb img-circle allowAddPic noPic">
                      <div className="userInitial">
                        {fName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  {hasMinVerif == true && (
                    <div className="pr-certified img-circle tooltip">
                      <span>&#10003;</span>
                    </div>
                  )}
                </div>
                <h1 className="profileName">{fName}{(viewerIsU18 || profUserIsU18) ? '' : (" " + lName)}</h1>
              </React.Fragment>
            )}
            {eetstatus == 'sch' && (
              <React.Fragment>
                {
                  schInstName == '' ? (
                    <div className="restrictedContent darkGreyText">
                      <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                      You need to add a {country == 'GBR' ? 'School' : 'High School'} to your profile first in order to show this status
                    </div>
                  )
                : (
                  <React.Fragment>
                    <div className="profilePosition">Student</div>
                    {(profUserIsU18 != true && viewerIsU18 != true) && (
                      <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {schInstName}</div>
                    )}
                  </React.Fragment>
                  )
                }
              </React.Fragment>
            )}
            {eetstatus == 'uni' && (
              <React.Fragment>
                {
                  uniInstName == '' ? (
                    <div className="restrictedContent darkGreyText">
                      <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                      You need to add a University to your profile first in order to show this status
                    </div>
                  )
                : (
                  <React.Fragment>
                    <div className="profilePosition">{degree ? degree : 'Student'}</div>
                    <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {uniInstName}</div>
                  </React.Fragment>
                  )
                }
              </React.Fragment>
            )}
            {eetstatus == 'job' && (
              <React.Fragment>
                {
                  currRole == '' ? (
                    <div className="restrictedContent darkGreyText">
                      <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                      You need to add a Job / Role to your profile first in order to show this status
                    </div>
                  )
                : (
                  <React.Fragment>
                    <div className="profilePosition">{currRole}</div>
                    <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {currCo}</div>
                  </React.Fragment>
                  )
                }
              </React.Fragment>
            )}
            {eetstatus == 'train' && (
              <React.Fragment>
                {
                  currTrainingProvider == '' ? (
                    <div className="restrictedContent darkGreyText">
                      <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
                      You need to add a Training Course to your profile first in order to show this status
                    </div>
                  )
                : (
                  <React.Fragment>
                    <div className="profilePosition">{currTraining}</div>
                    <div className="profileInstitution purpleText" href=""><span className="neutralText">&#64;</span> {currTrainingProvider}</div>
                  </React.Fragment>
                  )
                }
              </React.Fragment>
            )}
            {eetstatus == 'none' && (
              <React.Fragment>
                <div className="profilePosition">Looking for opportunities</div>
              </React.Fragment>
            )}
          </div>
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Update</span>
            )}
          </button>
        </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <span role="img" aria-label="ok emoji">👌</span>
            </div>
            Profile Overview updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateProfileOverviewContent;
