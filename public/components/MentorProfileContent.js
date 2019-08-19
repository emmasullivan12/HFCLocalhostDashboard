// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import "../css/General.css";
import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Profile.css";

function userFlagEmoji(userCountry) {
  switch (userCountry) {
    case 'UK':
      return 'UKFlag-emoji';
    case 'US':
      return 'USFlag-emoji';
    case 'Canada':
      return 'CdaFlag-emoji';
    default:
      return '';
  }
}

class MentorProfileContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      followStatus: false
    }
    this.toggleFollowStatus = this.toggleFollowStatus.bind(this);
  }

  toggleFollowStatus() {
    const currentState = this.state.followStatus;
    this.setState({ followStatus: !currentState });
  }

  render() {
    const userCountry = 'UK'
    const userCity = 'London'
    const {followStatus} = this.state;
    const flagEmoji = userFlagEmoji(userCountry)
    return (
      <React.Fragment>
        <div className="article-page profile">
          <div className="row article-container profile">
            <div className="col-3 col-s-12 category-list profile">
              <div className="profile-thumb-container">
                <img
                  className="profile-thumb img-circle"
                  src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                  alt="User profile pic"
                />
                <div className="pr-certified img-circle" />
              </div>
              <div className="profileName">Emma</div>
              <div className="profilePosition">Head of Marketing</div>
              <a className="profileInstitution link" href="www.prospela.com"><span className="neutralText">&#64;</span> Pladis</a>
              <div className="profileIndustryTag">#food&beverage</div>
              <button type="button" className={"Submit-btn " + (followStatus===false ? 'notFollowing' : 'Following')} onClick={this.toggleFollowStatus}>
                {followStatus===false ? 'Follow' : 'Following'}
              </button>
              <ul className="section-list left">
                <li>
                  <a href="#expertise-and-career" className="active">Expertise & Career</a>
                </li>
                <li>
                  <a href="#education">Education</a>
                </li>
                <li>
                  <a href="#hobbies-interests">Outside of work</a>
                </li>
                <li>
                  <a href="#recent-activity">Recent activity</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-s-12 content-col">
              <div className="prLogoContainer profile">
                <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
              </div>
              <div className="article-body profile">
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
                    Education
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
            <div className="col-3 col-s-12 article-extras">
              <div>
                <h2>
                  I&#39;m interested in being a mentor because:
                </h2>
                <p>
                  I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.
                </p>
                <h2>
                  Location
                </h2>
                <p>
                  <span>
                    <i className={"emoji-icon " + flagEmoji}/>
                  </span>
                  London, UK
                </p>
              </div>
              <div className="profileUserCTA">
                This is the bottom section
              </div>
            </div>
            <div className={"mapImg " + userCity} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorProfileContent;
