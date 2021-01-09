// Dex last merged this code on 15th sept 2020

import React, { Component } from "react";
import { Emoji } from 'emoji-mart'

class EmojiReactions extends Component {
  constructor () {
    super();
    this.state = {
    }
  }

  handleReactionClick = (userClicked, emojiName) => {
    if (userClicked == true) {
      // Remove user from list of users for the emoji {emojiName}
      alert('removing user')
    } else {
      // Add user to list of users for the emoji {emojiName}
      alert('adding user')
    }
  }

  render() {
    const {reactions} = this.props;
    const myUID = '223457'
    return (
      <React.Fragment>
        <div className="emojiReactions-container">
          {reactions.map((reaction, index) => {
            const userClicked = reaction.users.includes(myUID);
            return (
              <div className={"emojiReaction"  + (userClicked ? ' userClicked' : '')} key={index}>
                <button type="button" className={"emojiReaction-btn tooltip" + (userClicked ? ' userClicked' : '')} onClick={() => this.handleReactionClick(userClicked, reaction.name)} onKeyDown={() => this.handleReactionClick(userClicked, reaction.name)}>
                  <div className="emojiReaction-icon">
                    <Emoji emoji={reaction.name} size={17}/>
                    <div className="reactionCount">{reaction.count}</div>
                  </div>
                  <div className="tooltiptext emojiReactions">
                    <div className="emojiIconTooltip-Container">
                      <Emoji emoji={reaction.name} size={30} useButton={false}/>
                    </div>
                    <div>{userClicked ? 'You (click to remove)' : 'XXX'} <span className="whiteFadedText noBold">reacted with {reaction.name}</span></div>
                  </div>
                </button>
              </div>
            )
          })}
          <div className="addReaction absolute">
            <button type="button" className="emojiReaction-btn tooltip" onClick={this.addReaction} onKeyDown={this.addReaction}>
              <div className="addReaction-icon">
                <i className="hideOnHover far fa-smile" />
                <i className="showOnHover fas fa-laugh" />
              </div>
              <svg width="5px" height="5px" viewBox="0 0 10 10" className="plusSign addEmoji-bar">
                <line className="" x1="0" x2="10" y1="5" y2="5" />
                <line className="" x1="5" x2="5" y1="0" y2="10" />
              </svg>
              <span className="tooltiptext emojiReactions">
                <span>Add reaction...</span>
              </span>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmojiReactions;
