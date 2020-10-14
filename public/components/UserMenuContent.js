// Dex last merged this code on 6th oct 2020

import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import Modal from './Modal.js';
import FullPageModal from './FullPageModal.js';
import SettingsContent from './SettingsContent.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import {eduName} from './UserDetail.js';
import "../css/UserMenuContent.css";
import "../css/General.css";
import "../css/Modal.css";

const SettingsModalProps = {
  ariaLabel: 'Popup to manage your preferences and settings',
  triggerText: 'Preferences & Settings',
  usedFor: 'settings',
  backBtn: 'arrow'
}

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'Profile',
  usedFor: 'menu-mentee-profile',
  backBtn: 'arrow'
}

const MentorProfileModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'Profile',
  usedFor: 'menu-mentor-profile',
  backBtn: 'arrow'
}

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Profile Picture',
  triggerText: 'Add/Edit Profile pic',
  usedFor: 'addPicBtn userMenuPlus',
  triggerHasAutoFocus: true
}

class UserMenuContent extends Component {
  render() {
    const {onMenuClose, onKeyDown} = this.props;
    const userRole = 'mentee';
    const user = {
      uid: '23456',
      fname: 'Dexter',
      lname: 'Boyce',
      profPicSrc: "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg",
      schName: '',
      schNameFreeText: '',
      uniName: '',
      uniNameFreeText: '',
      currCo: 'Pladis',
      eetStatus: 1,
    };
    const isPicSet = user.profPicSrc != ''; // check if author who sent message has avatar pic set
//    const isPicSet = false;
    const userInitial = user.fname.charAt(0).toUpperCase();
    const eduInstName = eduName(user.schName, user.schNameFreeText, user.uniName, user.uniNameFreeText, user.eetStatus);
    return (
      <React.Fragment>
        <div className="userMenuContainer">
          <section className="userMenu-you">
            <h2 className="userMenu-header">
              <div className="userMenu-thumb-container">
                {isPicSet ? (
                  <div className="userMenu-thumb allowAddPic" style={isPicSet ? {backgroundImage:"url(" + user.profPicSrc + ")"} : null}>
                    <Modal {...UploadProfPicProps}>
                      <UploadProfPicContent isPicSet={isPicSet} profPicSrc={user.profPicSrc} isMe='isMe' />
                    </Modal>
                  </div>
                  )
                : (
                  <div className="userMenu-thumb allowAddPic noPic isMe">
                    <Modal {...UploadProfPicProps}>
                      <UploadProfPicContent isPicSet={isPicSet} userInitial={userInitial} isMe='isMe'/>
                    </Modal>
                    <div className="userInitial userMenu-thumb">
                      {user.fname.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <span className="userMenu-name overflow-ellipsis">{user.fname} {user.lname}</span>
              <span className="userMenu-preferred-name overflow-ellipsis">{user.fname}</span>
            </h2>
{/*            <ul className="userMenu-list">
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/profile/set-status" className="userMenu-link" >
                  <span className="userMenuLabel overflow-ellipsis">Edit status...</span>
                </NavLink>
              </li>
              {userRole === 'mentee' ? (
                <React.Fragment>
                  <FullPageModal {...MenteeProfileModalProps} role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                    <MenteeProfileContent />
                  </FullPageModal>
                  <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                    <NavLink to="/profile/saved-highlights" className="userMenu-link">
                      <span className="userMenuLabel overflow-ellipsis">My Highlights</span>
                    </NavLink>
                  </li>
                </React.Fragment>
                )
              : (
                <FullPageModal {...MentorProfileModalProps} role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                  <MentorProfileContent />
                </FullPageModal>
              )}
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/profile/influencer-stats" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Influencer Stats</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/invite" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Invite Codes</span>
                </NavLink>
              </li>
            </ul>*/}
          </section>
      {/*    {userRole === 'mentee' && (
            <section className="userMenu-eduInst">
              <h2 className="userMenu-header">
                <div className="userMenu-eduInstThumb" />
                <span className="userMenu-name overflow-ellipsis">{user.eetStatus===0 || user.eetStatus===1 ? eduInstName : (user.currCo)}</span>
                <span className="userMenu-preferred-name overflow-ellipsis">Not yet signed up</span>
              </h2>
              <ul className="userMenu-list">
                <li className="userMenu-list-item-nohover" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                  <span className="userMenu-eduInstDetail overflow-ellipsis">
                    Sign up your school to access real employee e-mentors. <NavLink to="/invite" className="inline-link">Learn more</NavLink>
                  </span>
                </li>
              </ul>
            </section>
          )}
          {userRole === 'mentor' && (
            <section className="userMenu-eduInst">
              <h2 className="userMenu-header">
                <div className="userMenu-eduInstThumb" />
                <span className="userMenu-name overflow-ellipsis">{user.currCo}</span>
                <span className="userMenu-preferred-name overflow-ellipsis">Not yet signed up</span>
              </h2>
              <ul className="userMenu-list">
                <li className="userMenu-list-item-nohover" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                  <span className="userMenu-eduInstDetail overflow-ellipsis">
                    Invite your colleagues to increase your company&#39;s collective impact. <NavLink to="/invite" className="inline-link">Learn more</NavLink>
                  </span>
                </li>
              </ul>
            </section>
          )}*/}
          <section className="userMenu-settings">
            <ul className="userMenu-list">
              <li className="userMenu-list-item">
                <span className="userMenuLabel overflow-ellipsis">
                  <FullPageModal {...SettingsModalProps}>
                    <SettingsContent userRole={userRole}/>
                  </FullPageModal>
                </span>
              </li>
      {/*        <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/help-and-feedback" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Help & Feedback</span>
                </NavLink>
              </li> */}
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <Link to="/logout" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Sign out</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UserMenuContent;
