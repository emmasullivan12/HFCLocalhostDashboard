// Dex last merged this code on 24th may 2024

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {cdn} from './CDN.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import "../css/Login.css";
import "../css/General.css";

class TripwirePage extends React.Component {
  constructor () {
    super();
    this.state = {
      isGeneralError: '',
      isSubmitting: false,
      countdownDate: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      countdownDate: this.getCountdownDate(),
    })
  /*  const script = document.createElement("script");
    script.src = "https://cdn.logwork.com/widget/countdown.js";
    script.async = true;
    document.body.appendChild(script);*/
  }

  getCountdownDate() {
    const now = new Date();
    const future = new Date(now.getTime() + 24 * 60 * 60 * 1000); // add 48 hours
    // Format as "YYYY-MM-DD HH:mm" (what logwork expects)
    return future
      .toISOString()
      .slice(0, 16)
      .replace("T", " ");
  }

  handleSubmit() {
    const {userInput} = this.state;
    const {updateStep} = this.props

    this.setState({
      isSubmitting: true,
    })
    updateStep('didTripwire')
  }

  render() {
    const { updateStep, userCurrency } = this.props;
    const { isSubmitting, isGeneralError, countdownDate} = this.state;

    return (
      <React.Fragment>
        <div>
          <div className='embedded-typeform'>
            {isGeneralError === true && (
              <div>
                Oops! Something went wrong. Please try reloading the page.
              </div>
            )}
            {isGeneralError != true && (
              <form className="marginBottom50" autoComplete="off">
                <div className="descriptor alignCenter"><strong className="highlightPink">For the next 24 hours only</strong> grab the <a className="link" href="https://thehumanfinanceclub.com/spice-up-your-cv">Spice Up Your Finance CV / Resume Guide</a> for <strong>just {userCurrency == 'USD' ? '$27' : '£19'} </strong>(normally {userCurrency == 'USD' ? '$54' : '£39'}).</div>
                <a href="https://logwork.com/countdown-timer" className="countdown-timer" data-timezone="Europe/London" data-date={countdownDate}>Countdown Timer</a>
                <div className="marginTop30 marginBottom30 height250px">
                  <img
                    className="height100pc"
                    alt="Spice up your CV / Resume in an AI world Guide"
                    src={cdn+"/Website/Spice%20up%20your%20CV%20Resume%20Guide.png"}
                  />
                </div>
                <div className="descriptor textLeft marginTop30">
                  <div className="bold electricPink marginBottom10">Inside this 50+ page guide, you’ll:</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Position yourself for more <strong>strategic & commercial roles</strong></div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Reframe technical finance tasks into <strong>strategic achievements</strong> (even if you&#39;re stuck in the weeds)</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Follow a <strong>proven CV / Resume structure</strong> that instantly stands out</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Discover what <strong>recruiters really look for</strong> in the post-AI job market</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Uncover & highlight <strong>hidden strengths</strong> you didn’t realise you had</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Transform weak bullets with our <strong>before-and-after rewrites and examples</strong></div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Nail <strong>applications & interviews</strong> with distribution strategies + “walk me through your CV” answers</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>Avoid the <strong>“same as everyone else” trap</strong> most finance pros fall in to</div>
                  <div><span role="img" aria-label="tick emoji">✅ </span>and more...</div>
                </div>
                <div className="descriptor lightGreyText marginTop30 alignCenter"><i>Instant download. One-time purchase.</i></div>
                <div className="descriptor lightGreyText marginBottom30 alignCenter"><i>Optimized for AI-era Finance. No fluff.</i></div>
                <button type="button" onClick={this.handleSubmit} disabled={isSubmitting === true ? true : false} className="fontSize14 Submit-btn fullWidth" id="Submit-btn-eduEmail">
                  {isSubmitting === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmitting != true && (
                    <span><span role="img" aria-label="point emoji">👉</span> Get the guide - {userCurrency == 'USD' ? '$27' : '£19'} Today Only</span>
                  )}
                </button>
                <button type="button" className="btnDescriptor button-unstyled alignCenter marginBottom50" onClick={this.handleSubmit}>
                  <span>or Go to Dashboard</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TripwirePage;
