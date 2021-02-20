// Dex last merged this code on 31st jan 2021

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import "../css/Modal.css";
import "../css/Emoji.css";
import "../css/General.css";
import "../css/HomepageCTAContainer.css";

class JoinProgrammeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progCode: '',
      progName: '',
      messageFromServer: ''
    };
  }

  componentDidMount(){
    document.getElementsByTagName("input")[0].focus();
  //  document.getElementsByClassName("modal-container")[0].scrollTop = 0
  }

  handleInput = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Group code sent' });
    this.setState({ progName: 'AVFX' }); //NEED TO UPDATE WITH ACTUALLY PROGRAMME NAME
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  canBeSubmitted() {
    const {progCode, progName} = this.state;
    return (
      progCode.length === 6
    );
  }

  render() {
    const { progCode, progName, messageFromServer } = this.state;
    const {userRole} = this.props;
    const isError = false;
    const nonPartnerInst = true; /// check school email (or prog code if signed up with personal email) for school partnership
    //const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join a live Group</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <p className="modalDesc alignL noMarginBlockEnd paddingBtm noPaddingR reqAsterisk">
            {userRole === 'mentee' ? 'Enter an invite code from your teacher or Prospela Partner below (or click the link if they\'ve sent you an invite email):' : 'Get a group code or invite link from your Employer to increase your company\'s collective impact'}
          </p>
          <form className="leftRightPad">
            <input
              type="text"
              name="progCode"
              className="form-control-std width80pc"
              id="progCode"
              value={this.state.progCode}
              onChange={this.handleInput}
              placeholder="Type your invite code..."
              required
              minLength="6"
              maxLength="6"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
            {isError && (
              <div className="redText">
                Sorry, that group doesn&#39;t exist. Make sure you have the correct code.
              </div>
            )}
            <Checkbox
              labelId="tncText"
              labelClassName="checkbox-container-login"
              label={"I agree to share my Prospela profile with the group admin for the purposes of " + (userRole === 'mentee' ? 'providing me career advice & support' : 'providing effective career advice & support to young people')}
              id="tncCheckbox"
              name="tanp"
              value="1"
              onChange={this.toggleCheckbox}
              spanClassName="checkmark left"
              spanId="tncStyle"
              required={false}
            />
            <div className="request-btn-container">
              <button type="submit" className="Submit-btn" onSubmit={this.handleSubmit}>
                Join Group
              </button>
            </div>
          </form>
  {/*        {nonPartnerInst && userRole === 'mentee' && (
            <div className="neutralText alignCenter">
              Don&#39;t have a code? Click to get your school to pay ;)
            </div>
          )}
          {nonPartnerInst && userRole === 'mentor' && (
            <div className="neutralText alignCenter">
              Don&#39;t have a code? Click to invite your company&#39;s Social Impact Lead
            </div>
          )}*/}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a member of {progName}.
            </div>
            <p className="landingCTADesc">
              You can access all of your memberships within &#39;My Groups&#39;
            </p>
            <div className="showProgsPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinProgrammeModalContent;
