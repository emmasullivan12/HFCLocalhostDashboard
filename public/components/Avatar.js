// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

import UploadProfPicContent from './UploadProfPicContent.js';
import Modal from './Modal.js';

import "../css/General.css";

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Profile Picture',
  triggerText: 'Add/Edit Profile pic',
  usedFor: 'addPicBtn msg-thumb'
}

class Avatar extends Component {

  render() {
    const {userName, userID, subtype, isProspela, isGroupFlex, showOnline} = this.props
    const profPicSrc = "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg" // looks up profpic URL of UID
  //  const profPicSrcNotMe = "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg"
    const profPicSrcNotMe = ''
    const profPicSrcProspela = "https://files-and-media.ams3.digitaloceanspaces.com/images/Professional%20Photo_50.jpg"
    const userInitial = userName.charAt(0).toUpperCase();
    const myID = '99999';
    const isMe = (userID === myID) ? 'isMe' : 'isntMe';
    const checkMe = profPicSrc != null && profPicSrc != ''
    const checkOtherPerson = isProspela ? (profPicSrcProspela != null && profPicSrcProspela != '') : (profPicSrcNotMe != null && profPicSrcNotMe != '')
    const isPicSet = ((subtype && (subtype === 'welcome' || subtype === 'prAuto' || subtype === 'finTraining')) || isGroupFlex === true) ? false : (isMe === 'isMe' ? checkMe : checkOtherPerson)

    let isOnline

    function checkUserOnline() {
      return true
    }

    if (showOnline) {
      isOnline = checkUserOnline()
    }
    //  const senderRole = 'mentor'; // will need to check senderUID for role (when opening profile)

    return (
      <React.Fragment>
        <div className={"msg-thumb-container" + (isGroupFlex == true ? ' isGroupFlex' : '')}>
          {isPicSet ? (
            <div className={"msg-thumb img-square allowAddPic " + isMe + (isMe==='isMe' ? ' hasPic' : ' hasPic noModal') + (isGroupFlex == true ? ' isGroupFlex' : '')} style={(isPicSet && isMe==='isMe') ? {backgroundImage:"url(" + profPicSrc + ")"} : (isProspela ? {backgroundImage:"url(" + profPicSrcProspela + ")"} : {backgroundImage:"url(" + profPicSrcNotMe + ")"})}>
              {isMe==="isMe" ? (
            //  {isMe==="isMe" && (
                <Modal {...UploadProfPicProps}>
                  <UploadProfPicContent isPicSet={isPicSet} profPicSrc={profPicSrc} isMe={isMe}/>
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
            <div className={"msg-thumb img-square allowAddPic noPic " + isMe + " " + (isProspela === true ? 'isProspela' : null) + (isGroupFlex == true ? ' isGroupFlex' : '')}>
              {isMe==="isMe" ? (
            //  {isMe==="isMe" ? (
                <Modal {...UploadProfPicProps}>
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
              <div className={"userInitial msg-thumb " + (isMe==='isMe' ? null : 'noModal') + (isGroupFlex == true ? ' isGroupFlex' : '')}>
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
