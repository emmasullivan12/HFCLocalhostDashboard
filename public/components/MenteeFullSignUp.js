// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
//import { connect } from "react-redux";
// import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformFullPage from './TypeformFullPage.js';
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';

// This includes props to be passed to Typeform
const MenteeFullSignUpProps = {
  triggerText: 'Complete Full Sign Up >>',
  usedFor: 'menteeFullSU',
  backBtn: 'arrow',
  changeInitFocus: true
}


// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeFullSignUp extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345';
    const eetStatus = 'job';
    const userRole = 'mentee';

    const subjects = ''; // sch Subjects
    const gradeType = '';

    const hobbies = [];
    const expertise = [];
    const certainty = '';
    const networkSize = '';

    const phone = '123';

    var questions = [
      {q: 'When you think about work & careers, what kind of lifestyle do you want to have?', detail: 'Think about things like working hours, social life, salary, running your own business, being the boss etc. Note: There are no right or wrong answers here ... Dream as big (or as little) as you like!', aType: 'textLong', req: 1, placeholder: 'Type your answer here...', name: 'lifestyle'},
      {q: 'Heres a test question?', detail: 'Blah di blah di blah!', aType: 'text', req: 1, placeholder: 'Type your answer here...', name: 'x'},
      ... (hobbies.length === 0) ? [
        {q: 'Outside of work & school, what are some of your interests?', detail: 'To help you think: What sports do you play? What do you spend your money on? What kind of people interest you? What annoys / excites you?', aType: 'autocompleteMulti', req: 1, showCheckbox: false, openOnClick: true, showValues: true, placeholder: 'Type your answer here...', placeholderOnClick: 'Choose as many as you like:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
          {value: '0', label: 'Football'},
          {value: '1', label: 'Tennis'},
          {value: '2', label: 'Gaming'},
          {value: '3', label: 'Makeup'},
          {value: '4', label: 'Other'}
        ]},
      ] : [],
      ... (expertise.length === 0) ? [
        {q: 'What would you say your "key skills" are?', detail: 'To help you think: What do you enjoy doing? Have you helped someone recently? How? What did someone last compliment you on?', aType: 'textLong', req: 1, placeholder: 'Type your key skills here...', name: 'expertise'},
      ] : [],
      {q: 'Tell us how we can help! What type of support are you looking for?', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'supportType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / I just have a couple of quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'I\'m interested in speaking to and getting mentored by real employees because:', detail: 'Tell us in a few words', aType: 'textLong', req: 1, placeholder: 'Type your answer here...', name: 'whyJoin'},
      ... (certainty === '') ? [
        {q: 'How sure are you of what you want to do for your career?', aType: 'rating', req: 1, name: 'certainty', ratingOutOf: 10},
      ] : [],
      {q: 'Are you working on any of the following activities, events, documents in the near future?', detail: 'This could be related to a personal or "career" goal. ... and your mentor match might be able to help!', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select activities...', placeholderOnClick: 'Choose as many as you like:', name: 'workingOn', valueToShow: 'label', options: [
        {value: '0', label: 'Deciding on a career path'},
        {value: '1', label: 'CV/Resume editing'},
        {value: '2', label: 'Portfolio / Showreel review'},
        {value: '3', label: 'Finding an internship / work experience'},
        {value: '4', label: 'Full-time job search'},
        {value: '5', label: 'Job Interviews'},
        {value: '6', label: 'Making subject / degree choices'},
        {value: '7', label: 'Applying to University'},
        {value: '8', label: 'Learning to Code'},
        {value: '9', label: 'Learning a language'},
        {value: '10', label: 'Learning an instrument'},
        {value: '11', label: 'Training for a sporting event'},
      ]},
      ... (eetStatus === 'sch') ? [
        ... (subjects === '') ? [
          {q: 'What subjects are you studying?', aType: 'autocompleteMulti', req: 1, showCheckbox: false, openOnClick: true, showValues: true, placeholder: 'Choose Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
          {value: '0', label: 'Accounting'},
          {value: '1', label: 'Afrikaans'},
          {value: '2', label: 'Ancient History'},
          {value: '3', label: 'Anthropology'},
          {value: '4', label: 'Art and Design'},
          {value: '5', label: 'Applied Science'},
          {value: '6', label: 'Arabic'},
          {value: '7', label: 'Archaeology'},
          {value: '8', label: 'Architecture'},
          {value: '9', label: 'Art and Design'},
          {value: '10', label: 'Anatomy'},
          {value: '11', label: 'Bengali'},
          {value: '12', label: 'Biblical Hebrew'},
          {value: '13', label: 'Biology'},
          {value: '14', label: 'Business Studies'},
          {value: '15', label: 'Chemistry'},
          {value: '16', label: 'Citizenship Studies'},
          {value: '17', label: 'Classical Civilisation'},
          {value: '18', label: 'Classical Greek'},
          {value: '19', label: 'Classical Studies'},
          {value: '20', label: 'Communication and Culture'},
          {value: '21', label: 'Computer Science'},
          {value: '22', label: 'Computing'},
          {value: '23', label: 'Criminology'},
          {value: '24', label: 'Critical Thinking'},
          {value: '25', label: 'Dance'},
          {value: '26', label: 'Design and Technology'},
          {value: '27', label: 'Design and Textiles'},
          {value: '28', label: 'Digital Media and Design'},
          {value: '29', label: 'Digital Technology'},
          {value: '30', label: 'Divinity'},
          {value: '31', label: 'Drama'},
          {value: '32', label: 'Drama and Theatre'},
          {value: '33', label: 'Dutch'},
          {value: '34', label: 'Economics'},
          {value: '35', label: 'Electronics'},
          {value: '36', label: 'Engineering'},
          {value: '37', label: 'English Language'},
          {value: '38', label: 'English Language and Literature'},
          {value: '39', label: 'English Literature'},
          {value: '40', label: 'Environmental Science'},
          {value: '41', label: 'Environmental Studies'},
          {value: '42', label: 'Environmental Technology'},
          {value: '43', label: 'Fashion and Textiles'},
          {value: '44', label: 'Film Studies'},
          {value: '45', label: 'Food Studies'},
          {value: '46', label: 'Food Technology'},
          {value: '47', label: 'French'},
          {value: '48', label: 'Further Mathematics'},
          {value: '49', label: 'General Studies'},
          {value: '50', label: 'Geography'},
          {value: '51', label: 'Geology'},
          {value: '52', label: 'German'},
          {value: '53', label: 'Global Development'},
          {value: '54', label: 'Global Perspectives and Research'},
          {value: '55', label: 'Government and Politics'},
          {value: '56', label: 'Greek'},
          {value: '57', label: 'Gujarati'},
          {value: '58', label: 'Health and Social Care'},
          {value: '59', label: 'Hindi'},
          {value: '60', label: 'Hinduism'},
          {value: '61', label: 'History'},
          {value: '62', label: 'History of Art'},
          {value: '63', label: 'Home Economics'},
          {value: '64', label: 'Human Biology'},
          {value: '65', label: 'Humanities'},
          {value: '66', label: 'Information Technology / ICT'},
          {value: '67', label: 'Irish'},
          {value: '68', label: 'Islamic Studies'},
          {value: '69', label: 'Italian'},
          {value: '70', label: 'Japanese'},
          {value: '71', label: 'Journalism'},
          {value: '72', label: 'Latin'},
          {value: '73', label: 'Law'},
          {value: '74', label: 'Leisure Studies'},
          {value: '75', label: 'Life and Health Sciences'},
          {value: '76', label: 'Marine Science'},
          {value: '77', label: 'Mathematics'},
          {value: '78', label: 'Media Studies'},
          {value: '79', label: 'Modern Hebrew'},
          {value: '80', label: 'Moving Image Arts'},
          {value: '81', label: 'Music'},
          {value: '82', label: 'Music Technology'},
          {value: '83', label: 'Nutrition and Food Science'},
          {value: '84', label: 'Punjabi'},
          {value: '85', label: 'Performance Studies'},
          {value: '86', label: 'Performing Arts'},
          {value: '87', label: 'Persian'},
          {value: '88', label: 'Philosophy'},
          {value: '89', label: 'Photography'},
          {value: '90', label: 'Physical Education'},
          {value: '91', label: 'Physics'},
          {value: '92', label: 'Polish'},
          {value: '93', label: 'Politics'},
          {value: '94', label: 'Portuguese'},
          {value: '95', label: 'Product Design'},
          {value: '96', label: 'Psychology'},
          {value: '97', label: 'Pure Mathematics'},
          {value: '98', label: 'Quantitative Methods'},
          {value: '99', label: 'Religious Studies'},
          {value: '100', label: 'Russian'},
          {value: '101', label: 'Science in Society'},
          {value: '102', label: 'Sociology'},
          {value: '103', label: 'Software Systems Development'},
          {value: '104', label: 'Spanish'},
          {value: '105', label: 'Sports Science'},
          {value: '106', label: 'Statistics'},
          {value: '107', label: 'Systems and Control Technology'},
          {value: '108', label: 'Telugu'},
          {value: '109', label: 'Tamil'},
          {value: '110', label: 'Technology and Design'},
          {value: '111', label: 'Thinking Skills'},
          {value: '112', label: 'Travel and Tourism'},
          {value: '113', label: 'Turkish'},
          {value: '114', label: 'Urdu'},
          {value: '115', label: 'Welsh'},
          {value: '116', label: 'World Development'},
        ]},
        ] : [],
        ... (gradeType != '') ? [
          {q: 'What type of student do you consider yourself to be?', detail: 'This will help us give you realistic advice relevant to your situation', aType: 'select', req: 1, name: 'erg', placeholder: 'Select type...', valueToShow: 'label', options: [
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
      ... (phone === '') ? [
        {q: 'What\'s your mobile number?', aType: 'tel', req: 1, placeholder: '+44 (0)7400 123456', name: 'phone'},
      ] : [],
      {q: 'Notification preferences: Messages from your E-Mentor etc.', detail: 'Receive messages from '+ (userRole === 'mentee' ? 'your E-Mentors and other students in your network, including 1:1 careers advice personalised to you' : 'your Mentees and other employees in your groups'), aType: 'checkbox', name: 'memail', options: [
        {label: 'By Email', id: 'formA-MenteeFullSignUp-memail', name: 'memail'},
        {label: 'By SMS / Text Message', id: 'formA-MenteeFullSignUp-msms', name: 'msms'},
      ]},
      {q: 'Notification preferences: Career Opportunities, Tips & Promotions', detail: 'Receive inspiration, '+ (userRole === 'mentee' ? 'career opportunities,' : 'ongoing support,') + ' promotions, surveys, and product updates from Prospela and our partners', aType: 'checkbox', name: 'memail', options: [
        {label: 'By Email', id: 'formA-MenteeFullSignUp-pemail', name: 'pemail'},
        {label: 'By SMS / Text Message', id: 'formA-MenteeFullSignUp-psms', name: 'psms'},
      ]},
    ]

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSU"/>
          <h2 className="landingCTATitle">
            Complete your full sign up
          </h2>
          <p className="landingCTADesc">
            We need to know a little more about your future ambitions and what help you might need to help determine the best mentor matches for you
          </p>
          <div>
            <FullPageModal {...MenteeFullSignUpProps}>
              <Form
                questions={questions}
                usedFor="menteeFullSU"
              />
            </FullPageModal>
          </div>
        </div>
      </section>
    );
  }
}

/*TypeformFullSignUp.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
*/
export default MenteeFullSignUp;
