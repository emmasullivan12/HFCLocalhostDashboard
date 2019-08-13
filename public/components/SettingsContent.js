// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import "../css/Article.css";
import "../css/General.css";

class SettingsContent extends Component {
  render() {
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
                  Desktop notifications are currently disabled
                </h2>
                <p>
                  We strongly recommend enabling notifications so that you’ll know when important activity happens in your Prospela space e.g. when your E-Mentor sends you a direct message
                </p>
                <button type="button" className="Submit-btn enableNotif">Enable desktop notifications</button>
                <h2>
                  Messages
                </h2>
                <p>
                  Receive messages from E-Mentors and other students in your teams, including 1:1 careers advice personalised to you.
                </p>
                <form onChange="this.form.submit()">
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-msgs-email" >
                      <input type="checkbox" id="notif-msgs-email" />
                      <span className="slider round"/>
                    </label>
                  </div>
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By SMS / Text Message</span>
                    <label className="switch" htmlFor="notif-msgs-sms" >
                      <input type="checkbox" id="notif-msgs-sms" />
                      <span className="slider round"/>
                    </label>
                  </div>
                </form>
                <h2>
                  Reminders
                </h2>
                <p>
                Receive reminders, requests to give & receive a review, and other reminders related to your activities on Prospela.
                </p>
                <form onChange="this.form.submit()">
                  <div className="notifToggleContainer">
                    <span className="notifToggleTxt">By Email</span>
                    <label className="switch" htmlFor="notif-reminders-email" >
                      <input type="checkbox" id="notif-reminders-email" />
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
                <a className="scroll-anchor" id="contact-info" name="contact-info" prettyslug="contact-info"/>
                <h1 className="anchor">
                  <br/>
                  Your Contact Info
                </h1>
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
