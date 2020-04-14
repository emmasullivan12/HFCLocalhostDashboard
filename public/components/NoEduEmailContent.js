// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoEduEmailContent extends Component {
  constructor() {
    super();
    this.state = {
      jobEmail: '',
      trainEmail: '',
      emailIsValid: '',
      isPersonalEmail: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      sentForReview: '',
      messageFromServer: '',
      timeout: 0
    };
//    this.onBlur = this.onBlur.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleEmailKeyUp = this.handleEmailKeyUp.bind(this);
  }

  componentDidMount(){
    const {eetStatus} = this.props;
    eetStatus != 'none'
      ? document.getElementById("notStudentEmail").focus()
      : null
  }

/*  onBlur(e) {
    console.log("onblur triggered")
    const {emailIsValid} = this.state;
    const {eetStatus} = this.props;

    if(e.target.checkValidity() && (eetStatus === 'job' || eetStatus === 'train' ? emailIsValid : null)) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }*/

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault ();
      return;
    } else {
      const { eetStatus, handleNoEduEmail, updateStep } = this.props;
      const { jobEmail, trainEmail } = this.state;

      if (eetStatus === "job") {
        this.setState({
          messageFromServer: 'We are sending your deets to Prospela!'
        }, () => {
          eetStatus != 'none' ? handleNoEduEmail(jobEmail) : null;
        });

      } else if (eetStatus === "train") {
        this.setState({
          messageFromServer: 'We are sending your deets to Prospela!'
        }, () => {
          eetStatus != 'none' ? handleNoEduEmail(trainEmail) : null;
        });
      } else {
        return; // not currently using Autocomplete for anything other than sch & uni
      }

      //MIGHT NEED CALLBACK FOR THIS. SEE HOW DID IT IN EDUSHORTSU
      updateStep('didEduEmail', false)
    }
  }

  checkEmail() {
    const {jobEmail, trainEmail} = this.state;
    const {eetStatus} = this.props;
    const userInput = eetStatus === 'job' ? jobEmail : trainEmail;

    const freeEmailDomains = ["gmail.com", "hotmail.com"];
    var emailSplit = userInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();

    if (freeEmailDomains.includes(freeEmail)) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: true,
        sentForReview: ''
      });
    } else if (userInput.indexOf("@") === 0) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: false,
        sentForReview: ''
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.indexOf("@") + 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: false,
        sentForReview: ''
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.length - 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: true,
        sentForReview: ''
      });
    } else {
      this.setState({
        emailIsValid: true,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        sentForReview: '1'
      });
    }
  }

  handleEmailKeyUp(e) {
    const {userInput, timeout} = this.state;

    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
        this.checkEmail()
      }, 800)
    })
  }

/*  onKeyDown = e => {

    // User pressed the enter key
    if (e.keyCode === 13) {
      if (!this.canBeSubmitted()) {
        e.preventDefault ();
        return;
      } else {
        console.log("onkeydown triggered")
        this.handleSubmit();
      }
    }
  };
*/
  // This ensures user cannot press Enter on keyboard to submit without completing form first
/*  canBeSubmitted() {
    const {schNameFreeTextModal, uniNameFreeTextModal} = this.state;
    return (
      schNameFreeTextModal.length >= 2 || uniNameFreeTextModal.length >= 2
    );
  }*/

  canBeSubmitted() {
    const {userInput, emailIsValid, isPersonalEmail, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, sentForReview} = this.state;
    const {eetStatus} = this.props;

//    if (eetStatus === 'job' || eetStatus === 'train') {
      const emailInput = document.getElementById('notStudentEmail');
      console.log(emailInput)
      if (emailIsValid != 'false' && emailInput.checkValidity()) {
        return true;
      } else {
        return false;
      }
//    } else if (eetStatus === 'none') {
      //
//    }
  }

  render() {
    const { onKeyDown } = this;
    const { jobEmail, trainEmail, noneEmail, isPersonalEmail, emailIsValid, messageFromServer } = this.state;
    const { country, eetStatus, userInput, currCo, currTrainingProvider } = this.props;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer === '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            We need a bit more info
          </div>
          <div className="modal-subtitle">
            Tell us about your situation
          </div>
          <form className="eduFreeText-form" id="eduFreeTextForm">
            {eetStatus != 'none' &&(
              <React.Fragment>
                <label className="descriptor alignLeft">
                  Your {eetStatus === 'job' ? currCo : currTrainingProvider} Email Address
                </label>
                <input
                  type="email"
                  name={eetStatus === 'job' ? 'jobEmail' : 'trainEmail'}
                  id="notStudentEmail"
            //      onBlur={this.onBlur}
                  onChange={this.handleChange}
                  onKeyUp={this.handleEmailKeyUp}
                  value={eetStatus === 'job' ? jobEmail : trainEmail}
                  className="form-control-std verifyForm"
                  placeholder={"Your " + (eetStatus === 'job' ? currCo : currTrainingProvider) + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  autoFocus
                />
                {emailIsValid === false && isPersonalEmail === false && (
                  <div className="descriptor prompt error verifyForm alignLeft">
                    This must be a valid {eetStatus === 'job' ? currCo : currTrainingProvider} email address
                  </div>
                )}
                {isPersonalEmail === true && (
                  <div className="descriptor prompt error verifyForm alignLeft textLeft">This can&#39;t be a personal email address</div>
                )}
              </React.Fragment>
            )}
            <label className="descriptor alignLeft">
              Next questions
            </label>
            <input
              type="email"
              name='nextquestion'
              id="nextquestion"
              onBlur={this.onBlur}
              onChange={this.handleChange}
          //    onKeyUp={this.handleEmailKeyUp}
          //    value={comment}
              className="form-control-std verifyForm"
              placeholder={"Your " + (eetStatus === 'job' ? currCo : currTrainingProvider) + " email address"}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              autoFocus
            />
            <div className="pass-btn-container">
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn">
                Submit for Review
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon peace-emoji successBox" />
            Details submitted
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              We&#39;ll review as soon as we can. For now, feel free to continue verifying your email!
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default NoEduEmailContent;
