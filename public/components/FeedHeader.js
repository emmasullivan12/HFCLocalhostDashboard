// Dex last merged this code on 19th dec 2022

import React, { Component } from "react";

import MenuNav from './MenuNav.js';
import {LoadingSpinner, checkMobile, isiOS, X} from './GeneralFunctions.js';

class FeedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuBtn: false,
    }
  }

  componentDidMount() {
    setTimeout(this.showMenuBtn, 2000);
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

  showMenuBtn = () => {
    this.setState({
      showMenuBtn: true
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
    const {showMenuBtn} = this.state;
    const isMobile = checkMobile()
    const isIphone = isiOS()

    return (
      <div className={"feed-header" + (isIphone == true ? " isIphone" : "")} id="feedHeader">
        {showMenuBtn == true && (
          <MenuNav />
        )}
        {showMenuBtn != true && isMobile == true && (
          <LoadingSpinner />
        )}
        <div className="searchBox-header horizontallyCenter">
          <div className="input-box-container noMarginB onFeed">
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
                  <form className="textInput-container searchBox" onSubmit={this.handleSubmit}>
                    <input
                      type="searchText"
                      id="mainSearchBox"
                      ref={n => this.searchTextNode = n}
                      className="input-box noPaddingR onFeed"
                      value={searchText}
                      onChange={handleSearchTextChange}
                      onKeyDown={this.onEnterPress}
                      placeholder={isMobile == true ? "Search advice on Prospela..." : "Search careers advice on Prospela..."}
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="5000"
                      autoFocus={isMobile == true ? false : true}
                    />
                    <button type="submit" disabled={searchText.length === 0} className={"sendMsgContainer searchBox" + ((searchText.length > 0) ? ' isTyping' : "")} >
                      <i className="fas fa-search" />
                    </button>
                  </form>
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
