// Dex last merged this code on 24th mar 2022

import React, { Component } from "react";

import AskAQPrompt from "./AskAQPrompt";
import FeedItem from "./FeedItem";
import {LoadingSpinner} from './GeneralFunctions.js';

class FeedContainer extends Component {

  render() {
    const {userRole, contentArr} = this.props
    const isLoadingMorePosts = true

    return (
      <div className="marginTop20" id="feedItems">
        {contentArr.length == 0 && userRole == "mentee" && (
          <AskAQPrompt userRole="mentee" noResultsFound />
        )}
        {contentArr.length == 0 && userRole == "mentor" && (
          <AskAQPrompt userRole="mentor" noResultsFound />
        )}
        {contentArr.length > 0 && contentArr.map((post, index) => {
          const contentType = post.qid ? 'question' : post.type
          return (
            <FeedItem
              contentType={contentType}
              key={post.qid ? post.qid : post.hid}
              post={post}
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

export default FeedContainer;
