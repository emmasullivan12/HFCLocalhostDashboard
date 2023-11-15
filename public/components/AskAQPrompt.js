// Dex last merged this code on 22nd mar 2023

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AddHighlightTextBox from './AddHighlightTextBox.js';
import Modal from './Modal';
import ShareOptionsBox from './ShareOptionsBox.js';

const AddHighlightModalProps = {
  ariaLabel: 'Post a Question',
  triggerText: 'Post Question',
  usedFor: 'askQuestionDashboard',
  changeInitFocus: true,
  wider: true
}

const AddHighlightMentorModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: 'Highlight',
  usedFor: 'addHighlightDashboard',
  changeInitFocus: true,
  wider: true
}

class AskAQPrompt extends Component {
  render() {
    const {community, commURL, isCommPage, userRole, hasNoContentYet, noResultsFound, updatePathName, isLoggedIn, checkHasAccess, noAccessHandler} = this.props

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            {userRole == "mentee" && hasNoContentYet == true && (
              <div>You haven&#39;t asked anything yet. </div>
            )}
            {(!isLoggedIn || (userRole == "mentee" && noResultsFound == true)) && (
              <div>No results found. </div>
            )}
            {userRole == "mentor" && hasNoContentYet == true && (
              <div>You haven&#39;t created any content yet. </div>
            )}
            {userRole == "mentor" && noResultsFound == true && (
              <div>No results found. </div>
            )}
          </h2>
          <p className="landingCTADesc">
            {(!isLoggedIn || userRole == "mentee") && (
              <span>{isCommPage == true ? 'Looks like theres nobody here yet. Ask a question or invite others and we\'ll try to get this community going' : 'Get your burning questions answered by real employees'}</span>
            )}
            {userRole == "mentor" && (
              <span>{isCommPage == true ? 'Looks like theres nobody here yet. Share a general highlight or invite others and we\'ll try to get this community going' : 'Share a general highlight or answer mentees Q&A'}</span>
            )}
          </p>
          {userRole == 'mentee' && (
            <Modal {...AddHighlightModalProps}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
            </Modal>
          )}
          {userRole == 'mentor' && (
            <Modal {...AddHighlightMentorModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole} updatePathName={updatePathName}/>
            </Modal>
          )}
          {!isLoggedIn && (
            <Modal {...AddHighlightModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
            </Modal>
          )}
          {isCommPage == true && (
            <div className="marginTop20 dispBlock horizontallyCenterLeftTransform positionRel">
              <ShareOptionsBox
                id={community.cmid}
                qURL={commURL}
                contentType={community.type}
                authorinsttype={null}
                authorinstfreetext={null}
                authorinst={null}
                buttonToShow="linkEmojiInviteText"
                fromCommunityPage
                commName={community.name}
              />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default AskAQPrompt;
