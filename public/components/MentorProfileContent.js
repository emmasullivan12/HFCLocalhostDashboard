// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import "../css/General.css";
import "../css/Article.css";
import "../css/Profile.css";

class MentorProfileContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="article-page profile">
        <div className="row article-container">
          <div className="col-4 col-s-12 category-list profile">
            <div className="profile-thumb-container">
              <img
                className="profile-thumb img-circle"
                src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                alt="User profile pic"
              />
              <div className="pr-certified img-circle" />
            </div>
            <div>Emma</div>
            <div>Head of Marketing</div>
            <div>Pladis</div>
            <div>Industry</div>
            <button type="button" className="Submit-btn">FOLLOW BUTTON</button>
            <ul className="section-list left">
              <li>
                <a href="#expertise-and-career" className="active">Expertise & Career</a>
              </li>
              <li>
                <a href="#education">School Career</a>
              </li>
              <li>
                <a href="#hobbies-interests">Outside of work</a>
              </li>
              <li>
                <a href="#recent-activity">Recent activity</a>
              </li>
            </ul>
          </div>
          <div className="col-8 col-s-12 content-col">
              <div className="article-body">
                <section className="scroll-anchor" id="expertise-and-career" name="expertise-and-career">
                  <h1 className="anchor">
                    <br/>
                    Expertise & Career
                  </h1>
                  <h2>
                    Desktop notifications are currently enabled
                  </h2>
                  <p>
                    We strongly recommend enabling notifications so that you’ll know when important activity happens in your Prospela space e.g. when your E-Mentor sends you a direct message
                  </p>
                  <h2>
                    Messages
                  </h2>
                  <p>
                    Receive messages from E-Mentors and other students in your teams, including 1:1 careers advice personalised to you.
                  </p>
                  <h2>
                    Reminders
                  </h2>
                  <p>
                    Receive requests to give & receive a review, chat reminders, and other reminders related to your activities on Prospela.
                  </p>
                  <h2>
                    Promotions and tips
                  </h2>
                  <p>
                    Receive inspiration, career opportunities, promotions, surveys, and product updates from Prospela and our partners.
                  </p>
                  <h2>
                    Account support
                  </h2>
                  <p>
                    We may need to send you messages regarding your account, your mentoring relationships, legal notifications, security, privacy and safeguarding matters, and customer support requests. <strong>For your security you cannot disable email notifications</strong> and we may contact you by phone or other means if needed.
                  </p>
                </section>
                <section className="scroll-anchor" id="education" name="education">
                  <h1 className="anchor">
                    <br/>
                    My school career
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
                </section>
                <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                  <h1 className="anchor">
                    <br/>
                    Outside of work
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
                </section>
                <section className="scroll-anchor" id="recent-activity" name="recent-activity">
                  <h1 className="anchor">
                    <br/>
                    Recent activity
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
                </section>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorProfileContent;
