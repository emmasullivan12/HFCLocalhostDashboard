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
    const {community, commURL, isLeaderboard, isCommPage, userRole, hasNoContentYet, noResultsFound, updatePathName, isLoggedIn, checkHasAccess, noAccessHandler, updateTabToView} = this.props
    var commURLending = isCommPage && commURL && commURL.split("https://app.prospela.com")[1]
    return (
      <section>
        <div className="contentBox landingCTA">
          {!isLeaderboard && (
            <React.Fragment>
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
            </React.Fragment>
          )}
          {isLeaderboard && (
            <React.Fragment>
              <div className="placeholderPic mentorMatches" />
              <h2 className="landingCTATitle">
                <div>It&#39;s quiet here...</div>
              </h2>
            </React.Fragment>
          )}
          <p className="landingCTADesc">
            {userRole == "mentee" && (
              <span>Looks like theres nobody here yet. Ask a question or invite others and we&#39;ll try to get this community going</span>
            )}
            {userRole == "mentor" && (
              <span>Looks like theres nobody here yet. Share a general highlight or invite others and we&#39;ll try to get this community going</span>
            )}
          </p>
          {userRole == 'mentee' && (
            <Modal {...AddHighlightModalProps}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ fromCommunityPage={isCommPage == true} commType={community.type} commName={community.name}/>
            </Modal>
          )}
          {userRole == 'mentor' && (
            <Modal {...AddHighlightMentorModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole} updatePathName={updatePathName} fromCommunityPage={isCommPage == true} commType={community.type} commName={community.name} commURLending={commURLending} updateTabToView={updateTabToView}/>
            </Modal>
          )}
          {!isLoggedIn && !isLeaderboard && (
            <Modal {...AddHighlightModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ fromCommunityPage={isCommPage == true} commType={community.type} commName={community.name}/>
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
