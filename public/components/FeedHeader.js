// Dex last merged this code on 28th mar 2022

import React, { Component } from "react";

import MenuNav from './MenuNav.js';
import {X} from './GeneralFunctions.js';

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

  onResetSearch = () => {
    const {resetSearch} = this.props

    resetSearch()

    this.setState({
      text: ''
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
    const {handleSearchResults} = this.props

    // Set input box text back to ''
    //this.searchTextNode.value = ''
    /* this.setState({
      text: ''
    }) */

    const searchCompleted = true

    // Once search results come back / completed
    if (searchCompleted == true) {
      if (handleSearchResults) {
        handleSearchResults()
      }
    }
  }

  render() {
    const {text} = this.state;
    const {isUserSearch} = this.props;

    return (
      <div className="feed-header">
        <MenuNav />
        <div className="chatWindow-footer horizontallyCenter">
          <div className="input-box-container noMarginB">
            <div className="input-flexContainer">
              {isUserSearch && (
                <div className="fullWidth">
                  <div className="tagsContainer " id="selectContainer">
                    <div className="tagsList">
                      <span
                      //  onClick={this.editSearchValue}
                        className="multiple value"
                      //  role="button"
                      >
                        {text}
                        <span
                          data-value={text}
                          onMouseDown={this.onResetSearch}
                          role="button"
                          className="delete"
                        >
                          <X />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {!isUserSearch && (
                <React.Fragment>
                  <form className="textInput-container">
                    <input
                      type="text"
                      id="mainSearchBox"
                      ref={n => this.searchTextNode = n}
                      className="input-box noPaddingR"
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
                </React.Fragment>
             )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedHeader;
