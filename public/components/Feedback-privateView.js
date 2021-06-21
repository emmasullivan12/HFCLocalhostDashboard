// Dex last merged this code on 21st june 2021

import React, { Component } from "react";

import Avatar from './Avatar.js';
import {DateCalc, LoadingSpinner} from './GeneralFunctions.js';

import "../css/Feedback.css";

class FeedbackPrivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  getRatingStrength = (name) => {
  /*      {value: '0', label: 'They\'re thriving'},
          {value: '1', label: 'Good'},
          {value: '2', label: 'Needs some work'},
          {value: '3', label: 'Inadequate'} */
    /*switch(rating) {
      case 0:
        return "strong"
      case 1:
        return "good"
      case 2:
        return "needsWork"
      case 3:
        return "weak"
    }*/
  }

  renderMenteeRatings = (menteeComms, menteeCurio, menteeAmb, menteeConf, menteeNetw) => {
    let ratingsArr = [
      {name: "menteeComms", label: "Communication", rating: menteeComms, description: 'Communication: Communicating clearly, in a professional & friendly way', detail: 'e.g. speaking to-the-point, good grammar & spelling, injected with a bit of personality'},
      {name: "menteeCurio", label: "Curiosity", rating: menteeCurio, description: 'Curiosity: Showing curiosity, open-mindedness and proactively asking for help', detail: 'e.g. asking lots of questions, delving deeper on topics ("why / how?"), and demonstrating a desire for learning new things'},
      {name: "menteeAmb", label: "Ambition", rating: menteeAmb, description: 'Ambition: Demonstrating ambition, drive & a clear commitment to accomplishing your goals', detail: 'e.g. having a clear career motivation and seemingly being willing to do whatever it takes to be successful'},
      {name: "menteeConf", label: "Confidence", rating: menteeConf, description: 'Confidence: A genuine confidence & belief in your own ability to succeed', detail: 'e.g. being clear about your own relative strengths & weaknesses, feeling comfortable that you can develop any skills you are lacking and appearing resilient when challenged / facing a hurdle'},
      {name: "menteeNetw", label: "Networking", rating: menteeNetw, description: 'Networking: Trying to build a strong relationship with your mentor and showing an appreciation that networking can open doors', detail: 'e.g. coming across likeable, showing regular appreciation for your mentor\'s help and perhaps offering advice / insights back too!'}
    ]
    let strongArr = ratingsArr.filter(x => x.rating == 0)
    let goodArr = ratingsArr.filter(x => x.rating == 1)
    let needsWorkArr = ratingsArr.filter(x => x.rating == 2)
    let weakArr = ratingsArr.filter(x => x.rating == 3)

    // MAYBE EXPLAIN WHAT COLOUR CODING MEANS i.e. the detail of what mentor rated "communicated clearly, professionally and with an injection of personality"

    return (
      <React.Fragment>
        <div className="marginBottom20">
          <div className="bold marginBottom5 smallFont">They thought you were:</div>
          {strongArr.length > 0 && (
            <div className="marginBottom5">
              <div className="smallFont marginBottom5 thrivingFontColor"><span role="img" aria-label="celebrateEmoji">🎉</span>Thriving in:</div>
              <div className="ratingBubblesContainer">
                {strongArr.map((item) => {
                  console.log(item)
                  return (
                    <div className="bubble strong tooltip" key={item.label}>
                      {item.label}
                      <span className="tooltiptext ratings">
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
                      <span className="tooltiptext ratings">
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
                      <span className="tooltiptext ratings">
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
                      <span className="tooltiptext ratings">
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

  renderFeedback = () => {
    const {feedbackArr, userRole, type} = this.props;
    const menteesustep = 'ASK DEX'
    const mentorsustep = 'ASK DEX'

    // No feedback to show
    if (feedbackArr.length == 0) {
      const doneFullSU = true
/*       const doneFullSU = (userRole == 'mentee' && menteesustep == 'NEED TO CHECK STEPS WITH DEX') || (userRole == 'mentor' && mentorsustep == 'NEED TO CHECK STEPS WITH DEX')*/

      // Not completed full sign up, then prompt them to complete
      if ( doneFullSU == false ) {
        return (
          <div className="restrictedContent greyText">
            <div><i className="fas fa-exclamation" /></div>
            You need to complete your full sign up and get a mentoring match to give and receive endorsements
          </div>
        )

      // Awaiting a match or has not reached point where feedback requested or still waiting for match to give feedback
      } else {
        return (
          <div className="restrictedContent greyText">
            Your endorsements will show here once you and your match have completed your chat feedback (typically after 2 months of chatting)
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
            return (
              <div key={item.matchid} className="row feedbackItem">
                <div className="col-4 col-s-12">
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
                  {userRole == 'mentee' && item.referenceForMentee != '' && (
                    <div className="lineHeight16 marginBottom20">{item.referenceForMentee}</div>
                  )}
                  {userRole == 'mentee' && (
                    <React.Fragment>
                      <div className="privateFeedbackSection">
                        <div className="smallFont">Private Feedback</div>
                        <div className="smallFont">(Will not be publicised if you choose to share this reference on your profile)</div>
                        {this.renderMenteeRatings(item.menteeComms, item.menteeCurio, item.menteeAmb, item.menteeConf, item.menteeNetw) }
                        <div className="bold marginBottom5 smallFont">A private note from {matchName}:</div>
                        <div className="referenceText marginBottom5">
                          <div className="message-extras-border lightPurple" />
                          <div>
                            <i className="fas fa-quote-left"/> {item.privNoteToMentee}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
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
