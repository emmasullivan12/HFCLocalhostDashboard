// Dex last merged this code on 11th August 2019

import React, { Component } from "react";

import "../css/Emoji.css";

class MentorQuotes extends Component {
  render() {
  const {quotes} = this.props;

    return (
      <React.Fragment>
          <div>
            <div>
              <i className="fas fa-quote-left"/>
              <div>{quotes.author}</div>
            </div>
            <div>{quotes.text}</div>
          </div>
      </React.Fragment>
    )
  }
}

export default MentorQuotes;
