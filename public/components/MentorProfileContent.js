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

function isNightDay(userCurrentTime) {
  var hour = new Date(userCurrentTime).getHours();
  if (hour >= 7 && hour <= 19) {
    return 'day'
  } else {
    return 'night'
  }
}

function profileTimeZone(userTimeZone) {
  var now = new Date();
  var options = { hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' };
  return now.toLocaleTimeString('en-US', options);
}

class MentorProfileContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      followStatus: false,
      save4LaterClicked: false,
      availabilityClicked: true,
      saved4later: false
    }
    this.toggleFollowStatus = this.toggleFollowStatus.bind(this);
    this.handleAvailabilityClick = this.handleAvailabilityClick.bind(this);
    this.toggleSave4LaterClick = this.toggleSave4LaterClick.bind(this);
    this.availabilityMsg = this.availabilityMsg.bind(this);
  }

  toggleFollowStatus() {
    const currentState = this.state.followStatus;
    this.setState({ followStatus: !currentState });
  }

  handleAvailabilityClick() {
    this.setState({ availabilityClicked: true });
    this.setState({ save4LaterClicked: false });
  }

  toggleSave4LaterClick() {
    const saved = this.state.saved4later;
    this.setState({ save4LaterClicked: true });
    this.setState({ saved4later: !saved });
    this.setState({ availabilityClicked: false });
  }

  availabilityMsg(userAvail) {
    if (userAvail === 1) {
      return <span>Available for <strong className="greenText">long-term</strong> and <strong className="greenText">short-term</strong> mentorship</span>
    } else if (userAvail === 2) {
      return <span>Available to offer <strong className="greenText">long-term</strong> mentorship</span>
    } else if (userAvail === 3) {
      return <span>Available to offer <strong className="greenText">short-term</strong> mentor support</span>
    } else if (userAvail === 4) {
      return <span><span className="redText">Not currently available</span> for mentorship</span>
    }
  }

  render() {
    const {followStatus, availabilityClicked, save4LaterClicked, saved4later, availabilityMsg} = this.state;
    const mentorName = 'Emma'
    const userCountry = 'UK'
    const userTimeZone = 'UTC'
    const userCity = 'London'
    const userAvail = 1
    const userCurrentTime = profileTimeZone(userTimeZone);
    const isDayNight = isNightDay(userCurrentTime);
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
              <div className="profileName">{mentorName}</div>
              <div className="profilePosition">Head of Marketing</div>
              <a className="profileInstitution link" href="www.prospela.com"><span className="neutralText">&#64;</span> Pladis</a>
              <div className="profileIndustryTag">#food&beverage</div>
              <button type="button" className={"Submit-btn " + (followStatus===false ? 'notFollowing' : 'Following')} onClick={this.toggleFollowStatus}>
                {followStatus===false ? 'Follow' : <span>&#10003; Following</span>}
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
              <div className="profileCTAContainer">
                {availabilityClicked===true || save4LaterClicked===false || save4LaterClicked===true && saved4later===false ? (
                  <div className="profileBtnToolTip avail">
                    {this.availabilityMsg(userAvail)}
                  </div>
                  )
                : (
                  <div className="profileBtnToolTip save">
                    <span>Saved as a potential future mentor!</span>
                  </div>
                  )
                }
                <div className="profileUserCTA">
                  {userAvail === 1 || userAvail === 2 || userAvail === 3 ? (
                    <button type="button" className="profileBtn" onClick={this.handleAvailabilityClick}>
                      <span>&#10003;</span>
                    </button>
                    )
                  : (
                    <button type="button" className="profileBtn redTextBorderBkgnd">
                      <span>&#10007;</span>
                    </button>
                    )
                  }
                  <button type="button" className={"profileBtn save4Later " + (saved4later===true && "greenTextBorderBkgnd")} id="save4LaterBtn" onClick={this.toggleSave4LaterClick}>
                    <i className="far fa-bookmark"/>
                  </button>
                  <div className="timeContainer">
                    {isDayNight==='day' ? (
                      <button type="button" className="profileBtn dayTime">
                        <i className="fas fa-sun"/>
                      </button>
                      )
                    : (
                      <button type="button" className="profileBtn nightTime">
                        <i className="fas fa-moon"/>
                      </button>
                      )
                    }
                    <div className="TimeZoneContainer">
                      <div className={"UserLocalTime " + isDayNight}>{userCurrentTime}</div>
                      <div className={"UserTimeZone " + isDayNight}>{userCountry}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"mapImg " + userCity}>
              <div className="mapAttribution">
                &#169; <a href="https://www.openstreetmap.org/copyright" className="link map">OpenStreetMap</a> contributors
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorProfileContent;
