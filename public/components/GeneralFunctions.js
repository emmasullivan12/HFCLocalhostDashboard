import React, { Component } from "react";

function isIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    return true;
  } else {
    return false;
  }
}

function isEdge() {
  var ua = window.navigator.userAgent;
  if (/Edge/.test(ua)) {
    return true;
  } else {
    return false;
  }
}

export {isIE, isEdge};
