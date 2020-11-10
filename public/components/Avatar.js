// Dex last merged this code on 9th nov 2020

import React, { Component } from "react";

import UploadProfPicContent from './UploadProfPicContent.js';
import {usercdn, userAvatarsFolder} from './CDN.js';
import Modal from './Modal.js';

import "../css/General.css";
import "../css/Avatar.css";

// **Overview**
  // **Props**
    // - userName
      //   required
      //   type: string
      //   is the fname of a user e.g. message.author if in chat or user.fname if in group users list

    // - userID
      //   required
      //   type: uuid

    // - isProspelaAuto
      //   type: boolean
      //   is Prospela bot

    // - isGroupFlex
      //   type: boolean
      //   does usage it relate to content in ChatWindow's flex container for groups only

    // - showOnline
      //   type: boolean
      //   include online presence indicator

    // - smallIdle
      //   type: boolean
      //   display as small avatar and unclickable user i.e. not part of main users list

    // - picSize
      //   type: number
      //   options: null or o (original), 20 (20px), 40 (40px), 80 (80px), 270 (270px), 360 (60px)
      //   All user profile pics are saved down in these widths

class Avatar extends Component {

  render() {
    const users = {
      uid: '99999',
      profilepic: '',
    //  profilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-o',
    //  profilepic_20: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-20',
    //  profilepic_40: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-40',
    //  profilepic_80: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-80'
    };
    const {userName, userID, isProspelaAuto, isGroupFlex, showOnline, smallIdle, picSize} = this.props
  //  const myProfPic = "2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-o" // looks up profpic URL of UID
  //  const profPicSrcNotMe = "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg"
  //  const profPicSrcProspela = 'https://files-and-media.ams3.digitaloceanspaces.com/images/Professional%20Photo_50.jpg'
    let profPicSrc
    let profPicSrcNotMe
    let isOnline
    let userInitial
    let lastIndex

    const myProfPic = users.profilepic;
    const otherUserProfPic = users.profilepic;
    const checkMe = myProfPic != null && myProfPic != ''
    const checkOtherPerson = (otherUserProfPic != null && otherUserProfPic != '')
    const myID = '99999';
    const isMe = (userID === myID) ? 'isMe' : 'isntMe';
    const isPicSet = isProspelaAuto == true ? false : (isMe === 'isMe' ? checkMe : checkOtherPerson)
    const picSizeToShow = picSize ? picSize : 'o';

    function createProfPicURL(string) {
      return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
    }

    if (checkMe == true) {
      // Remove the .png and any '-o/-20/-40' from the filename
      lastIndex = myProfPic.lastIndexOf('-')
      const myProfPic1 = myProfPic.substring(0,lastIndex);

      // Create the URL
      profPicSrc = createProfPicURL(myProfPic1)
    }

    if (checkOtherPerson == true) {
      // Remove the .png and any '-o/-20/-40' from the filename
      lastIndex = otherUserProfPic.lastIndexOf('-')
      const otherUserProfPic1 = otherUserProfPic.substring(0,lastIndex);

      // Create the URL
      profPicSrcNotMe = createProfPicURL(otherUserProfPic1)
    }

    if (!isPicSet) {
      userInitial = isProspelaAuto ? 'P' : userName.charAt(0).toUpperCase();
    }

    function checkUserOnline() {
      return true
    }

    if (showOnline) {
      isOnline = checkUserOnline()
    }
    //  const senderRole = 'mentor'; // will need to check senderUID for role (when opening profile)

    return (
      <React.Fragment>
        <div className={"msg-thumb-container" + (isGroupFlex == true ? ' isGroupFlex' : '') + (smallIdle == true ? ' smallIdle' : '')}>
          {isPicSet ? (
            <div className={"msg-thumb img-square allowAddPic " + isMe + (isMe==='isMe' ? ' hasPic' : ' hasPic noModal') + (isGroupFlex == true ? ' isGroupFlex' : '')  + (smallIdle == true ? ' smallIdle' : '')} style={(isPicSet && isMe==='isMe') ? {backgroundImage:"url(" + profPicSrc + ")"} : {backgroundImage:"url(" + profPicSrcNotMe + ")"}}>
              {isMe==="isMe" ? (
            //  {isMe==="isMe" && (
                <Modal ariaLabel='Add or Edit Profile Picture' triggerText='Add/Edit Profile pic' usedFor={'addPicBtn msg-thumb'+ (isGroupFlex === true ? ' isGroupFlex' : '')  + (smallIdle == true ? ' smallIdle' : '')}>
                  <UploadProfPicContent isPicSet={isPicSet} profPicSrc={users.profilepic} isMe={isMe} picSizeToShow={270}/>
                </Modal>
                )
                : null
              }
          {  /*    senderRole === 'mentee' ? (
                  <FullPageModal {...MenteeProfileMsgBtnModalProps}>
                    <MenteeProfileContent />
                  </FullPageModal>
                  )
                : (
                  <FullPageModal {...MentorProfileMsgBtnModalProps}>
                    <MentorProfileContent />
                  </FullPageModal>
                )
              )}*/}
            </div>
            )
          : (
            <div className={"msg-thumb img-square allowAddPic noPic " + isMe + (isProspelaAuto === true ? ' isProspela' : '') + (isGroupFlex == true ? ' isGroupFlex' : '')  + (smallIdle == true ? ' smallIdle' : '')}>
              {isMe==="isMe" ? (
            //  {isMe==="isMe" ? (
                <Modal ariaLabel='Add or Edit Profile Picture' triggerText='Add/Edit Profile pic' usedFor={'addPicBtn msg-thumb'+ (isGroupFlex === true ? ' isGroupFlex' : '')  + (smallIdle == true ? ' smallIdle' : '')}>
                  <UploadProfPicContent isPicSet={isPicSet} userInitial={userInitial} isMe={isMe}/>
                </Modal>
                )
                : null
              }
        {/*        senderRole === 'mentee' ? (
                  <FullPageModal {...MenteeProfileMsgBtnModalProps}>
                    <MenteeProfileContent />
                  </FullPageModal>
                  )
                : (
                  <FullPageModal {...MentorProfileMsgBtnModalProps}>
                    <MentorProfileContent />
                  </FullPageModal>
                )
              )}*/}
              <div className={"userInitial msg-thumb " + (isMe==='isMe' ? 'isMe' : 'noModal') + (isGroupFlex == true ? ' isGroupFlex' : '')  + (smallIdle == true ? ' smallIdle' : '')}>
                {userInitial}
              </div>
            </div>
          )}
          {showOnline == true && (
            isOnline ? (
              <div className="presenceIndicator">
                <i className="fa fa-circle" />
              </div>
              )
            : (
              <div className="presenceIndicator">
                <i className="far fa-circle" />
              </div>
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}


export default Avatar;
