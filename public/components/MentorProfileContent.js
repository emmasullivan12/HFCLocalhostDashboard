// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import UserActivity from './UserActivity.js';
import UserReads from './UserReads.js';
import UserQuotes from './UserQuotes.js';
import {userFlagEmoji, eduSubjects, timeSince, isNightDay, profileTimeZone} from './UserDetail.js';

import "../css/General.css";
import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Profile.css";

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
      return <span>Available for <strong className="greenText">long-term</strong> and/or <strong className="greenText">short-term</strong> mentorship</span>
    } else if (userAvail === 2) {
      return <span>Available to offer <strong className="greenText">long-term</strong> mentorship</span>
    } else if (userAvail === 3) {
      return <span>Available to offer <strong className="greenText">short-term</strong> mentor support</span>
    } else if (userAvail === 4) {
      return <span><span className="redText">Not currently available</span> for mentorship</span>
    }
  }

  render() {
    const {followStatus, availabilityClicked, save4LaterClicked, saved4later} = this.state;
    const mentor = {
      fname: 'Emma',
      city: 'London',
      country: 'UK',
      timeZone: 'UTC',
      avail: 1,
      activeMentees: 2,
      views: 200,
      compTraining: 1,
      lastActiveDate: '1556389526',
      yrsExp: 7,
      uni: 0,
      degree: 'BSc (Hons) Business Administration',
      uniName: 'Bath University',
      subjects: 'Business, Art, English Literature & Language',
      currRole: 'Head of Marketing',
      currCo: 'Pladis',
      currInd: '#food&beverage',
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
      hobbies: 'running, swimming, theatre, yoga, skiing, gabadee',
      activityPublic: 1,
      groupsSet: 1,
      readsSet: 1,
      quotesSet: 1,
      groupDisabilities: 1,
      groupLGB: 1,
      groupBAME: 1,
      groupWomen: 1,
      groupParents: 1,
      groupSingle: 1,
      whyJoin: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
      helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
      roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
    }
    const userReads = [
      {
        id: '11111',
        type: 'book',
        text: 'Bookname by Book Author',
        link: ''
      },
      {
        id: '11112',
        type: 'link',
        text: 'Great video about XYZ',
        link: 'www.youtube.com'
      }
    ]
    const userQuotes = [
      {
        id: '11113',
        author: 'Josh Bridges',
        text: 'Success is not owed. It is leased, and rent is due every day. Pay the man.'
      },
      {
        id: '11114',
        author: 'Nietsche',
        text: 'Those who were seen dancing were thought insane by those who could not hear the music'
      }
    ]
    const userActivity = [
      {
        id: '11117',
        type: 'newRead',
        ts: 'yesterday',
        text: ' has just added a new <strong>recommended read</strong>'
      },
      {
        id: '11118',
        type: 'newQuote',
        ts: 'yesterday',
        text: ' has just added a new <strong>quote</strong>'
      },
      {
        id: '11119',
        type: 'highlight',
        ts: 'yesterday',
        text: ' just had their advice <strong>highlighted</strong>'
      },
      {
        id: '11120',
        type: 'newMatch',
        ts: 'yesterday',
        text: ' just took on a new mentee'
      }
    ]
    const profShareSettings = {
      groups: false
    };
    const lastActive = timeSince(mentor.lastActiveDate);
    const userCurrentTime = profileTimeZone(mentor.timeZone);
    const isDayNight = isNightDay(userCurrentTime);
    const flagEmoji = userFlagEmoji(mentor.country);
    const isPicSet = false;

    return (
      <React.Fragment>
        <div className="article-page profile">
          <div className="row article-container profile">
            <div className="col-3 col-s-12 article-extras profile">
              <div className="profile-thumb-container">
                {isPicSet ? (
                  <img
                    className="profile-thumb img-circle"
                    src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                    alt="User profile pic"
                  />
                  )
                : (
                  <div className="profile-thumb img-circle noPic mentor">{mentor.fname.charAt(0).toUpperCase()}</div>
                )}
                {mentor.compTraining === 1 && (
                  <div className="pr-certified img-circle tooltip">
                    <span>&#10003;</span>
                    <span className="tooltiptext profile">Prospela Certified Mentor: Employee has completed Prospela&#39;s mentoring training</span>
                  </div>
                )}
              </div>
              <h1 className="profileName">{mentor.fname}</h1>
              <div className="profilePosition">{mentor.currRole}</div>
              <a className="profileInstitution link" href="www.prospela.com"><span className="neutralText">&#64;</span> {mentor.currCo}</a>
              <div className="profileIndustryTag">{mentor.currInd}</div>
              <button type="button" className={"Submit-btn " + (followStatus===false ? 'notFollowing' : 'Following')} onClick={this.toggleFollowStatus}>
                {followStatus===false ? 'Follow' : <span>&#10003; Following</span>}
              </button>
              <div>
                <h2>
                  I&#39;m interested in being a mentor because:
                </h2>
                <p>
                  {mentor.whyJoin}
                </p>
                <h2>
                  Location
                </h2>
                <p>
                  <span>
                    <i className={"emoji-icon " + flagEmoji}/>
                  </span>
                  {mentor.city}, {mentor.country}
                </p>
              </div>
            </div>
            <div className="col-6 col-s-12 content-col profile">
              <div className="prLogoContainer profile">
                <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
              </div>
              <div className="article-body profile">
                <section className="scroll-anchor" id="expertise-and-career" name="expertise-and-career">
                  <div className="contentBox">
                    <h2>Credentials & Highlights</h2>
                    <div className="credTxtContainer">
                      <div><span className="credNum">{mentor.yrsExp}</span>years experience</div>
                      <div><span className="credNum">{mentor.activeMentees}</span># active mentees</div>
                      <div><span className="credNum">{mentor.views}</span># content views / reach</div>
                      <div className="lastActiveTxt greenText">Last active <span>{lastActive}</span></div>
                    </div>
                  </div>
                  <h1 >
                    <br/>
                    <i className="emoji-icon suitcase-emoji"/> Expertise & Career
                  </h1>
                  <h2>
                    My current role: <span className="noBold">{mentor.currRole} @ {mentor.currCo}</span>
                  </h2>
                  {mentor.roleDesc != null && (
                    <p>
                      {mentor.roleDesc}
                    </p>
                  )}
                  <h2>
                    Areas of expertise
                  </h2>
                  <p>
                    {mentor.expertise}
                  </p>
                  <h2>
                    Skills I&#39;m currently trying to build
                  </h2>
                  <p>
                    {mentor.learning}
                  </p>
                  {mentor.helpFocus != null && (
                    <React.Fragment>
                      <h2>
                        I&#39;m might be good for helping you with
                      </h2>
                      <p>
                        {mentor.helpFocus}
                      </p>
                    </React.Fragment>
                  )}
                </section>
                <section className="scroll-anchor" id="education" name="education">
                  <h1 >
                    <br/>
                    <i className="emoji-icon schoolHat-emoji"/> Education
                  </h1>
                  <h2>
                    University Degree:
                  </h2>
                  <p>
                    {mentor.uni != 0 ? mentor.degree + ' @ ' + mentor.uniName : 'I didn\'t go to University'}
                  </p>
                  <h2>
                    {eduSubjects(mentor.country)}
                  </h2>
                  <p>
                    {mentor.subjects}
                  </p>
                </section>
                <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                  <h1 >
                    <br/>
                    <i className="emoji-icon rockOn-emoji"/> Outside of work
                  </h1>
                  <h2>
                    When I&#39;m not working, you&#39;ll find me
                  </h2>
                  <p>
                    {mentor.hobbies}
                  </p>
                  {mentor.groupsSet === 1 && profShareSettings.groups === true && (
                    <React.Fragment>
                      <h2>
                        Groups I&#39;m passionate about supporting
                      </h2>
                      <div className="bubbleContainer">
                        {mentor.groupDisabilities === 1 && <div className="bubble">People with disabilities</div>}
                        {mentor.groupLGB === 1 && <div className="bubble">LGBTQI+</div>}
                        {mentor.groupBAME === 1 && <div className="bubble">Black, Asian, Minority Ethnic (BAME)</div>}
                        {mentor.groupWomen === 1 && <div className="bubble">Women in the workforce</div>}
                        {mentor.groupParents === 1 && <div className="bubble">Working parents</div>}
                        {mentor.groupSingle === 1 && <div className="bubble">Single parents</div>}
                      </div>
                    </React.Fragment>
                  )}
                </section>
                {(mentor.activityPublic === 1 || mentor.readsSet === 1 || mentor.quotesSet === 1) && (
                  <section className="scroll-anchor" id="recent-activity" name="recent-activity">
                    {mentor.activityPublic === 1 && (
                      <div className="contentBox">
                        <h1 >
                          <br/>
                          <i className="emoji-icon chat-emoji"/> Recent activity / highlights
                        </h1>
                        {userActivity.map((activity, index) => {
                          return (
                            <UserActivity
                              activity={activity}
                              key={activity.id}
                              fname={mentor.fname}
                            />
                          )
                        })}
                      </div>
                    )}
                    {mentor.readsSet === 1 && (
                      <div className="contentBox">
                        <h2>
                          Good reads / links
                        </h2>
                        {userReads.map((reads, index) => {
                          return (
                            <UserReads
                              reads={reads}
                              key={reads.id}
                            />
                          )
                        })}
                      </div>
                    )}
                    {mentor.quotesSet === 1 && (
                      <div className="contentBox">
                        <h2>
                          Quotes that inspire me
                        </h2>
                        {userQuotes.map((quotes, index) => {
                          return (
                            <UserQuotes
                              quotes={quotes}
                              key={quotes.id}
                            />
                          )
                        })}
                      </div>
                    )}
                  </section>
                )}
              </div>
            </div>
            <div className="col-3 col-s-12 category-list profile">
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
                {(mentor.activityPublic === 1 || mentor.readsSet === 1 || mentor.quotesSet === 1) && (
                  <li>
                    <a href="#recent-activity">Recent activity</a>
                  </li>
                )}
              </ul>
              <div className="profileCTAContainer">
                {availabilityClicked===true || save4LaterClicked===false || save4LaterClicked===true && saved4later===false ? (
                  <div className="profileBtnToolTip avail">
                    {this.availabilityMsg(mentor.avail)}
                  </div>
                  )
                : (
                  <div className="profileBtnToolTip save">
                    <span>Saved as a potential future mentor!</span>
                  </div>
                  )
                }
                <div className="profileUserCTA">
                  {mentor.avail === 1 || mentor.avail === 2 || mentor.avail === 3 ? (
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
                  <button type="button" className="profileBtn">
                    <i className="fas fa-share-alt"/>
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
                      <div className={"UserTimeZone " + isDayNight}>{mentor.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"mapImg " + mentor.city}>
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
