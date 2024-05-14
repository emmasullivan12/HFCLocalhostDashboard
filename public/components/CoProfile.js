// Last merged this code on 6th feb 2024

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {cdn, groupImgFolder} from './CDN.js';

import {checkMobile, metaAdder, LoadingSpinner} from './GeneralFunctions.js';
import AddHighlightModalContent from "./AddHighlightModalContent";
import CoProfileOverview from './CoProfileOverview.js'
import BuyCoProfileModalContent from './BuyCoProfileModalContent.js';
import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import MenuNav from './MenuNav.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import ShareOptionsBox from './ShareOptionsBox.js';
import {getIndustryDeets, getCompanyDeets, userFlagEmoji} from './UserDetail.js';

import "../css/CoProfile.css";

const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addAnswerQApage',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: '+ Post',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

const SuccessModalProps = {
  ariaLabel: 'Successfully submitted',
  triggerText: 'Successfully submitted',
  usedFor: 'success',
  hideTrigger: true,
  changeInitFocus: true
}

const ClaimFreeCoProfileModalProps = {
  ariaLabel: 'Claim Company Profile',
  triggerText: 'Claim Company Profile',
  usedFor: 'noAccess',
  hideTrigger: true,
  backBtn: 'arrow'
}

const UnsubscribeProps = {
  ariaLabel: 'Unsubscribe',
  triggerText: 'Unsubscribe',
  usedFor: 'leaveGroup',
  changeInitFocus: true,
  removeOverflowY: true
}

const UnsubscribeMobileProps = {
  ariaLabel: 'Unsubscribe',
  triggerText: 'Unsubscribe',
  usedFor: 'leaveGroup',
  changeInitFocus: true,
  removeOverflowY: true
}

const ChooseProfileTypeModalProps = {
  ariaLabel: 'Choose Company Profile Type',
  usedFor: 'signUpPrompt',
  changeInitFocus: true,
}

class CoProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.initialTabToView ? this.props.initialTabToView : 'overview',
      isPageManager: false,
      approvalStatus: '',
      isMobile: '',
      showSuccessModal: false,
      updateUnsubscribeSuccess: false,
      companyItem: null,
    }
  }

  componentDidMount() {
    const {updateDocumentTitle, isLoggedIn} = this.props
    const isMobile = checkMobile()
    const company = {
      coid: '0',
      approvalstatus: 3,
      name: 'Pladis',
      pagemanagers: [{uid: '7'}, {uid: '8'}],
    }
    const companyItem = getCompanyDeets(company.coid)
    const companyName = companyItem && companyItem.label

    if(company != null){
      updateDocumentTitle("Explore " + companyName + " careers & advice - Prospela.com")
    }
    const loggedInUID = '8'
    const isPageManager = isLoggedIn && company.pagemanagers.some(e => e.uid == loggedInUID);
    this.setState({
      isMobile: isMobile,
      isPageManager: isPageManager,
      approvalStatus: company.approvalstatus,
      companyItem: companyItem,
    })
  }

  componentWillUnmount() {
    this.props.updateDocumentTitle("Prospela Dashboard")
  }

  updateTabToView = (e) => {
    let name
    e.persist()
    name = e.target.name ? e.target.name : e.currentTarget.name

    this.setState({
      tabToView: name
    })
  }

  handleStatusChange = (userInput) => {
    this.setState({
      wantsToLeave: userInput,
    })
  }

  handleSubmitUnsubscribe = () => {
    const {wantsToLeave} = this.state
    this.setState({
      isUnsubscribing: true,
    })
    if (wantsToLeave == 1) {
      this.setState({
        isUnsubscribing: false,
        updateUnsubscribeSuccess: true,
        approvalStatus: 2 // Set back to '1' i.e free version of profile
      })
    } else { // user wanted to stay
      this.setState({
        isUnsubscribing: false,
        updateUnsubscribeSuccess: true,
      })
    }
  }

  resetUnsubscribe = () => {
    const {wantsToLeave} = this.state
    this.setState({
      isUnsubscribing: false,
      updateUnsubscribeSuccess: false,
      wantsToLeave: null,
    })
  }

  renderTab = (company, companyURL, loggedInFname) => {
    const {userRole, isLoggedIn} = this.props;
    const {tabToView, isPageManager} = this.state;

    switch (tabToView) {
      case 'overview':
      return <CoProfileOverview company={company} approvalStatus={company.approvalstatus} fname={loggedInFname} isPageManager={isPageManager} />
        //return <CompanyOverview isPageManager={isPageManager} />
      case 'jobs':
      return <div>CompanyJobsBoard tab goes here</div>
        //return <CompanyJobsBoard isPageManager={isPageManager} />
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

  formToShow = (formType) => {
    if (formType == 'Free') {
      this.showModal("Claim"+formType+"ProfileForm")
    }
  }

  handleSuccessModalFromFPModal = (modalTypeToClose, modalToShow) => {
    this.showModal(modalToShow)
    this.closeModal(modalTypeToClose)
  }

  renderClaimCoProfileContent = (approvalStatus) => {
    const {isMobile, isPageManager} = this.state
    const {checkHasAccess, noAccessHandler} = this.props
    let buttonText, showStd, showPrem, showSuperPrem, stdCourseLink, premCourseLink, superPremCourseLink, stdDesc, premDesc, superPremDesc, stdPrice, premPrice, superPremPrice, modalTitle, modalSubTitle, showWider, showBottomTxt

    stdDesc = 'Get started by adding basic company info'
    premDesc = 'Everything in Free + Job / event listings, enhanced employer branding and more!'
    superPremDesc = 'Want to discuss your needs? Contact us!'
    stdPrice = '£0/mth'
    premPrice = '£100/mth'
    superPremPrice = 'Contact Sales'
    stdCourseLink = ''
    premCourseLink = 'www.stripe.com'
    superPremCourseLink = ''

    switch(approvalStatus) {
      case 0: // not claimed
        buttonText = 'Claim your free listing'
        showStd = true
        showPrem = true
        showSuperPrem = true
        modalTitle = 'Select your Company profile type'
        modalSubTitle = 'Choose between Free, Premium or Enterprise access'
        showWider = true
        showBottomTxt = true
        break;
      case 1: // free but not approved
      case 2: // free approved
        buttonText = 'Get Premium Access'
        showStd = false
        showPrem = true
        showSuperPrem = true
        modalTitle = 'Upgrade your Company profile type'
        modalSubTitle = 'Choose between Premium or Enterprise access'
        showWider = false
        showBottomTxt = true
        break;
      case 3: // upgrade paid but not completed
      case 4: // upgrade completed but not approved
      case 5: // upgrade approved
      case 6: // premium paid but not completed
      case 7: // premium completed but not approved
      case 8: // premium approved
        buttonText = 'Get Enterprise Access'
        showStd = false
        showPrem = false
        showSuperPrem = true
        modalTitle = 'Upgrade your Company profile type'
        modalSubTitle = 'Choose Enterprise Access'
        showWider = false
        showBottomTxt = false
        break;
      }
      return (
        <React.Fragment>
          {approvalStatus == '0' && (
            <span className="profileClaimStatus">
              Unclaimed
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div className="textCursor">This company profile is unclaimed. Companies who claim their profile can list jobs, access enhanced employer branding and more!</div>
                <div className="marginTop10 lightPurpleText">
                  <Modal {...ChooseProfileTypeModalProps} triggerText="Claim your free profile" wider={showWider} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                    <BuyCoProfileModalContent
                      modalTitle={modalTitle}
                      modalSubTitle={modalSubTitle}
                      showStd={showStd}
                      showPrem={showPrem}
                      showSuperPrem={showSuperPrem}
                      stdCourseLink={stdCourseLink}
                      premCourseLink={premCourseLink}
                      superPremCourseLink={superPremCourseLink}
                      stdDesc={stdDesc}
                      premDesc={premDesc}
                      superPremDesc={superPremDesc}
                      stdPrice={stdPrice}
                      premPrice={premPrice}
                      superPremPrice={superPremPrice}
                      showBottomTxt={showBottomTxt}
                      formToShow={this.formToShow}
                    />
                  </Modal>
                </div>
              </div>
            </span>
          )}
          {(approvalStatus == '1' || approvalStatus == '2') && (
            <React.Fragment>
              <svg viewBox="0 0 24 24" className="prCertifiedBadge greenFill marginRight0">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </g>
              </svg> <span className="profileClaimStatus">{(isPageManager && approvalStatus != '1') ? 'Upgrade' : 'Claimed'}</span>
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div>{(isPageManager && approvalStatus != '1') ? 'Someone from this company manages this profile. Upgrade to enjoy job listings, enhanced employer branding and more' : 'Someone from this company manages this profile.'}</div>
                {(isPageManager && approvalStatus != '1') && (
                  <div className="marginTop10 lightPurpleText">
                    <Modal {...ChooseProfileTypeModalProps} triggerText="Upgrade" wider={showWider}>
                      <BuyCoProfileModalContent
                        modalTitle={modalTitle}
                        modalSubTitle={modalSubTitle}
                        showStd={showStd}
                        showPrem={showPrem}
                        showSuperPrem={showSuperPrem}
                        stdCourseLink={stdCourseLink}
                        premCourseLink={premCourseLink}
                        superPremCourseLink={superPremCourseLink}
                        stdDesc={stdDesc}
                        premDesc={premDesc}
                        superPremDesc={superPremDesc}
                        stdPrice={stdPrice}
                        premPrice={premPrice}
                        superPremPrice={superPremPrice}
                        showBottomTxt={showBottomTxt}
                        formToShow={this.formToShow}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
          {(approvalStatus != '0' && approvalStatus != '1' && approvalStatus != '2') && (
            <React.Fragment>
              <svg viewBox="0 0 24 24" className="prCertifiedBadge greenFill marginRight0">
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </g>
              </svg> <span className="profileClaimStatus">{(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) ? 'Upgrade' : 'Claimed'}</span>
              <div className={"tooltiptext coProfile below top25 padding10 normalLineheight" + (isMobile ? " last signUpPage" : "")}>
                <div>{(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) ? 'Looking for more personalised features to meet your hiring and employer branding needs?' : 'Someone from this company manages this profile.'}</div>
                {(isPageManager && (approvalStatus == '5' || approvalStatus == '8')) && (
                  <div className="marginTop10 lightPurpleText">
                    <Modal {...ChooseProfileTypeModalProps} triggerText="Contact Sales" wider={showWider}>
                      <BuyCoProfileModalContent
                        modalTitle={modalTitle}
                        modalSubTitle={modalSubTitle}
                        showStd={showStd}
                        showPrem={showPrem}
                        showSuperPrem={showSuperPrem}
                        stdCourseLink={stdCourseLink}
                        premCourseLink={premCourseLink}
                        superPremCourseLink={superPremCourseLink}
                        stdDesc={stdDesc}
                        premDesc={premDesc}
                        superPremDesc={superPremDesc}
                        stdPrice={stdPrice}
                        premPrice={premPrice}
                        superPremPrice={superPremPrice}
                        showBottomTxt={showBottomTxt}
                        formToShow={this.formToShow}
                      />
                    </Modal>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>

      )
  }

  render() {
    const {companyItem, tabToView, isPageManager, approvalStatus, wantsToLeave, isUnsubscribing, updateUnsubscribeSuccess, isMobile, showClaimFreeProfileFormModal, showSuccessModal} = this.state
    const {userRole, isLoggedIn} = this.props;
    const company = {
      coid: '0',
      approvalstatus: 3,
      logo: '',
    //  logo: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
      description: 'Ernst & Young provides audit, consulting, tax, business risk, technology and security risk services, and human capital services worldwide.',
      country: 'GBR',
      industries: ['6', '8'],
      type: '0',
      size: '3',
      website: '',
      //website: 'https://www.ey.com',
      pagemanagers: [{uid: '7'}, {uid: '8'}],
      experts: [{uid: '1'}, {uid: '2'},{uid: '3'}, {uid: '4'}],
    }
    const activeJobs = [
      {jid: '0'},
      {jid: '1'}
    ]
    const loggedInFname = 'Dexter' // loggedin users fname
    var loggedInUID = '8'
    let urlText

    urlText = companyItem != null ? companyItem.urlText : ''

    const companyURLending = "/companies/" + urlText
    const companyURL = "https://app.prospela.com" + companyURLending
    const companyName = companyItem && companyItem.label
    const logoURL = company.logo
    const hasLogoURL = logoURL != '' && logoURL != null
    const flagEmoji = userFlagEmoji(company.country);
    const companySizeOptions = [
      {value: '0', label: 'Micro (0-10 employees)'},
      {value: '1', label: 'Small (11-50 employeers)'},
      {value: '2', label: 'Medium (51-150 employees)'},
      {value: '3', label: 'Large (over 150 employees)'},
    ]
    const companyTypeOptions = [
      {value: '0', label: 'For-Profit'},
      {value: '1', label: 'Non-Profit'},
      {value: '2', label: 'Social Enterprise'},
      {value: '3', label: 'Education Institution'},
    ]
    const companySize = companySizeOptions
      .filter(x => x.value == company.size)[0].label
    const companyType = companyTypeOptions
      .filter(x => x.value == company.type)[0].label
    const indArrToShow = company.industries

    let coLogo, coInitial

    if (hasLogoURL) {
      coLogo = cdn + '/' + groupImgFolder + logoURL + '-20'
    } else {
      coInitial = companyItem && companyName.charAt(0).toUpperCase();
    }

    var freeCoProfileQuestions = [
      {q: 'FREE company profile questions', detail: 'We need to know a few more quick details, including your current situation and how you\'d like to mentor. We know life gets in the way - that\'s why we want to help you do your thing in a way that makes most sense for you.', aType: 'interim', name: 'interim'},
      {q: 'What type of support are you happy to offer?', detail: 'You\'ll be able to change this later if you change your mind', aType: 'select', req: 1, placeholder: 'Select support type...', name: 'availType', valueToShow: 'label', options: [
        {value: '0', label: 'Longer-term mentorship (1 month+)'},
        {value: '1', label: 'Short-term (<1 month) / Happy to answer quick questions'},
        {value: '2', label: 'Both'},
        {value: '3', label: 'I\'m not sure yet / just browsing...'}
      ]},
    ]

    // Add meta tags
    metaAdder('property="og:type"', "website")
    metaAdder('property="og:title"', "Explore " + companyName + " careers & advice - Prospela.com")
    metaAdder('name="title"', "Explore " + companyName + " careers & advice - Prospela.com")
    metaAdder('property="og:url"', companyURL)
    metaAdder('property="og:image"', "https://files.prospela.com/images/AskAQ_Icon.png") // this meta tag required for LinkedIn sharing
    metaAdder('property="og:site_name"', "Prospela.com")

    //Add link tags to head
    var linkTag = document.getElementById('canonicalLink')
    if(!linkTag && companyURL != "https://app.prospela.com/company/falsefalse") {
      var link = document.createElement('link');
      link.id = 'canonicalLink'
      link.rel = 'canonical';
      link.href = companyURL
      document.head.appendChild(link);
    }

    let unsubscribeOptions = [
      {value: '0', label: 'No', detail: 'Keep Premium', checkbox: true, isTitle: false},
      {value: '1', label: 'Yes', detail: 'Unsubscribe & lose acces to Premium Employer features', checkbox: true, isTitle: false},
    ]

    return (
      <React.Fragment>
        <div className="tabWindow" id="communityFeedContainer">
          <div className="mainAndSideContainer">
            <div className="title-blankPage marginBottom20">
              <MenuNav />
              <div className="greyText fontSize12 marginBottom20 noBold">
                <i className="fas fa-home" /> &gt; Companies &gt; {companyName}
              </div>
              <div className="paddingBtm marginBottom20">
                <div className="chatItemFlexContainer qTitle qaPage">
                  <div>
                    <div className={"groupsAvatarContainer coProfile " + (hasLogoURL ? "" : "noImg")}>
                      {hasLogoURL === true ?
                        <img className="logoImg" alt="Initiative Logo" src={coLogo}/>
                      : coInitial
                      }
                    </div>
                    <span className="chatItemFlexContainer marginBottom10 breakWord">
                      <span>
                        <strong>{companyName} <span className="mediumGreyText">overview</span></strong>
                        <span className="pointerCursor noBold marginLeft5 mediumGreyText fontSize12 padding5 tooltip">
                          {this.renderClaimCoProfileContent(company.approvalstatus)}
                        </span>
                      </span>

                    </span>
                  {/*}  {isLoggedIn && approvalStatus != '' && approvalStatus >= '3' && isPageManager && isMobile && (
                      <Modal {...UnsubscribeMobileProps} handleLocalStateOnClose={() => this.resetUnsubscribe()}>
                        <div className="showSmallModalSize">
                          {updateUnsubscribeSuccess == false && (
                            <React.Fragment>
                              <div className="modal-title">
                                <div className="emoji-icon cross-emoji successBox" />
                                Are you sure you want to unsubscribe?
                              </div>
                              <div className="ideas-Title marginBottom20">
                                You&#39;re about to lose access to Premium Employer features, such as job listings and enhanced employer branding
                              </div>
                              <div className="autocompleter">
                                <SelectBox
                                  options={unsubscribeOptions}
                                  name='selectUnsubscribe'
                                  placeholder='Select yes or no:'
                                  placeholderOnClick='Select yes or no:'
                                  handleChange={this.handleStatusChange}
                                  focusOnLoad
                                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                                  //showIcon
                                  //iconToShow='iconFA'
                                  showDetail
                                  detailToShow='detail'
                                //  showCheckbox
                                //  defaultChecked={defaultInds}
                                />
                              </div>
                              <div className="pass-btn-container">
                                <button type="button" disabled={isUnsubscribing == true ? true : false} onClick={this.handleSubmitUnsubscribe} className="Submit-btn">
                                  {isUnsubscribing === true && (
                                    <LoadingSpinner />
                                  )}
                                  {isUnsubscribing != true && (
                                    <span>{wantsToLeave == 0 ? 'Keep Premium' : 'Cancel Subscription'}</span>
                                  )}
                                </button>
                              </div>
                            </React.Fragment>
                          )}
                          {updateUnsubscribeSuccess == true && (
                            <div className="modal-title">
                              <div className={"emoji-icon successBox" + (wantsToLeave == 0 ? ' heart-emoji' : ' sad-emoji')} />
                              {wantsToLeave == 0 ? 'Glad you\'re still here' : 'Please email talktous@prospela.com to request unsubscribe'}
                            </div>
                          )}
                        </div>
                      </Modal>
                    )}*/}
                    <div className="qDetail normalLineheight fontSize13 noBold marginBottom10 breakWord">
                      {company.description != '' ? company.description : ('Discover ' + companyName + ': learn directly from real employees, and explore work-life reality')}
                    </div>
                    <div className={"button-unstyled qDetail fontSize12 breakWord noBold" + (isMobile ? " lineHeight40pc" : "")}>
                      <span>
                        <i className="fas fa-map-marker-alt" /> {company.country}
                      </span>
                      <span className="addLeftDivider">
                        <i className="fas fa-building" /> {companyType}
                      </span>
                      {(company.website != '' && company.approvalstatus >= '3') && (
                        <span className="addLeftDivider">
                          <Link to={company.website+"?utm_source=prospela.com"} className="link inheritColor">
                            <i className="fas fa-laptop" /> <span className="profileClaimStatus">Website</span>
                          </Link>
                        </span>
                      )}
                      <span className={isMobile == true ? 'dispBlock' : "addLeftDivider"}>
                        <i className="fas fa-user-friends" /> {companySize}
                      </span>
                    </div>
                    <div className="marginBottom10">
                      <span className="bubbleContainer">
                        {indArrToShow.map((indID) => {
                          let industryItem, icon, indName
                          industryItem = getIndustryDeets(indID)
                          icon = industryItem.fa
                          indName = industryItem.label
                          return (
                            <Link to={{pathname: "/community/industry/" + industryItem.urlText, state: {prevPath: window.location.pathname}}} key={indID} className="bubble noBackground link noBold" onClick={this.props.updatePathName}>
                              <span><i className={icon} /> {indName}</span>
                            </Link>
                          )
                        })}
                      </span>
                    </div>
                  </div>
                  <span className="qCTA qaPage commPage">
                    {isLoggedIn && (
                      <React.Fragment>
                        <span className="marginRight8">
                          <ShareOptionsBox
                            id={company.coid}
                            qURL={companyURL}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={companyName}
                            customClassName="topBtn"
                          />
                        </span>
                        <Modal {...AddHighlightModalProps}>
                          <AddHighlightModalContent modalID="modal-addHighlight" userRole={userRole} updatePathName={this.props.updatePathName}/>
                        </Modal>
                        <Modal {...AddHighlightSmlModalProps}>
                          <AddHighlightModalContent modalID="modal-addHighlightSml" userRole={userRole} updatePathName={this.props.updatePathName}/>
                        </Modal>
                      </React.Fragment>
                    )}
                    {!isLoggedIn && (
                      <React.Fragment>
                        <div className="signUpPrompt-header isOnQAPage fontdarkGreyText marginBottom10 fontSize16">
                          <ShareOptionsBox
                            id={company.coid}
                            qURL={companyURL}
                            authorinsttype={null}
                            authorinstfreetext={null}
                            authorinst={null}
                            buttonToShow="linkEmojiInviteText"
                            fromCommunityPage
                            commName={companyName}
                            customClassName="topBtn"
                          />
                          <a className="button link Submit-btn signUpPrompt" href={"https://app.prospela.com/signup?origin=companyProfile&companyid=" + company.coid}>
                            Sign up
                          </a>
                        </div>
                      </React.Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="groupdash-menuBar borderBtm borderGrey commPage">
              <Link to={{pathname: companyURLending, state: {prevPath: window.location.pathname}}}>
                <button type="button" name="overview" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
              </Link>
              <Link to={{pathname: companyURLending + "/jobs-and-opportunities", state: {prevPath: window.location.pathname}}}>
                <button type="button" name="jobs" onClick={(e) => {this.updateTabToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'jobs' ? ' tabActive' : '')}>
                  Jobs & Ops
                  {activeJobs.length > 0 && (
                    <div className="multiple green marginLeft5 paddingL10 fontSize10">Now hiring!</div>
                  )}
                </button>
              </Link>
            </div>
            <div className="marginTop20">
              <div className="sideBar sideBarContentHiddenOnShrink" role="complementary" aria-label="sidebar">
                {isLoggedIn && approvalStatus != '' && approvalStatus >= '3' && isPageManager && !isMobile && (
                  <Modal {...UnsubscribeProps} handleLocalStateOnClose={() => this.resetUnsubscribe()}>
                    <div className="showSmallModalSize">
                      {updateUnsubscribeSuccess == false && (
                        <React.Fragment>
                          <div className="modal-title">
                            <div className="emoji-icon cross-emoji successBox" />
                            Are you sure you want to unsubscribe?
                          </div>
                          <div className="ideas-Title marginBottom20">
                            You&#39;re about to lose access to Premium Employer features, such as job listings and enhanced employer branding
                          </div>
                          <div className="autocompleter">
                            <SelectBox
                              options={unsubscribeOptions}
                              name='selectUnsubscribe'
                              placeholder='Select yes or no:'
                              placeholderOnClick='Select yes or no:'
                              handleChange={this.handleStatusChange}
                              focusOnLoad
                              valueToShow='label' // This is the attribute of the array/object to be displayed to user
                              //showIcon
                              //iconToShow='iconFA'
                              showDetail
                              detailToShow='detail'
                            //  showCheckbox
                            //  defaultChecked={defaultInds}
                            />
                          </div>
                          <div className="pass-btn-container">
                            <button type="button" disabled={isUnsubscribing == true ? true : false} onClick={this.handleSubmitUnsubscribe} className="Submit-btn">
                              {isUnsubscribing === true && (
                                <LoadingSpinner />
                              )}
                              {isUnsubscribing != true && (
                                <span>{wantsToLeave == 0 ? 'Keep Premium' : 'Cancel Subscription'}</span>
                              )}
                            </button>
                          </div>
                        </React.Fragment>
                      )}
                      {updateUnsubscribeSuccess == true && (
                        <div className="modal-title">
                          <div className={"emoji-icon successBox" + (wantsToLeave == 0 ? ' heart-emoji' : ' sad-emoji')} />
                          {wantsToLeave == 0 ? 'Glad you\'re still here' : 'Please email talktous@prospela.com to request unsubscribe'}
                        </div>
                      )}
                    </div>
                  </Modal>
                )}
                {!isLoggedIn && (
                  <div className="thinPurpleContentBox sideBarContentHiddenOnShrink signUpPromptBanner onFeedSideBar">
                    <div className="bannerTextContainer">
                      <div className="prBannerSmallLogoContainer marginBottom20">
                        <img
                          className="prLogoImg"
                          alt="Prospela Logo"
                          srcSet={cdn+"/images/Prospela%20Logo_Dark.png 213w, "+cdn+"/images/Prospela%20Logo_Dark.png 314w, "+cdn+"/images/Prospela%20Logo_Dark.png 640w"}
                          sizes="(max-width: 1440px) 69px, 69px"
                          src={cdn+"/images/Prospela%20Logo_Dark.png"}
                        />
                      </div>
                      <div className="fontSize14">Career Q&A with industry experts, 1:1 mentoring & a lasting professional network at your fingertips</div>
                      <div className="marginBottom20 marginTop70 dispInlineBlock">
                        <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href={"https://app.prospela.com/signup?origin=companyProfileSideBar&companyid=" + company.coid}>
                          Sign up (free)
                        </a>
                        <a className="dispBlock alignCenter fontSize13 electricPurpleText" href={"https://app.prospela.com/login?origin=companyProfileSideBar&companyid=" + company.coid}>or Login</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mainBar" role="main" aria-label="rendered tab">
                { this.renderTab(company, companyURL, loggedInFname) }
              </div>
            </div>
          </div>
        </div>
        {showClaimFreeProfileFormModal == true && (
          <FullPageModal {...ClaimFreeCoProfileModalProps} handleLocalStateOnClose={() => this.closeModal("ClaimFreeProfileForm")}>
            <Form
              questions={freeCoProfileQuestions}
              usedFor="freeCoProfileClaim"
              formTitle="Claim your Free Company Profile"
              onSubmit={() => this.handleSuccessModalFromFPModal("ClaimFreeProfileForm", "Success")}
            />
          </FullPageModal>
        )}
        {showSuccessModal == true && (
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
      </React.Fragment>
    );
  }
}

export default CoProfile;
