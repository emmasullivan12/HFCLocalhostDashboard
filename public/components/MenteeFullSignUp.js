// Dex last merged this code on 17th Aug 2020

import React, { Component } from "react";
//import { connect } from "react-redux";
// import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';

const MenteeFullSignUpProps = {
  triggerText: 'Complete Full Sign Up >>',
  usedFor: 'menteeFullSU',
  backBtn: 'arrow',
  changeInitFocus: true
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeFullSignUp extends Component {
  render() {
//    const fname = 'Emma';
  //  const id = '12345';
    const eetStatus = 'sch';
    const userRole = 'mentee';
    const country = 'GBR'

    const subjects = ''; // sch Subjects
    const gradeType = '';

    const hobbies = [];
    const expertise = '';
    const certainty = '';
    const networkSize = '';

    const phone = '';
    const mobNumPattern = country === 'GBR' ? '07[0-9]{3}[0-9]{6}' : country === 'USA' ? '[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{2}[0-9]{4}' : country === 'CAN' ? '[0-9]{10}' : null
    const mobNumPlaceholder = country === 'GBR' ? '07400 123456' : country === 'USA' ? '(555) 555-5678' : country === 'CAN' ? '(416) 234-5678' : '07400 123456'

    var questions = [
      {q: 'So you\'ve previously told us about the industry & job role(s) that interest you, but what about the things you\'re truly passionate about...', detail: 'Your answers to the following questions will help us find you a mentor match that you\'re likely to click with', aType: 'interim', name: 'interim'},
      {q: 'When you think about work & careers, what kind of lifestyle do you want to have?', detail: 'Think about things like working hours, social life, salary, running your own business, being the boss etc. Note: There are no right or wrong answers here ... Dream as big (or as little) as you like!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'lifestyle'},
      ... (hobbies.length === 0) ? [
        {q: 'Outside of work & school, what are some of your interests & hobbies?', detail: 'To help you think: What sports do you play? What do you spend your money on? What kind of people interest you? What annoys / excites you?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 150, placeholder: 'Type hobbies...', placeholderOnClick: 'Choose from our list or add a personal touch!:', name: 'hobbies', idValue: 'value', valueToShow: 'label', options: [
          {value: '0', label: '3D Printing'},
          {value: '1', label: 'Acting'},
          {value: '2', label: 'AI & Machine Learning'},
          {value: '3', label: 'Animals & Wildlife'},
          {value: '4', label: 'Animation & Illustration'},
          {value: '5', label: 'Architecture'},
          {value: '6', label: 'Art / Painting'},
          {value: '7', label: 'Astronomy'},
          {value: '8', label: 'Badminton'},
          {value: '9', label: 'Baking'},
          {value: '10', label: 'Baseball'},
          {value: '11', label: 'Basketball'},
          {value: '12', label: 'Beauty & Wellness'},
          {value: '13', label: 'Blogging'},
          {value: '14', label: 'Boardgames / Tabletop games'},
          {value: '15', label: 'Bouldering / Rock climbing'},
          {value: '16', label: 'Boxing'},
          {value: '17', label: 'Camping'},
          {value: '18', label: 'Cars & bikes'},
          {value: '19', label: 'Cinema'},
          {value: '20', label: 'Coding / Programming'},
          {value: '21', label: 'Coffee'},
          {value: '22', label: 'Comedy'},
          {value: '23', label: 'Comics & Anime'},
          {value: '24', label: 'Community service / Volunteering'},
          {value: '25', label: 'Computer Hardware & Electronics'},
          {value: '26', label: 'Cooking & Food'},
          {value: '27', label: 'Crafts, Sewing & Knitting'},
          {value: '28', label: 'Cricket'},
          {value: '29', label: 'Crossfit'},
          {value: '30', label: 'Cycling'},
          {value: '31', label: 'Dance'},
          {value: '32', label: 'DIY & Woodwork'},
          {value: '33', label: 'DJ-ing'},
          {value: '34', label: 'Documentaries'},
          {value: '35', label: 'Dogs'},
          {value: '36', label: 'Drones / Robotics'},
          {value: '37', label: 'Dungeons & Dragons'},
          {value: '38', label: 'Environmentalism'},
          {value: '39', label: 'E-Sports'},
          {value: '40', label: 'Fashion'},
          {value: '41', label: 'Festivals'},
          {value: '42', label: 'Film / TV'},
          {value: '43', label: 'Financial Trading / Investments'},
          {value: '44', label: 'Fishing'},
          {value: '45', label: 'Football'},
          {value: '46', label: 'Formula One (F1)'},
          {value: '47', label: 'Gadgets & Tech'},
          {value: '48', label: 'Game development'},
          {value: '49', label: 'Gardening & Plants'},
          {value: '50', label: 'Golf'},
          {value: '51', label: 'Guitar'},
          {value: '52', label: 'Gym / Fitness'},
          {value: '53', label: 'History'},
          {value: '54', label: 'Hockey'},
          {value: '55', label: 'Horse-riding'},
          {value: '56', label: 'Interior Design'},
          {value: '57', label: 'Japanese culture'},
          {value: '58', label: 'Kickboxing'},
          {value: '59', label: 'Learning foreign languages'},
          {value: '60', label: 'Listening to music'},
          {value: '61', label: 'Live Music & Concerts'},
          {value: '62', label: 'Martial Arts'},
          {value: '63', label: 'Meditation'},
          {value: '64', label: 'Memes'},
          {value: '65', label: 'Nature'},
          {value: '66', label: 'Nutrition'},
          {value: '67', label: 'Online courses / MOOCs'},
          {value: '68', label: 'Parenting / Kids'},
          {value: '69', label: 'Part-time work'},
          {value: '70', label: 'Personal Development & Self-improvement'},
          {value: '71', label: 'Photography'},
          {value: '72', label: 'Piano'},
          {value: '73', label: 'Planning & running events'},
          {value: '74', label: 'Playing in a band'},
          {value: '75', label: 'Playing the drums'},
          {value: '76', label: 'Podcasts'},
          {value: '77', label: 'Poetry'},
          {value: '78', label: 'Poker'},
          {value: '79', label: 'Politics'},
          {value: '80', label: 'Psychology'},
          {value: '81', label: 'Reading / Books'},
          {value: '82', label: 'Religion / prayer'},
          {value: '83', label: 'Rowing'},
          {value: '84', label: 'Rugby'},
          {value: '85', label: 'Running'},
          {value: '86', label: 'Sci Fi'},
          {value: '87', label: 'Science'},
          {value: '88', label: 'Screenwriting'},
          {value: '89', label: 'Sculpting'},
          {value: '90', label: 'Shopping'},
          {value: '91', label: 'Singing'},
          {value: '92', label: 'Skateboarding'},
          {value: '93', label: 'Skiing / Snowboarding'},
          {value: '94', label: 'Social justice initiatives'},
          {value: '95', label: 'Socialising'},
          {value: '96', label: 'Squash'},
          {value: '97', label: 'Startups'},
          {value: '98', label: 'Surfing'},
          {value: '99', label: 'Swimming'},
          {value: '100', label: 'Table Tennis'},
          {value: '101', label: 'Tattoos'},
          {value: '102', label: 'Tennis'},
          {value: '103', label: 'Theatre'},
          {value: '104', label: 'Travel'},
          {value: '105', label: 'Triathlons'},
          {value: '106', label: 'Ukelele'},
          {value: '107', label: 'Veganism & Plant based diets'},
          {value: '108', label: 'Video Editing / Youtube'},
          {value: '109', label: 'Video games'},
          {value: '110', label: 'Visiting Museums & Galleries'},
          {value: '111', label: 'Volleyball'},
          {value: '112', label: 'Walking / Hiking'},
          {value: '113', label: 'Watching sport'},
          {value: '114', label: 'Web design'},
          {value: '115', label: 'Weighlifting'},
          {value: '116', label: 'Writing'},
          {value: '117', label: 'Yoga'},
        ]},
      ] : [],
      ... (expertise === '') ? [
        {q: 'What would you say your "key skills" are?', detail: 'To help you think: What do you enjoy doing? Have you helped someone recently? How? What did someone last compliment you on?', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your key skills here...', name: 'expertise'},
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
      {q: 'Did you want to join any of these particular communities?', detail: 'You might be want to join some of these ... or want to suggest your own (and we\'ll see what we can do)!', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select communities...', placeholderOnClick: 'Choose from our list or add your own:', name: 'erg', valueToShow: 'label', options: [
        {value: '0', label: 'Black, Asian, Minority Ethnic (BAME)'},
        {value: '1', label: 'People with disabilities'},
        {value: '2', label: 'LGBTQI+'},
        {value: '3', label: 'Women in the Workforce'},
      ]},
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
      {q: 'Nearly there! We have a few quick questions about your current situation', aType: 'interim', name: 'interim'},
      ... (eetStatus === 'sch') ? [
        ... (subjects === '') ? [
          {q: 'What subjects are you studying?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
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
      ... (phone === '') ? [
        {q: 'What\'s your mobile number?', detail: 'We need this additional way to contact you in case you change schools, etc.', aType: 'tel', req: 1, pattern: mobNumPattern, placeholder: mobNumPlaceholder, name: 'mobile'},
      ] : [],
    /*  {q: 'Notification preferences: Messages from your E-Mentor etc.', detail: 'Receive messages from '+ (userRole === 'mentee' ? 'your E-Mentors and other students in your network, including 1:1 careers advice personalised to you' : 'your Mentees and other employees in your groups'), aType: 'checkbox', name: 'memail', options: [
        {label: 'By Email', id: 'formA-MenteeFullSignUp-memail', name: 'memail'},
        {label: 'By SMS / Text Message', id: 'formA-MenteeFullSignUp-msms', name: 'msms'},
      ]},*/
      {q: 'Set your notification preferences: Career Opportunities & Tips', detail: 'Receive inspiration, '+ (userRole === 'mentee' ? 'career opportunities,' : 'ongoing support,') + ' promotions, surveys, and product updates from Prospela and our partners', aType: 'checkbox', name: 'checkboxMaster', options: [
        {label: 'By Email', id: 'pemail', name: 'pemail'},
      //  {label: 'By SMS / Text Message', id: 'psms', name: 'psms'},
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
