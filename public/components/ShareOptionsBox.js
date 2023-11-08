// Last merged this code on 8th nov 2023

import React from "react";
import ReactDOM from "react-dom";

import {getEmployerName} from './UserDetail.js';

class ShareOptionsBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showOptionsForItem: '',
      showShareOptions: false,
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeShareOptionsMenu)
  }

  showShareOptions = (id) => {
    const currentState = this.state.showShareOptions;
    this.setState({
      showShareOptions: true,
      showOptionsForItem: id,
    }, () => {
      document.addEventListener('click', this.closeShareOptionsMenu)
      if (currentState != this.state.showShareOptions) {
        this.highlightedTextOnFocus.focus()
        const name = this.highlightedTextOnFocus.getAttribute('name')
        navigator.clipboard.writeText(name)
        document.execCommand("copy");
      }
    })
  }

  showShareOptionsOnEnter = (e, id) => {
    var key = e.key || e.keyCode

    if((key === 'Enter' || key === 13) && e.shiftKey === false) {
      this.showShareOptions(id)
    } else {
      return;
    }
  }

  closeShareOptionsOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showShareOptions: false,
        showOptionsForItem: '',
      }, () => document.removeEventListener('click', this.closeShareOptionsMenu))
    } else {
      return;
    }
  }

  closeShareOptionsMenu = (e) => {
    // If user clicks on URL box copy it
    if (this.shareOptions !== null && this.highlightedTextOnFocus !== null && this.highlightedTextOnFocus.contains(e.target)) {
      this.highlightedTextOnFocus.focus()
      const name = this.highlightedTextOnFocus.getAttribute('name')
      navigator.clipboard.writeText(name)
      document.execCommand("copy");
    }

    // Close menu if click off of it
    if (this.shareOptions !== null && !this.shareOptions.contains(e.target)) {
      this.setState({
        showShareOptions: false,
        showOptionsForItem: '',
      }, () => document.removeEventListener('click', this.closeShareOptionsMenu))
    }
  }

  copyURL = (url, tooltipID) => {
    // Copy text to clipboard
    navigator.clipboard.writeText(url)
    document.execCommand("copy");

    document.getElementById(tooltipID).innerHTML = "Copied!";
  }

  handleBlur = (tooltipID) => {
    document.getElementById(tooltipID).innerHTML = "Copy URL";
  }

  render() {
    const {id, qURL, qaItem, contentType, authorinsttype, authorinstfreetext, authorinst, buttonToShow, fromCommunityPage, commName} = this.props
    const {showShareOptions, showOptionsForItem} = this.state

    let url, twitterTextToShare, redditTextToShare, whatsappTextToShare // linkedinTextToShare is irrelevant as the only accept a url
    url = encodeURIComponent(qURL)

    if (fromCommunityPage) {
      const joinCommunityText = encodeURIComponent("Check out the " + commName + " community on Prospela")
      twitterTextToShare = (joinCommunityText + " - " + url)
      redditTextToShare = joinCommunityText
      whatsappTextToShare = (joinCommunityText + " - " + url)
    } else {
      const mentorInstText = (authorinsttype != "sch" && authorinsttype != null) ? getEmployerName(authorinsttype, authorinstfreetext, authorinst, true) : " "
      const answerAddedText = encodeURIComponent("Check out this " + mentorInstText + " answer on Prospela - ")
      twitterTextToShare = (contentType == 'answer' ? answerAddedText : "") + qaItem.title + " " + url
      redditTextToShare = (contentType == 'answer' ? answerAddedText : "") + qaItem.title
      whatsappTextToShare = (contentType == 'answer' ? answerAddedText : "") + qaItem.title + " " + url
    }

    return (
      <button type="button" className={"marginRight8 button-unstyled opacity1 positionRel textLeft noSelect" + (fromCommunityPage ? " commShareBtn" : "")} aria-label="Share URL options" onClick={() => this.showShareOptions(id)} onKeyDown={(e) => this.showShareOptionsOnEnter(e, id)}>
        {buttonToShow == "shareTextShareIcon" && (
          <span>Share <i className="fas fa-share-alt"/></span>
        )}
        {buttonToShow == "linkEmojiInviteText" && (
          <span className="fontSize15 marginRight5"><span role="img" aria-label="link emoji">🔗</span> Invite</span>
        )}
        {showShareOptions && showOptionsForItem == id && (
          <div className={"shareOptionsContainer" + (fromCommunityPage ? " commPage" : "")} id={id} tabIndex="0" ref={el => (this.shareOptions = el)} onKeyDown={this.closeShareOptionsOnEsc}>
            <div className="qTitle fontSize14 marginTop0"><strong>Share a link to this {fromCommunityPage == true ? "community" : contentType}</strong></div>
            <div className="input-box-container marginBottom10 fontSize12 noBold">
              <div className="highlightedTextOnFocus" name={qURL} tabIndex="0" ref={el => (this.highlightedTextOnFocus = el)}>{qURL}</div>
            </div>
            <div className="displayFlex spaceBetween">
              <a className="link tooltip fontSize12 noBold" tabIndex="0" onMouseLeave={() => this.handleBlur("tooltip-share-q-link")} onClick={() => this.copyURL(qURL, "tooltip-share-q-link")}>
                Copy link
                <div className="tooltiptext compact" id="tooltip-share-q-link">
                  Copy URL
                </div>
              </a>
              <div>
                <a className="marginRight10 link" target="_blank" rel="noopener noreferrer nofollow" href={"https://twitter.com/intent/tweet?text=" + twitterTextToShare}>
                  <span className="fontSize18 greyText twitterIcon-greyed"><i className="fab fa-twitter"/></span>
                </a>
                <a className="marginRight10 link" target="_blank" rel="noopener noreferrer nofollow" href={"https://www.linkedin.com/sharing/share-offsite/?url=" + url}>
                  <span className="fontSize18 greyText linkedinIcon-greyed"><i className="fab fa-linkedin-in"/></span>
                </a>
                <a className="marginRight10 link" target="_blank" rel="noopener noreferrer nofollow" href={"https://reddit.com/submit?url=" + url + "&title=" + redditTextToShare}>
                  <span className="fontSize18 greyText redditIcon-greyed"><i className="fab fa-reddit-alien"/></span>
                </a>
                <a className="link" target="_blank" rel="noopener noreferrer nofollow" href={"https://api.whatsapp.com/send?text=" + whatsappTextToShare}>
                  <span className="fontSize18 greyText whatsAppIcon-greyed"><i className="fab fa-whatsapp"/></span>
                </a>
              </div>
            </div>
          </div>
        )}
      </button>
    );
  }
}

export default ShareOptionsBox;
