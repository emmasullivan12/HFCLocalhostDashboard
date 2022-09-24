// Dex last merged this code on 24th sept 2022 

import React, { Component } from "react";

import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import Modal from './Modal.js';
import MentorFullSUContent from './MentorFullSUContent.js';
import hobbiesOptions from './Hobbies.js';
import subjectsOptions from './Subjects.js';

const MentorFullSUModalProps = {
  ariaLabel: 'Complete your Full Mentor Application',
  triggerText: 'Complete your Full Mentor Application >>',
  usedFor: 'underOrOver18',
  hideTrigger: true,
  changeInitFocus: true,
}

const MentorOver18FullSUProps = {
  ariaLabel: 'Complete Full Mentor Application >>',
  triggerText: 'Complete Full Mentor Application >>',
  usedFor: 'mentorFullSUAusNzl',
  backBtn: 'arrow',
  hideTrigger: true,
  changeInitFocus: true,
}

class MentorFullSignUp extends Component {
  render() {
    const {handleLocalStateOnClose, onSubmit} = this.props
    const userRole = 'mentor';
    const country = 'GBR'

    const expertise = '';
    const learning = '';
    const whyHelp = '';
    const hobbies = [];
    const hobbiesfreetext = [];
    const maxEdu = '';
    const eetStatus = 'job';
    const subjects = [];
    const subjectsFreeText = [];
    const uniName = null
    const uniNameFreeText = null
  //  const uniName = 'profiles.uniname'
  //  const uniNameFreeText = 'profiles.uninamefreetext'
    const degreeName = 'profiles.degreename'
    const mobile = ''

    const mobNumPattern = country === 'GBR' ? '07[0-9]{3}[0-9]{6}' : country === 'USA' ? '[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{2}[0-9]{4}' : country === 'CAN' ? '[0-9]{10}' : country === 'AUS' ? '0[0-9]{3}[0-9]{6}' : country === 'NZL' ? '02[0-9]{1,2}[0-9]{6,8}' : null
    const mobNumPlaceholder = country === 'GBR' ? '07400 123456' : country === 'USA' ? '555 555 5678' : country === 'CAN' ? '416 234 5678' : country === 'AUS' ? '0420 123456' : country === 'NZL' ? '022 1234 5678' : '07400 123456'

    var questionsO18 = [
      /* eslint-disable object-property-newline */
      {q: 'Let\'s personalise how you\'d like to mentor with us', detail: 'We need to know a few more quick details, including your current situation and how you\'d like to mentor. We know life gets in the way - that\'s why we want to help you do your thing in a way that makes most sense for you.', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you happy to offer?', detail: 'You\'ll be able to change this later if you change your mind', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'availType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / Happy to answer quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'How many mentees would you be happy to mentor?', detail: 'Some people like to focus on just the 1, whereas other E-Mentors take on up to 10 with ease! You decide.', aType: 'number', req: 1, min: 0, max: 10, placeholder: 'e.g. 1, 2, ... 10', name: 'maxMentees'},
      ... (whyHelp == null) ? [
        {q: 'I\'m interested in speaking to and mentoring underserved young people because:', detail: 'Tell us in a few words', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'whyHelp'},
      ] : [],
      {q: 'Did you want to focus your efforts on supporting any of these particular communities?', detail: 'You might be particularly passionate about one or some of these', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select communities...', placeholderOnClick: 'Choose from our list:', name: 'erg', valueToShow: 'label', options: [
        {value: '1', label: 'Black, Asian, Minority Ethnic (BAME)'},
        {value: '2', label: 'People with disabilities'},
        {value: '3', label: 'LGBTQI+'},
        {value: '4', label: 'Women in the Workforce'},
        {value: '0', label: 'None right now'},
      ]},
      ...(expertise == null || learning == null) ? [
        {q: 'OK ... on to the good stuff!', detail: 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do', aType: 'interim', name: 'interim'},
        ...(expertise == null) ? [
          {q: 'To help us match you, what are your "key skills"?', detailSmall: 'e.g. C++/Python etc, 2D/3D Animation, Financial Modelling, Strategy, Leadership, Entrepreneurship etc. Try to separate by commas ","', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your key skills here...', name: 'expertise'},
        ] : [],
        ...(learning == null) ? [
          {q: 'What are some skills / areas of interest you are looking to build?', detail: 'Help us demonstrate to students that careers evolve over time!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your goals & projects here...', name: 'learning'},
        ] : [],
        ...(hobbies == null && hobbiesfreetext == null) ? [
          {q: 'Outside of ' + (eetStatus === 'uni' ? 'uni' : 'work') + ', what are some of your interests & hobbies?', detail: 'This will help us match you with students who might not currently possess the skills your industry requires, but who might be well suited one day!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
            ...hobbiesOptions,
          ]},
        ] : [],
      ] : [],
      {q: 'So how did you get where you are?', detail: 'You can help students immensely just by answering the following quick questions about your education', aType: 'interim', name: 'interim'},
      ... (eetStatus != 'uni') ? [
        {q: 'What\'s the highest level of education you\'ve achieved?', conditionalParent: 1, aType: 'select', req: 1, placeholder: 'Select option...', name: 'maxEdu', valueToShow: 'label', options: [
          {value: '0', label: 'GCSE / Middle School (or equivalent)'},
          {value: '1', label: 'A-Levels / High School (or equivalent)'},
          {value: '2', label: 'Diploma / Foundation Year'},
          {value: '3', label: 'Associate Degree'},
          {value: '4', label: 'Bachelors Degree'},
          {value: '5', label: 'Masters Degree'},
          {value: '6', label: 'PhD'},
        //  {value: '7', label: 'Professional Qualification (e.g. CPA / ACA / IMechE)'},
        ]},
        ... (country === 'GBR' && uniName == null && uniNameFreeText == null) ? [
          {q: 'Which University did you go to?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'Sometimes students prefer to speak with an alumni from their own institution to help visualise where they can get to', aType: 'autocomplete', req: 1, placeholder: 'Type your University name...', name: 'uniName', componentUpdatesState: 'ukUnisList', fileToRender: 'UKUnis', idValue: 'value', valueToShow: 'label', showDetail: true, detailToShow: 'location', noSuggestionsCTAclass: 'ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn'},
        ] : [],
        ... (country != 'GBR' && uniName == null && uniNameFreeText == null) ? [
          {q: 'Which University did you go to?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'Sometimes students prefer to speak with an alumni from their own institution to help visualise where they can get to', aType: 'text', req: 1, maxLength: 75, placeholder: 'Type your University name...', name: 'uniNameFreeText'},
        ] : [],
        ... (degreeName == null) ? [
          {q: 'What Degree did you study?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'e.g. BSc(Hons) Business Administration, etc.', aType: 'text', req: 1, maxLength: 75, placeholder: 'Type your Degree name...', name: 'degree'},
        ] : [],
      ] : [],
      ... (subjects.length === 0 && subjectsFreeText.length === 0) ? [
        {q: 'What subjects did you study at High School (e.g. A-Levels or equivalent)?', detail: 'This will help students relate where they are now to where they can potentially get to!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
          ...subjectsOptions,
        ]},
      ] : [],
      ...(expertise != null && learning != null) ? [
        ...(hobbies == null && hobbiesfreetext == null) ? [
          {q: 'Outside of ' + (eetStatus === 'uni' ? 'uni' : 'work') + ', what are some of your interests & hobbies?', detail: 'This will help us match you with students who might not currently possess the skills your industry requires, but who might be well suited one day!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
            ...hobbiesOptions,
          ]},
        ] : [],
      ] : [],
      {q: 'Nearly there! Just a bit of housekeeping...', detail: "We use the following information to offer the safest & most impactful mentoring experience to our mentees. By providing us with this information you consent us to use it for this purpose. All of your personal information is appropriately safeguarded and kept secure and you can see our Privacy Policy for more information (prospela.com/privacy-policy).", aType: 'interim', name: 'interim'},
      {q: 'What\'s your gender?', detail: 'Some mentees feel more comfortable talking to someone like them.', aType: 'select', req: 1, placeholder: 'Select option...', name: 'gender', valueToShow: 'label', options: [
        {value: '0', label: 'Male', iconFA: 'fas fa-male'},
        {value: '1', label: 'Female', iconFA: 'fas fa-female'},
        {value: '2', label: 'Other preferred description', iconFA: 'fas fa-genderless'},
        {value: '3', label: 'Prefer not to say', iconFA: 'fas fa-comment-slash'}
      ]},
      {q: 'How do you identify your ethnicity?', aType: 'select', req: 1, placeholder: 'Select option...', name: 'ethnicity', valueToShow: 'label', options: [
        {value: '9', label: 'Aboriginal Australian'},
        {value: '0', label: 'Asian'},
        {value: '1', label: 'Arab'},
        {value: '2', label: 'Black / African / Caribbean'},
        {value: '3', label: 'Hispanic / Latinx'},
        {value: '4', label: 'Indian / Pakistani'},
        {value: '5', label: 'Mixed / Multiple Ethnic Groups'},
        {value: '10', label: 'Maori'},
        {value: '11', label: 'Pacific Islander'},
        {value: '6', label: 'White'},
        {value: '7', label: 'Other'},
        {value: '8', label: 'Prefer not to say'},
      ]},
      {q: 'Lastly, what\'s your mobile number?', detail: 'We might need this additional way to contact you, particularly in the (unlikely) event of an emergency', aType: 'tel', req: 0, pattern: mobNumPattern, placeholder: mobNumPlaceholder, name: 'mobile'},
    ]

    var questionsU18 = [
      {q: 'Let\'s personalise how you\'d like to mentor with us', detail: 'We need to know a few more quick details, including your current situation and how you\'d like to mentor. We know life gets in the way - that\'s why we want to help you do your thing in a way that makes most sense for you.', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you happy to offer?', detail: 'You\'ll be able to change this later if you change your mind', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'availType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / Happy to answer quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'How many mentees would you be happy to mentor?', detail: 'Some people like to focus on just the 1, whereas other E-Mentors take on up to 10 with ease! You decide.', aType: 'number', req: 1, min: 0, max: 10, placeholder: 'e.g. 1, 2, ... 10', name: 'maxMentees'},
      ... (whyHelp == null) ? [
        {q: 'I\'m interested in speaking to and mentoring underserved young people because:', detail: 'Tell us in a few words', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'whyHelp'},
      ] : [],
      {q: 'Did you want to focus your efforts on supporting any of these particular communities?', detail: 'You might be particularly passionate about one or some of these', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select communities...', placeholderOnClick: 'Choose from our list:', name: 'erg', valueToShow: 'label', options: [
        {value: '1', label: 'Black, Asian, Minority Ethnic (BAME)'},
        {value: '2', label: 'People with disabilities'},
        {value: '3', label: 'LGBTQI+'},
        {value: '4', label: 'Women in the Workforce'},
        {value: '0', label: 'None right now'},
      ]},
      ...(expertise == null || learning == null) ? [
        {q: 'OK ... on to the good stuff!', detail: 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do', aType: 'interim', name: 'interim'},
        ...(expertise == null) ? [
          {q: 'To help us match you, what are your "key skills"?', detailSmall: 'e.g. C++/Python etc, 2D/3D Animation, Financial Modelling, Strategy, Leadership, Entrepreneurship etc. Try to separate by commas ","', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your key skills here...', name: 'expertise'},
        ] : [],
        ...(learning == null) ? [
          {q: 'What are some skills / areas of interest you are looking to build?', detail: 'Help us demonstrate to students that careers evolve over time!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your goals & projects here...', name: 'learning'},
        ] : [],
        ...(hobbies == null && hobbiesfreetext == null) ? [
          {q: 'Outside of ' + (eetStatus === 'uni' ? 'uni' : 'work') + ', what are some of your interests & hobbies?', detail: 'This will help us match you with students who might not currently possess the skills your industry requires, but who might be well suited one day!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
            ...hobbiesOptions,
          ]},
        ] : [],
      ] : [],
      {q: 'So how did you get where you are?', detail: 'You can help students immensely just by answering the following quick questions about your education', aType: 'interim', name: 'interim'},
      ... (eetStatus != 'uni') ? [
        {q: 'What\'s the highest level of education you\'ve achieved?', conditionalParent: 1, aType: 'select', req: 1, placeholder: 'Select option...', name: 'maxEdu', valueToShow: 'label', options: [
          {value: '0', label: 'GCSE / Middle School (or equivalent)'},
          {value: '1', label: 'A-Levels / High School (or equivalent)'},
          {value: '2', label: 'Diploma / Foundation Year'},
          {value: '3', label: 'Associate Degree'},
          {value: '4', label: 'Bachelors Degree'},
          {value: '5', label: 'Masters Degree'},
          {value: '6', label: 'PhD'},
    //      {value: '7', label: 'Professional Qualification (e.g. CPA / ACA / IMechE)'},
        ]},
        ... (country === 'GBR' && uniName == null && uniNameFreeText == null) ? [
          {q: 'Which University did you go to?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'Sometimes students prefer to speak with an alumni from their own institution to help visualise where they can get to', aType: 'autocomplete', req: 1, placeholder: 'Type your University name...', name: 'uniName', componentUpdatesState: 'ukUnisList', fileToRender: 'UKUnis', idValue: 'value', valueToShow: 'label', showDetail: true, detailToShow: 'location', noSuggestionsCTAclass: 'ModalOpenBtn ModalOpenBtn-noSuggestionsCTABtn'},
        ] : [],
        ... (country != 'GBR' && uniName == null && uniNameFreeText == null) ? [
          {q: 'Which University did you go to?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'Sometimes students prefer to speak with an alumni from their own institution to help visualise where they can get to', aType: 'text', req: 1, maxLength: 75, placeholder: 'Type your University name...', name: 'uniNameFreeText'},
        ] : [],
        {q: 'What Degree did you study?', conditionalOn: 'maxEdu', showIf: [2,3,4,5,6], detail: 'e.g. BSc(Hons) Business Administration, etc.', aType: 'text', req: 1, maxLength: 75, placeholder: 'Type your Degree name...', name: 'degree'},
      ] : [],
      ... (subjects.length === 0 && subjectsFreeText.length === 0) ? [
        {q: 'What subjects did you study at High School (e.g. A-Levels or equivalent)?', detail: 'This will help students relate where they are now to where they can potentially get to!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
          ...subjectsOptions,
        ]},
      ] : [],
      ...(expertise != null && learning != null) ? [
        ...(hobbies == null && hobbiesfreetext == null) ? [
          {q: 'Outside of ' + (eetStatus === 'uni' ? 'uni' : 'work') + ', what are some of your interests & hobbies?', detail: 'This will help us match you with students who might not currently possess the skills your industry requires, but who might be well suited one day!', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
            ...hobbiesOptions,
          ]},
        ] : [],
      ] : [],
      {q: 'Nearly there! Just a bit of housekeeping...', detail: "We use the following information to offer the safest & most impactful mentoring experience to our mentees. By providing us with this information you consent us to use it for this purpose. All of your personal information is appropriately safeguarded and kept secure and you can see our Privacy Policy for more information (prospela.com/privacy-policy).", aType: 'interim', name: 'interim'},
      ... (country === 'GBR') ? [
        {q: 'We ask E-Mentor applicants to self-disclose any history of convictions.', detail: 'We try to collect relevant information from mentor applicants to maintain a safe environment for our disadvantaged young people. Note: Answering "yes" to the any of the following does not immediately disqualify you from using Prospela. We might be in touch to discuss further.', aType: 'interim', name: 'interim'},
        {q: 'Do you have any convictions, cautions, reprimands or final warnings that are not "protected" as defined by the Rehabilitation of Offenders Act 1974 (Exceptions) Order 1975 (as amended in 2013 and 2020)?', detailSmall: 'Guidance: The amendments to the Exceptions Order 1975 (2013 and 2020) provide that certain spent convictions and cautions are \'protected\' and are not subject to disclosure to employers, and cannot be taken into account. Guidance about whether a conviction or caution should be disclosed can be found on the Disclosure and Barring Service website or the charities Nacro or Unlock.', aType: 'yesno', req: 1, name: 'ukConv', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
        ]},
      ] : [],
      ... (country != 'GBR') ? [
        {q: 'We ask E-Mentor applicants to self-disclose any history of convictions.', detail: 'We try to collect relevant information from mentor applicants to maintain a safe environment for our disadvantaged young people. Note: Answering "yes" to the any of the following does not immediately disqualify you from using Prospela. We might be in touch to discuss further.', aType: 'interim', name: 'interim'},
        {q: 'Have you ever been convicted or pled no contest to a felony?', detail: 'Defined as a crime punishable by 1 year or more in jail, even if the individual was sentenced to a lesser time.', aType: 'yesno', req: 1, name: 'usConv1', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
        ]},
        {q: 'Have you ever been convicted or pled no contest to a misdemeanor?', aType: 'yesno', req: 1, name: 'usConv2', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
        ]},
        {q: 'Have you ever been arrested for a crime against a minor?', aType: 'yesno', req: 1, name: 'usConv3', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
        ]},
        {q: 'Have you ever been terminated or otherwise disciplined, placed on probation, or warned not to continue engaging in certain conduct while volunteering with any agency (whether or not youth were involved)?', aType: 'yesno', req: 1, name: 'usConv4', options: [
          {value: '0', label: 'Yes'},
          {value: '1', label: 'No'},
        ]},
      ] : [],
      {q: 'What\'s your gender?', detail: 'Some mentees feel more comfortable talking to someone like them.', aType: 'select', req: 1, placeholder: 'Select option...', name: 'gender', valueToShow: 'label', options: [
        {value: '0', label: 'Male', iconFA: 'fas fa-male'},
        {value: '1', label: 'Female', iconFA: 'fas fa-female'},
        {value: '2', label: 'Other preferred description', iconFA: 'fas fa-genderless'},
        {value: '3', label: 'Prefer not to say', iconFA: 'fas fa-comment-slash'}
      ]},
      {q: 'How do you identify your ethnicity?', aType: 'select', req: 1, placeholder: 'Select option...', name: 'ethnicity', valueToShow: 'label', options: [
        {value: '9', label: 'Aboriginal Australian'},
        {value: '0', label: 'Asian'},
        {value: '1', label: 'Arab'},
        {value: '2', label: 'Black / African / Caribbean'},
        {value: '3', label: 'Hispanic / Latinx'},
        {value: '4', label: 'Indian / Pakistani'},
        {value: '5', label: 'Mixed / Multiple Ethnic Groups'},
        {value: '10', label: 'Maori'},
        {value: '11', label: 'Pacific Islander'},
        {value: '6', label: 'White'},
        {value: '7', label: 'Other'},
        {value: '8', label: 'Prefer not to say'},
      ]},
      {q: 'Lastly, what\'s your mobile number?', detail: 'We might need this additional way to contact you, particularly in the (unlikely) event of an emergency', aType: 'tel', req: 0, pattern: mobNumPattern, placeholder: mobNumPlaceholder, name: 'mobile'},
    ]

    if (country != 'AUS' && country != 'NZL') {
      return (
        <Modal {...MentorFullSUModalProps} handleLocalStateOnClose={handleLocalStateOnClose} >
          <MentorFullSUContent
            questionsO18={questionsO18}
            questionsU18={questionsU18}
            onSubmit={onSubmit}
          />
        </Modal>
      )
    } else if (country === 'AUS' || country === 'NZL') {
      return (
        <FullPageModal {...MentorOver18FullSUProps} handleLocalStateOnClose={handleLocalStateOnClose}>
          <Form
            questions={questionsO18}
            usedFor="mentorFullSUAusNzl"
            saveOnSubmit='u18'
            formTitle="Complete your full mentor application"
            onSubmit={onSubmit}
          />
        </FullPageModal>
      )
    }
  }
}

export default MentorFullSignUp;
