// Dex last merged this code on 14th apr 2022

import React, { Component } from "react";
import subjectsOptions from './Subjects.js';
import hashtagOptions from './Hashtags.js';
import hobbiesOptions from './Hobbies.js';
import industryList from './Industries.js';
import roleOptions from './Roles.js';
import groupsList from "./Groups.js";
import workingOnOptions from './WorkingOn.js';

function lookupUKSchUnis(i, valueToGet, eetStatus, callback) {
  if (eetStatus === 'uni') {
    const fileToRender = valueToGet === 'emailFormat' ? 'UKUniEmails' : 'UKUnis' ;
    let uniDetail;

    //IMPORT UNI list
    return import(`./${fileToRender}.js`)
      .then(component => {
        //LOOK UP VALUETOGET BASED ON ID NUMBER
        uniDetail = component.default[i];
        return uniDetail;
      })
      .catch(err => {
        if (callback) {
          callback()
        }
      })

  } else if (eetStatus === 'sch') {
    const fileToRender = valueToGet === 'emailFormat' ? 'UKSchEmails' : 'UKSchs' ;
    let schDetail;

    //IMPORT SCH list
    return import(`./${fileToRender}.js`)
      .then(component => {
        //LOOK UP VALUETOGET BASED ON ID NUMBER
        schDetail = component.default[i]
        return schDetail;
      })
      .catch(err => {
        if (callback) {
          callback()
        }
      })

  }
}

function getCredText(wasDefaultRole, authorinsttype, authorrole, authorroleishidden, authorinst, authorinstfreetext, authortraining, authordegree, authorstate, authorcountry) {
//  const {ukSchsList, ukUnisList} = this.props;
  if (authorinsttype == 'job') {
    return authorroleishidden != true ? ((wasDefaultRole == true ? "" : "Worked as ") + authorrole + ' at ' + authorinstfreetext) : ((wasDefaultRole == true ? "" : "Worked as ") + authorinstfreetext)
  } else if (authorinsttype == 'train') {
    return (authortraining != '' ? ((wasDefaultRole == true ? "" : "Trained as ") + authortraining + ' at ' + authorinstfreetext) : ((wasDefaultRole == true ? "" : "Trained at ") + authorinstfreetext))
  } else if (authorinsttype == 'uni') {
  //  const uniInst = authorinst ? (grabSchOrUni('uni', authorinst, ukUnisList)) : authorinstfreetext
    const uniInst = authorinst ? authorinst : authorinstfreetext
    return (wasDefaultRole == true ? "" : "Studied ") + authordegree + ' at ' + uniInst
  } else if (authorinsttype == 'sch') {
  //  const schInst = authorinst ? (grabSchOrUni('sch', authorinst, ukSchsList)) : authorinstfreetext
  //  const schInst = authorinst ? authorinst : authorinstfreetext
    const schInst = 'School Student' // Do not show school name if under 18
    return schInst
  } else {
    /* const country = selectCountry(authorcountry);
    const stateProv = selectState(authorcountry, authorstate); */
    const country = authorcountry
    const stateProv = authorstate
    return 'Lives in ' + stateProv + ', ' + country
  }
}

function getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved) {
  let verifLevels = []

  // If has verified email
  if (mentorSUStep != 'did1stSU' && mentorSUStep != 'didCountry' && mentorSUStep != 'didEdu' && mentorSUStep != 'didIndRoleMentor' && mentorSUStep != 'updatingEmail' && mentorSUStep != 'didEduEmailNeedsRev' && mentorSUStep != 'didEmailVerifNeedsRev') {
    verifLevels.push('email')
  }

  // If Prospela can verify their edu/work/training (i.e. inst email)
  if (verifiedType == 1 || eduemailverif == true || profemailverif == true) {
    verifLevels.push('inst')
  }

  // If completed their Prospela training
  if (mentorSUStep == 'didIDTrain' || mentorSUStep == 'didTrain') {
    verifLevels.push('training')
  }

  if (tsapproved != '' || tsapproved != null) {
    verifLevels.push('id') // Prospela approved their ID
    verifLevels.push('background') // Prospela did crim record & other background checks
  }

  return verifLevels;
}

function convertRole(roles, rolesfreetext) {
  let rolesFullText = [];

  if (roles && roles.length > 0) {
    const rolesArr = roleOptions
      .filter(role => roles.includes(parseInt(role.value,10)))
    //  .filter(role => roles.includes(role.value))

    rolesArr.forEach((x) => {
      rolesFullText.push(x.label)
    })
  }

  if (rolesfreetext && rolesfreetext.length > 0) {
    rolesfreetext.forEach((y) => {
      rolesFullText.push(y)
    })
  }

  return rolesFullText.join(", ")
}

