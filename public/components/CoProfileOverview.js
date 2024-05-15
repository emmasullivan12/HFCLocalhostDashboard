// Last merged this code on 6th feb 2024

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {cdn} from './CDN.js';
import FeedContainer from "./FeedContainer.js";
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
    const {handleSubmitPaidForm, company, upgradeCoProfileQuestions, fullCoProfileQuestions} = this.props

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
    const {isPageManager, fname, approvalStatus, contentArr, isLoggedIn, userRole, checkHasAccess, noAccessHandler, maxViewsReached, handleCommunityFeedClick, updatePathName} = this.props;
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
        <div>
          <div className="bold darkGreyText marginBottomMinus10 fontSize16">Latest posts</div>
          <FeedContainer contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} updatePathName={updatePathName} handleFeedClick={handleCommunityFeedClick} />
        </div>
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
