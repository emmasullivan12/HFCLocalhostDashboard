// Dex last merged this code on 21st june 2021

import React, { Component } from "react";
import SelectBox from './Select.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class FeedbackSuccessContent extends Component {
  constructor() {
    super();
    this.state = {
      feedbk4Pr: '',
      feedback4PrSentSuccess: false,
    };
  }

  componentDidMount(){
    document.getElementById("feedbk4Pr").focus()
  }

  handleChange = (e) => {
    this.setState({
      feedbk4Pr: e.target.value
    });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {

    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

    this.setState({ feedback4PrSentSuccess: true });
  }

  canBeSubmitted() {
    const {feedbk4Pr} = this.state;
    return (
      feedbk4Pr != ''
    );
  }

  render() {
    const { feedbk4Pr, feedback4PrSentSuccess } = this.state;
    const isEnabled = this.canBeSubmitted();

    if(feedback4PrSentSuccess == false) {
      return (
        <React.Fragment>
          <div className="modal-title">
            Thanks for completing your chat feedback! <span role="img" aria-label="ok emoji">👌</span>
          </div>
          <div className="modal-subtitle smallFont">
            We&#39;ll let you know when we hear back from your match too.
          </div>
          <form>
            <div className="form-group">
              <label className="descriptor alignLeft" htmlFor="feedbk4Pr">How could we make Prospela <strong>more useful / easier</strong> for you?</label>
              <textarea
                name="feedbk4Pr"
                id="feedbk4Pr"
                className="form-control-std textInputBox"
                onChange={this.handleChange}
                autoFocus
                placeholder="Type your feedback, suggestions, ideas, complaints..."
                minLength="0"
                maxLength="500"
              />
            </div>
            <div className="descriptor-br form">
              {feedbk4Pr.length} / 1000
            </div>
            <div className="request-btn-container">
              <button type="button" disabled={!isEnabled} className="Submit-btn" onClick={this.handleSubmit}>
                Send to Prospela team
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <i className="fas fa-paper-plane" />
            </div>
            Feedback sent!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Your suggestions, ideas and complaints help us greatly, so thank you. <span role="img" aria-label="pray emoji">🙏</span>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default FeedbackSuccessContent;
