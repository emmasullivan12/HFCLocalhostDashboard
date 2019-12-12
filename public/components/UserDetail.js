// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";

function setSchGraduYr(currYrGrp) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  let schGraduYr;

  switch(currYrGrp) {
    case "Year 8":
    case "7th Grade":
      schGraduYr = year + 6;
      break;
    case "Year 9":
    case "8th Grade":
      schGraduYr = year + 5;
      break;
    case "Year 10":
    case "9th Grade":
      schGraduYr = year + 4;
      break;
    case 'Year 11':
    case "10th Grade":
      schGraduYr = year + 3;
      break;
    case 'Year 12 (Sixth Form Yr 1)':
    case "11th Grade":
      schGraduYr = year + 2;
      break;
    case "Year 13 (Sixth Form Yr 2)":
    case "12th Grade":
      schGraduYr = year + 1;
      break;
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
  } else {
    uniGraduYr = (courseLength - currYr) + year
  }
  if (month <= 7) {
    return uniGraduYr;
  } else {
    return uniGraduYr + 1;
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

function eduName(schName, uniName) {
  if (uniName != '') {
    return uniName
  } else if (schName != '') {
    return schName
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
    case 'UK':
      return 'UKFlag-emoji';
    case 'US':
      return 'USFlag-emoji';
    case 'Canada':
      return 'CdaFlag-emoji';
    default:
      return 'globe-emoji';
  }
}

function eduSubjects(userCountry) {
  switch (userCountry) {
    case 'UK':
      return 'A-Level (or equivalent) subjects';
    case 'US':
      return 'Subjects I specialised in at school';
    case 'Canada':
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
  var hour = new Date(userCurrentTime).getHours();
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

export {availabilityMsg, userFlagEmoji, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr, setUniGraduYr};
