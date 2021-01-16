// Dex last merged this code on 5th nov 2020

import React, { Component } from "react";
//import MenteeProfileContent from './MenteeProfileContent.js';
//import MentorProfileContent from './MentorProfileContent.js';
import FullPageModal from './FullPageModal.js';
import {usercdn, userAvatarsFolder} from './CDN.js';

import "../css/General.css";
//import "../css/Modal.css";


/*const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
//  triggerText: 'View Mentee Profile',
  usedFor: 'mentee-usrName-profile',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
//  triggerText: 'Profile',
  usedFor: 'mentor-usrName-profile',
  backBtn: 'arrow'
}
*/
class UserName extends Component {
  render() {
    const {fname, lname, userUID, isProspelaAuto, isProspelaTeam, isFounder, isPM, showOnline, smallIdle} = this.props;
    const userRole = 'mentor'
    const myUid = '12345';

    const fnameLocal = isProspelaAuto ? 'Prospela' : fname
    const lnameLocal = isProspelaAuto ? '' : (lname ? lname : '')
    const name = (isProspelaAuto || isProspelaTeam == true) ? fnameLocal : (userRole === 'mentee' ? fnameLocal : (fnameLocal + (lnameLocal ? (' ' + lnameLocal) : '')))
    //const senderRole = 'mentor';
    const isMe = userUID === myUid ? 'isMe' : 'isntMe';

    const users = {
      uid: '99999',
    //  profilepic: '',
      profilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-o',
    //  profilepic_20: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-20',
    //  profilepic_40: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-40',
    //  profilepic_80: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-80'
    };
    const isPicSet = users.profilepic != '';
    function createProfPicURL(string) {
    //  let picSizeToShow = 40;
    //  return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
      return usercdn.concat('/',userAvatarsFolder,string);
    }
    const profPicSrc = createProfPicURL(users.profilepic);
    return (
      <React.Fragment>
        <div className={"sender-name tooltip" + ((isProspelaAuto || isProspelaTeam == true) ? ' isProspela' : '') + (isFounder == true ? ' isFounder' : '') + (isPM == true ? ' isPM' : '') + (showOnline == true ? ' showOnline' : '')  + (smallIdle == true ? ' smallIdle' : '')} >
          {name}
          <div className="tooltiptext">
            <div className="msg-thumb img-square" style={{backgroundImage:"url(" + profPicSrc + ")"}}/>
            {fnameLocal} {lnameLocal}
            <div>userrole & company</div>
          </div>
        </div>
      {/*  {isMe === 'isMe' ? (
          <span className="sender-name">{userName}</span>
          )
          : null
        }
*/}
  {  /*      : senderRole === 'mentee' ? (
            <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={userName}>
              <MenteeProfileContent />
            </FullPageModal>
            )
          : (
            <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={userName}>
              <MentorProfileContent />
            </FullPageModal>
          )
*/}   </React.Fragment>
    );
  }
}

export default UserName;