function convertWorkingOn(workingOn, workingOnFreeText) {
  let workingOnArray = [];
  let workingOnArr;

  if(workingOn != null && workingOn != ''){
    workingOnArr = workingOnOptions
      .filter(item => workingOn.includes(parseInt(item.value,10)))
  }

  if(workingOnArr != null && workingOnArr != ''){
    workingOnArr.forEach((x) => {
      workingOnArray.push(x.label)
    })
  }

  if(workingOnFreeText != null && workingOnFreeText != ''){
    workingOnFreeText.forEach((y) => {
      workingOnArray.push(y)
    })
  }

  return workingOnArray.join(", ")
}

function getGroupName(gid, getLongOrShortName) {

  const groupArr = groupsList
    .filter(group => group.value == gid)

  // If want short "source" version i.e. avfx
  if (getLongOrShortName == 'short') {
    return groupArr[0].source

  // otherwise bring back full version i.e. Access:VFX
  } else {
    return groupArr[0].label
  }

}

function getIndustryDeets(industryID) {

  const indArr = industryList
    .filter(industry => industry.value == industryID)

  return indArr[0]
}

function getGroupDeets(gid) {

  const groupArr = groupsList
  //  .filter(role => roles.includes(parseInt(role.value,10)))
    .filter(group => group.value == gid)

  return groupArr[0]

}

function convertHobbies(hobbies, hobbiesfreetext) {
  let hobbiesFullText = [];
//  const stringifyHobbies = JSON.stringify(hobbies);

  if (hobbies & hobbies.length > 0) {
    const hobbiesArr = hobbiesOptions
      .filter(hobby => hobbies.includes(parseInt(hobby.value,10)))
  //    .filter(hobby => stringifyHobbies.includes(hobby.value))

    hobbiesArr.forEach((x) => {
      hobbiesFullText.push(x.label)
    })
  }

  if (hobbiesfreetext && hobbiesfreetext.length > 0) {
    hobbiesfreetext.forEach((y) => {
      hobbiesFullText.push(y)
    })
  }

  return hobbiesFullText.join(", ")
}

function convertHashtags(hashtags, hashtagsfreetext) {
  let hashtagsFullText = [];

  if (hashtags && hashtags.length > 0) {
    const hashtagsArr = hashtagOptions
      .filter(hashtag => hashtags.includes(hashtag.value))

    hashtagsArr.forEach((x) => {
      hashtagsFullText.push(x.label)
    })
  }

  if (hashtagsfreetext && hashtagsfreetext.length > 0) {
    hashtagsfreetext.forEach((y) => {
      hashtagsFullText.push(y)
    })
  }

  return hashtagsFullText.join(", ")
}

function convertSubjects(subjects, subjectsfreetext) {
  let subjectsFullText = [];
//  const stringifyHobbies = JSON.stringify(hobbies);

  if (subjects && subjects.length > 0) {
    const subjectsArr = subjectsOptions
      .filter(subject => subjects.includes(parseInt(subject.value,10)))
  //    .filter(hobby => stringifyHobbies.includes(hobby.value))

    subjectsArr.forEach((x) => {
      subjectsFullText.push(x.label)
    })
  }

  if (subjectsfreetext && subjectsfreetext.length > 0) {
    subjectsfreetext.forEach((y) => {
      subjectsFullText.push(y)
    })
  }

  return subjectsFullText.join(", ")
}

function setSchGraduYr(currYrGrp) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  let schGraduYr;

  switch(currYrGrp) {
    case "yr8":
    case "Year 8":
    case "7th Grade":
      schGraduYr = year + 6;
      break;
    case "yr9":
    case "Year 9":
    case "8th Grade":
      schGraduYr = year + 5;
      break;
    case "yr10":
    case "Year 10":
    case "9th Grade":
      schGraduYr = year + 4;
      break;
    case "yr11":
    case 'Year 11':
    case "10th Grade":
      schGraduYr = year + 3;
      break;
    case "yr12":
    case 'Year 12 (Sixth Form Yr 1)':
    case "11th Grade":
      schGraduYr = year + 2;
      break;
    case "yr13":
    case "Year 13 (Sixth Form Yr 2)":
    case "12th Grade":
      schGraduYr = year + 1;
      break;
    case "finSch":
    case "Finished School / Sixth Form / College":
    case "Finished High School":
      schGraduYr = year;
      break;
  }

  if (month <= 7) {
    return schGraduYr - 1;
  } else {
    return schGraduYr;
  }
}

