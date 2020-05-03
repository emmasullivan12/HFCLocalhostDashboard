// Dex last merged this code on 26th April 2020

import React, { Component } from "react";
import Checkbox from './Checkbox.js';

import "../css/SubmitMatchContent.css";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SubmitMatchContent extends Component {
  constructor() {
    super();
    this.state = {
      MatchReasonMessage: '',
      MenteeID: '',
      MentorID: '',
//      Gender: '',
//      Ethnicity: '',
//      LGBQT: '',
//      FSM: '',
//      Role: '',
//      Hobbies: '',
//      Skills: '',
//      Industry: '',
//      ToDoList: '',
      MenteeEngagement: 0,
      MentorEngagement: 0
    };
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.type === 'number' ? parseInt(evt.target.value) : evt.target.value });
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.type === 'number' ? parseInt(evt.target.value) : evt.target.value });
  }

  handleCheckboxChange = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === '1') {
      this.setState({
        [e.target.name]: ''
      });

    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }


  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    alert('Thanks for submitting the match!');
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const { MatchReasonMessage, MenteeID, MentorID } = this.state;
    return (
      MatchReasonMessage.length > 0 && MenteeID.length > 0 && MentorID.length > 0
    );
  }

  render() {
    const { MatchReasonMessage, MenteeID, MentorID, MentorEngagement, MenteeEngagement } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <div className="modal-title">
          Submit user match info
        </div>
        <form onSubmit={this.handleSubmit} id="submitMatchForm">
          <div>Mentee ID</div>
          <input
            type="text"
            name="MenteeID"
            className="textInputBox small"
            placeholder="Enter MenteeID..."
            value={this.state.MenteeID}
            onChange={this.handleMessageChange}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          />
          <div>Mentor ID</div>
          <input
            type="text"
            name="MentorID"
            className="textInputBox small"
            placeholder="Enter MentorID..."
            value={this.state.MentorID}
            onChange={this.handleMessageChange}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          />
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Gender Pref?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByGender"
              name="Gender"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Ethnicity Pref?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByEthnicity"
              name="Ethnicity"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by LGBQT Pref?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByLGBQT"
              name="LGBQT"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by FSM/Working Class Pref?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByFSM"
              name="FSM"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Role Pref?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByRole"
              name="Role"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Hobbies?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByHobbies"
              name="Hobbies"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Skills?</span>
            <Checkbox
              labelClassName="switch"
              id="matchBySkills"
              name="Skills"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Industry?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByIndustry"
              name="Industry"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Matched by Latest Actions on Mentee ToDo List?</span>
            <Checkbox
              labelClassName="switch"
              id="matchByToDoList"
              name="ToDoList"
              value="1"
              spanClassName="slider round"
              onChange={this.handleCheckboxChange}
              defaultChecked={false}
            />
          </div>
          <div>Mentee Likely to be Engaged? (no. between 1-10)</div>
          <input
            type="number"
            name="MenteeEngagement"
            className="textInputBox small"
            value={this.state.MenteeEngagement}
            onChange={this.handleMessageChange}
            min="1"
            max="10"
          />
          <div>Mentor Likely to be Engaged? (no. between 1-10)</div>
          <input
            type="number"
            name="MentorEngagement"
            className="textInputBox small"
            value={this.state.MentorEngagement}
            onChange={this.handleMessageChange}
            min="1"
            max="10"
          />
          <textarea
            name="MatchReasonMessage"
            className="textInputBox"
            form="submitMatchForm"
            value={this.state.MatchReasonMessage}
            onChange={this.handleInput}
            placeholder="Let mentee know how they've been matched..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            required
          />
          <button type="submit" disabled={!isEnabled} className="Submit-btn">
            Submit Match
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SubmitMatchContent;
