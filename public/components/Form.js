// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {ChevronDown, ChevronUp} from './GeneralFunctions.js';
import {availabilityMsg, userFlagEmoji, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr} from './UserDetail.js';

import "../css/General.css";
//import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Form.css";
//import "../css/Profile.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedQ: 0,
      isSubmitting: false,
    };
  }

  componentDidMount(){
    const { focusOnLoad } = this.props;

    if (focusOnLoad) {
      document.getElementById("formQ-0").focus();
    }
  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {
      const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("formQ-0");
      const qHeight = firstQ.scrollHeight;
      console.log("qHeight: "+qHeight)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      parent.scrollTop -= (vh - qHeight)

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
      const firstQ = document.getElementById("formQ-0");
      const qHeight = firstQ.scrollHeight;
      console.log("qHeight: "+qHeight)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      console.log("vh - top: "+vh - qHeight)
      parent.scrollTop += (vh - qHeight)

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

  renderQuestions() {
    const {questions} = this.props;

    return (
      <React.Fragment>
        <div className="col-6 col-s-12 formContainer">
          {questions.map((question, i) => {
            const q = question['q'];

            // i.e. any detail to support the understanding of the question
            const detail = question['detail'] == undefined ? '' :  question['detail'];

            // i.e. input box, rating box, select box, etc.
            const aType = question['aType'];

            return (
              <section className="form-QA" id={'formQ-'+i} key={q}>
                <h2>
                  {q}
                </h2>
                <h3>
                  {detail}
                </h3>
                <p>
                  {aType}
                </p>
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
        <div className="prLogoContainer">
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
