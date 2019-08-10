// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

import ChatEndAudioContent from './ChatEndAudioContent.js';
import Modal from './Modal.js';

import "../css/General.css";

const ChatEndAudioModalProps = {
  ariaLabel: 'Popup to send your "thank you" audio',
  triggerText: 'Send Thank-You Audio',
  usedFor: 'msgExtras-accept'
}

class AudioCTA extends Component {
  constructor () {
    super();
    this.state = {
      audioSent: false,
      chatEnded: false,
    }
  }

  render() {
    const {audioSent, chatEnded} = this.state;
    switch (audioSent) {
      case true:
        return (
          <div className="msg-extras-btns">
            <div className="greenText">&#10004; You Sent your Audio</div>
          </div>
        );
      case false:
        return (
          <div className="msg-extras-btns">
            {chatEnded ? (
              <div className="neutralText">&#10008; You didn&#39;t send your Thank You audio, but your chat already ended</div>
            ) : (
              <Modal {...ChatEndAudioModalProps}>
                <ChatEndAudioContent />
              </Modal>
            )}
          </div>
        );
    }
  }
}

export default AudioCTA;
