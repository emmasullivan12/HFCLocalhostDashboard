// Dex last merged this code on 15th oct 2020

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
import {LoadingSpinner} from './GeneralFunctions.js';
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
      degreeLocal: '',
  //    degreeIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      currCoLocal: '',
    //  coIsValid: '',
      currRoleLocal: '',
      currTrainingProviderLocal: '',
    //  trainProvIsValid: '',
      currTrainingCourseLocal: '',
      tabPressed: '',
      selectBoxFocused: '',
      isSubmitting: false,
      submitted: ''
    }
    this.handleEetStatusChange = this.handleEetStatusChange.bind(this);
    this.handleUKSchChange = this.handleUKSchChange.bind(this);
    this.handleSchChange = this.handleSchChange.bind(this);
    this.handleSchYrChange = this.handleSchYrChange.bind(this);
    this.handleUKUniChange = this.handleUKUniChange.bind(this);
    this.handleUniChange = this.handleUniChange.bind(this);
    this.handleUniYrChange = this.handleUniYrChange.bind(this);
    this.handleUniGradYrChange = this.handleUniGradYrChange.bind(this);
    this.handlePgGradYrChange = this.handlePgGradYrChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleTrainChange = this.handleTrainChange.bind(this);
    this.handleTrainCourseChange = this.handleTrainCourseChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.otherValidityChecks = this.otherValidityChecks.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false

    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  onBlur(e) {
    if (e.target.id === 'schNameTextBox') {
      this.handleSchChange(e)
    } else if (e.target.id === 'uniNameTextBox') {
      this.handleUniChange(e)
    }
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleMouseDown = (e) => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  handleKeyUp = (e) => {
    e.persist();
    clearTimeout(this.timerHandle);

    this.timerHandle = setTimeout(() => {
      if (e.target.id === 'schNameTextBox') {
        this.handleSchChange(e)
      } else if (e.target.id === 'uniNameTextBox') {
        this.handleUniChange(e)
  //    } else if (e.target.id === 'degreeInput') {
  //      this.handleDegreeMoveNext()
  //    } else if (e.target.id === 'currCoInput') {
  //      this.handleJobMoveNext()
  //    } else if (e.target.id === 'currRoleInput') {
  //      this.handleRoleMoveNext()
  //    } else if (e.target.id === 'currTrainingProviderInput') {
  //      this.handleTrainMoveNext()
  //    } else if (e.target.id === 'currTrainingCourseInput') {
  //      this.handleTrainCourseMoveNext()
      }
      this.timerHandle = 0;
    }, 800);

  }

  handleDegreeChange = (e) => {
    const userInput = e.target.value
    if (userInput === '') {
      this.setState({
        degreeLocal: userInput,
        uniYrGrp: '',
        courseLength: '',
        uniGraduYr: '',
        uniGraduYrIsValid: '',
      })
    } else {
      this.setState({
        degreeLocal: userInput,
      })
    }
  }

/*  handleDegreeMoveNext = () => {
    if (this.state.submitted != true) {
      document.getElementById("selectBox-uniYrGrp").focus()
    /*  this.setState({
        degreeIsValid: true
      })
    }
  }*/

/*  handleJobMoveNext = () => {
    if (this.state.submitted != true) {
      document.getElementById("currRoleInput").focus()
  /*    this.setState({
        coIsValid: true
      })
    }
  }*/

/*  handleRoleMoveNext = () => {
    if (this.state.submitted != true) {
      document.getElementById("Submit-btn-Edu").focus()
    }
  }*/

  handleJobChange = (e) => {
    this.setState({
      currCoLocal: e.target.value,
  //    coIsValid: e.target.value === '' ? false : true
    })
  }

  handleRoleChange = (e) => {
    this.setState({ currRoleLocal: e.target.value })
  }

/*  handleTrainMoveNext = () => {
    if (this.state.submitted != true) {
      document.getElementById("currTrainingCourseInput").focus()
    /*  this.setState({
        trainProvIsValid: true
      })
    }
  }*/

/*  handleTrainCourseMoveNext = () => {
    if (this.state.submitted != true) {
      document.getElementById("Submit-btn-Edu").focus()
    }
  }*/

  handleTrainChange = (e) => {
    this.setState({ currTrainingProviderLocal: e.target.value })
  }

  handleTrainCourseChange = (e) => {
    this.setState({ currTrainingCourseLocal: e.target.value })
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
      degreeLocal: '',
    //  degreeIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      currCoLocal: '',
    //  coIsValid: '',
      currRoleLocal: '',
      currTrainingProviderLocal: '',
  //    trainProvIsValid: '',
      currTrainingCourseLocal: '',
      tabPressed: '',
    }, () => {
      if (userInput === 'none') {
        if (this.state.submitted != true) {
          document.getElementById("Submit-btn-Edu").focus()
        }
      }
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
      schNameIsValid: isValid,
    })
  }

  handleSchChange(e) {
    const userInput = e.target != undefined ? e.target.value : e;
    const isValid = userInput.length > 0;
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
    }, () => {
      if (this.state.submitted != true) {
        document.getElementById("Submit-btn-Edu").focus()
      }
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
        uniGraduYr: '',
        degreeLocal: '',
    //    degreeIsValid: '',
      });
    }
    this.setState({
      uniNameLocal: userInput,
      uniNameFreeTextLocal: '',
      uniNameUpdated: true,
      uniNameIsValid: isValid,
    })
  }

  handleUniChange(e) {
    const userInput = e.target != undefined ? e.target.value : e;
    const isValid = userInput.length > 0;
    if (!isValid) {
      this.setState({
        uniYrGrp: '',
        uniGraduYr: '',
        degreeLocal: '',
      //  degreeIsValid: '',
      });
    }
    this.setState({
      uniNameFreeTextLocal: userInput,
      uniNameLocal: '',
      uniNameFreeTextUpdated: true,
      uniNameIsValid: isValid,
    })
  }

  handleUniYrChange(userInput) {
    const {userRole} = this.props;
    this.setState({
      uniYrGrp: userInput,
    });
    if (userRole === 'mentor') {
      this.setState({
        uniGraduYrIsValid: true
      }, () => {
        if (this.state.submitted != true) {
          document.getElementById("Submit-btn-Edu").focus()
        }
      });
    } else if (userInput != 'pg') {
      const courseLength = this.state.courseLength;

      if (courseLength != '') {
        const isValid = (courseLength >= userInput) ? true : false;
        this.setState({
          uniGraduYr: setUniGraduYr(userInput, courseLength),
          uniGraduYrIsValid: isValid
        });
      } else {
        this.setState({
          uniGraduYr: '',
          uniGraduYrIsValid: false
        });
      }
    } else {
      this.setState({
        courseLength: '',
        uniGraduYr: '',
        uniGraduYrIsValid: false
      });
    }

  }

  handleUniGradYrChange(userInput) {
    this.setState({
      courseLength: userInput,
    }, () => {
      if (this.state.submitted != true) {
        document.getElementById("Submit-btn-Edu").focus()
      }
    });

    const uniYrGrp = this.state.uniYrGrp;

    if (uniYrGrp != '') {
      const isValid = (userInput >= uniYrGrp) ? true : false;
      this.setState({
        uniGraduYr: setUniGraduYr(uniYrGrp, userInput),
        uniGraduYrIsValid: isValid
      });
    }
  }

  handlePgGradYrChange(userInput) {
    const isValid = userInput != '' ? true : false;
    this.setState({
      uniGraduYr: userInput,
      uniGraduYrIsValid: isValid
    }, () => {
      if (this.state.submitted != true) {
        document.getElementById("Submit-btn-Edu").focus()
      }
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
    const { selectBoxFocused, courseLength, uniGraduYr } = this.state;
    const {userRole} = this.props;
    if ((selectBoxFocused === "selectBox-uniYrGrp" && userRole === 'mentee') || selectBoxFocused === "selectBox-uniLength" || selectBoxFocused === "selectBox-pgGraduYr") {
      if (courseLength === '' && uniGraduYr === '') {
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
    const {step, updateStep, eetStatus, updateEetStatus, updateUKSch, updateSchFreeText, updateUKUni, updateUniFreeText, updateCurrCo, updateCurrTrainingProv} = this.props;
    const {eetStatusLocal, schNameLocal, schNameFreeTextLocal, uniNameLocal, uniNameFreeTextLocal, currCoLocal, currTrainingProviderLocal, } = this.state;

    if (step === "updatingEdu") {
      updateEetStatus(eetStatusLocal)

      if (eetStatusLocal ==='sch') {
        if (schNameLocal != '') {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUKSch(schNameLocal, () => {
            updateStep('updatingEdu');
          })
        } else {

          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateSchFreeText(schNameFreeTextLocal, () => {
            updateStep('updatingEdu');
          })
        }

      } else if (eetStatusLocal ==='uni') {
        if (uniNameLocal != '') {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUKUni(uniNameLocal, () => {
            updateStep('updatingEdu');
          })
        } else {

          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUniFreeText(uniNameFreeTextLocal, () => {
            updateStep('updatingEdu');
          })
        }

      } else if (eetStatusLocal ==='job') {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateCurrCo(currCoLocal, () => {
          updateStep('updatingEdu');
        })

      } else if (eetStatusLocal ==='train') {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateCurrTrainingProv(currTrainingProviderLocal, () => {
          updateStep('updatingEdu');
        })

      } else {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateStep('updatingEdu');
      }

    } else {
      updateEetStatus(eetStatusLocal);

      if (eetStatusLocal ==='sch' || eetStatus === 'sch') {
        if (schNameLocal != '') {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUKSch(schNameLocal, () => {
            updateStep('didEdu');
          })
        } else {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateSchFreeText(schNameFreeTextLocal, () => {
            updateStep('didEdu');
          })
        }

      } else if (eetStatusLocal ==='uni' || eetStatus === 'uni') {
        if (uniNameLocal != '') {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUKUni(uniNameLocal, () => {
            updateStep('didEdu');
          })
        } else {
          this.setState({
            submitted: true,
            isSubmitting: true,
          })
          updateUniFreeText(uniNameFreeTextLocal, () => {
            updateStep('didEdu');
          })
        }

      } else if (eetStatusLocal === 'job') {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateCurrCo(currCoLocal, () => {
          updateStep('didEdu');
        })

      } else if (eetStatusLocal === 'train') {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateCurrTrainingProv(currTrainingProviderLocal, () => {
          updateStep('didEdu');
        })

      } else {
        this.setState({
          submitted: true,
          isSubmitting: true,
        })
        updateStep('didEdu');
      }

    }
  }

  canBeSubmitted() {
    const {eetStatusLocal, schNameUpdated, schNameFreeTextUpdated, schNameIsValid, uniNameUpdated, uniNameFreeTextUpdated, uniNameIsValid, schYrGrp, uniYrGrp, courseLength, schGraduYr, uniGraduYr, uniGraduYrIsValid, currCoLocal, currRoleLocal, currTrainingProviderLocal, currTrainingCourseLocal } = this.state;
    const {userRole} = this.props;
  //  const {eetStatus} = this.props;

      if (eetStatusLocal != '') {

        const form = document.getElementById("form-EduShortSU");

        if (eetStatusLocal === 'sch') {
          if (form.checkValidity() && (schNameUpdated === true || schNameFreeTextUpdated === true) && schNameIsValid && schYrGrp != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'uni') {
          if (form.checkValidity() && (uniNameUpdated === true || uniNameFreeTextUpdated === true) && uniNameIsValid && uniYrGrp != '' && ((uniYrGrp != 'pg' && userRole != 'mentor') ? courseLength != '': true) && uniGraduYrIsValid) {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'job') {
          if (form.checkValidity() && currCoLocal != '' && currRoleLocal != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatusLocal === 'train') {
          if (form.checkValidity() && currTrainingProviderLocal != '' && currTrainingCourseLocal != '') {
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
        if(this.mounted) {
          this.setState({
            [componentUpdatesState]: component.default,
            errorLoadingEdu: false
          })
        }
      })
      .catch(err => {
        if(this.mounted) {
          this.setState({
            errorLoadingEdu: true
          })
        }
      })
  }

  render() {

  const { errorLoadingEdu, eetStatusLocal, schNameUpdated, ukSchsList, schNameIsValid, schNameFreeTextLocal, uniNameFreeTextLocal, uniNameUpdated, ukUnisList, uniNameIsValid, degreeLocal, schYrGrp, uniYrGrp, schGraduYr, tabPressed, uniGraduYr, uniGraduYrIsValid, courseLength, isSubmitting, currCoLocal, currTrainingProviderLocal, currRoleLocal, currTrainingCourseLocal} = this.state;
  const {userRole} = this.props;
  const { country, eetStatus, tflink, step, currentStep, totalSteps } = this.props;

  const eetStatusMenteeUKOptions = [
    {value: 'sch', label: 'I\'m at School / Sixth Form / College'},
    {value: 'uni', label: 'I\'m at University'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusMenteeNonUKOptions = [
    {value: 'sch', label: 'I\'m at High School'},
    {value: 'uni', label: 'I\'m at University / College'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusMenteeAusNzlOptions = [
    {value: 'sch', label: 'I\'m at High School'},
    {value: 'uni', label: 'I\'m at University'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusMentorUKOptions = [
    {value: 'uni', label: 'I\'m at University'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusMentorNonUKOptions = [
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
  const ozSchYrs = [
    {value: 'yr8', label: 'Year 7'},
    {value: 'yr9', label: 'Year 8'},
    {value: 'yr10', label: 'Year 9'},
    {value: 'yr11', label: 'Year 10'},
    {value: 'yr12', label: 'Year 11'},
    {value: 'yr13', label: 'Year 12'},
    {value: 'finSch', label: 'Finished School / High School'}
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

  function pgGradYrs() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();

    let startYr;

    if (month <= 7) {
      startYr = year;
    } else {
      startYr = year + 1;
    }

    const secYr = startYr + 1;
    const trdYr = startYr + 2;
    const fthYr = startYr + 3;

    const pgGradYrs = [
      {value: startYr, label: 'Class of '+startYr},
      {value: secYr, label: 'Class of '+secYr},
      {value: trdYr, label: 'Class of '+trdYr},
      {value: fthYr, label: 'Class of '+fthYr},
    ]
    return pgGradYrs
  }

  const isEnabled = this.canBeSubmitted();
  const optionsToUse = country === 'GBR' ? (userRole === 'mentee' ? eetStatusMenteeUKOptions : eetStatusMentorUKOptions) : (userRole === 'mentee' ? ((country === 'AUS' || country === 'NZL') ? eetStatusMenteeAusNzlOptions : eetStatusMenteeNonUKOptions) : eetStatusMentorNonUKOptions);

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-EduShortSU">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-eetStatus">Are you currently in <strong>Education, Employment or Training?</strong></label>
                <SelectBox
                  options={optionsToUse}
                  placeholder="Select one:"
                  name='eetStatus'
                  handleChange={this.handleEetStatusChange}
                  handleTabPress={this.handleTabPress}
                  handleMouseDown={this.handleMouseDown}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
              {country === 'GBR' && eetStatusLocal === 'sch' && schNameFreeTextLocal === '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="autocompleteBox-schName">What&#39;s the name of your <strong>School / College?</strong></label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukSchsList ? ukSchsList : undefined}
                      name='schName'
                      placeholder='School or College'
                      handleChange={this.handleUKSchChange}
                      handleTabPress={this.handleTabPress}
                      renderComponents={this.renderComponents}
                      handleMouseDown={this.handleMouseDown}
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
                        //  eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                        eetStatusLocal={eetStatusLocal}
                        handleSchChange={this.handleSchChange}
                        maxLength="75"
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
                    //  eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                    eetStatusLocal={eetStatusLocal}
                    handleSchChange={this.handleSchChange}
                    maxLength="75"
                  />
                </div>
              )}
              {country != 'GBR' && eetStatusLocal === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="schNameTextBox">What&#39;s the name of your <strong>High School?</strong></label>
                  <TextInput
                    name="schNameFreeText"
                    id="schNameTextBox"
                    placeholder="High School"
                    className="form-control-std"
                    required
                  //  handleChange={this.handleSchChange}
                    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    maxLength="75"
                  />
                </div>
              )}
              {(eetStatus === 'sch' || eetStatusLocal === 'sch') && schNameIsValid === true && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="schYrGrp">And which <strong>{country === 'GBR' ? 'year group' : 'grade / year group'}</strong> are you in?</label>
                  <SelectBox
                    options={(country === 'GBR' || country === 'NZL') ? ukSchYrs : (country === 'AUS' ? ozSchYrs : nonUKSchYrs)}
                    placeholder="Select Year Group:"
                    name='schYrGrp'
                    id='schYrGrp'
                    handleChange={this.handleSchYrChange}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    focusOnLoad={schNameIsValid === true && !tabPressed ? true : false}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {country === 'GBR' && eetStatusLocal === 'uni' && uniNameFreeTextLocal === '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="autocompleteBox-uniName">What&#39;s the name of your <strong>University?</strong></label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukUnisList ? ukUnisList : undefined}
                      name='uniName'
                      placeholder='University'
                      handleChange={this.handleUKUniChange}
                      handleTabPress={this.handleTabPress}
                      renderComponents={this.renderComponents}
                      handleMouseDown={this.handleMouseDown}
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
                        //  eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                        eetStatusLocal={eetStatusLocal}
                        handleUniChange={this.handleUniChange}
                        maxLength="75"
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
                  //  eetStatusLocal={eetStatus ? eetStatus : eetStatusLocal}
                    eetStatusLocal={eetStatusLocal}
                    handleUniChange={this.handleUniChange}
                    maxLength="75"
                  />
                </div>
              )}
              {country != 'GBR' && eetStatusLocal === 'uni' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="uniNameTextBox">What&#39;s the name of your <strong>University?</strong></label>
                  <TextInput
                    name="uniNameFreeText"
                    id="uniNameTextBox"
                    placeholder="University"
                    className="form-control-std"
                    required
                  //  handleChange={this.handleUniChange}
                    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    maxLength="75"
                  />
                </div>
              )}
              {(eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo">And what <strong>degree</strong> are you studying?</label>
                  <TextInput
                    name="degree"
                    id="degreeInput"
                    placeholder="Type Degree e.g. BSc (Hons) Business..."
                    className="form-control-std"
                    required
                    handleChange={this.handleDegreeChange}
                  //  handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    maxLength="50"
                  />
                </div>
              )}
              {(eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && degreeLocal != '' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-uniYrGrp">And which <strong>year group</strong> are you in?</label>
                    <SelectBox
                      options={uniYrs}
                      name='uniYrGrp'
                      placeholder='Select Year Group:'
                      handleChange={this.handleUniYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      handleMouseDown={this.handleMouseDown}
                  //    focusOnLoad={uniNameIsValid === true && uniYrGrp === '' && !tabPressed ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                  {uniGraduYrIsValid === false && uniYrGrp != 'pg' && courseLength != '' && (
                    <div className="descriptor prompt error eduForm alignLeft">Year group can&#39;t be greater than course length</div>
                  )}
                </React.Fragment>
              )}
              {userRole === 'mentee' && (eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && degreeLocal != '' && uniYrGrp != '' && uniYrGrp != 'pg' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-uniLength">And <strong>how long</strong> is your course?</label>
                    <SelectBox
                      options={uniLength}
                      name='uniLength'
                      placeholder='Select Course Length:'
                      handleChange={this.handleUniGradYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      handleMouseDown={this.handleMouseDown}
                      focusOnLoad={uniNameIsValid === true && degreeLocal != '' && uniYrGrp != '' && !tabPressed ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </React.Fragment>
              )}
              {userRole === 'mentee' && (eetStatus === 'uni' || eetStatusLocal === 'uni') && uniNameIsValid === true && uniYrGrp === 'pg' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-uniLength">And <strong>when</strong> do you graduate?</label>
                    <SelectBox
                      options={pgGradYrs()}
                      name='pgGraduYr'
                      placeholder='Select Graduation Year:'
                      handleChange={this.handlePgGradYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      handleMouseDown={this.handleMouseDown}
                  //    otherValidityChecks={this.otherValidityChecks}
                      focusOnLoad={uniNameIsValid === true && uniYrGrp === 'pg' && !tabPressed ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </React.Fragment>
              )}
              {eetStatusLocal === 'job' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo">Who is your current <strong>employer?</strong></label>
                  <TextInput
                    name="currCo"
                    id="currCoInput"
                    placeholder="Company"
                    className="form-control-std"
                    required
                    handleChange={this.handleJobChange}
                //    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    maxLength="50"
                  />
                </div>
              )}
              {eetStatusLocal === 'job' && currCoLocal != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo">And what is your current <strong>role?</strong></label>
                  <TextInput
                    name="currRole"
                    id="currRoleInput"
                    placeholder="Role"
                    className="form-control-std"
                    required
                    handleChange={this.handleRoleChange}
                //    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                //    focusOnLoad={tabPressed ? false : true}
                    maxLength="50"
                  />
                </div>
              )}
              {eetStatusLocal === 'train' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="currTrainingProvider">Who is your <strong>training provider?</strong></label>
                  <TextInput
                    name="currTrainingProvider"
                    id="currTrainingProviderInput"
                    placeholder="Training Provider"
                    className="form-control-std"
                    required
                    handleChange={this.handleTrainChange}
                //    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    maxLength="50"
                  />
                </div>
              )}
              {eetStatusLocal === 'train' && currTrainingProviderLocal != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="currTrainingCourse">And what is your <strong>training course?</strong></label>
                  <TextInput
                    name="currTrainingCourse"
                    id="currTrainingCourseInput"
                    placeholder="Training Course"
                    className="form-control-std"
                    required
                    handleChange={this.handleTrainCourseChange}
                  //  handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                  //  focusOnLoad={tabPressed ? false : true}
                    maxLength="50"
                  />
                </div>
              )}
              <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Edu">
                {isSubmitting === true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Next</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EduShortSU;
