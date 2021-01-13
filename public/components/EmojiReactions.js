// Dex last merged this code on 12th jan 2021

import React, { Component } from "react";
import { Emoji, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'

class EmojiReactions extends Component {
  constructor () {
    super();
    this.state = {
      showEmojis: false,
    }
  }

  toggleEmojis = (e) => {
    e.persist();
    const {showEmojis} = this.state
    const currentState = showEmojis;
    this.setState({
      showEmojis: !currentState
    }, () => {
      if (this.state.showEmojis === true) {
        this.toggleMsgHover(e);
        document.addEventListener('mousedown', this.closeMenu);

        // Check if message is positioned too near the bottom of screen (i.e. won't fit the EmojiPicker box)
        const dropZone = document.getElementById('drop-zone');
        const el = e.target.closest('.block-container');
      //  const reactionsBarHeight = e.target.closest('.emojiReactions-container').scrollHeight;
        const elOffsetTop = el.offsetTop;
    //    const btnOffsetTop = e.target.offsetTop // position of addemojireactionbtn from top of it's parent i.e. el
        const parentOffsetTop = dropZone.offsetTop; // position from top of it's parent
        const parentClientHeight = dropZone.clientHeight; // Visible part of DropZone
        const parentScrollTop = dropZone.scrollTop; // How much have scrolled down
        const parentScrollHeight = dropZone.scrollHeight; // Entire height of DropZone (even bits of screen)
        const emojiPickerHeight = 423; // 423px
        const emojiPickerWidth = 346; // 346px
        const blockHeightLessReactions = el.scrollHeight - e.target.scrollHeight;
        const spaceBelow = parentScrollHeight - elOffsetTop - blockHeightLessReactions;
        const spaceAbove = parentClientHeight - spaceBelow;
        const nearBottomOfDiv = spaceBelow < emojiPickerHeight;
        const spaceToRight = (e.target.closest('.message-container').offsetWidth - e.target.closest('.addReaction').offsetLeft);
        const spaceToLeft = e.target.closest('.addReaction').offsetLeft;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        // If not on mobile (where diff formatting applies)
        if (screenWidth > 500) {
          const addMsgReaction = document.querySelector('.emojiPickerContainer.msgReactions')

          // SORT VERTICAL POSITIONING
          // If near bottom of div, there is no space to show below so show above
          if (nearBottomOfDiv == true) {
            addMsgReaction.style.top = "-" + (emojiPickerHeight + 10) + "px"

          // If elsewhere in div, if not enough space below check enough space above (otherwise will just show it below and user has to scroll a little)
          } else if ((spaceBelow < emojiPickerHeight) && (spaceAbove >= emojiPickerHeight)) {
            // Make EmojiPicker appear above button just clicked but taking as much space below as poss
            //addMsgReaction.style.top = "-" + ((emojiPickerHeight - spaceBelow) + btnOffsetTop) + "px"
            //addMsgReaction.style.top = "-" + ((emojiPickerHeight - spaceBelow) - (el.offsetHeight - reactionsBarHeight)) + "px"
            addMsgReaction.style.top = "-" + ((emojiPickerHeight - spaceBelow)) + "px"
          }

          // SORT HORIZONTAL POSITIONING
          // If not enough space to the right
          if ((spaceToRight < emojiPickerWidth)) {
            // Make EmojiPicker appear to left of button just clicked but taking as much space left as poss + 15px margin
            addMsgReaction.style.left = "-" + ((emojiPickerWidth - spaceToRight + 15)) + "px"
          }

        }
      } else {
        this.toggleMsgHover(e);
        document.removeEventListener('mousedown', this.closeMenu);
      }

    })
  }

  handleEmojiClick = (evt) => {
    alert(evt.colons + ' clicked');
    const {msgID} = this.props;
    /* If ({evt.colons} doesnt exist in message.reactions list for {msgID}) {
         add new reaction for {msgID} i.e. (reaction.name = {evt.colons}, reaction.users = {myUID}, reaction.count = 1)
       } else if (I {myUID} am already on the list of reaction.users) {
           if (reaction.count = 1) {
             delete reaction from list entirely for {msgID}
           } else {
             remove {myUID} from reaction.users and decrease count by 1 for {msgID}
           }
       } else if {
         add {myUID} to reaction.users list and increase count by 1 for {msgID}
       }
    */

    this.setState({
      showEmojis: false
    }, () => {
      this.toggleMsgHover();
      document.removeEventListener('mousedown', this.closeMenu);
    })
  }

  closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target) && (!this.emojiPicker.closest('.addReaction').contains(e.target))) {
      this.setState({
        showEmojis: false
      }, () => {
        document.removeEventListener('mousedown', this.closeMenu);
        this.toggleMsgHover();
      })
    }
  }

  closeOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      e.persist();
      this.setState({
        showEmojis: false
      })
      this.toggleMsgHover(e);
      document.removeEventListener('mousedown', this.closeMenu);
      this.addReactionNode.focus();
    } else {
      return;
    }
  }

  handleReactionClick = (userClicked, emojiName) => {
    const {msgID} = this.props;
    if (userClicked == true) {
      alert('removing user from ' + emojiName)
      /* if (reaction.count = 1) {
           delete reaction from list entirely for {msgID}
         } else {
           remove {myUID} from reaction.users and decrease count by 1 for {msgID}
         }
      */
    } else {
      alert('adding user to ' + emojiName)
      // add {myUID} to reaction.users list and increase count by 1 for {msgID}
    }
  }

  // Prevents user being able to scroll on screen behind Modal
  /*toggleScrollLock = () => document.getElementById('drop-zone').classList.toggle('u-lock-scroll');*/

  // Maintains hover formatting on message emojipicker relates to
  toggleMsgHover = (e) => {
    if (e) {
      e.target.closest('.block-container').classList.toggle('keepHover');
    // If relates to remove event listener i.e. where can't use e.persist()
    } else {
      document.querySelector('.block-container.keepHover').classList.toggle('keepHover');
    }
  }

  render() {
    const {showEmojis} = this.state;
    const {reactions} = this.props;
    const myUID = '223457'
    const sortedArray = reactions.sort((a,b) => {
      return b.count - a.count
    })
    let reactionsArray

    reactionsArray = sortedArray.map((reaction, index) => {
      const userClicked = reaction.users.includes(myUID);
      const emojiCount = reaction.count
      return (
        <div className={"emojiReaction" + (userClicked ? ' userClicked' : '')} key={index}>
          <div className={"emojiReaction-btn tooltip" + (userClicked ? ' userClicked' : '')} onClick={() => this.handleReactionClick(userClicked, reaction.name)} onKeyDown={() => this.handleReactionClick(userClicked, reaction.name)}>
            <div className="emojiReaction-icon">
              <Emoji emoji={reaction.name} size={17}/>
              <div className="reactionCount">{reaction.count}</div>
            </div>
            <div className="tooltiptext emojiReactions">
              <div className="emojiIconTooltip-Container">
                <Emoji emoji={reaction.name} size={30} />
              </div>
              <div>
                {userClicked ? 'You (click to remove)' : 'XXX'}
                {emojiCount > 1 ? (emojiCount > 2 ? ', YYY and others' : ' and YYY') : ''}
                <span className="whiteFadedText noBold"> reacted with {reaction.name}</span>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <React.Fragment>
        <div className="emojiReactions-container">
          {reactionsArray}
          <div className="addReaction">
            <button type="button" className="emojiReaction-btn tooltip" onClick={this.toggleEmojis} onKeyDown={this.toggleEmojis} ref={n => this.addReactionNode = n}>
              <div className="addReaction-icon">
                <i className="hideOnHover far fa-smile" />
                <i className="showOnHover fas fa-laugh" />
              </div>
              <svg width="5px" height="5px" viewBox="0 0 10 10" className="plusSign addEmoji-bar">
                <line className="" x1="0" x2="10" y1="5" y2="5" />
                <line className="" x1="5" x2="5" y1="0" y2="10" />
              </svg>
              <span className="tooltiptext last emojiReactions">
                <span>Add reaction...</span>
              </span>
            </button>
            {showEmojis && (
              /* The <div> element is just used as a container for EmojiPicker */
              /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
              <div className="emojiPickerContainer msgReactions" ref={el => (this.emojiPicker = el)} onKeyDown={this.closeOnEsc}>
                <NimblePicker
                  onSelect={this.handleEmojiClick}
                  data={data}
                  title="Pick your emoji…"
                  emoji="point_up"
                  set="emojione"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmojiReactions;
