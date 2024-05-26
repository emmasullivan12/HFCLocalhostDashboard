// Dex last merged this code on 24th may 2024

import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link
} from "react-router-dom";

import Avatar from './Avatar.js';
import companyList from './Companies.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import {LoadingSpinner, DateCalc, X, Check} from "./GeneralFunctions";
import {getRoleAndInst, getCompanyDeets} from './UserDetail.js';

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  usedFor: 'mentor-profile-qaItem',
  backBtn: 'arrow'
}

const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
  usedFor: 'mentee-profile-feedItem',
  backBtn: 'arrow'
}

// This shows the content within an individual row in the ChatMenu
class LeaderboardItem extends Component {

  render() {
    const {user, index, isFirstItem, isLastItem, userTypeToShow, checkHasAccess, noAccessHandler, isMobile, isLoggedInUser, updatePathName} = this.props;
    const nameToShow = (userTypeToShow == '0' || (userTypeToShow == '1' && user.isU18 != true)) ? (user.fname + " " + user.lname) : (userTypeToShow == '1' ? user.fname : user.companyname)
    let authorinsttype, authorinstfreetext, authorinst, authorrole, authortraining, authordegree, authorstate, authorcountry, isU18, roleAndInstToShow, companyNameToShow

    if (userTypeToShow == '0' || userTypeToShow == '1') {
      let companyName = getCompanyDeets(user.currco, user.currcofreetext, 'name')
      authorinsttype = user.eetstatus
      authorinstfreetext = (user.eetstatus == 'job' ? companyName : (user.eetstatus == 'train' ? user.currtrainingprovider : (user.eetstatus == 'uni' ? user.uninamefreetext : '')))
      authorinst = (user.eetstatus == 'uni' ? user.uniname : '')
      authorrole = (user.eetstatus == 'job' ? user.currrole : '')
      authortraining = (user.eetstatus == 'train' ? user.currtraining : '')
      authordegree = (user.eetstatus == 'uni' ? user.degree : '')
      authorstate = (user.eetstatus == 'none' ? user.state : '')
      authorcountry = (user.eetstatus == 'none' ? user.country : '')
      isU18 = user.isU18
      const userHasJob = user.eetstatus == 'job'
      if (userHasJob) {
        const employerFromListObject = companyList.filter(co => co.label == companyName)
        const employerIsOnOurListOfCos = employerFromListObject && employerFromListObject.length > 0
        roleAndInstToShow = getRoleAndInst(authorinsttype, authorinstfreetext, authorinst, authorrole, authortraining, authordegree, authorstate, authorcountry, isU18, true, (employerFromListObject.length > 0 ? employerFromListObject : null))
      } else {
        roleAndInstToShow = getRoleAndInst(authorinsttype, authorinstfreetext, authorinst, authorrole, authortraining, authordegree, authorstate, authorcountry, isU18, false, null)
      }
    } else if (userTypeToShow == '2') {
      const employerFromListObject = companyList.filter(co => co.label == nameToShow)
      const employerIsOnOurListOfCos = employerFromListObject && employerFromListObject.length > 0

      if (employerIsOnOurListOfCos == true) {
        const employerURL = employerFromListObject[0].urlText
        const companyURLending = "/companies/" + employerURL
        const companyURL = "https://app.prospela.com" + companyURLending
        companyNameToShow = <Link to={{pathname: companyURLending, state: {prevPath: window.location.pathname}}} className="link">{nameToShow}</Link>
      } else {
        companyNameToShow = nameToShow
      }
    }

    return(
      <React.Fragment>
        <tr className={isFirstItem ? "isFirstItem" : (isLoggedInUser ? "isLoggedInUser" : "")}>
          <td className="displayFlex alignCenter positionRel">
            <span className="internalBorder hidden height60px" />
            {(index + 1 > 3) && (
              <span className="greyText verticallyCenter marginLeft14"><span className="number">{index + 1}</span></span>
            )}
            {(index + 1 == 1) && (
              <span className={"goldText verticallyCenter marginLeft10" + (isMobile == true ? " paddingTop15" : "")}><i className="fas fa-trophy" /><span className="number hidden">1</span></span>
            )}
            {(index + 1 == 2) && (
              <span className={"silverText verticallyCenter marginLeft10" + (isMobile == true ? " paddingTop15" : "")}><i className="fas fa-trophy" /><span className="number hidden">2</span></span>
            )}
            {(index + 1 == 3) && (
              <span className={"bronzeText verticallyCenter marginLeft10" + (isMobile == true ? " paddingTop15" : "")}><i className="fas fa-trophy" /><span className="number hidden">3</span></span>
            )}
          </td>
          <td className={(isMobile == true ? "textLeft paddingR paddingL40" : ("textLeft paddingR20" + (userTypeToShow != '2' ? "" : " paddingL")))}>
          {/*<td className={(isMobile == true ? "textLeft paddingR paddingL40" : "textLeft paddingR20") + (userTypeToShow == '1' ? " positionRel displayFlex" : "")}>
            {userTypeToShow == '1' && (
              <span className="internalBorder hidden height60px" />
            )}
            <div className={"displayFlex" + (userTypeToShow == '1' ? " marginLeft15 verticallyCenter" : "")}>*/}
            <div className="displayFlex">
              {(userTypeToShow == '0' || userTypeToShow == '1') && (
                <Avatar userID={user.uid} isAnon={false} isGroupFlex userName={user.fname} showAsCircle picSize={360}/>
              )}
              <div className={userTypeToShow == '2' ? "lineHeight2" : "max2Lines"}>
                <div className="darkGreyText fontSize14">
                  {userTypeToShow == '0' && (
                    <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={nameToShow}>
                      <MentorProfileContent updatePathName={updatePathName}/>
                    </FullPageModal>
                  )}
                  {(userTypeToShow == '1' && isU18 != true) && (
                    <FullPageModal {...MenteeProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={nameToShow}>
                      <MenteeProfileContent updatePathName={updatePathName}/>
                    </FullPageModal>
                  )}
                  {(userTypeToShow == '1' && isU18 == true) && (
                    <span className="bold">{nameToShow}</span>
                  )}
                  {(userTypeToShow == '2') && (
                    <span className="bold">{companyNameToShow}</span>
                  )}
                </div>
                {(userTypeToShow == '0' || userTypeToShow == '1') && (
                  <div className="fontSize14 mediumGreyText">
                    {roleAndInstToShow && roleAndInstToShow}
                  </div>
                )}
              </div>
            </div>
          </td>
          {/*<td className="textLeft maxWidth320px">
            {user.topContributionType}
          </td>*/}
          <td className={(isMobile == true ? "alignCenter fontSize13 paddingR15" : "textLeft paddingL20")}>
            <span className={"fontSize12 pointsIcon tooltip" + (isMobile == true ? " displayBlock" : " paddingR5")}><i className="far fa-edit" />
              <span className={"tooltiptext last messageActions" + (isLastItem == true ? "" : " below")}># of Q answered</span>
            </span> <span className="number">{user.numAnswers}</span>
          </td>
          <td className={(isMobile == true ? "alignCenter fontSize13 paddingR15" : "textLeft paddingL30")}>
            <span className={"fontSize12 pointsIcon tooltip" + (isMobile == true ? " displayBlock" : " paddingR5")}><i className="fas fa-hashtag" />
              <span className={"tooltiptext last messageActions" + (isLastItem == true ? "" : " below")}># of general posts</span>
            </span> <span className="number">{user.numGenerals}</span>
          </td>
          <td className={(isMobile == true ? "alignCenter fontSize13 paddingR5" : "textLeft paddingL30")}>
            <span className={"fontSize12 pointsIcon tooltip" + (isMobile == true ? " displayBlock" : " paddingR5")}>
              {(userTypeToShow == '0' || userTypeToShow == '2') && (
                <i className="fas fa-user-friends" />
              )}
              {userTypeToShow == '1' && (
                <span className={((isMobile == true && userTypeToShow != '2') ? "displayBlock" : "displayInlineBlock") + " pointsIcon tooltip"}>
                  <svg className={"pointsIcon filter-grey" + (isMobile == true ? " isMobile" : " width18px height18px")} viewBox="0 0 256 256">
                    <path fill="#000000" d="M206.7,17.8c-4.3,0-7.9-3.5-7.9-7.9s3.5-7.9,7.9-7.9c4.4,0,7.9,3.5,7.9,7.9S211,17.8,206.7,17.8 M214.6,206.7h-55.1c-5.3,0-10.2,1.7-14.1,4.7l-49.7,37.3c-0.1,0.1-0.1,0.1-0.2,0.2c-4,3.2-9.1,5.1-14.6,5.1c-13,0-23.6-10.6-23.6-23.6v-15.7c0-4.3-3.5-7.9-7.9-7.9h-7.9c-17.4,0-31.5-14.1-31.5-31.5V33.6C10,16.2,24.1,2.1,41.4,2.1h133.8c4.3,0,7.9,3.5,7.9,7.9s-3.5,7.9-7.9,7.9H45.4c-10.9,0-19.7,8.8-19.7,19.7v133.7c0,10.9,8.8,19.7,19.7,19.7h7.9c10.9,0,19.7,8.8,19.7,19.7v19.7c0,4.3,3.5,7.9,7.9,7.9c1.7,0,3.2-0.5,4.5-1.4c0,0,0,0,0,0l50.1-37.6c0,0,0,0,0,0c6.7-5.2,15-8.2,24.1-8.2h51.2c10.9,0,19.7-8.8,19.7-19.7V41.4c0-4.3,3.5-7.9,7.9-7.9s7.9,3.5,7.9,7.9v133.7C246,192.6,231.9,206.7,214.6,206.7 M128,65c-13,0-23.6,10.6-23.6,23.6c0,4.3-3.5,7.9-7.9,7.9c-4.3,0-7.9-3.5-7.9-7.9c0-21.7,17.6-39.3,39.3-39.3c21.7,0,39.3,17.6,39.3,39.3c0,16.3-9.9,30.3-24.1,36.2c0,0,0,0,0,0c-4.3,1.7-7.4,6-7.4,10.9c0,0.6-0.1,1.1-0.2,1.5c-0.7,3.6-3.9,6.4-7.7,6.4c-4.3,0-7.9-3.5-7.9-7.9c0-11.4,7-21.2,16.9-25.4c0,0,0,0,0,0c8.6-3.5,14.6-11.9,14.6-21.8C151.6,75.6,141,65,128,65 M128,159.5c4.3,0,7.9,3.5,7.9,7.9c0,4.3-3.5,7.9-7.9,7.9c-4.3,0-7.9-3.5-7.9-7.9C120.1,163,123.7,159.5,128,159.5"/><g><g/></g>
                  </svg>
                </span>
              )}
              <span className={"tooltiptext last messageActions" + (isLastItem == true ? "" : " below")}>{(userTypeToShow == '0' || userTypeToShow == '2') ? '# of mentees' : '# of questions'}</span>
            </span> <span className="number">{(userTypeToShow == '0' || userTypeToShow == '2') ? user.numMentees : user.numQs}</span>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

export default LeaderboardItem;
