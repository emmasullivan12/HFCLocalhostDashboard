// Last merged this code on 21st apr 2023

import React, { Component } from "react";
//import { connect } from "react-redux";
//import PropTypes from "prop-types";
import hobbiesOptions from './Hobbies.js';
import subjectsOptions from './Subjects.js';
import workingOnOptions from './WorkingOn.js';
import skillsOptions from './Skills.js';
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';

const MenteeFullSignUpProps = {
  ariaLabel: 'Complete your Full Mentee Application',
  triggerText: 'Complete your Full Mentee Application >>',
  usedFor: 'menteeFullSU',
  backBtn: 'arrow',
  hideTrigger: true
//  changeInitFocus: true
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeFullSignUp extends Component {
  render() {
//    const fname = 'Emma';
  //  const id = '12345';
    const {onSubmit, handleLocalStateOnClose} = this.props
    const eetStatus = 'sch';
    const userRole = 'mentee';
    const country = 'GBR'
    const fname = 'emma'
    const userIs18 = false

    const subjects = ''; // sch Subjects
    const subjectsFreeText = '';
    const gradeType = '';

    const hobbies = [];
    const hobbiesFreeText = [];
    const expertise = '';
    const learning = '';
    const certainty = '';
    const networkSize = '';
    const mobile = '';
    const workingOn = []
    const workingOnFreeText = []

    var questions = [
      {q: 'So, ' + fname + ', you\'ve previously told us about the industry & role(s) that interest you, but what about the things you\'re truly passionate about and your future ambitions?', detail: 'Your answers to the following questions will help us find you a mentor match that you\'re likely to click with', aType: 'interim', name: 'interim'},
      {q: 'When you think about work & careers, what kind of lifestyle do you want to have?', detail: 'Think about working hours, social life, salary, being your own boss etc. Note: There are no right or wrong answers here!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'lifestyle'},
      ... (hobbies.length === 0 && hobbiesFreeText.length === 0) ? [
        {q: 'Outside of work & school, what are some of your interests & hobbies?', detail: 'To help you think: What sports do you play? What do you spend your money on? What kind of people interest you? What annoys / excites you?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
          ...hobbiesOptions,
        ]},
      ] : [],
      ...(expertise && expertise.length == 0) ? [
        {q: 'What would you say your "key skills" are?', detailSmall: 'e.g. C++/Python etc, 2D/3D Animation, Financial Modelling, Strategy, Leadership, Entrepreneurship etc.', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'expertise', idValue: 'value', valueToShow: 'label', options: [
          ...skillsOptions
        ]},
      ] : [],
      ...(learning && learning.length == 0) ? [
        {q: 'What are the skills / areas of interest you are currently looking to build?', detail: 'Help us show you the right advice', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'learning', idValue: 'value', valueToShow: 'label', options: [
          ...skillsOptions
        ]},
      ] : [],
      {q: 'Nice! So how can we help?', detail: 'Customize what type of support you\'d prefer', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you looking for?', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'supportType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / I just have a couple of quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'I\'m interested in speaking to and getting mentored by real employees because:', detail: 'Tell us in a few words', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'whyJoin'},
      ... (certainty === '') ? [
        {q: 'How sure are you of what you want to do for your career?', aType: 'rating', req: 1, name: 'certainty', ratingOutOf: 10},
      ] : [],
      {q: 'Did you want to join any of these particular communities?', detail: 'You might be want to join one or some of these', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select communities...', placeholderOnClick: 'Choose from our list:', name: 'erg', valueToShow: 'label', options: [
        {value: '1', label: 'Black, Asian, Minority Ethnic (BAME)'},
        {value: '2', label: 'People with disabilities'},
        {value: '3', label: 'LGBTQI+'},
        {value: '4', label: 'Women in the Workforce'},
        {value: '0', label: 'None'},
      ]},
      ...(workingOn === '' && workingOnFreeText === '') ? [
        {q: 'Are you working on any of the following activities, events, documents in the near future?', detail: 'This could be related to a personal or "career" goal. ... and your mentor match might be able to help!', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select activities...', placeholderOnClick: 'Choose as many as you like:', name: 'workingOn', valueToShow: 'label', options: [
          ...workingOnOptions,
        ]},
      ] : [],
      {q: 'Nearly there! We have a few quick questions about your current situation', aType: 'interim', name: 'interim'},
      ... (eetStatus === 'sch') ? [
        ... (subjects === '' && subjectsFreeText === '') ? [
          {q: 'What subjects are you studying?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
            ...subjectsOptions,
          ]},
        ] : [],
        ... (gradeType === '') ? [
          {q: 'What type of student do you consider yourself to be?', detail: 'This will help us give you realistic advice relevant to your situation', aType: 'select', req: 1, name: 'gradeType', placeholder: 'Select type...', valueToShow: 'label', options: [
            {value: '0', label: 'Top of the class/high grade'},
            {value: '1', label: 'Slightly above middle of the road'},
            {value: '2', label: 'Middle of the road'},
            {value: '3', label: 'Lower grade'},
            {value: '4', label: 'I\'m not sure'}
          ]},
        ] : [],
      ] : [],
      ... (eetStatus != 'uni') ? [
        {q: 'Are you planning to go on to Further Education / University?', aType: 'select', req: 1, placeholder: 'Select option...', name: 'planningUni', valueToShow: 'label', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
          {value: '2', label: 'I\'m Undecided'},
        ]},
      ] : [],
      ... (networkSize === '') ? [
        {q: 'Roughly, how many people do you consider yourself to have in your professional network?', detail: 'e.g. people who aren\'t close family or friends and that can support you in business or a career related activity.', aType: 'number', req: 1, min: 0, max: 1000, placeholder: 'Type number...', name: 'networkSize'},
      ] : [],
    //  {q: 'What\'s your mobile number?', detail: 'We might need this additional way to contact you, particularly in the (unlikely) event of an emergency', aType: 'tel', req: 0, name: 'mobile'},
    /*  {q: 'Notification preferences: Messages from your E-Mentor etc.', detail: 'Receive messages from '+ (userRole === 'mentee' ? 'your E-Mentors and other students in your network, including 1:1 careers advice personalised to you' : 'your Mentees and other employees in your groups'), aType: 'checkbox', name: 'memail', options: [
        {label: 'By Email', id: 'formA-MenteeFullSignUp-memail', name: 'memail'},
        {label: 'By SMS / Text Message', id: 'formA-MenteeFullSignUp-msms', name: 'msms'},
      ]},*/
      ... (userIs18 != true) ? [
        {q: 'Do you have parental permission?', detail: 'By continuing, you confirm you have parental permission to take part in mentoring groups on Prospela', aType: 'interim', name: 'interim'},
      ] : [],
      {q: 'Set your notification preferences: Career Opportunities & Tips', detail: 'Receive inspiration, '+ (userRole === 'mentee' ? 'career opportunities,' : 'ongoing support,') + ' promotions, surveys, and product updates from Prospela and our partners', aType: 'checkbox', name: 'checkboxMaster', options: [
        {label: 'By Email', id: 'pemail', name: 'pemail'},
      //  {label: 'By SMS / Text Message', id: 'psms', name: 'psms'},
      ]},
    ]

    return (
      <FullPageModal {...MenteeFullSignUpProps} handleLocalStateOnClose={handleLocalStateOnClose}>
        <Form
          questions={questions}
          usedFor="menteeFullSU"
          formTitle="Complete your full mentee application"
          onSubmit={onSubmit}
        />
      </FullPageModal>
    );
  }
}

export default MenteeFullSignUp;
