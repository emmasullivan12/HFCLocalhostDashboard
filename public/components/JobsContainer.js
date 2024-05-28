// Dex last merged this code on 6th feb 2024

import React, { Component } from "react";

import NoJobListingsPrompt from "./NoJobListingsPrompt";
import JobItem from "./JobItem";
import {LoadingSpinner} from './GeneralFunctions.js';

class JobsContainer extends Component {

  render() {
    const {jobsArr, handleFeedClick, renderFromThisCoPromptModal, fromThisCo, isPageManager, approvalStatus, companyName, listJobQuestions} = this.props
    const isLoadingMorePosts = false

    return (
      <div className="marginTop20" id="feedItems" onClick={handleFeedClick}>
        {jobsArr.length == 0 && isLoadingMorePosts != true && (
          <NoJobListingsPrompt renderFromThisCoPromptModal={renderFromThisCoPromptModal} fromThisCo={fromThisCo} isPageManager={isPageManager} approvalStatus={approvalStatus} companyName={companyName} listJobQuestions={listJobQuestions}/>
        )}
        {jobsArr.length > 0 && jobsArr.map((job, index) => {
          return (
            <JobItem
              key={job.oid}
              job={job}
            />
          )
        })}
        {isLoadingMorePosts == true && (
          <div className="marginTop20 marginBottom20">
            <LoadingSpinner />
          </div>
        )}
      </div>
    );
  }
}

export default JobsContainer;
