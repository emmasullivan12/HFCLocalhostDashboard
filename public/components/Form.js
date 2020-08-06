// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {ChevronDown, ChevronUp, LoadingSpinner} from './GeneralFunctions.js';
import TextInput from './TextInput.js';
import Autocomplete from './Autocomplete.js';
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
    };
  }

  componentDidMount(){
    const { focusOnLoad, usedFor } = this.props;

    if (focusOnLoad) {
      document.getElementById("formA-"+usedFor+"0").focus();
    }
  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {
      const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("formQ-"+usedFor+"0");
      const qHeight = firstQ.scrollHeight * (focusedQ - 1)

      parent.scrollTop = qHeight

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ--

        return {
          focusedQ
        }

      }, () => {
        console.log('focusedQ: '+this.state.focusedQ)
      })
    }
  }

  handleScrollDown = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === questions.length - 1) {
      return
    } else {

      const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("formQ-"+usedFor+"0");
      const qHeight = firstQ.scrollHeight * (focusedQ + 1)

      parent.scrollTop = qHeight

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ++

        return {
          focusedQ
        }
      }, () => {
        console.log('focusedQ: '+this.state.focusedQ)
      })
    }
  }

  handleSubmit(e) {
    this.setState({
      isSubmitting: true
    })
  }

  renderAType(question, required, usedFor) {
/*    text
    select
    selectMulti
    autocomplete
    autocompleteMulti
    rating
*/
    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'text':
        return (
          <TextInput
            name={usedFor}
            id={"formA-"+usedFor+"0"}
            placeholder={question['placeholder']}
        //    className="form-control-std"
            required={required}
            maxLength={question['maxLength']}
        /*    handleChange={handleChange}
            handleKeyUp={handleKeyUp}
            handleTabPress={handleTabPress}
            handleMouseDown={handleMouseDown}
            onBlur={onBlur}*/
          />
        );
    /*  case 'select':
        return (
          <div type="button" className="picContainer">
          </div>
        );
      case 'selectMulti':
        return (
          <div type="button" className="picContainer">
          </div>
        );
      case 'autocomplete':
        return (
          <div type="button" className="picContainer">
          </div>
        );
      case 'autocompleteMulti':
        return (
          <div type="button" className="picContainer">
          </div>
        );
      case 'rating':
        return (
          <div type="button" className="picContainer">
          </div>
        );*/
    }
  }

  renderQuestions() {
    const {questions, usedFor} = this.props;

    return (
      <React.Fragment>
        <div className="col-6 col-s-12 formContainer">
          {questions.map((question, i) => {
            const q = question['q'];

            const required = question['req'] === 1;

            // i.e. any detail to support the understanding of the question
            const detail = question['detail'] == undefined ? '' :  question['detail'];

            return (
              <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
                <h2 className={"qTitle " + (required ? "reqAsterisk" : "")}>
                  <span className="qNum">{i + 1})</span>{q}
                </h2>
                <div className="qDetail">
                  {detail}
                </div>
                { this.renderAType(question, required, usedFor) }
              </section>
            )
          })}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {focusedQ, isSubmitting} = this.state
    const {questions} = this.props

    return (
      <React.Fragment>
        <div className="prLogoContainer form">
          <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
        </div>
        <h1 className="form-header">
          <br/>
          <i className="emoji-icon typing-emoji"/> Complete your full sign up
        </h1>
        <div className="row">
          { this.renderQuestions() }
        </div>
        <div className="formCTAContainer">
          <button type="button" disabled={isSubmitting === true ? true : focusedQ === 0} className="qScrollBtn" onClick={this.handleScrollUp}>
            <ChevronUp />
          </button>
          <button type="button" disabled={isSubmitting === true ? true : focusedQ === (questions.length - 1)} className="qScrollBtn" onClick={this.handleScrollDown}>
            <ChevronDown />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
