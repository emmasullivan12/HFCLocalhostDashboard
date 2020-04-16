// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import EduNotOnListCTA from './EduNotOnListCTA';
import EditEduFreeText from './EditEduFreeText';
import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import ProgressCircles from './ProgressCircles.js';
import TextInput from './TextInput.js';
import {setSchGraduYr, setUniGraduYr} from './UserDetail.js';


class EduShortSU extends React.Component {
  constructor () {
    super();
    this.state = {
      eetStatusLocal: '', // does not need to be saved here as state is also in TypeformSignUp parent
      schNameLocal: '',
      schNameUpdated: '',
      schNameFreeTextLocal: '',
      schNameFreeTextUpdated: '',
      ukSchsList: [],
      schNameIsValid: '',
      uniNameLocal: '',
      uniNameUpdated: '',
      uniNameFreeTextLocal: '',
      uniNameFreeTextUpdated: '',
      ukUnisList: [],
      uniNameIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      currCoLocal: '',
      currTrainingProviderLocal: '',
      tabPressed: '',
      selectBoxFocused: '',
    }
    this.handleEetStatusChange = this.handleEetStatusChange.bind(this);
    this.handleUKSchChange = this.handleUKSchChange.bind(this);
    this.handleSchChange = this.handleSchChange.bind(this);
    this.handleSchYrChange = this.handleSchYrChange.bind(this);
    this.handleUKUniChange = this.handleUKUniChange.bind(this);
    this.handleUniChange = this.handleUniChange.bind(this);
    this.handleUniYrChange = this.handleUniYrChange.bind(this);
    this.handleUniGradYrChange = this.handleUniGradYrChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleTrainChange = this.handleTrainChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.otherValidityChecks = this.otherValidityChecks.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleEetStatusChange(userInput) {
    this.setState({
      eetStatusLocal: userInput,
      errorLoadingEdu: '',
      ukSchsList: [],
      schNameLocal: '',
      schNameUpdated: '',
      schNameIsValid: '',
      schNameFreeTextLocal: '',
      schNameFreeTextUpdated: '',
      uniNameLocal: '',
      uniNameUpdated: '',
      uniNameFreeTextLocal: '',
      uniNameFreeTextUpdated: '',
      ukUnisList: [],
      uniNameIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      currCoLocal: '',
      currTrainingProviderLocal: '',
      tabPressed: '',
    })
  }

  handleUKSchChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        schYrGrp: '',
        schGraduYr: ''
      });
    }
    this.setState({
      schNameLocal: userInput,
      schNameFreeTextLocal: '',
      schNameUpdated: true,
      schNameIsValid: isValid
    })
  }

  handleSchChange(e) {
    console.log("IN EDUSHORTSU (e): "+e);
    const userInput = e.currentTarget != undefined ? e.currentTarget.value : e;
    const isValid = userInput.length >= 3;
    if (!isValid) {
      this.setState({
        schYrGrp: '',
        schGraduYr: ''
      });
    }
    this.setState({
      schNameFreeTextLocal: userInput,
      schNameLocal: '',
      schNameFreeTextUpdated: true,
      schNameIsValid: isValid,
    })
  }

  handleSchYrChange(userInput) {
    this.setState({
      schYrGrp: userInput,
    });
    if (this.state.courseLength != '') {
      this.setState({
        schGraduYr: setSchGraduYr(userInput),
      });
    }
  }

  handleUKUniChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        uniYrGrp: '',
        uniGraduYr: ''
      });
    }
    this.setState({
      uniNameLocal: userInput,
      uniNameFreeTextLocal: '',
      uniNameUpdated: true,
      uniNameIsValid: isValid
    })
  }

  handleUniChange(e) {
    const userInput = e.currentTarget != undefined ? e.currentTarget.value : e;
    const isValid = userInput.length >= 3;
    if (!isValid) {
      this.setState({
        uniYrGrp: '',
        uniGraduYr: ''
      });
    }
    this.setState({
      uniNameFreeTextLocal: userInput,
      uniNameLocal: '',
      uniNameFreeTextUpdated: true,
      uniNameIsValid: isValid
    })
  }

  handleUniYrChange(userInput) {
    this.setState({
      uniYrGrp: userInput,
    });

    const courseLength = this.state.courseLength;

    if (courseLength != '') {
      const isValid = (userInput === 'pg' || courseLength >= userInput) ? true : false;
      this.setState({
        uniGraduYr: setUniGraduYr(userInput, courseLength),
        uniGraduYrIsValid: isValid
      });
    }
  }

  handleUniGradYrChange(userInput) {
    this.setState({
      courseLength: userInput,
    });

    const uniYrGrp = this.state.uniYrGrp;

    if (uniYrGrp != '') {
      const isValid = (uniYrGrp === 'pg' || userInput >= uniYrGrp) ? true : false;
      this.setState({
        uniGraduYr: setUniGraduYr(uniYrGrp, userInput),
        uniGraduYrIsValid: isValid
      });
    }
  }

  handleJobChange(e) {
    this.setState({
      currCoLocal: e.currentTarget.value
    })
  }

  handleTrainChange(e) {
    this.setState({
      currTrainingProviderLocal: e.currentTarget.value
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleFocus(selectBoxFocused) {
    this.setState({ selectBoxFocused: selectBoxFocused });
  }

  // Passed on to be used within Select.js onBlur & onClickOption events
  otherValidityChecks() {
    const { selectBoxFocused, courseLength } = this.state;
    if (selectBoxFocused === "selectBox-uniYrGrp" || selectBoxFocused === "selectBox-uniLength") {
      if (courseLength === '') {
        document.getElementById("selectBox-uniYrGrp").classList.remove('error');
      } else {
        if (this.state.uniGraduYrIsValid === true) {
          document.getElementById("selectBox-uniYrGrp").classList.remove('error');
        } else {
          document.getElementById("selectBox-uniYrGrp").classList.add('error');
        }
      }
    } else {
      return;
    }
  }

  handleSubmit(e) {
    console.log("handlesubmit functinon triggered")
    const {updateStep, updatingEdu, eetStatus, updateEetStatus, updateUKSch, updateSchFreeText, updateUKUni, updateUniFreeText, updateCurrCo, updateCurrTrainingProv} = this.props;
    const {eetStatusLocal, schNameLocal, schNameFreeTextLocal, uniNameLocal, uniNameFreeTextLocal, currCoLocal, currTrainingProviderLocal} = this.state;

    if (updatingEdu) {

      if (eetStatusLocal ==='sch' || eetStatus === 'sch') {
        if (schNameLocal != '') {
          updateUKSch(schNameLocal, () => {
            updateStep('didEdu', updatingEdu);
          })
        } else {
          updateSchFreeText(schNameFreeTextLocal, () => {
            updateStep('didEdu', updatingEdu);
          })
        }

      } else if (eetStatusLocal ==='uni' || eetStatus === 'uni') {
        if (uniNameLocal != '') {
          updateUKUni(uniNameLocal, () => {
            updateStep('didEdu', updatingEdu);
          })
        } else {
          updateUniFreeText(uniNameFreeTextLocal, () => {
            updateStep('didEdu', updatingEdu);
          })
        }
      }

    } else {
      updateEetStatus(eetStatusLocal);

      if (eetStatusLocal ==='sch' || eetStatus === 'sch') {
        schNameLocal
          ? updateUKSch(schNameLocal)
          : updateSchFreeText(schNameFreeTextLocal)

      } else if (eetStatusLocal ==='uni' || eetStatus === 'uni') {
        uniNameLocal
          ? updateUKUni(uniNameLocal)
          : updateUniFreeText(uniNameFreeTextLocal)

      } else if (eetStatusLocal === 'job') {
        updateCurrCo(currCoLocal);

      } else if (eetStatusLocal === 'train') {
        updateCurrTrainingProv(currTrainingProviderLocal);
      }

    }
  }

  canBeSubmitted() {
    const {eetStatusLocal, schNameUpdated, schNameFreeTextUpdated, schNameIsValid, uniNameUpdated, uniNameFreeTextUpdated, uniNameIsValid, schYrGrp, uniYrGrp, courseLength, schGraduYr, uniGraduYr, uniGraduYrIsValid, currCo, currTrainingProvider } = this.state;
    const {eetStatus} = this.props;

      if (eetStatusLocal != '' || eetStatus != '') {

        if (eetStatusLocal === 'sch' || eetStatus === 'sch') {
          if ((schNameUpdated === true || schNameFreeTextUpdated === true) && schNameIsValid && schYrGrp != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'uni' || eetStatus === 'uni') {
          if ((uniNameUpdated === true || uniNameFreeTextUpdated === true) && uniNameIsValid && uniYrGrp != '' && courseLength != '' && uniGraduYrIsValid) {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'job') {
          if (currCo != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'train') {
          if (currTrainingProvider != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'none') {
          return true;
        }

      }
  }

  renderComponents(fileToRender, componentUpdatesState, error) {
    import(`./${fileToRender}.js`)
      .then(component => {
        this.setState({
          [componentUpdatesState]: component.default,
          errorLoadingEdu: false
        })
      })
      .catch(err => {
        this.setState({
          errorLoadingEdu: true
        })
        console.log("Dex to deal with logging error: "+err.message)
      })
  }

  render() {

  const { errorLoadingEdu, eetStatusLocal, schNameUpdated, ukSchsList, schNameIsValid, schNameFreeTextLocal, uniNameFreeTextLocal, uniNameUpdated, ukUnisList, uniNameIsValid, schYrGrp, uniYrGrp, schGraduYr, tabPressed, uniGraduYr, uniGraduYrIsValid, courseLength} = this.state;
  const { country, updatingEdu, eetStatus, tflink, step, currentStep, totalMenteeSteps } = this.props;

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
  const ukSchYrs = [
    {value: 'yr8', label: 'Year 8'},
    {value: 'yr9', label: 'Year 9'},
    {value: 'yr10', label: 'Year 10'},
    {value: 'yr11', label: 'Year 11'},
    {value: 'yr12', label: 'Year 12 (Sixth Form Yr 1)'},
    {value: 'yr13', label: 'Year 13 (Sixth Form Yr 2)'},
    {value: 'finSch', label: 'Finished School / Sixth Form / College'}
  ]
  const nonUKSchYrs = [
    {value: 'yr8', label: '7th Grade'},
    {value: 'yr9', label: '8th Grade'},
    {value: 'yr10', label: '9th Grade'},
    {value: 'yr11', label: '10th Grade'},
    {value: 'yr12', label: '11th Grade'},
    {value: 'yr13', label: '12th Grade'},
    {value: 'finSch', label: 'Finished High School'}
  ]
  const uniYrs = [
    {value: '1', label: '1st Year'},
    {value: '2', label: '2nd Year'},
    {value: '3', label: '3rd Year'},
    {value: '4', label: '4th Year'},
    {value: 'pg', label: 'Studying Post-grad'},
  ]
  const uniLength = [
    {value: '1', label: '1 year'},
    {value: '2', label: '2 years'},
    {value: '3', label: '3 years'},
    {value: '4', label: '4 years'},
    {value: '5', label: '5 years'},
    {value: '6', label: '6 years'},
    {value: '7', label: '7 years'},
    {value: '8', label: '8 years'},
  ]

  const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off">
              {updatingEdu != true && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="eetStatus">Are you currently in Education, Employment or Training?</label>
                  <SelectBox
                    options={country === 'GBR' ? eetStatusUKOptions : eetStatusNonUKOptions}
                    placeholder="Select one:"
                    name='eetStatus'
                    handleChange={this.handleEetStatusChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {country === 'GBR' && (eetStatus === 'sch' || eetStatusLocal === 'sch') && schNameFreeTextLocal === '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="schName">What&#39;s the name of your School / College?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukSchsList ? ukSchsList : undefined}
                      name='schName'
                      placeholder='School or College'
                      handleChange={this.handleUKSchChange}
                      handleTabPress={this.handleTabPress}
                      renderComponents={this.renderComponents}
                      fileToRender="UKSchs"
                      componentUpdatesState="ukSchsList"
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      showDetail
                      detailToShow='location'
                      noSuggestionsCTAclass="ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn"
                      required
                    >
                      <EduNotOnListCTA
                        country={country}
                        eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                        handleSchChange={this.handleSchChange}
                      />
                    </Autocomplete>
                    {errorLoadingEdu === true && (
                      <div className="descriptor prompt error eduForm alignLeft">
                        Error loading education institutions. Try reloading the page.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {country === 'GBR' && schNameFreeTextLocal != '' && (
                <div className="form-group eduName">
                  <div className="descriptor alignLeft overflow-ellipsis">
                    School name: <strong>{schNameFreeTextLocal}</strong>
                  </div>
                  <EditEduFreeText
                    country={country}
                    eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                    handleSchChange={this.handleSchChange}
                  />
                </div>
              )}
              {country != 'GBR' && (eetStatus === 'sch' || eetStatusLocal === 'sch') && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="schNameTextBox">What&#39;s the name of your High School?</label>
                  <TextInput
                    name="schNameFreeText"
                    id="schNameTextBox"
                    placeholder="High School"
                    className="form-control-std"
                    required
                    handleChange={this.handleSchChange}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                  />
                </div>
              )}
              {(eetStatus === 'sch' || eetStatusLocal === 'sch') && schNameIsValid === true && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="schYrGrp">And which {country === 'GBR' ? 'year group' : 'grade / year group'} are you in?</label>
                  <SelectBox
                    options={country === 'GBR' ? ukSchYrs : nonUKSchYrs}
                    placeholder="Select Year Group:"
                    name='schYrGrp'
                    handleChange={this.handleSchYrChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={schNameIsValid === true && !tabPressed && country === 'GBR' ? true : false}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {country === 'GBR' && (eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameFreeTextLocal === '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="uniName">What&#39;s the name of your University?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukUnisList ? ukUnisList : undefined}
                      name='uniName'
                      placeholder='University'
                      handleChange={this.handleUKUniChange}
                      handleTabPress={this.handleTabPress}
                      renderComponents={this.renderComponents}
                      fileToRender="UKUnis"
                      componentUpdatesState="ukUnisList"
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      showDetail
                      detailToShow='location'
                      focusOnLoad={tabPressed ? false : true}
                      noSuggestionsCTAclass="ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn"
                      required
                    >
                      <EduNotOnListCTA
                        country={country}
                        eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                        handleUniChange={this.handleUniChange}
                      />
                    </Autocomplete>
                    {errorLoadingEdu === true && (
                      <div className="descriptor prompt error eduForm alignLeft">
                        Error loading education institutions. Try reloading the page.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {country === 'GBR' && uniNameFreeTextLocal != '' && (
                <div className="form-group eduName">
                  <div className="descriptor alignLeft">
                    University name: <strong>{uniNameFreeTextLocal}</strong>
                  </div>
                  <EditEduFreeText
                    country={country}
                    eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                    handleUniChange={this.handleUniChange}
                  />
                </div>
              )}
              {country != 'GBR' && (eetStatus === 'uni' || eetStatusLocal === 'uni') && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="uniNameTextBox">What&#39;s the name of your University?</label>
                  <TextInput
                    name="uniNameFreeText"
                    id="uniNameTextBox"
                    placeholder="University"
                    className="form-control-std"
                    required
                    handleChange={this.handleUniChange}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                  />
                </div>
              )}
              {(eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft" htmlFor="uniYrGrp">And which year group are you in?</label>
                    <SelectBox
                      options={uniYrs}
                      name='uniYrGrp'
                      placeholder='Select Year Group:'
                      handleChange={this.handleUniYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      focusOnLoad={uniNameIsValid === true && uniYrGrp === '' && !tabPressed && country === 'GBR' ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                  {uniGraduYrIsValid === false && courseLength != '' && (
                    <div className="descriptor prompt error eduForm alignLeft">Year group can&#39;t be greater than course length</div>
                  )}
                </React.Fragment>
              )}
              {(eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && uniYrGrp != '' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft" htmlFor="uniLength">And how long is your course?</label>
                    <SelectBox
                      options={uniLength}
                      name='uniLength'
                      placeholder='Select Course Length:'
                      handleChange={this.handleUniGradYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      focusOnLoad={uniNameIsValid === true && uniYrGrp != '' && !tabPressed ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </React.Fragment>
              )}
              {eetStatusLocal === 'job' && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="currCo">Who do you currently work for?</label>
                  <input
                    //tabIndex='1'
                    type="text"
                    name="currCo"
                    onBlur={this.onBlur}
                    onChange={this.handleJobChange}
                    className="form-control-std"
                    placeholder="Company"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                    required
                  />
                </div>
              )}
              {eetStatusLocal === 'train' && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="currTrainingProvider">Who is your training provider?</label>
                  <input
                    //tabIndex='1'
                    type="text"
                    name="currTrainingProvider"
                    onBlur={this.onBlur}
                    onChange={this.handleTrainChange}
                    className="form-control-std"
                    placeholder="Training Provider"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                    required
                  />
                </div>
              )}
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EduShortSU;
