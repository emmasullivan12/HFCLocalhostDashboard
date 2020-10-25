// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
//import { connect } from "react-redux";
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
    const fname = 'emma'
    const userIs18 = false

    const subjects = ''; // sch Subjects
    const subjectsFreeText = '';
    const gradeType = '';

    const hobbies = [];
    const hobbiesFreeText = [];
    const expertise = '';
    const certainty = '';
    const networkSize = '';

    const mobNumPattern = country === 'GBR' ? '07[0-9]{3}[0-9]{6}' : country === 'USA' ? '[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{2}[0-9]{4}' : country === 'CAN' ? '[0-9]{10}' : country === 'AUS' ? '0[0-9]{3}[0-9]{6}' : country === 'NZL' ? '02[0-9]{1,2}[0-9]{6,8}' : null
    const mobNumPlaceholder = country === 'GBR' ? '07400 123456' : country === 'USA' ? '(555) 555-5678' : country === 'CAN' ? '(416) 234-5678' : country === 'AUS' ? '0420 123456' : country === 'NZL' ? '022 1234 5678' : '07400 123456'

    var questions = [
      {q: 'So, ' + fname + ', you\'ve previously told us about the industry & role(s) that interest you, but what about the things you\'re truly passionate about?', detail: 'Your answers to the following questions will help us find you a mentor match that you\'re likely to click with', aType: 'interim', name: 'interim'},
      {q: 'When you think about work & careers, what kind of lifestyle do you want to have?', detail: 'Think about working hours, social life, salary, being your own boss etc. Note: There are no right or wrong answers here!', aType: 'textLong', req: 1, maxLength: 500, placeholder: 'Type your answer here...', name: 'lifestyle'},
      ... (hobbies.length === 0 && hobbiesFreeText.length === 0) ? [
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
      {q: 'Did you want to join any of these particular communities?', detail: 'You might be want to join one or some of these', aType: 'selectMulti', req: 1, showCheckbox: true, placeholder: 'Select communities...', placeholderOnClick: 'Choose from our list:', name: 'erg', valueToShow: 'label', options: [
        {value: '1', label: 'Black, Asian, Minority Ethnic (BAME)'},
        {value: '2', label: 'People with disabilities'},
        {value: '3', label: 'LGBTQI+'},
        {value: '4', label: 'Women in the Workforce'},
        {value: '0', label: 'None'},
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
        ... (subjects === '' && subjectsFreeText === '') ? [
          {q: 'What subjects are you studying?', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, maxTextLength: 75, placeholder: 'Type Subjects...', placeholderOnClick: 'Choose your main subject specialisms:', name: 'subjects', idValue: 'value', valueToShow: 'label', options: [
            {value: '0', label: 'Accounting'},
            {value: '1', label: 'Afrikaans'},
            {value: '2', label: 'Ancient History'},
            {value: '3', label: 'Anthropology'},
            {value: '4', label: 'Applied Science'},
            {value: '5', label: 'Arabic'},
            {value: '6', label: 'Archaeology'},
            {value: '7', label: 'Architecture'},
            {value: '8', label: 'Art and Design'},
            {value: '9', label: 'Anatomy'},
            {value: '10', label: 'Bengali'},
            {value: '11', label: 'Biblical Hebrew'},
            {value: '12', label: 'Biology'},
            {value: '13', label: 'Business Studies'},
            {value: '14', label: 'Chemistry'},
            {value: '15', label: 'Citizenship Studies'},
            {value: '16', label: 'Classical Civilisation'},
            {value: '17', label: 'Classical Greek'},
            {value: '18', label: 'Classical Studies'},
            {value: '19', label: 'Communication and Culture'},
            {value: '20', label: 'Computer Science'},
            {value: '21', label: 'Computing'},
            {value: '22', label: 'Criminology'},
            {value: '23', label: 'Critical Thinking'},
            {value: '24', label: 'Dance'},
            {value: '25', label: 'Design and Technology'},
            {value: '26', label: 'Design and Textiles'},
            {value: '27', label: 'Digital Media and Design'},
            {value: '28', label: 'Digital Technology'},
            {value: '29', label: 'Divinity'},
            {value: '30', label: 'Drama'},
            {value: '31', label: 'Drama and Theatre'},
            {value: '32', label: 'Dutch'},
            {value: '33', label: 'Economics'},
            {value: '34', label: 'Electronics'},
            {value: '35', label: 'Engineering'},
            {value: '36', label: 'English Language'},
            {value: '37', label: 'English Language and Literature'},
            {value: '38', label: 'English Literature'},
            {value: '39', label: 'Environmental Science'},
            {value: '40', label: 'Environmental Studies'},
            {value: '41', label: 'Environmental Technology'},
            {value: '42', label: 'Fashion and Textiles'},
            {value: '43', label: 'Film Studies'},
            {value: '44', label: 'Food Studies'},
            {value: '45', label: 'Food Technology'},
            {value: '46', label: 'French'},
            {value: '47', label: 'Further Mathematics'},
            {value: '48', label: 'General Studies'},
            {value: '49', label: 'Geography'},
            {value: '50', label: 'Geology'},
            {value: '51', label: 'German'},
            {value: '52', label: 'Global Development'},
            {value: '53', label: 'Global Perspectives and Research'},
            {value: '54', label: 'Government and Politics'},
            {value: '55', label: 'Greek'},
            {value: '56', label: 'Gujarati'},
            {value: '57', label: 'Health and Social Care'},
            {value: '58', label: 'Hindi'},
            {value: '59', label: 'Hinduism'},
            {value: '60', label: 'History'},
            {value: '61', label: 'History of Art'},
            {value: '62', label: 'Home Economics'},
            {value: '63', label: 'Human Biology'},
            {value: '64', label: 'Humanities'},
            {value: '65', label: 'Information Technology / ICT'},
            {value: '66', label: 'Irish'},
            {value: '67', label: 'Islamic Studies'},
            {value: '68', label: 'Italian'},
            {value: '69', label: 'Japanese'},
            {value: '70', label: 'Journalism'},
            {value: '71', label: 'Latin'},
            {value: '72', label: 'Law'},
            {value: '73', label: 'Leisure Studies'},
            {value: '74', label: 'Life and Health Sciences'},
            {value: '75', label: 'Marine Science'},
            {value: '76', label: 'Mathematics'},
            {value: '77', label: 'Media Studies'},
            {value: '78', label: 'Modern Hebrew'},
            {value: '79', label: 'Moving Image Arts'},
            {value: '80', label: 'Music'},
            {value: '81', label: 'Music Technology'},
            {value: '82', label: 'Nutrition and Food Science'},
            {value: '83', label: 'Punjabi'},
            {value: '84', label: 'Performance Studies'},
            {value: '85', label: 'Performing Arts'},
            {value: '86', label: 'Persian'},
            {value: '87', label: 'Philosophy'},
            {value: '88', label: 'Photography'},
            {value: '89', label: 'Physical Education'},
            {value: '90', label: 'Physics'},
            {value: '91', label: 'Polish'},
            {value: '92', label: 'Politics'},
            {value: '93', label: 'Portuguese'},
            {value: '94', label: 'Product Design'},
            {value: '95', label: 'Psychology'},
            {value: '96', label: 'Pure Mathematics'},
            {value: '97', label: 'Quantitative Methods'},
            {value: '98', label: 'Religious Studies'},
            {value: '99', label: 'Russian'},
            {value: '100', label: 'Science in Society'},
            {value: '101', label: 'Sociology'},
            {value: '102', label: 'Software Systems Development'},
            {value: '103', label: 'Spanish'},
            {value: '104', label: 'Sports Science'},
            {value: '105', label: 'Statistics'},
            {value: '106', label: 'Systems and Control Technology'},
            {value: '107', label: 'Telugu'},
            {value: '108', label: 'Tamil'},
            {value: '109', label: 'Technology and Design'},
            {value: '110', label: 'Thinking Skills'},
            {value: '111', label: 'Travel and Tourism'},
            {value: '112', label: 'Turkish'},
            {value: '113', label: 'Urdu'},
            {value: '114', label: 'Welsh'},
            {value: '115', label: 'World Development'},
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
      {q: 'What\'s your mobile number?', detail: 'We might need this additional way to contact you, particularly in the (unlikely) event of an emergency', aType: 'tel', req: 0, pattern: mobNumPattern, placeholder: mobNumPlaceholder, name: 'mobile'},
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
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSU"/>
          <h2 className="landingCTATitle">
            Complete your mentee profile / full application
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
