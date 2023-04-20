// Dex last merged this code on 20th apr 2023

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import PhoneInputContainer from './PhoneInput.js';

import "../css/Article.css";
import "../css/General.css";
import "../css/Login.css"; // Put input boxes from this file into General

class SettingsContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      desktopNotifsOn: false,
      isEditPhoneNo: false,
      isEditFormalEmail: false,
      isEditPersonalEmail: false,
      phoneNo: '+44 7854 191 949',
      phoneNoInProg: '+44 7854 191 949', // Needs to be the saved phoneno by default
      phoneNoInProgIsValid: true,
      formalEmail: 'emma@work.com',
      personalEmail: 'emmapersonal@gmail.com',
      isRemoved: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveNo = this.handleRemoveNo.bind(this);
    this.toggleEditPhoneNo = this.toggleEditPhoneNo.bind(this);
    this.editFormalEmail = this.editFormalEmail.bind(this);
    this.editPersonalEmail = this.editPersonalEmail.bind(this);
    this.toggleDesktopNotifs = this.toggleDesktopNotifs.bind(this);
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handlePhoneChange = (id, value, isValid) => {

    this.setState({
      phoneNoInProg: value,
      phoneNoInProgIsValid: isValid,
      showPhoneNoError: !isValid,
    });
  }

  handleCancelPhoneChange = (evt) => {
    const {phoneNo} = this.state
    evt.preventDefault();
    this.toggleEditPhoneNo()
    this.setState({
      phoneNoInProg: phoneNo,
      phoneNoInProgIsValid: true,
      showPhoneNoError: false,
    });
  }

  handlePhoneNoSave = (evt) => {
    const {phoneNoInProgIsValid, phoneNoInProg} = this.state

    evt.preventDefault();
    if (phoneNoInProgIsValid == true) {
      this.setState({
        phoneNo: phoneNoInProg,
        showPhoneNoError: false,
        isEditPhoneNo: false,
        isRemoved: false
      })
    } else {
      this.setState({
        showPhoneNoError: true
      })
    }
  //  this.setState({ [evt.target.name]: evt.target.value });
  }

  handleEmailSave = (evt) => {
    evt.preventDefault();
    this.setState({ isEditFormalEmail: false });
    this.setState({ isEditPersonalEmail: false });
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleMakePrimary = (evt) => {
    alert('made primary');
  }

  handleSubmit() {
    alert('Your preferences have been saved!');
  }

  handleRemoveNo() {
    this.setState({ isRemoved: true });
    this.setState({ phoneNo: '' });
  }

  toggleEditPhoneNo() {
    const currentState = this.state.isEditPhoneNo
    this.setState({
      isEditPhoneNo: !currentState,
      showPhoneNoError: false
    });
  }

  editFormalEmail() {
    this.setState({ isEditFormalEmail: true });
  }

  editPersonalEmail() {
    this.setState({ isEditPersonalEmail: true });
  }

  toggleDesktopNotifs() {
    alert('Desktop notifiations changed');
    const currentState = this.state.desktopNotifsOn;
    this.setState({ desktopNotifsOn: !currentState });
  }

  render() {
    const {desktopNotifsOn, isEditPhoneNo, phoneNo, isRemoved, formalEmail, personalEmail, isEditFormalEmail, isEditPersonalEmail, showPhoneNoError} = this.state;
    const {userRole} = this.props;
    return (
      <React.Fragment>
        <div className="article-page">
          <div className="article-header">
            <h1 className="article-title">Your Preferences & Settings</h1>
            <p className="article-desc">Customize your Prospela by setting your preferences for notifications, privacy, and your contact details</p>
          </div>
          <div className="row article-container">
          <div className="col-8 col-s-12 content-col">
              <div className="article-body">
                <section className="scroll-anchor" id="notification-settings" name="notif-settings">
                  <h1 className="anchor">
                    <br/>
                    Notifications
                  </h1>
                  <h2>
                    Desktop notifications are currently {desktopNotifsOn===false ? <span className="redText inheritFontSize">disabled</span> : <span className="greenText inheritFontSize">enabled</span>}
                  </h2>
                  <p>
                    We strongly recommend enabling notifications so that you’ll know when important activity happens in your Prospela space e.g. when your {userRole === 'mentee' ? 'E-Mentor' : 'Mentee'} sends you a direct message
                  </p>
                  <button type="button" className="Submit-btn enableNotif" onClick={this.toggleDesktopNotifs}>
                    <i className="fa fa-bell buttonIcon" />
                    {desktopNotifsOn===false ? 'Enable' : 'Disable'} desktop notifications
                  </button>
                  <h2>
                    Group Messages (from group admins)
                  </h2>
                  <p>
                    Receive messages & key reminders from Group Admins
                  </p>
                  <form>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By Email</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-msgsgroupadmins-email"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked
                      />
                    </div>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By SMS / Text Message</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-msgsgroupadmins-sms"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                  </form>
                  <h2>
                    Group Messages (from other {userRole === 'mentee' ? 'Mentees' : 'E-Mentors'})
                  </h2>
                  <p>
                    Receive messages from {userRole === 'mentee' ? 'other Mentees in your groups' : 'other E-Mentors in your groups'}.
                  </p>
                  <form>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By Email</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-msgs-email"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked
                      />
                    </div>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By SMS / Text Message</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-msgs-sms"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                  </form>
                  <h2>
                    1:1 Chat Messages & Reminders
                  </h2>
                  <p>
                    Receive messages from your {userRole === 'mentee' ? 'mentor(s)' : 'mentee(s)'}, requests to give & receive a review, and other key reminders related to your mentoring activities on Prospela.
                  </p>
                  <form>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By Email</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-reminders-email"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By SMS / Text Message</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-reminders-sms"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                  </form>
                  <h2>
                    Promotions and tips
                  </h2>
                  <p>
                    Receive inspiration, {userRole === 'mentee' ? 'career opportunities,' : 'ongoing support,'} promotions, surveys, and product updates from Prospela and our partners.
                  </p>
                  <form>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By Email</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-promotions-email"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By SMS / Text Message</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-promotions-sms"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                  </form>
                  <h2>
                    Account support
                  </h2>
                  <p>
                    We may need to send you messages regarding your account, your mentoring relationships, legal notifications, security, privacy and safeguarding matters, and customer support requests. <strong>For your security you cannot disable email notifications</strong> and we may contact you by phone or other means if needed.
                  </p>
                  <form>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By Email</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-support-email"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked
                        disabled
                      />
                    </div>
                    <div className="notifToggleContainer">
                      <span className="notifToggleTxt">By SMS / Text Message</span>
                      <Checkbox
                        labelClassName="switch"
                        id="notif-support-sms"
                        spanClassName="slider round"
                        onChange={this.handleSubmit}
                        defaultChecked={false}
                      />
                    </div>
                  </form>
                </section>
                <section className="scroll-anchor" id="contact-info" name="contact-info">
                  <h1 className="anchor">
                    <br/>
                    Your Contact Info <i className="fas fa-lock"/>
                  </h1>
                  <p>
                    We will not share your private information with other Prospela users.
                  </p>
                  <h2>
                    Email Addresses:
                  </h2>
                  <p>
                    If you would prefer to make your personal email your primary email (i.e. to receive notifications, etc.), you can do so below.
                  </p>
                  <form onSubmit={this.handleEmailSave}>
                    <div className="notifToggleContainer contact">
                      {isEditFormalEmail===false ?
                        <div className="contactToggleTxt overflow-ellipsis">{formalEmail}</div>
                      : (
                        <input
                          type="email"
                          name="formalEmail"
                          className="form-control-std contactInput"
                          placeholder={formalEmail}
                          value={formalEmail}
                          onChange={this.handleChange}
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="off"
                        />
                        )
                      }
                      <div className="emailBtns">
                        {isEditFormalEmail===false && <button type="button" className="Submit-btn HollowBtn Edit" onClick={this.editFormalEmail}>Edit</button>}
                        {isEditFormalEmail===true && <button type="submit" name="formalEmail" className="Submit-btn BlankBtn">Save</button>}
                        <label className="radioContainer neutralText setPrimary" htmlFor="notif-formal-email">Primary
                          <input type="radio" id="notif-formal-email" defaultChecked name="radio"/>
                          <span className="radioCheckmark"/>
                        </label>
                      </div>
                    </div>
                    <div className="notifToggleContainer contact">
                      {isEditPersonalEmail===false ?
                        <div className="contactToggleTxt overflow-ellipsis">{personalEmail}</div>
                      : (
                        <input
                          type="email"
                          name="personalEmail"
                          className="form-control-std contactInput"
                          placeholder={personalEmail}
                          value={personalEmail}
                          onChange={this.handleChange}
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="off"
                        />
                        )
                      }
                      <div className="emailBtns">
                        {isEditPersonalEmail===false && <button type="button" className="Submit-btn HollowBtn Edit" onClick={this.editPersonalEmail}>Edit</button>}
                        {isEditPersonalEmail===true && <button type="submit" name="personalEmail" className="Submit-btn BlankBtn">Save</button>}
                        <label className="radioContainer neutralText setPrimary" htmlFor="notif-personal-email">Primary
                          <input type="radio" id="notif-personal-email" name="radio"/>
                          <span className="radioCheckmark"/>
                        </label>
                      </div>
                    </div>
                  </form>
                  <h2>
                    Phone Numbers:
                  </h2>
                  <form onSubmit={this.handlePhoneNoSave}>
                    <div className="notifToggleContainer contact">
                      {isEditPhoneNo===false ?
                        !isRemoved && <span className="contactToggleTxt" id="existingPhoneNo">{phoneNo}</span>
                      : (
                        <div className="dispInlineBlock">
                          <PhoneInputContainer
                            name="phoneNo"
                            id="phoneNo"
                            initialValue={phoneNo}
                            handleChange={this.handlePhoneChange}
                            onBlur={this.onBlur}
                            focusOnLoad
                          />
                        </div>
                        )
                      }
                      <div className="emailBtns">
                        {isEditPhoneNo===false ?
                          !isRemoved && <button type="button" className="Submit-btn BlankBtn neutralText smallCTA" onClick={this.handleRemoveNo}>Remove</button>
                        : (
                          <div>
                            <button type="button" className="Submit-btn BlankBtn darkGreyText Edit" onClick={this.handleCancelPhoneChange}>Cancel</button>
                            <button type="submit" className="Submit-btn BlankBtn greenText Edit">Save</button>
                          </div>
                        )}
                      </div>
                    </div>
                    {showPhoneNoError == true && (
                      <div className="redText">Phone number is invalid.</div>
                    )}
                    <button type="button" className="Submit-btn HollowBtn Edit" onClick={this.toggleEditPhoneNo}>Add / edit a phone Number</button>
                  </form>
                </section>
              </div>
            </div>
            <div className="col-4 col-s-12 category-list" id="articleMenu">
              <ul className="section-list">
                <li>
                  <a href="#notification-settings" className="active">Notifications</a>
                </li>
                <li>
                  <a href="#contact-info">Your Contact Info</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SettingsContent;
