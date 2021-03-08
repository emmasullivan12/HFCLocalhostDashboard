// Dex last merged this code on 8th mar 2021

import React, { Component } from "react";
import hobbiesOptions from './Hobbies.js';
import roleOptions from './Roles.js';
import groupsList from "./Groups.js";

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

function convertRole(roles, rolesfreetext) {
  let rolesFullText = [];

  const rolesArr = roleOptions
  //  .filter(role => roles.includes(parseInt(role.value,10)))
    .filter(role => roles.includes(role.value))

  rolesArr.forEach((x) => {
    rolesFullText.push(x.label)
  })
  rolesfreetext.forEach((y) => {
    rolesFullText.push(y)
  })

  return rolesFullText.join(", ")
}

function getGroupName(gid, getLongOrShortName) {

  const groupArr = groupsList
  //  .filter(role => roles.includes(parseInt(role.value,10)))
    .filter(group => group.value == gid)

  // If want short "source" version i.e. avfx
  if (getLongOrShortName == 'short') {
    return groupArr[0].source

  // otherwise bring back full version i.e. Access:VFX
  } else {
    return groupArr[0].label
  }

}

function convertHobbies(hobbies, hobbiesfreetext) {
  let hobbiesFullText = [];
//  const stringifyHobbies = JSON.stringify(hobbies);

  const hobbiesArr = hobbiesOptions
    .filter(hobby => hobbies.includes(parseInt(hobby.value,10)))
//    .filter(hobby => stringifyHobbies.includes(hobby.value))

  hobbiesArr.forEach((x) => {
    hobbiesFullText.push(x.label)
  })
  hobbiesfreetext.forEach((y) => {
    hobbiesFullText.push(y)
  })

  return hobbiesFullText.join(", ")
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

function eetStatus(eetStatus, schYrGrp, uniYrGrp) {
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
}

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
  /*  case 'NZL':
      return 'NZLFlag-emoji';
    case 'AUS':
      return 'AUSFlag-emoji';*/
    default:
      return 'globe-emoji';
  }
}

function eduSubjects(userCountry) {
  switch (userCountry) {
    case 'GBR':
      return 'A-Level (or equivalent) subjects';
    case 'USA':
    case 'CAN':
      return 'Subjects I specialised in at school';
    default:
      return 'Subjects I specialised in at school';
  }
}

function timeSince(lastActiveDate) {
  var now = new Date();
  var then = new Date(lastActiveDate * 1000);
  var diff = now.getTime() - then.getTime();
  var diffDays = diff / (1000 * 3600 * 24);
  let diffTxt;
  if (diffDays > 1) {
    diffTxt = ' days ago';
  } else {
    diffTxt = ' day ago'
  }
  diffDays = Math.floor(diffDays);
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

export { lookupUKSchUnis, availabilityMsg, userFlagEmoji, convertRole, getGroupName, convertHobbies, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr, setUniGraduYr};
