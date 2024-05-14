// Last merged this code on 6th feb 2024

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {cdn} from './CDN.js';
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import Modal from './Modal.js';

const UpgradeCoProfileModalProps = {
  ariaLabel: 'Update your Company Profile',
  triggerText: 'Update your Company Profile',
  usedFor: 'upgradeCoProfileClaim',
  backBtn: 'arrow'
}

const SuccessModalProps = {
  ariaLabel: 'Successfully submitted',
  triggerText: 'Successfully submitted',
  usedFor: 'success',
  hideTrigger: true,
  changeInitFocus: true
}

const FullCoProfileModalProps = {
  ariaLabel: 'Update your Premium Company Profile',
  triggerText: 'Update your Premium Company Profile',
  usedFor: 'fullCoProfileClaim',
  backBtn: 'arrow'
}

class CoProfileOverview extends React.Component {
  constructor() {
    super();
    this.state = {
      showUpgradeSuccessModal: false,
      showPremiumProfileSuccessModal: false,
    }
  }

  showUpgradeSuccessModal = () => {
    this.setState({
      showUpgradeSuccessModal: true,
    })
  }

  showPremiumProfileSuccessModal = () => {
    this.setState({
      showPremiumProfileSuccessModal: true,
    })
  }

  renderWelcomeMsg = (approvalStatus) => {
    const {handleSubmitPaidForm, company} = this.props

    var fullCoProfileQuestions = [
      {q: 'FULL PREMIUM company profile questions', detail: 'We need to know a few more quick details, including your current situation and how you\'d like to mentor. We know life gets in the way - that\'s why we want to help you do your thing in a way that makes most sense for you.', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you happy to offer?', detail: 'You\'ll be able to change this later if you change your mind', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'availType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / Happy to answer quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'OK ... on to the good stuff!', detail: 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do', aType: 'interim', name: 'interim'},
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
    ]

    var upgradeCoProfileQuestions = [
      {q: 'UPGRADE company profile questions', detail: 'We need to know a few more quick details, including your current situation and how you\'d like to mentor. We know life gets in the way - that\'s why we want to help you do your thing in a way that makes most sense for you.', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you happy to offer?', detail: 'You\'ll be able to change this later if you change your mind', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'availType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / Happy to answer quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
      {q: 'OK ... on to the good stuff!', detail: 'You\'ve already told us your industry & role, but we\'re excited to hear more about what you do', aType: 'interim', name: 'interim'},
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
    ]

    if (approvalStatus == '1' || approvalStatus == '4' || approvalStatus == '7') {
      return (
        <div>
          We&#39;ve received your request to {approvalStatus == '4' ? 'upgrade your Company Profile' : 'claim this Company Profile'}. After it has been reviewed, you&#39;ll receive email confirmation of it&#39;s publication or a request for more information.
        </div>
      )
    } else if (approvalStatus == '3' || approvalStatus == '6') {
      return (
        <div>
          You&#39;ve paid to {approvalStatus == '3' ? 'upgrade your Company Profile' : 'claim this Premium Company Profile'}, so have unlocked extra features.
          {approvalStatus == '3' && (
            <FullPageModal {...UpgradeCoProfileModalProps}>
              <Form
                questions={upgradeCoProfileQuestions}
                usedFor="upgradeCoProfileClaim"
                formTitle="Update your Premium Company Profile"
                onSubmit={() => this.showUpgradeSuccessModal()}
              />
            </FullPageModal>
          )}
          {approvalStatus == '6' && (
            <FullPageModal {...FullCoProfileModalProps}>
              <Form
                questions={fullCoProfileQuestions}
                usedFor="fullCoProfileClaim"
                formTitle="Update your Premium Company Profile"
                onSubmit={() => this.showPremiumProfileSuccessModal()}
              />
            </FullPageModal>
          )}
        </div>
      )
    } else {
      return (
        <div>
          The {company.name} community is humming along nicely! Why not answer some Q&A or share a general post for mentees to see when they arrive?
        </div>
      )
    }
  }

  render() {
    const {isPageManager, fname, approvalStatus} = this.props;
    const {showUpgradeSuccessModal, showPremiumProfileSuccessModal} = this.state

    return (
      <div>
        {isPageManager && (
          <div className="dash-welcomeContainer marginBottom20">
            <div className="col-9">
              <div className="dash-welcomeHeader">
                {(approvalStatus == '3' || approvalStatus == '6') && (
                  <span><i className="fas fa-exclamation-circle"/> <strong>Welcome, {fname}!</strong></span>
                )}
                {approvalStatus != '3' && approvalStatus != '6' && (
                  <strong>Welcome, {fname}!</strong>
                )}
              </div>
              {this.renderWelcomeMsg(approvalStatus)}
            </div>
            <div className="col-3">
              <div className="dash-welcomeImg-container commPage">
                <img
                  className="groupDashImg"
                  alt="Team meeting"
                  srcSet={cdn+"/images/Dashboard-Community%20Managers_Sml.png 235w, "+cdn+"/images/Dashboard-Community%20Managers.png 1039w"}
                  sizes="(min-width: 859px) 1039px, 235px"
                  src={cdn+"/images/Dashboard-Community%20Managers_Sml.png"}
                />
              </div>
            </div>
          </div>
        )}
        {showUpgradeSuccessModal == true && (
          <Modal {...SuccessModalProps} handleLocalStateOnClose={() => this.closeModal("Success")}>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Application submitted!
            </div>
            <div className="success-container">
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy reviewing your Company Profile updates and will notify you as soon as possible once it has been approved.
              </p>
              <p className="landingCTADesc">
                In the meantime, why not answer some Q&A or share a general post for mentees to see?
              </p>
            </div>
          </Modal>
        )}
        {showPremiumProfileSuccessModal == true && (
          <Modal {...SuccessModalProps} handleLocalStateOnClose={() => this.closeModal("Success")}>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Application submitted!
            </div>
            <div className="success-container">
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy reviewing your new Premium Company Profile and will notify you as soon as possible once it has been approved.
              </p>
              <p className="landingCTADesc">
                In the meantime, why not answer some Q&A or share a general post for mentees to see?
              </p>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default CoProfileOverview;
