// Dex last merged this code on 24th mar 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NewMatchPrompt extends Component {
  render() {
    const {userRole} = this.props
    const newMatchChatLink = "/community/20000/12345"

    return (
      <div className="alignCenter">
        <div className="placeholderPic small newMatch"/>
        <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
          You have a new {userRole == 'mentor' ? 'mentee' : 'mentor'} match!
        </h2>
        <p className="landingCTADesc marginBottom20 paddingL paddingR">
          Click below for more info and to accept / reject
        </p>
        <Link to={newMatchChatLink} className="link">
          <button type="button" className="button link Submit-btn dispInlineBlock">
            See your Match
          </button>
        </Link>
      </div>
    );
  }
}

export default NewMatchPrompt;