function setUniGraduYr(currYr, courseLength) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  let uniGraduYr;
  if(currYr === 'pg') {
    uniGraduYr = courseLength + year
  } else if (currYr === 'rcGrad'){
    uniGraduYr = year
  } else {
    uniGraduYr = (courseLength - currYr) + year
  }
  if (currYr === 'rcGrad'){
    if (month <= 7) {
      return uniGraduYr - 1;
    } else {
      return uniGraduYr;
    }
  } else {
    if (month <= 7) {
      return uniGraduYr;
    } else {
      return uniGraduYr + 1;
    }
  }
}

function availabilityMsg(userAvail) {
  if (userAvail === 1) {
    return <span>Hoping for <strong className="greenText">long-term</strong> and/or <strong className="greenText">short-term</strong> mentorship</span>
  } else if (userAvail === 2) {
    return <span>Hoping for a <strong className="greenText">long-term</strong> mentorship</span>
  } else if (userAvail === 3) {
    return <span>Hoping for <strong className="greenText">short-term</strong> mentor support</span>
  } else if (userAvail === 4) {
    return <span><span className="redText">Not currently looking</span> for mentorship</span>
  }
}

/*function eetStatus(eetStatus, schYrGrp, uniYrGrp) {
  if (eetStatus === 'sch') {
    return <span>{schYrGrp} Student</span>
  } else if (eetStatus === 'uni') {
    return <span>{uniYrGrp} Student</span>
  } else if (eetStatus === 'job') {
    return <span>Currently in Employment</span>
  } else if (eetStatus === 'train') {
    return <span>Currently in Training</span>
  } else if (eetStatus === 'none') {
    return <span>Currently not in education, employment or training</span>
  }
}*/

function eduName(schName, schNameFreeText, uniName, uniNameFreeText, eetStatus) {
  if (eetStatus === 'uni') {

    if (uniName != '') {
      return Promise.all([lookupUKSchUnis(uniName, 'label', eetStatus)])
        .then(uni => {
          this.setState({
            isLoading: false,
            userEduName: uni
          })
        })
        .catch(err => {
          return "Loading university..."
        })
    } else return uniNameFreeText;

  } else if (eetStatus === 'sch') {

    if (schName != '') {
      return Promise.all([lookupUKSchUnis(schName, 'label', eetStatus)])
        .then(sch => {
          this.setState({
            isLoading: false,
            userEduName: sch
          })
        })
        .catch(err => {
          return "Loading school..."
        })
    } else return schNameFreeText;
  }
}

function planningUni(planningUni) {
  if (planningUni === 0) {
    return <span>No</span>
  } else if (planningUni === 1) {
    return <span>Yes</span>
  } else if (planningUni === 2) {
    return <span>Maybe</span>
  } else if (planningUni === 3) {
    return <span>Not sure</span>
  }
}

function userFlagEmoji(userCountry) {
  switch (userCountry) {
    case 'GBR':
      return 'GBRFlag-emoji';
    case 'IRE':
      return 'IREFlag-emoji';
    case 'USA':
      return 'USAFlag-emoji';
    case 'CAN':
      return 'CANFlag-emoji';
    case 'NZL':
      return 'NZLFlag-emoji';
    case 'AUS':
      return 'AUSFlag-emoji';
    default:
      return 'globe-emoji';
  }
}

function eduSubjects(userCountry) {
  switch (userCountry) {
    case 'GBR':
      return 'School subjects (A-Level or equivalent)';
    case 'USA':
    case 'CAN':
      return 'Subjects I studied at High School';
    default:
      return 'Subjects I studied at High School';
  }
}

function timeSince(lastActiveDate) {
  var now = new Date();
  var then = new Date(lastActiveDate);
  const diffTime = Math.abs(now - then);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let diffTxt;
  if (diffDays > 1) {
    diffTxt = ' days ago';
  } else {
    diffTxt = ' day ago'
  }
  return diffDays + diffTxt
}

function isNightDay(userCurrentTime) {
  var n = userCurrentTime.indexOf(":");
  var hour = userCurrentTime.slice(0,n);//find : and then bring back digits to left of it
  if (hour >= 7 && hour <= 19) {
    return 'day'
  } else {
    return 'night'
  }
}

function profileTimeZone(userTimeZone) {
  // Check if is Internet Explorer 6-11 because does not recognise toLocaleTimeString()
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  const timeZone = isIE ? 'UTC' : userTimeZone;
  var now = new Date();
  var options = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timeZone,
    timeZoneName: 'short' };
  return now.toLocaleTimeString('en-US', options);
}

export {getCredText, lookupUKSchUnis, availabilityMsg, userFlagEmoji, getVerifLevelArr, convertRole, convertWorkingOn, getGroupName, getGroupDeets, getIndustryDeets, convertHashtags, convertHobbies, convertSubjects, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr, setUniGraduYr};
