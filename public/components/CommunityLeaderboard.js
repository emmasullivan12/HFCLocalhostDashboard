// Last merged this code on 20th nov 2023

import React from "react";
import ReactDOM from "react-dom";
import AskAQPrompt from "./AskAQPrompt";

class CommunityLeaderboard extends React.Component {
  render() {
    const {community, isCommPage, updatePathName, isLoggedIn, userRole, commURL, checkHasAccess, noAccessHandler, updateTabToView} = this.props
    return (
      <div>
      {community.members.length == 0 ? (
        <AskAQPrompt community={community} commURL={commURL} isCommPage={isCommPage} userRole={userRole} isLeaderboard updatePathName={updatePathName} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} updateTabToView={updateTabToView}/>
      ) : (
        <div>Community Leaderboard</div>
      )}
      </div>
    );
  }
}

export default CommunityLeaderboard;
