// Dex last merged this code on 4th June 2020

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

function isURL(url) {
  var expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  var regExp = new RegExp(expression);
  return regExp.test(url);
}

const ChevronDown = () => (
  <svg viewBox="0 0 10 7" id="chevronDown">
    <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
  </svg>
)

const ChevronUp = () => (
  <svg viewBox="0 0 10 8" id="chevronUp">
    <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
  </svg>
)

const X = () => (
  <svg viewBox="0 0 16 16">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 16 16">
    <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
  </svg>
)

const LoadingSpinner = () => (
  <div className="SpinnerWrapper ebrxGH">
    <span color="currentColor" className="SVGInline SpinnerSvg-jjs2a1-0 dtuFiT">
      <svg className="SVGInline-svg SpinnerSvg-jjs2a1-0-svg dtuFiT-svg" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <title>loader</title>
        <g fill="#2F2F26" fillRule="evenodd">
          <rect transform="rotate(22.5 26.506 4.294)" x="25.506" y="1.294" width="2" height="6" rx="1"/>
          <rect transform="rotate(45 32.02 7.98)" x="31.021" y="4.979" width="2" height="6" rx="1"/>
          <rect transform="rotate(-112.5 35.706 13.494)" x="34.706" y="10.494" width="2" height="6" rx="1"/>
          <rect transform="rotate(-90 37 20)" x="36" y="17" width="2" height="6" rx="1"/>
          <rect transform="rotate(-67.5 35.706 26.506)" x="34.706" y="23.506" width="2" height="6" rx="1"/>
          <rect transform="rotate(-45 32.02 32.02)" x="31.021" y="29.021" width="2" height="6" rx="1"/>
          <rect transform="rotate(-22.5 26.506 35.706)" x="25.506" y="32.706" width="2" height="6" rx="1"/>
          <rect x="19" y="34" width="2" height="6" rx="1"/>
          <rect transform="rotate(22.5 13.494 35.706)" x="12.494" y="32.706" width="2" height="6" rx="1"/>
          <rect transform="rotate(45 7.98 32.02)" x="6.979" y="29.021" width="2" height="6" rx="1"/>
          <rect transform="rotate(-112.5 4.294 26.506)" x="3.294" y="23.506" width="2" height="6" rx="1"/>
          <rect transform="rotate(-90 3 20)" x="2" y="17" width="2" height="6" rx="1"/>
          <rect transform="rotate(-67.5 4.294 13.494)" x="3.294" y="10.494" width="2" height="6" rx="1"/>
          <rect transform="rotate(-45 7.98 7.98)" x="6.979" y="4.979" width="2" height="6" rx="1"/>
          <rect transform="rotate(-22.5 13.494 4.294)" x="12.494" y="1.294" width="2" height="6" rx="1"/>
          <rect x="19" width="2" height="6" rx="1"/>
        </g>
      </svg>
    </span>
  </div>
)

export {isIE, isEdge, isURL, ChevronDown, ChevronUp, X, Check, LoadingSpinner};
