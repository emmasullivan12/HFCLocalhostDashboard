// Dex last merged this code on 30th may 2024

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import companyList from './Companies.js';
import {DateCalc, TimeCalc} from './GeneralFunctions.js';
import Modal from './Modal.js';
import TextParser from './TextParser.js';
import {getCompanyDeets, getIndustryDeets, convertHashtags, timeSince} from './UserDetail.js';

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
      isTextClamped: '',
      showJobPostModal: false,
    }
    this.textItemRef = React.createRef();
  }

  componentDidMount() {
    this.checkIfTextClamped()
    window.addEventListener('resize', this.checkIfTextClamped);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIfTextClamped);
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

  checkIfTextClamped = () => {
    const {isInModal} = this.props
    const el = this.textItemRef.current
    let isTextClamped
    if (isInModal) {
      isTextClamped = false
    } else {
      isTextClamped = el.scrollHeight > el.clientHeight
    }

    this.setState({
      isTextClamped: isTextClamped
    })
  }

  handleSeeMore = (e) => {
    e.stopPropagation();

    e.currentTarget.previousSibling.classList.remove("max3Lines");
    e.currentTarget.innerHTML = '';
  }

  render() {
    const {job, isLoggedIn, checkHasAccess, noAccessHandler} = this.props
    const {showJobPostModal, isTextClamped} = this.state

    let companyName

    const companyItem = getCompanyDeets(job.coidrelatesto)
    companyName = companyItem && companyItem.label

/*
    country: 'GBR',
    city: 'London',
    locationtype: '1',
        {value: '0', label: 'On-site / In-person'},
        {value: '1', label: 'Hybrid'},
        {value: '2', label: 'Fully Remote'},
    roletype: '2',
        {value: '0', label: 'Full-time'},
        {value: '1', label: 'Part-time'},
        {value: '2', label: 'Permanent'},
        {value: '3', label: 'Contract'},
        {value: '4', label: 'Temporary'},
        {value: '5', label: 'Volunteer'},
        {value: '6', label: 'Internship'},
        {value: '7', label: 'Other'},
    skills: [],
    url: 'google.com',*/

    const FeedItemDetail = (props) => (
      <div className={props.isInModal ? "textLeft" : "contentBox jobItem withHover padding20 positionRel paddingBtm0"} data-itemid={job.oid}>
        <div>
          <div className="flexGrow1 maxWidth100">
            <div className="marginTop10">
              <div>{job.title}</div>
              <div className="fontSize12">
                <div>{companyName}</div>
              </div>
            </div>
            <div className="feedItemTextContainer">
              <div className={"marginTop10 max3Lines greyText" + (isTextClamped == true ? "" : " marginBottom10")} ref={this.textItemRef} >
                {job.description && (
                  <div className="darkGreyText fontSize13"><TextParser text={job.description} /></div>
                )}
              </div>
              {isTextClamped == true && (
                <div className="fontSize13 marginBottom10 pointerCursor linkPurpleText" data-label="ignoreOpenModal" onClick={(e) => {this.handleSeeMore(e)}}>
                  See more...
                </div>
              )}
            </div>
            <div>

        {/*}    {mentorSkills.length > 0 && (
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







              {skillsArray.length > 0 && (
                <div className="tagsList">
                  {skillsArray.map((skill) => {
                    return (
                      <Link to={{pathname: "/tagged/" + hashtag, state: {prevPath: window.location.pathname}}} key={skill} className="link" onClick={updatePathName}>
                        <span
                          className="multiple clickable value paddingR"
                          id={skill}
                        >
                          {skill}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}*/}
              <div className="textRight greyText fontSize13">{timeSince(job.datecreated)}</div>
            </div>
            <div className="marginTop10 paddingTop borderTop borderGrey">
              {!props.isInModal && (
                <div className="greyText fontSize14">View full job details</div>
              )}
              {props.isInModal && (
                <div>
                  <div>Deadline: {job.enddate}</div>
                </div>
              )}
            </div>
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
