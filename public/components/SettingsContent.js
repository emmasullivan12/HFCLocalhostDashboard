// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import "../css/Article.css";
import "../css/General.css";

class SettingsContent extends Component {
  constructor () {
    super();
    this.state = {
      desktopNotifsOn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDesktopNotifs = this.toggleDesktopNotifs.bind(this);
  }

  handleSubmit() {
    alert('Your preferences have been saved!');
  }

  toggleDesktopNotifs() {
    alert('Desktop notifiations changed');
    const currentState = this.state.desktopNotifsOn;
    this.setState({ desktopNotifsOn: !currentState });
  }

  render() {
    const {desktopNotifsOn} = this.state;
    return (
      <React.Fragment>
        <div className="article-page">
          <div className="article-header">
            <h1 className="article-title">Your Preferences & Settings</h1>
            <p className="article-desc">Customize your Prospela by setting your preferences for notifications, privacy, and your contact details</p>
          </div>
          <div className="article-container">
          <div className="content-col">
              <div className="article-body">
                <a className="scroll-anchor" id="notif-settings" name="notif-settings" prettyslug="notification-settings"/>
                <h1 className="anchor">
                  <br/>
                  Notifications
                </h1>
                <h2>
                  Desktop notifications are currently {desktopNotifsOn===false ? <span className="redText inheritFontSize">disabled</span> : <span className="greenText inheritFontSize">enabled</span>}
                </h2>
                <p>
                  We strongly recommend enabling notifications so that you’ll know when important activity happens in your Prospela space e.g. when your E-Mentor sends you a direct message
                </p>
                <button type="button" className="Submit-btn enableNotif" onClick={this.toggleDesktopNotifs}>
                  <i className="fa fa-bell buttonIcon" />
                  {desktopNotifsOn===false ? 'Enable' : 'Disable'} desktop notifications
                </button>
                <h2>
                  Messages
                </h2>
                <p>
                  Receive messages from E-Mentors and other students in your teams, including 1:1 careers advice personalised to you.
                </p>
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-msgs-email" >
                      <input type="checkbox" id="notif-msgs-email" checked />
                      <span className="slider round"/>
                    </label>
                  </div>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By SMS / Text Message</span>
                    <label className="switch" htmlFor="notif-msgs-sms" >
                      <input type="checkbox" id="notif-msgs-sms" checked />
                      <span className="slider round"/>
                    </label>
                  </div>
                </form>
                <h2>
                  Reminders
                </h2>
                <p>
                  Receive requests to give & receive a review, chat reminders, and other reminders related to your activities on Prospela.
                </p>
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-reminders-email" >
                      <input type="checkbox" id="notif-reminders-email" checked />
                      <span className="slider round"/>
                    </label>
                  </div>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By SMS / Text Message</span>
                    <label className="switch" htmlFor="notif-reminders-sms" >
                      <input type="checkbox" id="notif-reminders-sms" />
                      <span className="slider round"/>
                    </label>
                  </div>
                </form>
                <h2>
                  Promotions and tips
                </h2>
                <p>
                  Receive inspiration, career opportunities, promotions, surveys, and product updates from Prospela and our partners.
                </p>
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-promotions-email" >
                      <input type="checkbox" id="notif-promotions-email" />
                      <span className="slider round"/>
                    </label>
                  </div>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By SMS / Text Message</span>
                    <label className="switch" htmlFor="notif-promotions-sms" >
                      <input type="checkbox" id="notif-promotions-sms" />
                      <span className="slider round"/>
                    </label>
                  </div>
                </form>
                <h2>
                  Account support
                </h2>
                <p>
                  We may need to send you messages regarding your account, your mentoring relationships, legal notifications, security, privacy and safeguarding matters, and customer support requests. <strong>For your security you cannot disable email notifications</strong> and we may contact you by phone or other means if needed.
                </p>
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-support-email" >
                      <input type="checkbox" id="notif-support-email" checked disabled/>
                      <span className="slider round"/>
                    </label>
                  </div>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By SMS / Text Message</span>
                    <label className="switch" htmlFor="notif-support-sms" >
                      <input type="checkbox" id="notif-support-sms" />
                      <span className="slider round"/>
                    </label>
                  </div>
                </form>
                <a className="scroll-anchor" id="contact-info" name="contact-info" prettyslug="contact-info"/>
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
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer email">
                    <div className="emailToggleTxt overflow-ellipsis">[SCHOOL/WORK EMAIL GOES HERE]</div>
                    <div className="emailBtns">
                      <button type="button" className="Submit-btn HollowBtn Edit">Edit</button>
                      <label className="radioContainer neutralText setPrimary" htmlFor="notif-formal-email">Primary
                        <input type="radio" id="notif-formal-email" checked="checked" name="radio" />
                        <span className="radioCheckmark"/>
                      </label>
                    </div>
                  </div>
                  <div className="notifToggleContainer email">
                    <div className="emailToggleTxt overflow-ellipsis">[PERSONAL EMAIL GOES HERE]</div>
                    <div className="emailBtns">
                      <button type="button" className="Submit-btn HollowBtn Edit">Edit</button>
                      <label className="radioContainer neutralText setPrimary" htmlFor="notif-personal-email">Primary
                        <input type="radio" id="notif-personal-email" name="radio" />
                        <span className="radioCheckmark"/>
                      </label>
                    </div>
                  </div>
                </form>
                <h2>
                  Phone Numbers:
                </h2>
                <form onChange={this.handleSubmit}>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">+44 7854 191 949</span>
                    <span>
                      <button type="button" className="Submit-btn BlankBtn neutralText">Remove</button>
                    </span>
                  </div>
                  <div>
                    Add a phone Number
                  </div>
                </form>
              </div>
            </div>
            <div className="category-list" id="nav-holder">
              <ul className="section-list sticky" id="nav-list">
                <li>
                  <a href="#notif-settings" className="active" prettyslug="notification-settings">Notifications</a>
                </li>
                <li>
                  <a href="#contact-info" prettyslug="contatc-info">Your Contact Info</a>
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
