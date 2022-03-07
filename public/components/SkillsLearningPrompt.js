// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";

import Form from './Form.js';
import FullPageModal from './FullPageModal.js';
import Modal from './Modal.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';

import "../css/General.css";

const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgLrg',
  changeInitFocus: true
}

const MentorSkillsLearningPromptProps = {
  ariaLabel: 'Add your key skills >>',
  triggerText: 'Add your key skills >>',
  usedFor: 'skillsLearningForm',
  backBtn: 'arrow',
  changeInitFocus: true,
}

const MenteeSkillsLearningPromptProps = {
  ariaLabel: 'Add what you want to learn >>',
  triggerText: 'Add what you want to learn >>',
  usedFor: 'skillsLearningForm',
  backBtn: 'arrow',
  changeInitFocus: true,
}

class SkillsLearningPrompt extends Component {
  render() {
    const {userRole, expertise, learning} = this.props;

    var questionsSkillsHobbies = [
      {q: 'OK ... on to the good stuff!', detail: (userRole == 'mentee' ? 'You\'ve already told us which industry & roles you interested in, but what about particular skills you want to develop' : 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do'), aType: 'interim', name: 'interim'},
      ... (userRole == 'mentor' && expertise === '') ? [
        {q: 'What would you say your "key skills" are?', detailSmall: 'e.g. C++/Python etc, 2D/3D Animation, Financial Modelling, Strategy, Leadership, Entrepreneurship etc.', aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'expertise', idValue: 'value', valueToShow: 'label', options: [
          {value: '1', label: 'Skill 1'},
          {value: '2', label: 'Skill 2'},
          {value: '3', label: 'Skill 3'},
          {value: '4', label: 'Skill 4'},
          {value: '0', label: 'Skill 5'},
        ]},
      ] : [],
      ... (learning === '') ? [
        {q: 'What are some of the skills / areas of interest you are looking to build?', detail: (userRole == 'mentee' ? '' : 'Help us demonstrate to students that careers evolve over time!'), aType: 'autocompleteMulti', req: 1, showCheckbox: true, openOnClick: true, showValues: false, placeholder: 'Type Skills...', placeholderOnClick: 'Choose from our list or add your own:', name: 'learning', idValue: 'value', valueToShow: 'label', options: [
          {value: '1', label: 'Skill 1'},
          {value: '2', label: 'Skill 2'},
          {value: '3', label: 'Skill 3'},
          {value: '4', label: 'Skill 4'},
          {value: '0', label: 'Skill 5'},
        ]},
      ] : [],
    ]

    return (
      <section>
        <div className="landingCTABtnContainer">
          <Modal {...JoinProgrammeModalProps}>
            <JoinProgrammeModalContent userRole={userRole}/>
          </Modal>
        </div>
        <div className="contentBox landingCTA">
          <div className="placeholderPic mentorMatches"/>
          <h2 className="landingCTATitle">
            {userRole === 'mentee' ? 'Tell us what skills you\'re interested in learning' : 'Tell us your key skills'}
          </h2>
          <p className="landingCTADesc">
            {userRole == 'mentee' ? 'Help us match you and uncover the most relevant careers advice' : 'Help us match you and share relevant questions from mentees'}
          </p>
          {userRole == 'mentee' && (
            <FullPageModal {...MenteeSkillsLearningPromptProps}>
              <Form
                questions={questionsSkillsHobbies}
                usedFor="skillsLearningForm"
                formTitle="Tell us what you want to learn"
              />
            </FullPageModal>
          )}
          {userRole == 'mentor' && (
            <FullPageModal {...MentorSkillsLearningPromptProps}>
              <Form
                questions={questionsSkillsHobbies}
                usedFor="skillsLearningForm"
                formTitle='Tell us your key skills'
              />
            </FullPageModal>
          )}
        </div>

      </section>
    );
  }
}

export default SkillsLearningPrompt;
