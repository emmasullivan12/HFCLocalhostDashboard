// Last merged this code on 8th nov 2023
import React from "react";
import ReactDOM from "react-dom";

import FeedContainer from "./FeedContainer.js";

class CommunityQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: 'latest',
    }
  }

  filterBy = (e) => {
    const {filterBy} = this.state
    e.stopPropagation()

    this.setState({
      filterBy: e.currentTarget.value
    })
  }

  render() {
    const {filterBy} = this.state
    const {contentArr, userRole, isLoggedIn, updatePathName, checkHasAccess, noAccessHandler, maxViewsReached, handleUnlockBtnClick, handleCommunityFeedClick} = this.props

    return (
      <div>
        <div className="filterFeed-container textRight marginBottom20">
          <button type="button" className={"filter-btn " + (filterBy == "latest" ? "isActive" : "")} value="latest" onClick={(e) => this.filterBy(e)}>
            <div>
              <span role="img" aria-label="latest">⏱️</span>
              <span>Latest</span>
            </div>
          </button>
          {isLoggedIn == true && userRole != 'mentee' && (
            <button type="button" className={"filter-btn " + (filterBy == "unanswered" ? "isActive" : "")} value="unanswered" onClick={(e) => this.filterBy(e)}>
              <div>
                <span role="img" aria-label="question icon">❓</span>
                <span>Unanswered</span>
              </div>
            </button>
          )}
          <button type="button" className={"filter-btn " + (filterBy == "trending" ? "isActive" : "")} value="trending" onClick={(e) => this.filterBy(e)}>
            <div>
              <span role="img" aria-label="trending">🔥</span>
              <span>Trending</span>
            </div>
          </button>
        </div>
        <FeedContainer contentArr={contentArr} userRole={userRole} isLoggedIn={isLoggedIn} checkHasAccess={checkHasAccess} noAccessHandler={noAccessHandler} maxViewsReached={maxViewsReached} handleUnlockBtnClick={handleUnlockBtnClick} updatePathName={updatePathName} handleFeedClick={handleCommunityFeedClick}/>
      </div>
    );
  }
}

export default CommunityQuestions;
