// Dex last merged this code on 12TH OCT 2020

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

// Disallows EdgeHTML / Edge Legacy
function whichBrowser() {
  var browser = (function (agent) {
      switch (true) {
          case agent.indexOf("edge") > -1: return "MS Edge (EdgeHtml)";
          case agent.indexOf("edg") > -1: return "MS Edge Chromium";
          case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
          case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
          case agent.indexOf("trident") > -1: return "Internet Explorer";
          case agent.indexOf("firefox") > -1: return "firefox";
          case agent.indexOf("safari") > -1: return "safari";
          default: return "other";
      }
  })(window.navigator.userAgent.toLowerCase());
  return browser
}

/*
function isMobile() {
  console.log("ismobile called")
  var ua = window.navigator.userAgent || navigator.vendor.toLowerCase() || window.opera;
  console.log(ua)
  var expression = /android|android.+mobile|avantgo|bada\/|\bbb[0-9]+|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|\bip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|motorola|mobile.+firefox|netfront|nokia|nintendo +3ds|opera m(ob|in)i|palm|palm( os)?|phone|p(ixi|re)\/|playbook|rim +tablet|playstation.+vita|plucker|pocket|psp|samsung|(gt-|bgt-|sgh-|sph-|sch-)[a-z][0-9]+|series(4|6)0|symbian|symbos|\bs60\b|treo|up\.(browser|link)|vertu|vodafone|wap|windows (ce|phone)|windows +nt.+arm|windows +nt.+touch|xda|xiino|xblwp7|zunewp7/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb|b-[0-9]+)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|ti-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i
  var regExp = new RegExp(expression);
  console.log(regExp.test(ua.substr(0, 4)))
  return regExp.test(ua.substr(0, 4));
}*/

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

function escapeHTML(unsafe_str) {
  return unsafe_str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
}

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

export {isIE, isEdge, isURL, escapeHTML, ChevronDown, ChevronUp, X, Check, LoadingSpinner};
