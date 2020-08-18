// Dex last merged this code on 17th Aug 2020

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {ChevronDown, ChevronUp, LoadingSpinner} from './GeneralFunctions.js';
import Checkbox from './Checkbox.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';
import PhoneInput from './PhoneInput.js';
import RatingItems from './RatingItems.js';
import Autocomplete from './Autocomplete.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import SelectBox from './Select.js';
import {availabilityMsg, userFlagEmoji, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr} from './UserDetail.js';

import "../css/General.css";
import "../css/Emoji.css";
import "../css/Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedQ: 0,
      isSubmitting: false,
      firstQEdited: false,
      qViewed: 0,
      qRequired: "",
      pct: 0,
      tabPressed: '',
    };
  }

  componentDidMount() {
    this.mounted = true
    const {usedFor} = this.props
    const observer = this.createObserver()

    // Track all sections that have an `id` applied
    document.getElementById("fpModal-"+usedFor).querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

  }

  componentWillUnmount() {
    const {usedFor} = this.props
    const observer = this.createObserver()

    document.getElementById("fpModal-"+usedFor).querySelectorAll('section[id]').forEach((section) => {
      observer.unobserve(section);
    });
    this.mounted = false
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  updateProgress = () => {
    const {questions} = this.props

    const qOnly = questions
      .filter(q => q['aType'] != 'interim')

    const qLength = qOnly.length
    const statesToCheck = [];

    questions.forEach((question, i) => {
      const required = question['req'] === 1;
      const name = question['name'];
      const aType = question['aType'];

      if (!required) {
        if(aType === 'interim') {
          return
        } else if(aType === 'checkbox') {
          let checkboxesToCheck = [];

          var options = question['options'];

          options.forEach((option, index) => {
            checkboxesToCheck.push(
              this.state[i+"-"+option['name']] != false && this.state[i+"-"+option['name']] != undefined
            );
          })

          if (checkboxesToCheck.includes(true)) {
            statesToCheck.push(
              true
            );
          } else {
            statesToCheck.push(
              false
            );
          }

        } else {
          statesToCheck.push(
            this.state[i+"-"+name] != '' && this.state[i+"-"+name] != undefined
          );
        }
      } else {
        statesToCheck.push(
        //  this.state["formA-"+usedFor+i+"isValid"],
          this.state[i+"-"+name+"isValid"]
        );
      }
    });

    const completedQ = statesToCheck
      .filter(q => q == true)

//    const width = (index / (qLength - 1)) * 100
  //  const width = (completedQ.length / statesToCheck.length) * 100
    const width = (completedQ.length / qLength) * 100

    const el = document.getElementById("formProgressBar")

    el.style.width = width + "%";

    this.setState({
      pct: Math.round(width),
    })
  }

  createObserver = () => {
    const {usedFor, questions} = this.props

    let options = {
      threshold: 0.7
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target
        const id = el.getAttribute('id');
        const index = el.getElementsByClassName("formA-"+usedFor)[0].dataset.index

        if (entry.intersectionRatio > 0) {

          this.setState(prevState => {
            let { qViewed } = prevState
            const maxQViewed = Math.max(index, qViewed)

            return {
              focusedQ: index,
              qViewed: maxQViewed
            }

          })
        }
      });
    }, options);

    return observer
  }

  handleChange = (e) => {
    const id = e.target.id
    const i = id.split("-")[0]

    if (i == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    this.setState({
      [id]: e.target.value,
    })
    if (e.target.checkValidity()) {
      this.setState({
        [id+"isValid"]: true
      }, () => {
        this.updateProgress()
      })
    } else {
      this.setState({
        [id+"isValid"]: false
      }, () => {
        this.updateProgress()
      })
    }
  }

  handleNonTextChange = (values, formId, isValid, callback) => {

    const i = formId.split("-")[0]

    if (i == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    this.setState({
      [formId]: values,
      [formId+"isValid"]: isValid
    }, () => {
      this.updateProgress()
      if (callback) {
        callback()
      }
    })
  }

  handleNonTextMultiChange = (values, formId, isValid, callback) => {
    const {questions, usedFor} = this.props;

    const formIdSplit = formId.split("-")
    var getIndex = formIdSplit[0];

    if (getIndex == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    const getOptions = questions[getIndex]['options'];

    const newArray = getOptions
      .filter(option => values.includes(option.label))

    const array = newArray.map(value => value.value)

    if (questions[getIndex]['aType'] === 'autocompleteMulti') {
      const labels = newArray.map(value => value.label)

      const freeTextArray = values
        .filter(freeText => labels.indexOf(freeText) === -1)

      this.setState({
        [formId+"freeText"]: freeTextArray
      })
    }

    this.setState({
      [formId]: array,
      [formId+"isValid"]: isValid
    }, () => {
      this.updateProgress()
      if (callback) {
        callback()
      }
    })

  }

  toggleCheckbox = (e)  => {
    const {usedFor, questions} = this.props;
    const stateToChange = e.target.id;

    this.setState({
      [stateToChange]: e.target.checked
    }, () => {
      this.updateProgress()
    });

    const stateToChangeSplit = stateToChange.split("-")
    var i = stateToChangeSplit[0];
    let checkboxesToCheck = [];

    if (e.target.checkValidity()) {
      this.setState({
        [stateToChange+"isValid"]: true
      }, () => {

        // Check that at least 1 of the checkbox options is checked (if this question was required)
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    } else {
      this.setState({
        [stateToChange+"isValid"]: false
      }, () => {
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    }
  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ--

        return {
          focusedQ
        }

      }, () => {
        const answers = document.getElementsByClassName("formA-"+usedFor)
        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;

        if (elToFocusOn != null) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

        const parent = document.getElementById("fpModal-"+usedFor);
        if (this.state.focusedQ == 0) {
          parent.scrollTop = 0
        } else {
          const currentQ = document.getElementById('formQ-'+usedFor+this.state.focusedQ)
          parent.scrollTop = currentQ.offsetTop
        }
      })
    }
  }

  handleScrollDown = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === questions.length - 1) {
      return
    } else {
    /*  console.log("formId")
      console.log(formId)
      let i;

      if (formId) {
        const formIdSplit = formId.split("-")
        i = +formIdSplit[0];
      }
*/
    /*  const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("0-"+questions[0].name);
      const qHeight = firstQ.scrollHeight * (focusedQ + 1)*/

    /*  console.log("i: "+i)
      console.log("focusedQ + 1: "+(focusedQ + 1))
      console.log("amount of items to scroll (formId ? i + 1 : focusedQ + 1): "+(formId ? i + 1 : focusedQ + 1))
      const qHeight = firstQ.scrollHeight * (formId ? i + 1 : focusedQ + 1)
      console.log("firstQ.scrollHeight: "+firstQ.scrollHeight)
      console.log("qHeight: "+qHeight)*/
    //  parent.scrollTop = qHeight

    //  document.getElementById("formQ-menteeFullSU2").scrollIntoView()

      this.setState(prevState => {
        let { focusedQ } = prevState

      /*  if (formId) {
          console.log("gets here")
          focusedQ = i + 1
        } else {*/
          focusedQ++
  //      }

        return {
          focusedQ
        }
      }, () => {

        const answers = document.getElementsByClassName("formA-"+usedFor)
        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;

        if (elToFocusOn != undefined) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

        const parent = document.getElementById("fpModal-"+usedFor);
        const currentQ = document.getElementById('formQ-'+usedFor+this.state.focusedQ)
        parent.scrollTop = currentQ.offsetTop

      })
    }
  }

  handleSubmit = () => {
    const {onSubmit} = this.props;
    this.toggleScrollLock();
    this.setState({
      isSubmitting: true
    }, () => {
      const {questions} = this.props;

      const statesToSave = {}

      questions.forEach((question, i) => {
        const name = question['name'];

        if (question['aType'] === 'interim') {
          return
        } else if (question['aType'] === 'checkbox') {

          var options = question['options'];

          options.forEach((option, index) => {
            const optionName = option['name']

            statesToSave[optionName] = this.state[i+"-"+optionName]
          })

        } else if (question['aType'] === 'autocompleteMulti') {

          statesToSave[name] = this.state[i+"-"+name]
          statesToSave[name+'freeText'] = this.state[i+"-"+name+'freeText']

        } else {
          statesToSave[name] = this.state[i+"-"+name]
        }
      });

      // DEX TO SAVE DOWN ANSWERS WITHIN STATESTOSAVE

      // Once submitted or if error that user needs addressing
      if (this.state.isSubmitting === false) {
        this.toggleScrollLock();
      }
    })
  }

  handleDoneClick = (formId) => {
    if (this.state[formId+"isValid"] === true) {
      this.handleScrollDown()
    } else {
      return
      //const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
    }
  }

  toggleScrollLock = () => {
    const {usedFor} = this.props
    document.getElementById('fpModal-'+usedFor).classList.toggle('u-lock-scroll');
  }

  canBeSubmitted() {
    const {questions, usedFor} = this.props;
    const {qViewed} = this.state;

    const statesToCheck = [];

    questions.forEach((question, i) => {
      const required = question['req'] === 1;
      const name = question['name'];

      if (!required) {
        return
      } else {
        statesToCheck.push(
        //  this.state["formA-"+usedFor+i+"isValid"],
          this.state[i+"-"+name+"isValid"]
        );
      }
    });

    if (statesToCheck.includes(false) || statesToCheck.includes(undefined)) {
      return false
    } else if (qViewed === (questions.length - 1)) {
      return true
    } else {
      return false
    }

  }

  renderComponents(fileToRender, componentUpdatesState, error) {

    console.log("loading unis")
    import(`./${fileToRender}.js`)
      .then(component => {
        if(this.mounted) {
          this.setState({
            [componentUpdatesState]: component.default,
            errorLoadingFile: false
          })
        }
      })
      .catch(err => {
        if(this.mounted) {
          this.setState({
            errorLoadingFile: true
          })
        }
      })
  }

  renderAType(question, required, usedFor, i, name) {

    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'interim':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-index={i}
          >
            <button type="button" className="Submit-btn formInterim" id={i+"-"+name} onClick={this.handleScrollDown}>
              Next &gt;
            </button>
          </div>
        );
      case 'text':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-index={i}
          >
            <TextInput
              name={name}
              id={i+"-"+name}
              placeholder={question['placeholder']}
              required={required}
              minLength={question['minLength']}
              maxLength={question['maxLength']}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
            {question['maxLength'] && (
              <div className="descriptor-br form">
               {this.state[i+"-"+name] ? this.state[i+"-"+name].length : 0} / {question['maxLength']}
              </div>
            )}
          </div>
        );
      case 'textLong':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-index={i}
          >
            <textarea
              name={name}
              id={i+"-"+name}
              className="form-control-std textInputBox"
          //    onChange={this.handleInput}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              autoFocus={(i === 0) ? true : false}
              placeholder={question['placeholder']}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              minLength={question['minLength']}
              maxLength={question['maxLength']}
              required={required}
            />
            {question['maxLength'] && (
              <div className="descriptor-br form">
                {this.state[i+"-"+name] ? this.state[i+"-"+name].length : 0} / {question['maxLength']}
              </div>
            )}
          </div>
        );
      case 'number':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-index={i}
          >
            <NumberInput
              name={name}
              id={i+"-"+name}
              placeholder={question['placeholder']}
              required={required}
              min={question['min']}
              max={question['max']}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
          </div>
        );
      case 'tel':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-index={i}
          >
            <PhoneInput
              name={name}
              id={i+"-"+name}
              placeholder={question['placeholder']}
              pattern={question['pattern']}
              required={required}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
          </div>
        );
      case 'checkbox':
        var options = question['options'];

        return (
          <React.Fragment>
            <div
              className={"formA-"+usedFor}
              data-idforfocus={i+"-"+options[0]['name']}
              data-index={i}
          //    data-idforfocus={options[0]['id']}
            >
              {options.map((option, index) => {

                // const checkboxRequired = option['req'] === 1;

                return (
                <div className="notifToggleContainer" key={option['id']}>
                  <span className="notifToggleTxt">{option['label']}</span>
                  <Checkbox
                    labelClassName="switch"
                //    label={option['label']}
                    name={option['name']}
                  //  id={"formA-"+usedFor+i+"-"+index}
                    id={i+"-"+option['name']}
                  //  key={option['id']}
                  //  value={option['value']}
                    required={required}
                    defaultChecked={option['defaultChecked']}
                    disabled={option['disabled']}
                    spanClassName="slider round"
                    onChange={this.toggleCheckbox}
                  />
                </div>
                )

              })}
            </div>
          </React.Fragment>
        );
      case 'select':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <SelectBox
              options={question['options']}
              placeholder={question['placeholder']}
              name={name}
              handleChange={this.handleNonTextChange}
              handleDone={this.handleDoneClick}
              focusOnLoad={i === 0 ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              isForForm
              required={required}
            />
          </div>
        );
      case 'selectMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <SelectBox
              multiple
            //  finMultiOptions={this.handleMultiOptions}
              options={question['options']}
              name={name}
              placeholder={question['placeholder']}
              placeholderOnClick={question['placeholderOnClick']}
              handleChange={this.handleNonTextMultiChange}
              handleDone={this.handleDoneClick}
              focusOnLoad={(i === 0) ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              showCheckbox={question['showCheckbox']}
              isForForm
              required={required}
            />
          </div>
        );
      case 'autocomplete':

        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"autocompleteBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <div className="autocompleter">
              <Autocomplete
                suggestions={question['componentUpdatesState'] ? question['componentUpdatesState'] : undefined}
                name={name}
                placeholder={question['placeholder']}
                handleChange={this.handleNonTextChange}
                renderComponents={this.renderComponents}
                fileToRender={question['fileToRender']}
                componentUpdatesState={question['componentUpdatesState']}
                focusOnLoad={(i === 0) ? true : false}
                idValue={question['idValue']}
                valueToShow={question['valueToShow']}
                showDetail={question['showDetail']}
                detailToShow={question['detailToShow']}
                noSuggestionsCTAclass={question['noSuggestionsCTAclass']}
                isForForm
                required={required}
              />
              {this.state.errorLoadingFile === true && (
                <div className="descriptor prompt error eduForm alignLeft">
                  Error loading options. Please try reloading the page.
                </div>
              )}
            </div>
          </div>
        );
      case 'autocompleteMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"autocompleteBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <div className="autocompleter">
              <AutocompleteTagsMulti
                multiple
                openOnClick={question['openOnClick']}
                showValues={question['showValues']}
                showCheckbox={question['showCheckbox']}
                maxTextLength={question['maxTextLength']}
                handleDone={this.handleDoneClick}
                suggestions={question['options']}
                name={name}
                placeholder={question['placeholder']}
                placeholderOnClick={question['placeholderOnClick']}
                handleChange={this.handleNonTextMultiChange}
                idValue={question['idValue']}
                focusOnLoad={(i === 0) ? true : false}
                valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
                isForForm
                required={required}
              />
            </div>
          </div>
        );
      case 'rating':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus="ratingsContainer"
            data-elementforfocus="firstElementChild"
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <RatingItems
              ratingOutOf={question['ratingOutOf']}
              handleRatingChange={this.handleNonTextChange}
              name={name}
              usedFor={usedFor}
              handleDone={this.handleDoneClick}
              focusOnLoad={(i === 0) ? true : false}
              isForForm
              required={required}
            />
          </div>
        );
    }
  }

  renderQuestions() {
    const {questions, usedFor} = this.props;
    var qOnly = 0;

    return (
      <React.Fragment>
        <div className="col-6 col-s-12 formContainer">
          {questions.map((question, i) => {
            const q = question['q'];
            const required = question['req'] === 1;
            const name = question['name'];

            if (name != 'interim') {
              qOnly++
            }

            // i.e. any detail to support the understanding of the question
            const detail = question['detail'] == undefined ? '' :  question['detail'];

            return (
            //  <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
              <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
                <h2 className={"qTitle " + (required ? "reqAsterisk" : "")}>
                  {name != 'interim' && (
                    <span className="qNum">{qOnly})</span>
                  )}
                  {q}
                </h2>
                <div className="qDetail">
                  {detail}
                </div>
                { this.renderAType(question, required, usedFor, i, name) }
              </section>
            )
          })}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {focusedQ, isSubmitting, tabPressed, firstQEdited, pct} = this.state
    const {questions} = this.props

    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div className="prLogoContainer form">
          <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
        </div>
        <h1 className="form-header">
          <br/>
          <i className="emoji-icon form typing-emoji"/> Complete your full sign up
        </h1>
        <div className="row">
          { this.renderQuestions() }
        </div>
        <div className="formCTAContainer submit">
          <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-form">
            {isSubmitting === true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Submit</span>
            )}
          </button>
        </div>
        <div className="formCTAContainer other">
          <div id="formProgressPct">{pct+"% completed"}</div>
          <div id="formProgress">
            <div id="formProgressBar"/>
          </div>
          <button type="button" disabled={isSubmitting === true ? true : focusedQ == 0} className="qScrollBtn" onClick={this.handleScrollUp}>
            <ChevronUp />
          </button>
          <button type="button" disabled={isSubmitting === true ? true : ((firstQEdited === false && focusedQ == 0) ? true : focusedQ == (questions.length - 1))} className="qScrollBtn" onClick={this.handleScrollDown}>
            <ChevronDown />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
