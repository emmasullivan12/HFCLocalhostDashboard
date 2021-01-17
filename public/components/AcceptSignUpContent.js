// Dex last merged this code on 15th sept 2020

import React, { Component } from "react";

class AcceptSignUpContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifiedType: null,
      messageFromServer: ''
    };
  }

  handleInput = (evt) => {
  //  evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (evt.target.name == "fullAccept") {
      this.setState({
        verifiedType: 1
      })
    } else {
      this.setState({
        verifiedType: 2
      })
    }
    const submission = {
      verifiedType: this.state.verifiedType
    }
    this.setState({ messageFromServer: 'Accepted signup server says' });
  }

  render() {
    const { messageFromServer } = this.state;

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Are you sure you want to accept?
          </div>
          <form id="acceptSignUpForm">
            <div className="need-ideas-container">
              <div className="ideas-Title">
                Did you check?
              </div>
              <ul className="ideas-list textLeft">
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>Item One</strong> blah blah blah blah </div>
                </li>
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>Item Two</strong> doo bi doo bi doo bi doo</div>
                </li>
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>Item Three</strong> ding a ling a ling a ling</div>
                </li>
              </ul>
            </div>
            <div className="need-ideas-container">
              <div className="ideas-icon-container">
                <i className="far fa-lightbulb" />
              </div>
            </div>
            <div className="request-btn-container">
              <button type="submit" name="fullAccept" className="Submit-btn" onSubmit={this.handleSubmit}>
                Full Accept
              </button>
              <button type="submit" name="softAccept" className="Submit-btn" onSubmit={this.handleSubmit}>
                Soft Accept
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            Signup Accepted
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Now get back to work you tosser.
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default AcceptSignUpContent;
