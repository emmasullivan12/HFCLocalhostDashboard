// Dex last merged this code on 17th Sept 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import Modal from './Modal.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import UserActivity from './UserActivity.js';
import UserReads from './UserReads.js';
import UserQuotes from './UserQuotes.js';
import {availabilityMsg, userFlagEmoji, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone} from './UserDetail.js';

import "../css/General.css";
import "../css/Article.css";
import "../css/Emoji.css";
import "../css/Profile.css";

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Profile Picture',
  triggerText: 'Add/Edit Profile pic',
  usedFor: 'addPicBtn'
}

class MenteeProfileContent extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const mentee = {
      fname: 'Dexter',
      is18plus: 1,
      city: 'London',
      country: 'UK',
      timeZone: 'UTC',
      avail: 1,
      prevMentors: 1,
      highlights: 10,
      lastActiveDate: '1556389526',
      certainty: 10,
      knowNextSteps: 4,
      knowSkills: 2,
      eetStatus: 1, // 0=school, 1=uni, 2=employment, 3=training, 4=NEET
      schYrGrp: 'Year 12 (USA/Canada Grade 11)',
      uniYrGrp: 'Second Year',
      planningUni: 2, // 0=no, 1=yes, 2=maybe, 3=not sure
      schName: '',
      uniName: 'Bath University',
      degree: 'BSc (Hons) Business Administration',
      graduYr: '2020',
      currRole: 'Head of Marketing',
      currCo: 'Pladis',
      currTraining: 'Apprenticeship learning plumbing',
      currTrainingProvider: 'NextGenSkills Academy',
      subjects: 'Business, Art, English Literature & Language',
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      hobbies: 'running, swimming, theatre, yoga, skiing, gabadee',
      activityPublic: 1,
      groupsSet: 1,
      readsSet: 1,
      quotesSet: 1,
      groupDisabilities: 0,
      groupLGB: 1,
      groupBAME: 1,
      groupWomen: 1,
      groupParents: 0,
      groupSingle: 0,
      whyJoin: 'I want help in starting my career. I\'d love to get advice from those in the know and see work life insights.',
      careerInterest: 'Doing VFX in the movie industry and would like to become a Producer one day',
      lifestyle: 'Not long hours. Working 9-5pm to spend time with my family and friends. Wliling to work hard.',
      workingOn: 'CV, Ucas application, building a portfolio'
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
    const isPicSet = false; // Has user added a profile pic? If not, show placeholder pic
    const userRole = 'mentee';
    const isMe = userRole === 'mentee' ? 'isMe' : 'isntMe';
    const profShareSettings = {
      groups: false
    };
    const lastActive = timeSince(mentee.lastActiveDate);
    const userCurrentTime = profileTimeZone(mentee.timeZone);
    const isDayNight = isNightDay(userCurrentTime);
    const flagEmoji = userFlagEmoji(mentee.country);
    const eduInstName = eduName(mentee.schName, mentee.uniName);

