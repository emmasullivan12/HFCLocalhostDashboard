// Dex last merged this code on 20th nov 2023

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AskAQPrompt from "./AskAQPrompt";
import FeedItem from "./FeedItem";
import Modal from './Modal';
import {LoadingSpinner} from './GeneralFunctions.js';

const AddHighlightModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}

const AddGeneralHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Add Post',
  usedFor: 'addHighlightDashboard',
  changeInitFocus: true,
  wider: true
}

class FeedContainer extends Component {


  render() {
    const {community, commURL, isCommPage, userRole, contentArr, isUserSearch, updatePathName, handleFeedClick, maxViewsReached, handleUnlockBtnClick, checkHasAccess, noAccessHandler, isLoggedIn, updateTabToView} = this.props
    const isLoadingMorePosts = false

    return (
      <div className="marginTop20" id="feedItems" onClick={handleFeedClick}>
        {contentArr.length == 0 && isLoadingMorePosts != true && (
          <AskAQPrompt community={community} commURL={commURL} isCommPage={isCommPage} userRole={userRole} noResultsFound updatePathName={updatePathName} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} updateTabToView={updateTabToView}/>
        )}
        {contentArr.length > 0 && contentArr.map((post, index) => {
          const contentType = post.qid ? 'question' : post.type
          return (
            <FeedItem
              contentType={contentType}
              key={post.qid ? post.qid : post.hid}
              post={post}
              userRole={userRole}
              maxViewsReached={maxViewsReached}
              handleUnlockBtnClick={handleUnlockBtnClick}
              checkHasAccess={checkHasAccess}
              noAccessHandler={noAccessHandler}
              isLoggedIn={isLoggedIn}
            />
          )
        })}
        {isUserSearch == true && (
          <div className="marginBottom50 marginTop20">
            <div>
              <div className="qTitle marginBottom5"><strong>Not quite what you were looking for?</strong> {(userRole == 'mentee' || !isLoggedIn) ? 'Ask your own question about this topic' : 'Add a general post about this topic'}</div>
              {isLoggedIn && (
                <Modal {...AddGeneralHighlightModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole} isAddGeneral={userRole == 'mentee' ? false : true}/>
                </Modal>
              )}
              {!isLoggedIn && (
                <Modal {...AddHighlightModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                  <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                </Modal>
              )}
            </div>
          </div>
        )}
        {isLoadingMorePosts == true && (
          <div className="marginTop20 marginBottom20">
            <LoadingSpinner />
          </div>
        )}
      </div>
    );
  }
}

export default FeedContainer;
