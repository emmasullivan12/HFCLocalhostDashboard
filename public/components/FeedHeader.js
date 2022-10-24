// Dex last merged this code on 13th sept 2022

import React, { Component } from "react";

import MenuNav from './MenuNav.js';
import {checkMobile, X} from './GeneralFunctions.js';

class FeedHeader extends Component {
  constructor(props) {
    super(props);
  /*  this.state = {
      text: '',
    }*/
  }

  /*handleMessageChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }*/

/*  onResetSearch = () => {
    const {resetSearch} = this.props

    resetSearch()

    this.setState({
      text: ''
    })
  }*/

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

    const searchCompleted = true

    // Once search results come back / completed
    if (searchCompleted == true) {
      if (handleSearchResults) {
        handleSearchResults()
      }
    }
  }

  render() {
    //const {text} = this.state;
    const {isUserSearch, searchText, resetSearch, handleSearchTextChange} = this.props;
    const isMobile = checkMobile()

    return (
      <div className="feed-header" id="feedHeader">
        <MenuNav />
        <div className="searchBox-header horizontallyCenter">
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
                        {searchText}
                        <span
                          data-value={searchText}
                        //  onMouseDown={this.onResetSearch}
                          onMouseDown={resetSearch}
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
                      type="searchText"
                      id="mainSearchBox"
                      ref={n => this.searchTextNode = n}
                      className="input-box noPaddingR"
                      value={searchText}
                      onChange={handleSearchTextChange}
                      onKeyDown={this.onEnterPress}
                      placeholder="Search Prospela..."
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="5000"
                      autoFocus={isMobile == true ? false : true}
                    />
                  </form>
                  <button type="button" disabled={searchText.length === 0} className={"sendMsgContainer searchBox" + ((searchText.length > 0) ? ' isTyping' : "")} onClick={this.handleSubmit}>
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