    return (
      <React.Fragment>
        <div className="article-page profile">
          <div className="row article-container profile">
            <div className="col-3 col-s-12 article-extras profile">
              <div className="profile-thumb-container">
                {isPicSet ? (
                  <div className={"profile-thumb img-circle allowAddPic "+isMe}>
                    {isMe === 'isMe' && (
                      <Modal {...UploadProfPicProps}>
                        <UploadProfPicContent />
                      </Modal>
                    )}
                    <img
                      src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                      alt="User profile pic"
                    />
                  </div>
                  )
                : (
                  <div className={"profile-thumb img-circle allowAddPic noPic mentee "+isMe}>
                    {isMe === 'isMe' && (
                      <Modal {...UploadProfPicProps}>
                        <UploadProfPicContent />
                      </Modal>
                    )}
                    <div className="userInitial">
                      {mentee.fname.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <h1 className="profileName">{mentee.fname}</h1>
              <div className="profilePosition student">{eetStatus(mentee.eetStatus, mentee.schYrGrp, mentee.uniYrGrp)}</div>
              {mentee.is18plus === 1 && (
                <div className="profileInstitution">
                  <span className="neutralText">&#64;</span> <strong>{mentee.eetStatus===0 || mentee.eetStatus===1 ? eduInstName : (mentee.currCo)}</strong>
                </div>
              )}
              <div>
                <h2>
                  I&#39;m interested in getting a mentor because:
                </h2>
                <p>
                  {mentee.whyJoin}
                </p>
                <h2>
                  Location
                </h2>
                <p>
                  <span>
                    <i className={"emoji-icon " + flagEmoji}/>
                  </span>
                  {mentee.city}, {mentee.country}
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
                      <div><span className="credNum">{mentee.prevMentors}</span># previous mentors</div>
                      <div><span className="credNum">{mentee.highlights}</span># highlights</div>
                      <div className="lastActiveTxt greenText">Last active <span>{lastActive}</span></div>
                    </div>
                  </div>
                  <h1 >
                    <br/>
                    <i className="emoji-icon suitcase-emoji"/> Career Aspirations
                  </h1>
                  <h2>
                    I&#39;m interested in
                  </h2>
                  <p>
                    {mentee.careerInterest}
                  </p>
                  <h2>
                    The lifestyle I&#39;m hoping for
                  </h2>
                  <p>
                    {mentee.lifestyle}
                  </p>
                  <h2>
                    I consider some of my key skills to be:
                  </h2>
                  <p>
                    {mentee.expertise}
                  </p>
                  <h2>
                    Self-ratings
                  </h2>
                  <p>
                    <span className="impactTxt">I know what I want to do for my career:</span>
                    <span className="impactRating">{mentee.certainty}</span><span className="neutralText"> / 10</span>
                  </p>
                  <p>
                    <span className="impactTxt">I know what I need to do next to get down my preferred career path:</span>
                    <span className="impactRating">{mentee.knowNextSteps}</span><span className="neutralText"> / 10</span>
                  </p>
                  <p>
                    <span className="impactTxt">I know what skills employers are looking for:</span>
                    <span className="impactRating">{mentee.knowSkills}</span><span className="neutralText"> / 10 </span>
                  </p>
                  <h2>
                    Things I&#39;m currently working on to support my career next steps
                  </h2>
                  <p>
                    {mentee.workingOn}
                  </p>
                </section>
                <section className="scroll-anchor" id="education" name="education">
                  <h1 >
                    <br/>
                    <i className="emoji-icon schoolHat-emoji"/> Education & Work Experience
                  </h1>
                  {mentee.eetStatus === 1 && (
                    <React.Fragment>
                      <h2>
                        University Degree:
                      </h2>
                      <p>
                        {mentee.degree + ' @ ' + mentee.eduName}
                        <span className="neutralText dispBlock">(Class of {mentee.graduYr})</span>
                      </p>
                    </React.Fragment>
                  )}
                  {mentee.eetStatus === 0 && (
                    <React.Fragment>
                      <h2>
                        {eduSubjects(mentee.country)}
                      </h2>
                      <p>
                        {mentee.subjects}
                      </p>
                    </React.Fragment>
                  )}
                  {mentee.eetStatus === 2 && (
                    <React.Fragment>
                      <h2>
                        Current Employment
                      </h2>
                      <p>
                        {mentee.currRole} @ {mentee.currCo}
                      </p>
                    </React.Fragment>
                  )}
                  {mentee.eetStatus === 3 && (
                    <React.Fragment>
                      <h2>
                        Currently in Training
                      </h2>
                      <p>
                        {mentee.currTraining} with <strong>{mentee.currTrainingProvider}</strong>
                      </p>
                    </React.Fragment>
                  )}
                  {mentee.eetStatus != 1 && (
                    <React.Fragment>
                      <h2>
                        Planning on going to University?
                      </h2>
                      <p>
                        {planningUni(mentee.planningUni)}
                      </p>
                    </React.Fragment>
                  )}
                </section>
                <section className="scroll-anchor" id="hobbies-interests" name="hobbies-interests">
                  <h1 >
                    <br/>
                    <i className="emoji-icon rockOn-emoji"/> Hobbies & Interests
                  </h1>
                  <h2>
                    In my spare time, you&#39;ll find me
                  </h2>
                  <p>
                    {mentee.hobbies}
                  </p>
                  {mentee.groupsSet === 1 && profShareSettings.groups === true && (
                    <React.Fragment>
                      <h2>
                        Groups I&#39;m passionate about supporting
                      </h2>
                      <div className="bubbleContainer">
                        {mentee.groupDisabilities === 1 && <div className="bubble">People with disabilities</div>}
                        {mentee.groupLGB === 1 && <div className="bubble">LGBTQI+</div>}
                        {mentee.groupBAME === 1 && <div className="bubble">Black, Asian, Minority Ethnic (BAME)</div>}
                        {mentee.groupWomen === 1 && <div className="bubble">Women in the workforce</div>}
                        {mentee.groupParents === 1 && <div className="bubble">Working parents</div>}
                        {mentee.groupSingle === 1 && <div className="bubble">Single parents</div>}
                      </div>
                    </React.Fragment>
                  )}
                </section>
                {(mentee.activityPublic === 1 || mentee.readsSet === 1 || mentee.quotesSet === 1) && (
                  <section className="scroll-anchor" id="recent-activity" name="recent-activity">
                    {mentee.activityPublic === 1 && (
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
                              fname={mentee.fname}
                            />
                          )
                        })}
                      </div>
                    )}
                    {mentee.readsSet === 1 && (
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
                    {mentee.quotesSet === 1 && (
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
                  <a href="#expertise-and-career" className="active">Career Aspirations</a>
                </li>
                <li>
                  <a href="#education">Education & Work Experience</a>
                </li>
                <li>
                  <a href="#hobbies-interests">Hobbies & Interests</a>
                </li>
                {(mentee.activityPublic === 1 || mentee.readsSet === 1 || mentee.quotesSet === 1) && (
                  <li>
                    <a href="#recent-activity">Recent activity</a>
                  </li>
                )}
              </ul>
              <div className="profileCTAContainer">
                <div className="profileBtnToolTip avail">
                  {availabilityMsg(mentee.avail)}
                </div>
                <div className="profileUserCTA small">
                  {mentee.avail === 1 || mentee.avail === 2 || mentee.avail === 3 ? (
                    <button type="button" className="profileBtn">
                      <span>&#10003;</span>
                    </button>
                    )
                  : (
                    <button type="button" className="profileBtn redTextBorderBkgnd">
                      <span>&#10007;</span>
                    </button>
                    )
                  }
                  <div className="timeContainer small">
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
                      <div className={"UserTimeZone " + isDayNight}>{mentee.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"mapImg " + mentee.city}>
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

export default MenteeProfileContent;
