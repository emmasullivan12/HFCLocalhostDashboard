// Last merged this code on 21st may 2024

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {cdn} from './CDN.js';
import AddEditTextContent from './AddEditTextContent.js';
import BarChart from './BarChart.js';
import BuyCoProfileModalContent from './BuyCoProfileModalContent.js';
import Carousel from './Carousel.js';
import EditSkillsContent from './EditSkillsContent.js';
import FeedContainer from "./FeedContainer.js";
import FullPageModal from './FullPageModal.js';
import {LoadingSpinner, whichBrowser} from './GeneralFunctions.js';
import Form from './Form.js';
import Modal from './Modal.js';
import TextParser from './TextParser.js';
import skillsOptions from './Skills.js';
import {getSkillDeets, convertSkills} from './UserDetail.js';

const ChooseProfileTypeModalProps = {
  ariaLabel: 'Choose Company Profile Type',
  triggerText: '+ Add / Edit description',
  usedFor: 'addTextDescCoProfile',
  changeInitFocus: true,
}

const EditLifeAtCompanyDescFPModalProps = {
  ariaLabel: 'Add / Edit Life at Company section',
  triggerText: '+ Add / Edit description',
  backBtn: 'arrow'
}
const EditLifeAtCompanyDescModalProps = {
  ariaLabel: 'Edit Life at Company section',
  triggerText: '+ Edit description',
  usedFor: 'addTextDescCoProfile',
  changeInitFocus: true,
}

const EditProfileSectionModalProps = {
  ariaLabel: 'Edit profile section',
  triggerText: 'Edit section',
  usedFor: 'editSection',
  changeInitFocus: true,
}

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

const AddExpertiseModalProps = {
  ariaLabel: 'Add / Edit skills',
  triggerText: '+ Add Key Skills',
  usedFor: 'addEditSkills',
  changeInitFocus: true,
  hideTrigger: true,
  removeOverflowY: true, // This means any dropdowns etc are not clipped off in modal but instead show over the modal. Do not use for modals likely to be used on Modal i.e. user facing. Use "showAbove" in Select.js instead
}

