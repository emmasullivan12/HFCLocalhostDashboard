import React, { Component } from "react";

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
  var now = new Date();
  var options = { hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' };
  return now.toLocaleTimeString('en-US', options);
}

export {userFlagEmoji, eduSubjects, timeSince, isNightDay, profileTimeZone};
