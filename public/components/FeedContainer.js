// Dex last merged this code on 16th mar 2022

import React, { Component } from "react";

//import AskAQPrompt from "./AskAQPrompt";
import FeedItem from "./FeedItem";

class FeedContainer extends Component {

  render() {
    const {userRole, contentArr} = this.props

    return (
      <div className="marginTop20">
        {/*{contentArr.length == 0 && userRole == "mentee" && (
          <AskAQPrompt userRole="mentee" hasNoContentYet />
        )}
        {contentArr.length == 0 && userRole == "mentor" && (
          <AskAQPrompt userRole="mentor" hasNoContentYet/>
        )}*/}
        {contentArr.length > 0 && contentArr.map((post, index) => {
          const contentType = post.type
          return (
            <FeedItem
              contentType={contentType}
              key={post.qid ? post.qid : post.hid}
              post={post}
            />
          )
        })}
      </div>
    );
  }
}

export default FeedContainer;