class CoProfileOverview extends React.Component {
  constructor() {
    super();
    this.state = {
      showUpgradeSuccessModal: false,
      showPremiumProfileSuccessModal: false,
      mentorWorkEnvChartLoaded: true,
      showAddSkillsModal: false,
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

  handleBlur = (tooltipID) => {
    var el = document.getElementById(tooltipID)
    if (el && el.innerHTML) {
      el.innerHTML = "Copy community URL";
    }
  }

  copyURL = (url, tooltipID) => {
    // Copy text to clipboard
    navigator.clipboard.writeText(url)
    document.execCommand("copy");

    var el = document.getElementById(tooltipID)
    el.innerHTML = "Copied!";
  }

  numberFormatter = (value) => {
    const numFormatted = value < 1000 ? value : ((Math.round(value / 100) / 10) + 'k')
    return numFormatted
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

  renderWelcomeMsg = (isPageManager, approvalStatus) => {
    const {handleSubmitPaidForm, companyName, upgradeCoProfileQuestions, fullCoProfileQuestions, fromThisCo, renderFromThisCoPromptModal} = this.props

    if (!isPageManager && !fromThisCo) {
      return (
        <div>
          Discover {companyName}: learn directly from real employees, and explore work-life reality
        </div>
      )
    } else if (fromThisCo && approvalStatus == '0') {
      <div>
        <div className="marginBottom10">You can claim this company profile to unlock extra features, including job listings, enhanced employer branding and more!.</div>
        { renderFromThisCoPromptModal }
      </div>
    } else if (approvalStatus == '1' || approvalStatus == '4' || approvalStatus == '7') {
      return (
        <div>
          We&#39;ve received your request to {approvalStatus == '4' ? 'upgrade your Company Profile' : 'claim this Company Profile'}. After it has been reviewed, you&#39;ll receive email confirmation of it&#39;s publication or a request for more information.
        </div>
      )
    } else if (approvalStatus == '3' || approvalStatus == '6') {
      return (
        <div>
          <div className="marginBottom10">You&#39;ve paid to {approvalStatus == '3' ? 'upgrade your Company Profile' : 'claim this Premium Company Profile'}, so have unlocked extra features.</div>
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
          The {companyName} community is humming along nicely! Why not answer some Q&A or share a general post for mentees to see when they arrive?
        </div>
      )
    }
  }

  render() {
    const {renderFromThisCoPromptModal, fromThisCo, formToShow, company, companyName, companyURL, isPageManager, renderCoProfileSideBar, fname, approvalStatus, contentArr, isLoggedIn, userRole, checkHasAccess, noAccessHandler, maxViewsReached, handleCommunityFeedClick, updatePathName, upgradeCoProfileQuestions, fullCoProfileQuestions} = this.props
    const {showUpgradeSuccessModal, showPremiumProfileSuccessModal, mentorWorkEnvChartLoaded, showAddSkillsModal} = this.state
    const isSafari = whichBrowser() == 'safari'
    const user = {
      expertise: ['77','349','609','143'],
      expertisefreetext: [],
      learning: ['2'],
      learningfreetext: [],
      //learning: ['569','587','337','60']
    }
    const expertiseCommaString = ((user.expertise && user.expertise.length > 0) || (user.expertisefreetext && user.expertisefreetext.length > 0)) ? convertSkills(user.expertise, user.expertisefreetext) : []
    const expertiseArr = (expertiseCommaString && expertiseCommaString.length == 0) ? [] : expertiseCommaString.split(', ');
    const learningCommaString = ((user.learning && user.learning.length > 0) || (user.learningfreetext && user.learningfreetext.length > 0)) ? convertSkills(user.learning, user.learningfreetext) : []
    const learningArr = learningCommaString && learningCommaString.length == 0 ? [] : learningCommaString.split(', ');
    var userHasCompletedSkills = expertiseArr && expertiseArr.length > 0 && learningArr && learningArr.length > 0
    let mentorSkillsArray, mentorLearningSkillsArray

    const employeeExperts = 2
    const contentViews = 999
    const posts = 1050
    const mentees = 1200

    const numEmployeeExperts = this.numberFormatter(employeeExperts)
    const numContentViews = this.numberFormatter(contentViews)
    const numPosts = this.numberFormatter(posts)
    const numMentees = this.numberFormatter(mentees)

    const mentorWorkEnv = [
      {
        "label": 'friendly',
        "value": .05
      },
      {
        "label": 'laid-back',
        "value": .1
      },
      {
        "label": 'nurturing',
        "value": .2
      },
      {
        "label": 'always learning',
        "value": .05
      },
      {
        "label": 'collaborative long namemeelikjsdfglkj sdfg',
        "value": .35
      },
      {
        "label": 'diverse',
        "value": .2
      },
      {
        "label": 'forward-thinking',
        "value": .05
      },
      {
        "label": 'modern',
        "value": .05
      },
      {
        "label": 'flexible',
        "value": .1
      },
      {
        "label": 'creative',
        "value": .2
      },
      {
        "label": 'challenging',
        "value": .05
      },
      {
        "label": 'competitive',
        "value": .35
      },
      {
        "label": 'energizing',
        "value": .2
      },
      {
        "label": 'thought-provoking',
        "value": .05
      },
      {
        "label": 'inspiring',
        "value": .05
      },
    ];
    const mentorWorkEnvIsEmpty = mentorWorkEnv.reduce((n, {value}) => n + value, 0) == 0
    const mentorWorkEnvSorted = mentorWorkEnv
      .sort((a,b)=> {
        if(b.value < a.value) { return -1; }
        if(b.value > a.value) { return 1; }
        return 0;
      })
      .slice(0,4)

    const mentorSkills = ['339','349','609','77']
    const mentorLearningSkills = ['569','77','337','60']
    mentorSkillsArray = mentorSkills.length > 0 ? mentorSkills.map(skill => getSkillDeets(skill)) : []
    mentorLearningSkillsArray = mentorLearningSkills.length > 0 ? mentorLearningSkills.map(skill => getSkillDeets(skill)) : []

    return (
      <div>
        {isLoggedIn && (
          <div className={"dash-welcomeContainer marginBottom20" + (isPageManager && (approvalStatus == '3' || approvalStatus == '6') ? " height160px" : "")}>
            <div className="col-9">
              <div className="dash-welcomeHeader">
                {(isPageManager && (approvalStatus == '3' || approvalStatus == '6')) && (
                  <span><i className="fas fa-exclamation-circle"/> <strong>Welcome, {fname}!</strong></span>
                )}
                {(!isPageManager || (isPageManager && (approvalStatus != '3' && approvalStatus != '6'))) && (
                  <strong>Welcome, {fname}!</strong>
                )}
              </div>
              {this.renderWelcomeMsg(isPageManager, approvalStatus)}
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
          <div className="bold darkGreyText fontSize16 marginBottom10"><span><span role="img" aria-label="stats emoji">📈</span> Company Insights <span role="img" aria-label="stats emoji">📈</span></span></div>
          <Carousel cardHeight="250px">
            <div className="dataCard card height250px" data-target="card" id="card-0" onBlur={() => this.handleBlur("tooltip-share-comm-link-0")}>
              <span className="tooltip more-info-icon mediumGreyText">
                <i className="fas fa-info-circle"/>
                <span className="tooltiptext below">
                  Stats about {companyName}&#39;s contributions to elevating the Prospela learner community.
                </span>
              </span>
              <div className="padding10 paddingR0">
                <div className="paddingR displayFlex">
                  <div className="displayInlineBlock marginRight3"><span role="img" aria-label="green-heart emoji">💚</span> </div>
                  <div className="dataCardTitle displayInlineBlock"><strong>Contributions</strong></div>
                </div>
                <div className="dispBlock marginTop10">
                  <div className="tagsList">
                    <span>
                      <span className="multiple value paddingR displayBlock displayBlock">
                        <span className="bold dispInlineBlock alignCenter width30px highlighterGreenText">{numEmployeeExperts}</span> Employee experts
                      </span>
                    </span>
                    <span>
                      <span className="multiple value paddingR displayBlock displayBlock"><span className="bold dispInlineBlock alignCenter width30px highlighterGreenText">{numContentViews}</span> Content views</span>
                    </span>
                    <span>
                      <span className="multiple value paddingR displayBlock displayBlock"><span className="bold dispInlineBlock alignCenter width30px highlighterGreenText">{numPosts}</span> Posts</span>
                    </span>
                    <span>
                      <span className="multiple value paddingR displayBlock displayBlock"><span className="bold dispInlineBlock alignCenter width30px highlighterGreenText">{numMentees}</span> Mentees supported</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={"dataCard card height250px" + (!isLoggedIn ? " locked" : "") + (mentorWorkEnvIsEmpty ? " locked overflowVisible" : "")} data-target="card" id="card-1" onBlur={() => this.handleBlur("tooltip-share-comm-link-1")}>
              <span className="tooltip mediumGreyText more-info-icon">
                <i className="fas fa-info-circle"/>
                <span className="tooltiptext below">
                  Percentage of employees who&#39;ve worked at this company by how they described their work environment
                </span>
              </span>
              {!isLoggedIn ? (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="strength emoji">💪</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight5"><strong>Typical work culture</strong></div>
                  </div>
                  <div>
                    <div className="dataItemUnlockSection marginTop10 marginBottom10">
                      <div className="dataItemUnlockSection-btnContainer" >
                        <a href={!isLoggedIn ? "https://app.prospela.com/signup?origin=companyPageDataBox" : null}>
                          <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                            <i className="fas fa-lock" id="itemUnlockIcon"/> Sign up to unlock
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="strength emoji">💪</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight5"><strong>Typical work culture</strong></div>
                  </div>
                  {mentorWorkEnvIsEmpty != true && mentorWorkEnvChartLoaded == false && (
                    <LoadingSpinner />
                  )}
                  {mentorWorkEnvIsEmpty != true && mentorWorkEnvChartLoaded == true && (
                    <div className="stackedBar-outerContainer">
                    {mentorWorkEnvSorted.map((attribute, index) => {
                      var topRoleValue = mentorWorkEnvSorted[0].value
                      const firstLetterCap = attribute.label.charAt(0).toUpperCase()
                      const remainingLetters = attribute.label.slice(1)
                      const capitalizedLabel = firstLetterCap + remainingLetters
                      return (
                        <div className="stackedBar-container small isCommPage" key={index}>
                          <BarChart
                            dataset1={[{"label": capitalizedLabel, "value": attribute.value}]}
                            dataset1Title={attribute.label}
                            dataset1Colour="rgb(78,78,214,1)" /* purple */
                            dataset1Fill="rgb(78,78,214,1)" /* purple */
                            dataset2={[{"label": 'Rest', "value": (topRoleValue - attribute.value)}]}
                            dataset2Title="Rest"
                            dataset2Colour="#bdbdbd" // grey
                            dataset2Fill="#d0d0d0" // grey
                            showHorizontal
                            showLegend={false}
                            showTitle={false}
                            showTooltip={false}
                            stacked
                            showTitleAndPercentLabels
                            barLabelFont='12px Helvetica Neue, Helvetica, Arial, sans-serif'
                          />
                        </div>
                      )
                    })}
                    </div>
                  )}
                  {mentorWorkEnvIsEmpty == true && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(companyURL, "tooltip-share-comm-link-1")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-1">
                              Copy page URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={"dataCard card height250px" + ((!isLoggedIn || !userHasCompletedSkills) ? " locked" : "") + (mentorSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-2" onBlur={() => this.handleBlur("tooltip-share-comm-link-2")}>
              <span className="tooltip mediumGreyText more-info-icon">
                <i className="fas fa-info-circle"/>
                <span className="tooltiptext below">
                  The top skills employee experts from this company tell us they have
                </span>
              </span>
              {(!isLoggedIn || !userHasCompletedSkills) ? (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight5"><strong>Top skills experts have</strong></div>
                  </div>
                  <div>
                    <div className="dataItemUnlockSection marginTop10 marginBottom10">
                      <div className="dataItemUnlockSection-btnContainer" >
                        <a href={!isLoggedIn ? "https://app.prospela.com/signup?origin=companyPageDataBox" : null} onClick={!isLoggedIn ? null : () => this.showModal("AddSkills")}>
                          <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                            <i className="fas fa-lock" id="itemUnlockIcon"/> {!isLoggedIn ? 'Sign up to unlock' : 'Add your skills to unlock'}
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="tools emoji">🛠️</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight5"><strong>Top skills experts have</strong></div>
                  </div>
                  {mentorSkills.length > 0 && (
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {mentorSkillsArray && mentorSkillsArray.map((skill) => {
                          let skillHasComm
                          skillHasComm = skillsOptions.filter(x => x.value == skill.value)[0].hasComm == 1;
                          if (skillHasComm == true) {
                            return (
                              <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link rankingItem tooltip" onClick={updatePathName}>
                                <span
                                  className="multiple clickable value paddingR displayBlock"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                                {!isSafari && (
                                  <span className="tooltiptext below width125px normalLineheight">
                                    <i className="fas fa-sign-out-alt" /> Go to skills community
                                  </span>
                                )}
                              </Link>
                            )
                          } else {
                            return (
                              <Link to='#' key={skill.value} className="link rankingItem tooltip cursorText">
                                <span
                                  className="multiple value paddingR displayBlock"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                                <span className="tooltiptext below width125px normalLineheight">
                                  We don&#39;t have an active skills community for this yet
                                </span>
                              </Link>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )}
                  {mentorSkills.length == 0 && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(companyURL, "tooltip-share-comm-link-2")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-2">
                              Copy page URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={"dataCard card height250px" + ((!isLoggedIn || !userHasCompletedSkills) ? " locked" : "") + (mentorLearningSkills.length == 0 ? " locked overflowVisible" : "")} data-target="card" id="card-3" onBlur={() => this.handleBlur("tooltip-share-comm-link-3")}>
              <span className="tooltip mediumGreyText more-info-icon">
                <i className="fas fa-info-circle"/>
                <span className="tooltiptext below">
                  The top skills employee experts from this company tell us they are currently learning
                </span>
              </span>
              {(!isLoggedIn || !userHasCompletedSkills) ? (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="seed emoji">🌱</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight3"><strong>Top skills experts are building</strong></div>
                  </div>
                  <div>
                    <div className="dataItemUnlockSection marginTop10 marginBottom10">
                      <div className="dataItemUnlockSection-btnContainer" >
                        <a href={!isLoggedIn ? "https://app.prospela.com/signup?origin=companyPageDataBox" : null} onClick={!isLoggedIn ? null : () => this.showModal("AddSkills")}>
                          <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                            <i className="fas fa-lock" id="itemUnlockIcon"/> {!isLoggedIn ? 'Sign up to unlock' : 'Add your skills to unlock'}
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="padding10 paddingR0">
                  <div className="paddingR displayFlex">
                    <div className="displayInlineBlock marginRight3"><span role="img" aria-label="seed emoji">🌱</span> </div>
                    <div className="dataCardTitle displayInlineBlock marginRight3"><strong>Top skills experts are building</strong></div>
                  </div>
                  {mentorLearningSkills.length > 0 && (
                    <div className="dispBlock marginTop10">
                      <div className="tagsList">
                        {mentorLearningSkillsArray && mentorLearningSkillsArray.map((skill) => {
                          let skillHasComm
                          skillHasComm = skillsOptions.filter(x => x.value == skill.value)[0].hasComm == 1;
                          if (skillHasComm == true) {
                            return (
                              <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill.value} className="link rankingItem tooltip" onClick={updatePathName}>
                                <span
                                  className="multiple clickable value paddingR displayBlock"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                                {!isSafari && (
                                  <span className="tooltiptext below width125px normalLineheight">
                                    <i className="fas fa-sign-out-alt" /> Go to skills community
                                  </span>
                                )}
                              </Link>
                            )
                          } else {
                            return (
                              <Link to='#' key={skill.value} className="link rankingItem tooltip cursorText">
                                <span
                                  className="multiple value paddingR displayBlock"
                                  id={skill.value}
                                >
                                  {skill.label}
                                </span>
                                <span className="tooltiptext below width125px normalLineheight">
                                  We don&#39;t have an active skills community for this yet
                                </span>
                              </Link>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )}
                  {mentorLearningSkills.length == 0 && (
                    <div className="dispBlock marginTop10 horizontallyCenterLeftTransform absolute bottom20 width180px">
                      <div className="marginTop20 alignCenter marginAuto width75pc fontSize14">
                        ...not enough people here yet.
                        <div className="marginTop20">
                          <a className="link electricPurpleText tooltip marginTop20" tabIndex="0" onClick={() => this.copyURL(companyURL, "tooltip-share-comm-link-3")}>
                            Invite some!
                            <div className="tooltiptext compact" id="tooltip-share-comm-link-3">
                              Copy community URL
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Carousel>
        </div>
        {(isPageManager || fromThisCo || (!isPageManager && company.lifeatdesc != '')) && (
          <div className="dash-welcomeContainer heightUnset green marginBottom40">
            <div className="positionRel">
              <div className="dash-welcomeHeader green"><strong>Life at {companyName}</strong></div>
              {company.lifeatdesc != '' && (
                <div className="darkGreyText"><TextParser text={company.lifeatdesc} /></div>
              )}
              {fromThisCo && company.lifeatdesc == '' && approvalStatus == '0' && (
                <div className="darkGreyText">
                  {renderFromThisCoPromptModal}
                </div>
              )}
              {isPageManager && company.lifeatdesc == '' && approvalStatus == '1' && ( // Only has free but not yet approved
                <div className="darkGreyText">NOTE: This is a Premium Feature. Once your Free profile has been approved, you&#39;ll be able to upgrade and add this content.</div>
              )}
              {isPageManager && company.lifeatdesc == '' && approvalStatus == '2' && ( // Only has free (approved)
                <div className="darkGreyText">
                  <Modal {...ChooseProfileTypeModalProps} wider={false}>
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
                </div>
              )}
              {isPageManager && company.lifeatdesc == '' && approvalStatus == '3' && ( // Paid for upgrade but not completed
                <FullPageModal {...EditLifeAtCompanyDescFPModalProps} usedFor="addTextDescCoProfile">
                  <Form
                    questions={upgradeCoProfileQuestions}
                    usedFor="addTextDescCoProfile"
                    formTitle="Update your Company Profile"
                    onSubmit={() => this.showUpgradeSuccessModal()}
                  />
                </FullPageModal>
              )}
              {isPageManager && (approvalStatus == '4' || approvalStatus == '7') && ( // Has paid for premium and provided info but not yet approved
                <div className="darkGreyText">NOTE: This is a Premium Feature. Once your Premium profile has been approved, you&#39;ll see your content here.</div>
              )}
              {isPageManager && company.lifeatdesc == '' && approvalStatus == '6' && ( // Paid for full premium profile but not completed
                <FullPageModal {...EditLifeAtCompanyDescFPModalProps} usedFor="addTextDescCoProfile">
                  <Form
                    questions={fullCoProfileQuestions}
                    usedFor="addTextDescCoProfile"
                    formTitle="Update your Company Profile"
                    onSubmit={() => this.showPremiumProfileSuccessModal()}
                  />
                </FullPageModal>
              )}
              {isPageManager && company.lifeatdesc != '' && (approvalStatus == '5' || approvalStatus == '8') && (
                <Modal {...EditLifeAtCompanyDescModalProps}>
                  <div className="postTypeContainer marginAuto">
                    <div>To make any changes, please email <strong className="electricPurpleText">talktous@prospela.com</strong></div>
                  </div>
                </Modal>
              )}
            {/*  {isPageManager && company.lifeatdesc == '' && ( // Not using this text box editor
                <Modal {...EditLifeAtCompanyDescModalProps}>
                  <AddEditTextContent
                    modalTitle={'Edit Life at ' + companyName + 'description'}
                    text={company.lifeatdesc}
                    textInputTitle='Description'
                    textInputId='lifeatdesc'
                    textMaxCharacters='2000'
                    addOrEdit='edit'
                    placeholderText='Type a description of life at your company...'
                    required
                  />
                </Modal>
              )}
              {isPageManager && (
                <div className="editSectionBtn dispInlineBlock">
                  <Modal {...EditProfileSectionModalProps}>
                    <AddEditTextContent
                      modalTitle={'Edit Life at ' + companyName + ' description'}
                      text={company.lifeatdesc}
                      textInputTitle='Description'
                      textInputId='lifeatdesc'
                      textMaxCharacters='2000'
                      addOrEdit='edit'
                      placeholderText='Type a description of life at your company...'
                      required
                    />
                  </Modal>
                </div>
              )}*/}
            </div>
          </div>
        )}
        { renderCoProfileSideBar(company, upgradeCoProfileQuestions, fullCoProfileQuestions, true) }
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
        {showAddSkillsModal == true && (
          <Modal {...AddExpertiseModalProps} handleLocalStateOnClose={() => this.closeModal("AddSkills")}>
            <EditSkillsContent modalTitle='Add your Skills / Expertise' isCompanyPage expOrLearning='exp' expertiseArr={expertiseArr} learningArr={learningArr}/>
          </Modal>
        )}
      </div>
    );
  }
}

export default CoProfileOverview;
