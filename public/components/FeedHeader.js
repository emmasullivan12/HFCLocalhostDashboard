// Dex last merged this code on 29th mar 2023

import React, { Component } from "react";

import {cdn} from './CDN.js';
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
    this.timerHandle = setTimeout(() => {
      this.showMenuBtn()
      this.timerHandle = 0;
    }, 2000);
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
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
    const {isUserSearch, searchText, resetSearch, handleSearchTextChange, isLoggedIn, browser} = this.props;
    const {showMenuBtn} = this.state;
    const isMobile = checkMobile()
    const isIphone = isiOS()
    const isFirefox = browser == 'firefox'

    return (
      <React.Fragment>
        <div className="prBannerSmallLogoContainer marginTop20 horizontallyCenter">
          <img
            className="prLogoImg"
            alt="Prospela Logo"
            srcSet={cdn+"/images/Prospela%20Logo_Dark.png 213w, "+cdn+"/images/Prospela%20Logo_Dark.png 314w, "+cdn+"/images/Prospela%20Logo_Dark.png 640w"}
            sizes="(max-width: 1440px) 69px, 69px"
            src={cdn+"/images/Prospela%20Logo_Dark.png"}
          />
        </div>
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
          {!isLoggedIn && (
            <div className="signUpPrompt-header">
              <a className="link fontSize16 black" href="https://app.prospela.com/login?origin=feedTopBtn"><strong>Login</strong></a>
              <a className={"button link Submit-btn signUpPrompt" + (isFirefox == true ? " dispRubyBase" : "")} href="https://app.prospela.com/signup?origin=feedTopBtn">
                Join for free
              </a>
            </div>
          )}
        </div>
        <div className="signUpPrompt-headerBanner marginTop10">
          <a className="link fontSize16 black" href="https://app.prospela.com/login?origin=feedTopBtn"><strong>Login</strong></a>
          <a className="button link Submit-btn signUpPrompt" href="https://app.prospela.com/signup?origin=feedTopBtn">
            Join for free
          </a>
        </div>
      </React.Fragment>
    )
  }
}

export default FeedHeader;
