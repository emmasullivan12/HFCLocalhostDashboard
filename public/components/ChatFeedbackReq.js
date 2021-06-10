// Dex last merged this code on 15th sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Avatar from './Avatar.js';
import {Check} from './GeneralFunctions.js';
import FeedbackSuccessContent from './FeedbackSuccessModalContent.js'
import Form from './Form.js';
import FullPageModal from './FullPageModal.js';
import Modal from './Modal.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';

const MenteeFeedbackProps = {
  ariaLabel: 'Complete your chat feedback',
  triggerText: 'Complete Feedback',
//  focusOnLoad: true,
  usedFor: 'menteeChatFeedback',
  backBtn: 'arrow',
  changeInitFocus: true,
}
const MentorFeedbackProps = {
  ariaLabel: 'Complete your chat feedback',
  triggerText: 'Complete Feedback',
  usedFor: 'mentorChatFeedback',
  backBtn: 'arrow',
  changeInitFocus: true,
}
const FeedbackSuccessProps = {
  ariaLabel: 'Feedback sent successfully!',
  triggerText: 'Feedback sent successfully',
  usedFor: 'feedbackSuccess',
  hideTrigger: true,
  changeInitFocus: true,
}

function TimeCalc(props) {
  var ts = new Date(props.time);
  var hour = ts.getHours();
  var min = ts.getMinutes();
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  min = min >= 0 && min < 10 ? '0'+min : min;
  var timeTxt = hour + ':' + min + ' ' + ampm;
  return timeTxt;
}

