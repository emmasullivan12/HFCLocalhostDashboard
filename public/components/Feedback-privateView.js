// Dex last merged this code on 18th aug 2021

import React, { Component } from "react";

import Avatar from './Avatar.js';
import {DateCalc, LoadingSpinner} from './GeneralFunctions.js';
import Checkbox from './Checkbox.js';
import PolarChart from './PolarChart.js';

import "../css/Feedback.css";

class FeedbackPrivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    // DEX TO SAVE DOWN ISPUBLIC BASED ON E.TARGET.NAME (WHICH IS FORMATTED LIKE THIS: item.matchid+"-"+userRole+"-isPublic", SO SPLIT BY "-" TO GRAB MATCH ID + USERROLE)
    if (currentState === false || currentState == null) {
      this.setState({
        [e.target.name]: true,
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  renderMentorRatings = (mentorCompFuture, mentorRoleModel, mentorHighPerf, mentorIndivSupport, mentorIntellStimu, mentorDirLeader) => {
    return (
      <React.Fragment>
        <div className="marginBottom20">
          <div className="bold marginBottom5 smallFont">Their view of your mentoring style:</div>
          <PolarChart
            dataset1={[
              {
                "label": 'Creating a compelling future',
                "value": (mentorCompFuture + 1)
              },
              {
                "label": 'Leading by example',
                "value": (mentorRoleModel + 1)
              },
              {
                "label": 'High performance expectations',
                "value": (mentorHighPerf + 1)
              },
              {
                "label": 'Individualised support',
                "value": (mentorIndivSupport + 1)
              },
              {
                "label": 'Intellectual Stimulation',
                "value": (mentorIntellStimu + 1)
              },
              {
                "label": 'Directive Leadership',
                "value": (mentorDirLeader + 1)
              },
            ]}
          //  dataset1Title="Mentoring style ratings"
            dataset1FillArr={[
              'rgba(78,78,214,.3)', // purple
              'rgba(255,193,7,.3)', // orange
              'rgba(21,205,148,.3)', // green
              'rgba(252,225,0,.3)', // yellow
              'rgba(0,176,240,.3)', // blue
              'rgba(249,123,171,.3)', // pink
            ]}
            dataset1BorderColorArr={[
              'rgba(78,78,214,1)', // purple
              'rgba(255,193,7,1)', // orange
              'rgba(21,205,148,1)', // green
              'rgba(252,225,0,1)', // yellow
              'rgba(0,176,240,1)', // blue
              'rgba(249,123,171,1)', // pink
            ]}
            dataset1HoverFillArr={[
              'rgba(78,78,214,1)', // purple
              'rgba(255,193,7,1)', // orange
              'rgba(21,205,148,1)', // green
              'rgba(252,225,0,1)', // yellow
              'rgba(0,176,240,1)', // blue
              'rgba(249,123,171,1)', // pink
            ]}
            dataset1LabelTextArr={[ // Mapping the ratings to text to show instead e.g. high / med / low instead of 3, 2, 1. Must be in order from smallest value to highest
              {value: '0', label: 'Never'}, // Never
              {value: '1', label: 'Rarely'}, // Rarely
              {value: '2', label: 'Sometimes'}, // Sometimes
              {value: '3', label: 'Regularly'}, // Regularly
            ]}
            showLegend={false}
            showTicks={false}
          />
          <div className="marginBottom5">
            <div className="bold marginBottom5 smallFont">Key:</div>
            <div className="ratingBubblesContainer">
              <div className="bubble tooltip purple">
                Creating a compelling future
                <span className="tooltiptext ratings textLeft">
                  <div><strong>Creating a compelling future</strong></div>
                  <div className="tooltiptextDetail">Helping them focus, prioritise and set a clear vision for the future, e.g. helping with decision making and visualising what success might look like</div>
                </span>
              </div>
              <div className="bubble tooltip orange">
                Leading by example
                <span className="tooltiptext ratings textLeft">
                  <div><strong>Leading by example</strong></div>
                  <div className="tooltiptextDetail">Sharing your own experiences and best practice from other role models, e.g. explaining how you approach similar challenges / experiences, or analysing how others achieve great performance</div>
                </span>
              </div>
              <div className="bubble tooltip green">
                High performance expectations
                <span className="tooltiptext ratings textLeft">
                  <div><strong>High performance expectations</strong></div>
                  <div className="tooltiptextDetail">Insisting on high effort from your mentee and encouraging them to push themselves, e.g. you set high expectations, challenge them, and show belief that they can achieve more, go further or work harder</div>
                </span>
              </div>
              <div className="bubble tooltip yellow">
                Individualised support
                <span className="tooltiptext ratings textLeft">
                  <div><strong>Individualised support</strong></div>
                  <div className="tooltiptextDetail">Encouraging your mentee to express their thoughts & feelings and / or discuss non-career related topics</div>
                </span>
              </div>
              <div className="bubble tooltip blue">
                Intellectual Stimulation
                <span className="tooltiptext ratings textLeft">
                  <div><strong>Intellectual Stimulation</strong></div>
                  <div className="tooltiptextDetail">Playing devils advocate, challenging your mentee to think of new ideas, ways of thinking and / or how to solve problems</div>
                </span>
              </div>
              <div className="bubble tooltip pink">
                Directive Leadership
                <span className="tooltiptext ratings textLeft">
                  <div><strong>Directive Leadership</strong></div>
                  <div className="tooltiptextDetail">Giving your mentee detailed instructions and specific tasks to complete</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderMenteeRatings = (userRole, menteeComms, menteeCurio, menteeAmb, menteeConf, menteeNetw) => {
    let ratingsArr = [
      {name: "menteeComms", label: "Communication", rating: menteeComms, description: 'Communication: Communicating clearly, in a professional & friendly way', detail: 'e.g. speaking to-the-point, good grammar & spelling, injected with a bit of personality'},
      {name: "menteeCurio", label: "Curiosity", rating: menteeCurio, description: 'Curiosity: Showing curiosity, open-mindedness and proactively asking for help', detail: 'e.g. asking lots of questions, delving deeper on topics ("why / how?"), and demonstrating a desire for learning new things'},
      {name: "menteeAmb", label: "Ambition", rating: menteeAmb, description: 'Ambition: Demonstrating ambition, drive & a clear commitment to accomplishing your goals', detail: 'e.g. having a clear career motivation and seemingly being willing to do whatever it takes to be successful'},
      {name: "menteeConf", label: "Confidence", rating: menteeConf, description: 'Confidence: A genuine confidence & belief in one\'s own ability to succeed', detail: 'e.g. being clear about relative personal strengths & weaknesses, feeling comfortable to develop any skills that are lacking and appearing resilient when challenged / facing a hurdle'},
      {name: "menteeNetw", label: "Networking", rating: menteeNetw, description: 'Networking: Trying to build a strong relationship with the mentor and showing an appreciation that networking can open doors', detail: 'e.g. coming across likeable, showing regular appreciation for a mentor\'s help and perhaps offering advice / insights back too!'}
    ]
    let strongArr = ratingsArr.filter(x => x.rating == 0)
    let goodArr = ratingsArr.filter(x => x.rating == 1)
    let needsWorkArr = ratingsArr.filter(x => x.rating == 2)
    let weakArr = ratingsArr.filter(x => x.rating == 3)

    // MAYBE EXPLAIN WHAT COLOUR CODING MEANS i.e. the detail of what mentor rated "communicated clearly, professionally and with an injection of personality"

    return (
      <React.Fragment>
        <div className="marginBottom20">
          <div className="bold marginBottom5 smallFont">{userRole == 'mentor' ? 'You thought they were:' : 'They thought you were:'} </div>
          {strongArr.length > 0 && (
            <div className="marginBottom5">
              <div className="smallFont marginBottom5 thrivingFontColor"><span role="img" aria-label="celebrateEmoji">🎉</span>Thriving in:</div>
              <div className="ratingBubblesContainer">
                {strongArr.map((item) => {
                  return (
                    <div className="bubble strong tooltip" key={item.label}>
                      {item.label}
                      <span className="tooltiptext ratings textLeft">
                        <div><strong>{item.description}</strong></div>
                        <div className="tooltiptextDetail">{item.detail}</div>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {goodArr.length > 0 && (
            <div className="marginBottom5">
              <div className="smallFont marginBottom5 goodFontColor"><span role="img" aria-label="okEmoji">👌</span>Good at:</div>
              <div className="ratingBubblesContainer">
                {goodArr.map((item) => {
                  return (
                    <div className="bubble good tooltip" key={item.label}>
                      {item.label}
                      <span className="tooltiptext ratings textLeft">
                        <div><strong>{item.description}</strong></div>
                        <div className="tooltiptextDetail">{item.detail}</div>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {needsWorkArr.length > 0 && (
            <div className="marginBottom5">
              <div className="smallFont marginBottom5 needsWorkFontColor"><span role="img" aria-label="toolsEmoji">🛠️</span>Needing to work on:</div>
              <div className="ratingBubblesContainer">
                {needsWorkArr.map((item) => {
                  return (
                    <div className="bubble needsWork tooltip" key={item.label}>
                      {item.label}
                      <span className="tooltiptext ratings textLeft">
                        <div><strong>{item.description}</strong></div>
                        <div className="tooltiptextDetail">{item.detail}</div>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {weakArr.length > 0 && (
            <div className="marginBottom5">
              <div className="smallFont marginBottom5 weakFontColor"><span role="img" aria-label="thumbsDownEmoji">👎</span>Fairly poor at:</div>
              <div className="ratingBubblesContainer">
                {weakArr.map((item) => {
                  return (
                    <div className="bubble weak tooltip" key={item.label}>
                      {item.label}
                      <span className="tooltiptext ratings textLeft">
                        <div><strong>{item.description}</strong></div>
                        <div className="tooltiptextDetail">{item.detail}</div>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }

  getInsightsType = (insightsType) => {
    switch(insightsType) {
      case 1:
        return 'Work-life reality (e.g. hours, stress, etc.)'
      case 2:
        return 'Industry / sector trends & insights'
      case 3:
        return 'Your company\'s culture (e.g. team, values)'
      case 4:
        return 'Your current role & responsibilities'
      case 5:
        return 'Your career path so far'
      case 6:
        return 'Job application best practice'
      case 7:
        return 'Real pictures of work life & environment'
    }
  }

  renderMenteeInsightsReq = (menteeWantsMoreOf) => {
    if (menteeWantsMoreOf.length == 1) {
      return (
        <ul>
          <li>{this.getInsightsType(menteeWantsMoreOf[0])}</li>
        </ul>
      )
    } else {
      return (
        <ul>
          {menteeWantsMoreOf.map((item, index) => {

            // Check isn't the last one in the array
            if (index != menteeWantsMoreOf.length - 1) {
          //  if (index != menteeWantsMoreOf.length - 1) {
              return (
                <li>{this.getInsightsType(item)}</li>
              )
            } else {
              return (
                <li>and {this.getInsightsType(item)}.</li>
              )
            }
          })}
        </ul>
      )
    }
  }

  renderFeedback = () => {
    const {feedbackArr, userRole, type, feedbackType} = this.props;
  //  const menteesustep = 'ASK DEX'
  //  const mentorsustep = 'ASK DEX'

    // No feedback to show
    if (feedbackArr.length == 0) {
      const doneFullSU = true
/*       const doneFullSU = (userRole == 'mentee' && menteesustep == 'NEED TO CHECK STEPS WITH DEX') || (userRole == 'mentor' && mentorsustep == 'NEED TO CHECK STEPS WITH DEX')*/

      // Not completed full sign up, then prompt them to complete
      if ( doneFullSU == false ) {
        return (
          <div className="restrictedContent darkGreyText">
            <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
            You need to complete your full sign up and get a mentoring match to give and receive endorsements
          </div>
        )

      // Awaiting a match or has not reached point where feedback requested or still waiting for match to give feedback
      } else {
        return (
          <div className="restrictedContent darkGreyText">
            <div className="fontSize20"><i className="fas fa-exclamation-circle" /></div>
            Your endorsements will show here once you and your match have both completed your chat feedback (typically after 2 months of chatting)
          </div>
        )
      }

    } else {

      // Show newest matches first
      feedbackArr.sort(function(a,b){
        if(a.date_matched < b.date_matched) { return -1; }
        if(a.date_matched > b.date_matched) { return 1; }
        return 0;
      })

      return (
        <React.Fragment>
          {feedbackArr.map((item, index) => {
            const userName = userRole == 'mentee' ? item.menteename : item.mentorname
            const matchName = userRole == 'mentee' ? item.mentorname : item.menteename
            const matchuid = userRole == 'mentee' ? item.mentoruid : item.menteeuid
            const eetStatus = item.eetstatus
            const menteeWantsMoreOfArr = item.menteeWantsMoreOf.filter(x => x != 0) // i.e. mentee did not respond saying "None of these" options for things they wanted their mentor to share
            return (
              <div key={item.matchid} className="row feedbackItem">
                <div className="col-4 col-s-12 paddingR">
                  <Avatar userID={matchuid} userName={matchName}/>
                  <div className="bold lineHeight16">{matchName}</div>
                  <div className="marginBottom5 smallFont">
                    {eetStatus == 'sch' && (
                      <div><span className="roleText">Student</span></div>
                    )}
                    {eetStatus == 'uni' && (
                      <div><span>{item.degree}</span><div>@ {item.uniname}</div></div>
                    )}
                    {eetStatus == 'job' && (
                      <div><span>{item.currrole}</span><div>@ {item.currco}</div></div>
                    )}
                    {eetStatus == 'train' && (
                      <div><span>{item.currtraining}</span><div>@ {item.currtrainingprovider}</div></div>
                    )}
                    {eetStatus == 'none' && (
                      <div><span>Looking for opportunities</span></div>
                    )}
                  </div>
                  <div className="fontSize12 greyText normalLineheight marginBottom5">{matchName} was {userName}&#39;s {userRole == 'mentee' ? 'mentor' : 'mentee'} since <DateCalc time={item.date_matched} showPureDate /></div>
                </div>
                <div className="col-8 col-s-12">
                  {userRole == 'mentee' && feedbackType == 'received' && item.referenceForMentee != '' && item.referenceForMentee != null && (
                    <React.Fragment>
                      <div className="lineHeight16 marginBottom5"><i className="fas fa-quote-left"/> {item.referenceForMentee}</div>
                      <div className="notifToggleContainer rightAlign paddingTop marginBottom20">
                        <span className="notifToggleTxt">{(item.isPublic == true || this.state[item.matchid+"-"+userRole+"-isPublic"] == true) ? '👁️ Visible' : 'Add comment to my profile'}</span>
                        <Checkbox
                          labelClassName="switch"
                          id="make-feedback-public"
                          name={item.matchid+"-"+userRole+"-isPublic"}
                          spanClassName="slider round"
                          onChange={this.toggleCheckbox}
                          defaultChecked={item.isPublic}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {userRole == 'mentee' && feedbackType == 'received' && (
                    <React.Fragment>
                      <div className="privateFeedbackSection">
                        <div className="bold marginBottom5 smallFont">A private note from {matchName}:</div>
                        <div className="referenceText marginBottom20">
                          <div className="message-extras-border lightPurple" />
                          <div>
                            <i className="fas fa-quote-left"/> {item.privNoteToMentee}
                          </div>
                        </div>
                        {this.renderMenteeRatings(userRole, item.menteeComms, item.menteeCurio, item.menteeAmb, item.menteeConf, item.menteeNetw) }
                      </div>
                    </React.Fragment>
                  )}
                  {userRole == 'mentee' && feedbackType == 'given' && (
                    <div className="lineHeight16 marginBottom20"><i className="fas fa-quote-left"/> {item.noteToMentor}</div>
                  )}
                  {userRole == 'mentor' && feedbackType == 'received' && (
                    <React.Fragment>
                      <div className="lineHeight16 marginBottom5"><i className="fas fa-quote-left"/> {item.noteToMentor}</div>
                      <div className="notifToggleContainer rightAlign paddingTop marginBottom20">
                        <span className="notifToggleTxt">{(item.isPublic == true || this.state[item.matchid+"-"+userRole+"-isPublic"] == true) ? '👁️ Visible' : 'Add comment to my profile'}</span>
                        <Checkbox
                          labelClassName="switch"
                          id="make-feedback-public"
                          name={item.matchid+"-"+userRole+"-isPublic"}
                          spanClassName="slider round"
                          onChange={this.toggleCheckbox}
                          defaultChecked={item.isPublic}
                        />
                      </div>
                      <div className="privateFeedbackSection">
                        {menteeWantsMoreOfArr.length > 0 && (
                          <React.Fragment>
                            <div className="bold marginBottom5 smallFont">A private note from {matchName}:</div>
                            <div className="referenceText marginBottom20">
                              <div>
                                I&#39;d love to see more insights to: {this.renderMenteeInsightsReq(menteeWantsMoreOfArr)}
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                        {this.renderMentorRatings(item.mentorCompFuture, item.mentorRoleModel, item.mentorHighPerf, item.mentorIndivSupport, item.mentorIntellStimu, item.mentorDirLeader) }
                      </div>
                    </React.Fragment>
                  )}
                  {userRole == 'mentor' && feedbackType == 'given' && item.referenceForMentee != '' && item.referenceForMentee != null && (
                    <div className="lineHeight16 marginBottom20"><i className="fas fa-quote-left"/> {item.referenceForMentee}</div>
                  )}
                  {userRole == 'mentor' && feedbackType == 'given' && (
                    <div className="privateFeedbackSection">
                      <div className="bold marginBottom5 smallFont">Your private note to {matchName}:</div>
                      <div className="referenceText marginBottom20">
                        <div className="message-extras-border lightPurple" />
                        <div>
                          <i className="fas fa-quote-left"/> {item.privNoteToMentee}
                        </div>
                      </div>
                      {this.renderMenteeRatings(userRole, item.menteeComms, item.menteeCurio, item.menteeAmb, item.menteeConf, item.menteeNetw) }
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    }

  }

  render() {
    const {isLoading} = this.state;

    return (
      <React.Fragment>
        {isLoading == true && (
          <div className="loadingPotentialMatches">
            <p>
              Loading...
            </p>
            <LoadingSpinner />
          </div>
        )}
        {isLoading == false && (
          <div className="feedbackContainer">
            { this.renderFeedback() }
          </div>
        )}
      </React.Fragment>
    )

  }
}

export default FeedbackPrivate;
