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
      {q: 'Help ' + mentorName + ' learn how they came across as a mentor. To what extent do they display the following mentoring styles:', detail: 'Try to be as honest as possible to help them understand their traits and how they might improve.', aType: 'interim', name: 'interim'},
      {q: 'To what extent do they help you focus, prioritise and set a clear vision for your future:', detail: 'e.g. they help you with decision making and visualising what your success might look like', aType: 'yesno', req: 1, name: 'mentorCompFuture', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'To what extent do they share their own experiences and best practice from other role models:', detail: 'e.g. they explain how they approach similar challenges / experiences, or analyse how others achieve great performance', aType: 'yesno', req: 1, name: 'mentorRoleModel', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'To what extent do they encourage you to push yourself and insist on high effort from you:', detail: 'e.g. they set high expectations, challenge you, and show belief that you can achieve more, go further or work harder', aType: 'yesno', req: 1, name: 'mentorHighPerf', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'To what extent do you feel you can express your personal feelings and discuss non-career related topics:', detail: 'e.g. they encourage you to express your thoughts & feelings, and create a non-judgmental space to work through challenges / discuss other areas of your life', aType: 'yesno', req: 1, name: 'mentorIndivSupport', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'To what extent do they play devils advocate, helping you think of new ideas, ways of thinking and / or how to solve problems:', detail: 'e.g. they challenge you to think, reflect & explain rationale and provides new ways of thinking about a problem', aType: 'yesno', req: 1, name: 'mentorIntellStimu', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'To what extent do they give you detailed instructions and specific tasks to complete:', detail: 'e.g. they tell you how to carry out certain tasks to achieve the career path you want', aType: 'yesno', req: 1, name: 'mentorDirLeader', options: [
        {value: '0', label: 'Regularly'},
        {value: '1', label: 'Sometimes'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Never'}
      ]},
      {q: 'Do you think you\'d enjoy working with someone like ' + mentorName + '?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'wouldWorkWith', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Agree'},
        {value: '1', label: 'Agree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Disagree'},
        {value: '4', label: 'Strongly Disagree'},
      ]},
      {q: 'What impression did you get of ' + mentorName + '\'s work environment / employer?', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select as many as you like...', placeholderOnClick: 'Choose from our list:', name: 'menteeImpressionCo', valueToShow: 'label', options: [
        {value: '0', label: 'friendly'},
        {value: '1', label: 'laid-back'},
        {value: '2', label: 'nurturing'},
        {value: '3', label: 'always learning'},
        {value: '4', label: 'collaborative'},
        {value: '5', label: 'diverse'},
        {value: '6', label: 'forward-thinking'},
        {value: '7', label: 'modern'},
        {value: '8', label: 'flexible'},
        {value: '9', label: 'creative'},
        {value: '10', label: 'challenging'},
        {value: '11', label: 'competitive'},
        {value: '12', label: 'energizing'},
        {value: '13', label: 'thought-provoking'},
        {value: '14', label: 'inspiring'},
        {value: '15', label: 'N/A or Don\'t know'},
      ]},
      {q: 'Has ' + mentorName + ' helped you achieve any of the following?', aType: 'selectMulti', req: 1, showIcon: true, iconToShow: 'iconFA', showCheckbox: true, placeholder: 'Select achievements...', placeholderOnClick: 'Choose from our list:', name: 'menteeMilestones', valueToShow: 'label', options: [
        {value: '', label: 'Career-related', iconFA: 'fas fa-briefcase', isTitle: true},
        {value: '1', label: 'Made a career decision', checkbox: true, isTitle: false},
        {value: '2', label: 'Knowing what next steps to take', checkbox: true, isTitle: false},
        {value: '3', label: 'Improved my showreel / portfolio', checkbox: true, isTitle: false},
        {value: '4', label: 'Reviewed my CV/Resume', checkbox: true, isTitle: false},
        {value: '5', label: 'Landed an interview', checkbox: true, isTitle: false},
        {value: '6', label: 'Found an internship / work experience', checkbox: true, isTitle: false},
        {value: '7', label: 'Got a full-time job', checkbox: true, isTitle: false},
        {value: '', label: 'School / Uni-related', iconFA: 'fas fa-graduation-cap', isTitle: true},
        {value: '8', label: 'Reviewed my university application', checkbox: true, isTitle: false},
        {value: '9', label: 'Applied to further education', checkbox: true, isTitle: false},
        {value: '10', label: 'Made subject/degree choices', checkbox: true, isTitle: false},
        {value: '11', label: 'Improved my school work', checkbox: true, isTitle: false},
        {value: '', label: 'Personal Development', iconFA: 'fas fa-users-cog', isTitle: true},
        {value: '12', label: 'Knowing my strengths / weaknesses', checkbox: true, isTitle: false},
        {value: '13', label: 'Learned/honed a new skill', checkbox: true, isTitle: false},
        {value: '14', label: 'Got free/cheap access to resources', checkbox: true, isTitle: false},
        {value: '15', label: 'Met new people/networks', checkbox: true, isTitle: false},
        {value: '', label: 'Other', iconFA: 'fas fa-meteor', isTitle: true},
        {value: '0', label: 'Nothing, yet', checkbox: true, isTitle: false},
      ]},
      {q: 'Going forward, would you like your E-Mentor to provide more insights to any of the following?', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select insights you\'d like...', placeholderOnClick: 'Choose from our list:', name: 'menteeWantsMoreOf', valueToShow: 'label', options: [
        {value: '1', label: 'Work-life reality (e.g. hours, stress, etc.)'},
        {value: '2', label: 'Industry / sector trends & insights'},
        {value: '3', label: 'Company culture (e.g. team, values)'},
        {value: '4', label: 'Their current role & responsibilities'},
        {value: '5', label: 'Their career path so far'},
        {value: '6', label: 'How to develop particular skills'},
        {value: '7', label: 'Job application best practice'},
        {value: '8', label: 'More pictures of work life'},
        {value: '0', label: 'None of these'},
      ]},
      {q: 'Add a note to ' + mentorName + '. Let them know how they helped you.', detail: 'What have they done well? Did they give you a particularly memorable insight? And / or say thanks for being a great mentor!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your message to ' + mentorName + ' here...', name: 'noteToMentor'},
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
        {value: '0', label: 'Strongly Agree'},
        {value: '1', label: 'Agree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Disagree'},
        {value: '4', label: 'Strongly Disagree'},
      ]},
      {q: 'To what extent do you agree that mentoring ' + menteeName + ' has helped you better understand your management style and / or abilities to coach and develop talent?', aType: 'select', req: 1, placeholder: 'Select response...', name: 'understdMgmtStyle', valueToShow: 'label', options: [
        {value: '0', label: 'Strongly Agree'},
        {value: '1', label: 'Agree'},
        {value: '2', label: 'Neutral'},
        {value: '3', label: 'Disagree'},
        {value: '4', label: 'Strongly Disagree'},
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
