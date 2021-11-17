// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
import AddHighlightModalContent from "./AddHighlightModalContent";
import MentorCardMatches from "./MentorCard";
import Modal from './Modal';

const AddHighlightModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: '+ Highlight',
  usedFor: 'addHighlightDashboard',
  changeInitFocus: true,
  wider: true
}

class MentorMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchstatus: 1
    }
    this.requestNewMatches = this.requestNewMatches.bind(this);
  }

  requestNewMatches() {
    this.setState({matchstatus: 1});
    // Needs to alert Prospela that they want more matches
  }

  render() {
    const {matchstatus} = this.state;
    const prevMatchesAvail = true; // Need to check if matches given before are still available / mentee didn't pass on them and will show them

    switch (matchstatus) {
      case 1:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic mentorMatches"/>
              <h2 className="landingCTATitle">
                <span className="emoji-icon stopwatch-emoji titleLeft" />
                Your matches are on their way!
              </h2>
              <p className="landingCTADesc">
                Hold tight! We&#39;re busy finding the best match for you, based on what you&#39;ve told us. It can take a few weeks to find a relevant match, and we&#39;ll notify you as soon as possible.
              </p>
              <p className="landingCTADesc">In the meantime...</p>
              <Modal {...AddHighlightModalProps}>
                <AddHighlightModalContent modalID="modal-addHighlightDashboard"/>
              </Modal>
            </div>
          </section>
        );
      case 2:
        return (
          <React.Fragment>
            <MentorCardMatches />
          </React.Fragment>
        );
      case 3:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic cross"/>
              <h2 className="landingCTATitle">
                You passed! Want new matches?
              </h2>
              <p className="landingCTADesc">
                It&#39;s a shame you didn&#39;t think those employees were a good fit for you. Click below and we&#39;ll use your feedback to try and find better matches for you.
              </p>
              <button type="button" className="Submit-btn" onClick={this.requestNewMatches}>
                Request more Matches
              </button>
            </div>
          </section>
        );
      case 4:
        return; // We are now just waiting to hear from your potential mentor!
      case 5:
        if (prevMatchesAvail) {
          return (
            <React.Fragment>
              <MentorCardMatches />
            </React.Fragment>
          );
        } else {
          return (
            <section>
              <div className="contentBox landingCTA">
                <div className="placeholderPic mentorMatches"/>
                <h2 className="landingCTATitle">
                  Time for some new matches...
                </h2>
                <p className="landingCTADesc">
                  Unfortunately, the employee you sent a request to decided they were not best placed to help you at the current time. Either, they currently have too many mentees or didn&#39;t think their skill set was suitable. Click below and we&#39;ll try and find better matches for you.
                </p>
                <button type="button" className="Submit-btn" onClick={this.requestNewMatches}>
                  Request more Matches
                </button>
              </div>
            </section>
          );
        }
      case 6:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic tick"/>
              <h2 className="landingCTATitle">
                Your chat request was accepted!
              </h2>
              <p className="landingCTADesc">
                You can now access your new chat from within your Direct Messages.
              </p>
              <div className="showDMPic"/>
            </div>
          </section>
        );
      case 7:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic yayHands"/>
              <h2 className="landingCTATitle">
                You&#39;re all set!
              </h2>
              <p className="landingCTADesc">
                We hope you&#39;re having a great chat. New Groups and content launching soon...
              </p>
            </div>
          </section>
        ); // Chat active, but not eligible for multiple mentors
      case 8:
        return (
          <section>
            <div className="contentBox landingCTA">
              <div className="placeholderPic mentorMatches"/>
              <h2 className="landingCTATitle">
                Want more employee matches?
              </h2>
              <p className="landingCTADesc">
                You&#39;re eligible to request more E-Mentors. Click below and we&#39;ll get busy finding extra matches for you.
              </p>
              <button type="button" className="Submit-btn" onClick={this.requestNewMatches}>
                Request more Matches
              </button>
            </div>
          </section>
        );
      default:
        return <div>Loading...</div>
    }
  }
}

export default MentorMatches;
