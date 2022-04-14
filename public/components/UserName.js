// Dex last merged this code on 27th oct 2021

import React, { Component } from "react";
//import MenteeProfileContent from './MenteeProfileContent.js';
//import MentorProfileContent from './MentorProfileContent.js';
//import FullPageModal from './FullPageModal.js';
import {usercdn, userAvatarsFolder} from './CDN.js';
import {userFlagEmoji} from './UserDetail.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';

import "../css/General.css";
//import "../css/Modal.css";


const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'View profile',
  usedFor: 'mentee-profile-userName',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'View profile',
  usedFor: 'mentor-profile-userName',
  backBtn: 'arrow'
}

class UserName extends Component {
  render() {
    const {fname, lname, userUID, isProspelaAuto, isProspelaTeam, isFounder, isPM, showOnline, smallIdle, isAnon} = this.props;
  /*  console.log(grabSchOrUni)
    console.log(ukUnisListLoaded)*/
    const userRole = 'mentor'
    const myUid = '12345';
    const fnameLocal = isProspelaAuto ? 'Prospela' : fname
    const lnameLocal = isProspelaAuto ? '' : (lname ? lname : '')
    const anonAvatarURL = 'https://files.prospela.com/images/AnonymousUser.png'
    const name = (isProspelaAuto || isProspelaTeam == true) ? fnameLocal : (userRole === 'mentee' ? fnameLocal : (fnameLocal + (lnameLocal ? (' ' + lnameLocal) : '')))
    const user = [
      {
        activerole: 'mentee',
        fname: 'Sam',
        lname: 'Grivens',
        eetstatus: 'sch',
        rolesexp: null,
        rolesexpfreetext: null,
        schname: '10',
        schnamefreetext: '',
        uniname: '',
        uninamefreetext: 'Bath University',
        degree: '',
        currco: 'Pladis',
        currrole: 'Finance Manager',
        currtrainingprovider: 'Apprenticeship',
        currtraining: 'Company B',
        country: 'GBR',
      //  profilepic: '',
      //    profilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png',
          profilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-o',
      //  profilepic_20: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-20',
      //  profilepic_40: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-40',
      //  profilepic_80: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-80'
      // https://media-uploads.prospela.com/userAvatars/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png
      }
    ]

    const isPicSet = isAnon == true || (user[0].profilepic != null && user[0].profilepic != '');
    let profPicSrc;
    let profPicSrcLarger;
    let userInitial;

    function createProfPicURL(string, picSizeToShow) {
    //  let picSizeToShow = 40;
    //  return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
      return usercdn.concat('/',userAvatarsFolder,string);
    }

    if (isPicSet == true) {
      if (eetstatus == 'sch') {
        profPicSrc = isAnon == true ? anonAvatarURL : createProfPicURL(user[0].profilepic, '40');
      } else {
        profPicSrcLarger = isAnon == true ? anonAvatarURL : createProfPicURL(user[0].profilepic, '80');
      }
    } else {
      userInitial = fname && fname.charAt(0).toUpperCase();
    }

    const eetstatus = user[0].eetstatus;
    const senderRole = 'mentee'
    const isOnline = true;
    let uniName;
    if (user[0].eetstatus == 'uni') {
      uniName = (user[0].uniname != '' ? user[0].uniname : user[0].uninamefreetext)
    }
  /*  if (ukUnisListLoaded && user[0].eetstatus == 'uni') {
      uniName = (user[0].uniname != '' ? (grabSchOrUni('uni', user[0].uniname)) : user[0].uninamefreetext)
    }*/

    return (
      <React.Fragment>
        <div className={"sender-name" + (!isProspelaAuto ? ' tooltip' : '') + ((isProspelaAuto || isProspelaTeam == true) ? ' isProspela' : '') + (isFounder == true ? ' isFounder' : '') + (isPM == true ? ' isPM' : '') + (showOnline == true ? ' showOnline' : '')  + (smallIdle == true ? ' smallIdle' : '')} >
          {name}
          {!isProspelaAuto && (
            <div className="tooltiptext user">
              {isPicSet == true ? (
                <div className={"userDetail-img img-square" + (eetstatus == 'sch' ? ' showSml': '')} style={eetstatus == 'sch' ? {backgroundImage:"url(" + profPicSrc + ")"} : {backgroundImage:"url(" + profPicSrcLarger + ")"}}/>
                )
              : (
                <div className="userDetail-img img-square noPic">
                  {userInitial}
                </div>
              )}
              <div className="userDetail-txt">
                <div className="presenceContainer userDetail">
                  <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
                </div>
                <div className="userDetail-name">{name}</div>
                <div className="userDetail-inst">
                  {eetstatus == 'sch' ? 'Student' : ''}
                  {eetstatus == 'uni' ? (user[0].degree + ' @ ' + uniName) : ''}
                  {eetstatus == 'job' ? (user[0].currrole + ' @ ' + user[0].currco) : ''}
                  {eetstatus == 'train' ? (user[0].currtraining + ' @ ' + user[0].currtrainingprovider) : ''}
                  {eetstatus == 'none' ? 'Looking for opportunities' : ''}
                </div>
                <div className="userDetail-flag">
                  <span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji(user[0].country)}/></span>
                </div>
                {senderRole == 'mentee' ? (
                    <FullPageModal {...MenteeProfileUsrNameModalProps}>
                      <MenteeProfileContent />
                    </FullPageModal>
                    )
                  : (
                    <FullPageModal {...MentorProfileUsrNameModalProps}>
                      <MentorProfileContent />
                    </FullPageModal>
                  )
                }
              </div>
            </div>
          )}
        </div>
      {/*  {isMe === 'isMe' ? (
          <span className="sender-name">{userName}</span>
          )
          : null
        }
*/}
   </React.Fragment>
    );
  }
}

export default UserName;
