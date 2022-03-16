// Dex last merged this code on 16th mar 2022

import React, { Component } from "react";

import MenuNav from './MenuNav.js';

class FeedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  handleMessageChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  onEnterPress = (e) => {
    var key = e.key || e.keyCode

    if((key === 'Enter' || key === 13) && e.shiftKey === false) {
      e.preventDefault();
      this.handleSubmit();
    } else {
      return;
    }
  }

  handleSubmit = () => {

    // Set input box text back to ''
    //this.searchTextNode.value = ''
    this.setState({
      text: ''
    })
  }

  render() {
    const {text} = this.state;

    return (
      <div className="feed-header">
        <MenuNav />
        <div className="chatWindow-footer horizontallyCenter">
          <div className="input-box-container noMarginB">
            <div className="input-flexContainer">
              <form className="textInput-container">
                <input
                  type="text"
                  ref={n => this.searchTextNode = n}
                  className="input-box noPaddingR"
                //  id="txtInput-box"
                //  form="chatMessageForm"
                  value={text}
                  onChange={this.handleMessageChange}
                  onKeyDown={this.onEnterPress}
                  placeholder="Search Prospela..."
                  autoComplete="on"
                  autoCorrect="on"
                  spellCheck="true"
                  maxLength="5000"
                  autoFocus
                />
             </form>
             <button type="button" disabled={text.length === 0} className={"sendMsgContainer searchBox" + ((text.length > 0) ? ' isTyping' : "")} onClick={this.handleSubmit}>
               <i className="fas fa-search" />
             </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedHeader;
