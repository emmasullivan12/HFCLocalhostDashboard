// Dex last merged this code on 28th may 2024

import React, { Component } from "react";

import BuyCoProfileModalContent from './BuyCoProfileModalContent.js';
import Form from './Form.js';
import FullPageModal from './FullPageModal.js';
import Modal from './Modal.js';

const ChooseProfileTypeModalProps = {
  ariaLabel: 'Choose Company Profile Type',
  usedFor: 'signUpPrompt',
  changeInitFocus: true,
}

const ListJobModalProps = {
  ariaLabel: 'List a Job',
  triggerText: 'List a Job',
  usedFor: 'listAJob',
  backBtn: 'arrow',
  changeInitFocus: true
}

const SuccessModalProps = {
  ariaLabel: 'Successfully submitted',
  triggerText: 'Successfully submitted',
  usedFor: 'success',
  hideTrigger: true,
  changeInitFocus: true
}

class NoJobListingsPrompt extends Component {
  constructor() {
    super();
    this.state = {
      showSuccessModal: false,
    }
  }

  showModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  renderNoJobsPrompt = () => {
    const {isPageManager, approvalStatus, renderFromThisCoPromptModal, fromThisCo, companyName, listJobQuestions, isOnCommPage} = this.props

    if (isOnCommPage == true) {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>This community doesn&#39;t have any listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc">
            <span>Check back soon as opportunities arrive all the time. In the meantime, why not build up your rep by engaging in our Q&A or 1:1 mentoring?</span>
          </p>
        </React.Fragment>
      )
    } else if (!isPageManager && !fromThisCo) {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>{companyName} hasn&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc">
            <span>Check back soon as opportunities arrive all the time. In the meantime, why not build up your rep by engaging in our Q&A or 1:1 mentoring?</span>
          </p>
        </React.Fragment>
      )
    } else if (fromThisCo && fromThisCo && approvalStatus == '0') {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>{companyName} hasn&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc marginBottom10">
            <span>You can claim this company profile to unlock extra features, including job listings, enhanced employer branding and more!</span>
          </p>
          { renderFromThisCoPromptModal("welcomeBox-claimCoProfileJobsTab", "Claim Profile to list a Job") }
        </React.Fragment>
      )
    } else if (isPageManager && approvalStatus == '1') {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>You haven&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc">
            <span>We&#39;ve received your request to claim this Company Profile. After it has been approved, you&#39;ll receive email confirmation and be able to list jobs here.</span>
          </p>
        </React.Fragment>
      )
    } else if (isPageManager && approvalStatus == '2') {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>You haven&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc marginBottom10">
            <span>You can upgrade your company profile to unlock extra features, including job listings, enhanced employer branding and more!</span>
          </p>
          <Modal {...ChooseProfileTypeModalProps} triggerText="Upgrade" wider={false}>
            <BuyCoProfileModalContent
              modalTitle='Upgrade to access this feature'
              modalSubTitle='Choose between Premium or Enterprise access'
              showStd={false}
              showPrem
              showSuperPrem
              stdCourseLink=''
              premCourseLink='www.stripe.com'
              superPremCourseLink=''
              stdDesc='Get started by adding basic company info'
              premDesc='Everything in Free + Job / event listings, enhanced employer branding and more!'
              superPremDesc='Want to discuss your needs? Contact us!'
              stdPrice='£0/mth'
              premPrice='£100/mth'
              superPremPrice='Contact Sales'
              showBottomTxt
              formToShow={null}
            />
          </Modal>
        </React.Fragment>
      )
    } else if (isPageManager && approvalStatus > '2') {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>You haven&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc marginBottom10">
            <span>Click below to add an opportunity</span>
          </p>
          <FullPageModal {...ListJobModalProps}>
            <Form
              questions={listJobQuestions}
              usedFor="listAJob"
              formTitle="List a Job"
              onSubmit={() => this.showModal('Success')}
            />
          </FullPageModal>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className="placeholderPic noJobs" />
          <h2 className="landingCTATitle">
            <div>{companyName} hasn&#39;t listed any jobs yet</div>
          </h2>
          <p className="landingCTADesc">
            <span>Want to list a job for your company? Get in touch with your HR representative to find out who runs your company page on Prospela.</span>
          </p>
        </React.Fragment>
      )
    }
  }

  render() {
    const {companyName} = this.props
    const {showSuccessModal} = this.state

    return (
      <section>
        <div className="contentBox landingCTA">
          {this.renderNoJobsPrompt()}
        </div>
        {showSuccessModal == true && (
          <Modal {...SuccessModalProps} handleLocalStateOnClose={() => this.closeModal("Success")}>
            <div className="modal-title">
              <div className="emoji-icon stopwatch-emoji successBox" />
              Job listing submitted!
            </div>
            <div className="success-container">
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy reviewing your listing and will notify you as soon as possible once it has been approved.
              </p>
              <p className="landingCTADesc">
                In the meantime, why not answer some Q&A or share a general post for mentees to see?
              </p>
            </div>
          </Modal>
        )}
      </section>
    );
  }
}

export default NoJobListingsPrompt;
