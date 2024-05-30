// Dex last merged this code on 30th may 2024

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import companyList from './Companies.js';
import {DateCalc, TimeCalc, whichBrowser} from './GeneralFunctions.js';
import Modal from './Modal.js';
import skillsOptions from './Skills.js';
import TextParser from './TextParser.js';
import {getCompanyDeets, getIndustryDeets, convertHashtags, timeSince, userFlagEmoji } from './UserDetail.js';

import '../css/MyActivity.css';

const JobPostModalProps = {
  ariaLabel: 'View Job Listing',
  triggerText: 'View Job Listing',
  usedFor: 'jobListing',
  hideTrigger: true,
  changeInitFocus: true
}

class JobItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJobPostModal: false,
    }
  }

  showModal = (e, modalType) => {
    if (e.target.dataset.label == 'ignoreOpenModal' || e.currentTarget.dataset.label == 'ignoreOpenModal') {return}

    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  render() {
    const {job, isLoggedIn, checkHasAccess, noAccessHandler, updatePathName, isOnCoProfile} = this.props
    const {showJobPostModal} = this.state
    const isSafari = whichBrowser() == 'safari'

    let companyName, companyDetailToShow, companyURL, companyURLending

    const companyItem = getCompanyDeets(job.coidrelatesto)
    companyName = companyItem && companyItem.label

    if (isOnCoProfile == true) {
      companyDetailToShow = companyName
    } else {
      companyURL = companyItem && companyItem.urlText
      companyURLending = "/companies/" + companyURL
      companyDetailToShow = (
        <Link to={{pathname: companyURLending, state: {prevPath: window.location.pathname}}} key={companyName} data-label="ignoreOpenModal" className="link tooltip" onClick={updatePathName}>
          {companyName}
          {!isSafari && (
            <span className="tooltiptext below width125px normalLineheight">
              <i className="fas fa-sign-out-alt" /> Go to Company Profile
            </span>
          )}
        </Link>
      )
    }
    const jobSkillsArr = job.skills

    const jobRoleTypesArr = job.roletype
    const locationTypeArr = [
      {value: '0', label: 'On-site / In-person'},
      {value: '1', label: 'Hybrid'},
      {value: '2', label: 'Fully Remote'},
    ]
    const roleTypeArr = [
      {value: '0', label: 'Full-time'},
      {value: '1', label: 'Part-time'},
      {value: '2', label: 'Permanent'},
      {value: '3', label: 'Contract'},
      {value: '4', label: 'Temporary'},
      {value: '5', label: 'Volunteer'},
      {value: '6', label: 'Internship'},
      {value: '7', label: 'Other'},
    ]
    const locationTypeText = locationTypeArr
      .filter(i => i.value == job.locationtype)[0]
    const flagEmoji = userFlagEmoji(job.country);

    const FeedItemDetail = (props) => (
      <div className={props.isInModal ? "textLeft" : "contentBox jobItem withHover padding20 positionRel paddingBtm0"} data-itemid={job.oid}>
        <div>
          <div className="flexGrow1 maxWidth100">
            <div className="marginTop10">
              <div className={props.isInModal ? "bold fontSize20" : ""}>{job.title}</div>
              <div className={props.isInModal ? "fontSize14 greyText marginTop5" : "fontSize12 greyText"}>
                <div>{companyDetailToShow}</div>
              </div>
            </div>
            <div className="dispBlock marginTop10">
              <div className="tagsList">
                <span>
                  {jobRoleTypesArr.map((type, index) => {
                    let roleTypeText = roleTypeArr
                      .filter(i => i.value == type)[0].label
                    return(
                      <span
                        className="multiple value marginRight8 grey mediumGreyText paddingR"
                        key={index}
                      >
                        <span>{roleTypeText}</span>
                      </span>
                    )
                  })}
                  {job.locationtype == '0' && (
                    <span
                      className="multiple value marginRight8 grey mediumGreyText paddingR"
                    >
                      <span><i className={"emoji-icon sml " + flagEmoji}/><span> {job.city}, {job.country}</span></span>
                    </span>
                  )}
                  {job.locationtype == '1' && (
                    <React.Fragment>
                      <span
                        className="multiple value marginRight8 grey mediumGreyText paddingR"
                      >
                        <span>
                          <span>Hybrid</span>
                        </span>
                      </span>
                      <span
                        className="multiple value marginRight8 grey mediumGreyText paddingR"
                      >
                        <span><i className={"emoji-icon sml " + flagEmoji}/><span> {job.city}, {job.country}</span></span>
                      </span>
                    </React.Fragment>
                  )}
                  {job.locationtype == '2' && (
                    <React.Fragment>
                    <span
                      className="multiple value marginRight8 grey mediumGreyText paddingR"
                    >
                      <span><span role='img' aria-label='globe emoji'>🌎</span> Remote</span>
                    </span>
                    {props.isInModal && (
                      <span
                        className="multiple value marginRight8 grey mediumGreyText paddingR"
                      >
                        <span><i className={"emoji-icon sml " + flagEmoji}/><span> {job.city}, {job.country}</span></span>
                      </span>
                    )}
                    </React.Fragment>
                  )}
                </span>
              </div>
              <div className="textRight greyText fontSize13 marginBottom10">{timeSince(job.datecreated)}</div>
            </div>
            {props.isInModal && (
              <div className="marginTop10">
                <div className="marginTop10 paddingTop borderTop borderGrey">
                  <div className="marginTop10">
                    <a href={job.url+"?utm_source=prospela.com"} className="link Submit-btn backgroundBlack white dispBlock marginBottom20 width150px minWidth150px" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt" /> <span className="fontSize14">Apply</span>
                    </a>
                  </div>
                  <div className="marginTop10">
                    <div className="marginBottom10">About the Job</div>
                    <div className="darkGreyText fontSize13"><TextParser text={job.description} /></div>
                  </div>
                  <div className="dispBlock marginTop40">
                    <div className="fontSize14 marginBottom5">Skills related to this role:</div>
                    <div className="tagsList">
                      {jobSkillsArr && jobSkillsArr.map((skill) => {
                        let skillDetail = skillsOptions.filter(x => x.value == skill)[0]
                        let skillHasComm, skillName
                        skillHasComm = skillDetail.hasComm == 1;
                        skillName = skillDetail.label
                        if (skillHasComm == true) {
                          return (
                            <Link to={{pathname: "/community/skills/" + skill.urlText, state: {prevPath: window.location.pathname}}} key={skill} className="link tooltip" onClick={updatePathName}>
                              <span
                                className="multiple clickable value paddingR"
                                id={skill}
                              >
                                {skillName}
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
                            <Link to='#' key={skill} className="link tooltip cursorText">
                              <span
                                className="multiple value paddingR"
                                id={skill}
                              >
                                {skillName}
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
                  <div className="fontSize12 greyText marginTop20">Deadline: <DateCalc time={job.enddate} /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )

    return (
      <React.Fragment>
        <div className="link" onClick={(e) => this.showModal(e, 'JobPost')}>
          <FeedItemDetail />
        </div>
        {showJobPostModal == true && (
          <Modal {...JobPostModalProps} wider handleLocalStateOnClose={() => this.closeModal("JobPost")}>
            <FeedItemDetail
              isInModal
            />
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default JobItem;
