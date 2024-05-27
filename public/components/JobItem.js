// Dex last merged this code on 21st may 2024

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import companyList from './Companies.js';
import {DateCalc, TimeCalc} from './GeneralFunctions.js';
import Modal from './Modal.js';
import TextParser from './TextParser.js';
import {getIndustryDeets, convertHashtags} from './UserDetail.js';

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
    const el = this.textItemRef.current
    const isTextClamped = el.scrollHeight > el.clientHeight

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
console.log(job)

    const FeedItemDetail = (props) => (
      <div className={props.isInModal ? "textLeft" : "contentBox jobItem withHover padding20 positionRel paddingBtm0"} data-itemid={job.oid}>
        <div>
          <div className="flexGrow1 maxWidth100">
            <div className="gridContainer marginTop10">
              <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                <div>logo</div>
              </div>
              <div className="gridRightColumn textLeft whiteSpace fontSize12">
                <div>company ID this role relates to: {job.coidrelatesto}</div>
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
              <div className="textRight greyText fontSize13"><DateCalc time={job.datecreated} showPureDate /> at <TimeCalc time={job.datecreated} /></div>
            </div>
            <div className="marginTop10 paddingTop borderTop borderGrey">
              {!props.isInModal && (
                <div className="greyText fontSize14">View full job details</div>
              )}
              {props.isInModal && (
                <div>Extra job info goes here</div>
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
