// Dex last merged this code on 24th mar 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NewAnswerToQPrompt extends Component {
  render() {
    const myQuestionsAskedLink = "/my-activity"

    return (
      <div className="alignCenter">
        <div className="placeholderPic small askAQ"/>
        <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
          There&#39;s a new answer to your question!
        </h2>
        <p className="landingCTADesc marginBottom20 paddingL paddingR">
          Click below to see more
        </p>
        <Link to={myQuestionsAskedLink} className="link">
          <button type="button" className="button link Submit-btn dispInlineBlock">
            See answer
          </button>
        </Link>
      </div>
    );
  }
}

export default NewAnswerToQPrompt;