// Pbot to send both chat participants invite to provide chat feedback (after 2 months AND >= 20 messages sent)
class ChatFeedbackReq extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showFeedbackSuccessModal: false
    }
  }

  closeFeedbackSuccessModal = () => {
    this.setState({
      showFeedbackSuccessModal: false
    });
  }

  render() {
    const {userRole, message, isProspelaAuto} = this.props
    const {showFeedbackSuccessModal} = this.state;

    const menteeName = 'Emma'
    const mentorName = 'Dexter'
    const feedbackDoneMentee = false
    const feedbackDoneMentor = false
    let text;
    let feedbackBtnToShow;
    let feedbackDone;

    const menteeTxt = 'Hi @' + menteeName + '! \n\n~*📢 IT\'S CHAT FEEDBACK TIME! 📝*~ \n\n You\'ve had some time to kick off your conversation. Now, take a minute to *reflect* on the experience so far, *share some feedback* and *how you\'d like to engage* with ' + mentorName + ' going forward. \n\n You\'ll have space to leave private feedback, just for ' + mentorName + ', and other requests to help you get the most out of your match.\n\n _You\'ll be able to continue chatting afterwards and we won\'t share any of your responses until after ' + mentorName + ' leaves their feedback too._ '
    const mentorTxt = 'Hi @' + mentorName + '! \n\n~*📢 IT\'S CHAT FEEDBACK TIME! 📝*~ \n\n You\'ve had some time to kick off your conversation. Now, take a minute to *reflect* on the experience so far, *share some feedback* and *how you\'d like to engage* with ' + menteeName + ' going forward. \n\n You\'ll have space to leave private feedback, just for ' + menteeName + ', and public comments if you\'d like to help give them a leg up with a positive reference.\n\n _You\'ll be able to continue chatting afterwards and we won\'t share any of your responses until after ' + menteeName + ' leaves their feedback too._ '

    if (userRole == 'mentee') {
      feedbackBtnToShow = 'mentee'
      text = menteeTxt
      feedbackDone = feedbackDoneMentee
    } else if (userRole == 'mentor') {
      feedbackBtnToShow = 'mentor'
      text = mentorTxt
      feedbackDone = feedbackDoneMentor
    }

    var questionsMentee = [
      {q: 'How satisfied are you with how your relationship is progressing with ' + mentorName + ' so far?', detail: 'e.g. from 1 ("Not at all") to 10 ("We\'re like two peas in a pod")', aType: 'rating', req: 1, name: 'overallSatisMentee', ratingOutOf: 10},
      {q: 'Help your mentee learn how they came across. Describe their mindset / ability against the following key skills:', detail: 'Try to be as honest as possible to help them make the most of the mentoring experience (and beyond!). It will also help us know what support we can give them.', aType: 'interim', name: 'interim'},
      {q: 'To what extent do they communicate clearly, in a professional & friendly way:', detail: 'e.g. speaking to-the-point, good grammar & spelling, injected with a bit of personality', aType: 'yesno', req: 1, name: 'menteeComms', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they show curiosity, open-mindedness and proactively ask for help:', detail: 'e.g. they ask lots of questions, delve deeper on topics ("why / how?"), and demonstrate a desire for learning new things', aType: 'yesno', req: 1, name: 'menteeCurio', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they demonstrate ambition, drive & clear commitment to accomplish their goals:', detail: 'e.g. they have a clear career motivation and seem willing to do whatever it takes to be successful', aType: 'yesno', req: 1, name: 'menteeAmb', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they have a genuine confidence & belief in their own capacity to succeed:', detail: 'e.g. they\'re clear about their relative strengths & weaknesses, comfortable they can develop skills they lack if needed, and appear resilient when challenged / facing a hurdle', aType: 'yesno', req: 1, name: 'menteeConf', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they try to build a strong relationship with you, and appreciate that networking opens doors:', detail: 'e.g. they\'re very likeable, show regular appreciation for your help, and perhaps even offered advice back to you', aType: 'yesno', req: 1, name: 'menteeNetw', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'If you were hiring, would you hire this mentee?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'wouldHire', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Disagree'},
        {value: '1', label: 'Disagree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Agree'},
        {value: '4', label: 'Strongly Agree'},
      ]},
      {q: 'To what extent do you agree that mentoring ' + menteeName + ' has helped you better understand your management style and / or abilities to coach and develop talent?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'understdMgmtStyle', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Disagree'},
        {value: '1', label: 'Disagree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Agree'},
        {value: '4', label: 'Strongly Agree'},
      ]},
      {q: 'Add a private note to ' + menteeName, detail: 'Offer suggestions for things they should consider / start doing to make the most of the programme and / or say thanks for being a great mentee!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your private message to ' + menteeName + ' here...', name: 'privNoteToMentee'},
      {q: 'What has ' + menteeName + ' done well?', detail: 'Help give them a leg up by letting others know about the qualities you\'ve witnessed do far. (Note: your mentee may choose to publicise this on their profile e.g. to employers)', aType: 'textLong', req: 0, maxLength: 500, placeholder: 'Type your positive feedback here...', name: 'referenceForMentee'},
    ]

    var questionsMentor = [
      {q: 'How satisfied are you with how your relationship is progressing with ' + menteeName + ' so far?', detail: 'e.g. from 1 ("Not at all") to 10 ("We\'re like two peas in a pod")', aType: 'rating', req: 1, name: 'overallSatisMentor', ratingOutOf: 10},
      {q: 'Help your mentee learn how they came across. Describe their mindset / ability against the following key skills:', detail: 'Try to be as honest as possible to help them make the most of the mentoring experience (and beyond!). It will also help us know what support we can give them.', aType: 'interim', name: 'interim'},
      {q: 'To what extent do they communicate clearly, in a professional & friendly way:', detail: 'e.g. speaking to-the-point, good grammar & spelling, injected with a bit of personality', aType: 'yesno', req: 1, name: 'menteeComms', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they show curiosity, open-mindedness and proactively ask for help:', detail: 'e.g. they ask lots of questions, delve deeper on topics ("why / how?"), and demonstrate a desire for learning new things', aType: 'yesno', req: 1, name: 'menteeCurio', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they demonstrate ambition, drive & clear commitment to accomplish their goals:', detail: 'e.g. they have a clear career motivation and seem willing to do whatever it takes to be successful', aType: 'yesno', req: 1, name: 'menteeAmb', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they have a genuine confidence & belief in their own capacity to succeed:', detail: 'e.g. they\'re clear about their relative strengths & weaknesses, comfortable they can develop skills they lack if needed, and appear resilient when challenged / facing a hurdle', aType: 'yesno', req: 1, name: 'menteeConf', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'To what extent do they try to build a strong relationship with you, and appreciate that networking opens doors:', detail: 'e.g. they\'re very likeable, show regular appreciation for your help, and perhaps even offered advice back to you', aType: 'yesno', req: 1, name: 'menteeNetw', options: [
        {value: '0', label: 'They\'re thriving'},
        {value: '1', label: 'Good'},
        {value: '2', label: 'Needs some work'},
        {value: '3', label: 'Inadequate'}
      ]},
      {q: 'If you were hiring, would you hire this mentee?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'wouldHire', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Disagree'},
        {value: '1', label: 'Disagree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Agree'},
        {value: '4', label: 'Strongly Agree'},
      ]},
      {q: 'To what extent do you agree that mentoring ' + menteeName + ' has helped you better understand your management style and / or abilities to coach and develop talent?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'understdMgmtStyle', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Disagree'},
        {value: '1', label: 'Disagree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Agree'},
        {value: '4', label: 'Strongly Agree'},
      ]},
      {q: 'Add a private note to ' + menteeName, detail: 'Offer suggestions for things they should consider / start doing to make the most of the programme and / or say thanks for being a great mentee!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your private message to ' + menteeName + ' here...', name: 'privNoteToMentee'},
      {q: 'What has ' + menteeName + ' done well?', detail: 'Help give them a leg up by letting others know about the qualities you\'ve witnessed do far. (Note: your mentee may choose to publicise this on their profile e.g. to employers)', aType: 'textLong', req: 0, maxLength: 500, placeholder: 'Type your positive feedback here...', name: 'referenceForMentee'},
    ]

    return (
      <React.Fragment>
        <div className="block-container">
          <div className="message-container">
            <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto}/>
                <UserBadge badgeType='isPrBot' />
                <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
              </div>
              <div className="message-content">
                <TextParser text={text}/>
              </div>
              <div className="messageCTA">
                {feedbackDone != true && (
                  <React.Fragment>
                    <div className="messageCTABtns">
                      {feedbackBtnToShow == 'mentee' && (
                        <FullPageModal {...MenteeFeedbackProps}>
                          <Form
                            questions={questionsMentee}
                            usedFor="menteeChatFeedback"
                            renderComponentsInitialState='ukUnisList'
                          />
                        </FullPageModal>
                      )}
                      {feedbackBtnToShow == 'mentor' && (
                        <FullPageModal {...MentorFeedbackProps}>
                          <Form
                            questions={questionsMentor}
                            usedFor="mentorChatFeedback"
                            renderComponentsInitialState='ukUnisList'
                          />
                        </FullPageModal>
                      )}
                    </div>
                  </React.Fragment>
                )}
                {feedbackDone == true && (
                  <div className="positiveReply greenText"><Check /> You already completed your chat feedback.{(userRole == 'mentee' && feedbackDoneMentor != true) ? (' We\'ll let you know as soon as ' + mentorName + ' responds.') : ((userRole == 'mentor' && feedbackDoneMentee != true) ? (' We\'ll let you know as soon as ' + menteeName + ' responds.') : '')}</div>
                )}
                {showFeedbackSuccessModal == true && (
                  <Modal {...FeedbackSuccessProps} handleLocalStateOnClose={this.closeFeedbackSuccessModal}>
                    <FeedbackSuccessContent />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatFeedbackReq;
