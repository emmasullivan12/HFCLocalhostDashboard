// Dex last merged this code on 24th sept 2022

import React, { Component } from "react";


function removeHash() {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

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

function metaAdder(queryProperty, value) {
  // Get an element if it exists already
  let element = document.querySelector(`meta[${queryProperty}]`);

  // Check if the element exists
  if (element) {
    // If it does just change the content of the element
    element.setAttribute("content", value);
  } else {
    // It doesn't exist so lets make a HTML element string with the info we want
    element = `<meta ${queryProperty} content="${value}" />`;

    // And insert it into the head
    document.head.insertAdjacentHTML("beforeend", element);
  }
}

function getIcon(channelType) {
  switch(channelType) {
    case "general":
      return <i className="fas fa-home" />
    case "intros":
      return <i className="fas fa-coffee" />
      /*return <i className="fas fa-hand-sparkles" /> */
    case "announcements":
      return <i className="fas fa-bullhorn" />
    case "resources":
      return <i className="fas fa-folder-open" />
    case "leaderboard":
      return <i className="fas fa-crown" />
    default:
      return <i className="fas fa-hashtag" />
  }
}

function getChannelAbout(channelType, allowed) {
  let mentorOnly
  let menteeOnly

  if (allowed.indexOf('mentor') != -1 && allowed.indexOf('mentee') == -1) {
    mentorOnly = true
  }
  if (allowed.indexOf('mentee') != -1 && allowed.indexOf('mentor') == -1) {
    menteeOnly = true
  }

  switch(true) {
    case (channelType == "general" && menteeOnly == true):
      return 'A great place to chit chat with other Mentees'
    case (channelType == "general" && mentorOnly == true):
      return 'A great place to chit chat with other E-Mentors'
    case (channelType == "general" && !menteeOnly && !mentorOnly):
      return 'A great place to chit chat with other group members'
    case (channelType == "intros" && menteeOnly == true):
      return 'Share a few words about yourself to your fellow Mentees'
    case (channelType == "intros" && mentorOnly == true):
      return 'Share a few words about yourself to your fellow E-Mentors'
    case (channelType == "intros" && !menteeOnly && !mentorOnly):
      return 'Share a few words about yourself to your fellow group members'
    case (channelType == "announcements"):
      return 'Share and keep up to date with important group announcements.'
    case (channelType == "resources"):
      return 'A place to explore resources and docs shared within this group'
    case (channelType == "leaderboard"):
      return 'See how you fare versus your peers'
    default:
      return 'A great place to chit chat with other group members'
  }
}

function changeTitle(numUnreads) {
  var original = 'Prospela Dashboard';
  var timeout;
  var newTitle = '(' + numUnreads + ') ' + (numUnreads > 1 ? 'New Messages!' : 'New Message!');

  function flashTitle() {
    document.title = (document.title == original) ? newTitle : original;
    timeout = setTimeout(flashTitle, 1200);
  }

  function cancelFlashTitle(timeout) {
    clearTimeout(timeout);
    document.title = original;
  }

  if (numUnreads > 0) {
    cancelFlashTitle(timeout);
    flashTitle();

  } else {
    cancelFlashTitle(timeout);
  }
}

function showNotifFavicon(numUnreads) {
  // Favicon if user has notification
  var iconNew = 'https://files-and-media.ams3.digitaloceanspaces.com/images/Prospela_Favicon_Notification.png';

  // Replace favicon for microsoft
  document.getElementById('favicon-ms').content = iconNew;

  // Replace all other favicons
  var favicons = document.querySelectorAll('.favicon');
  for (let i = 0; i < favicons.length; ++i) {
    favicons[i].href = iconNew;
  }

  changeTitle(numUnreads);
}

function hideNotifFavicon() {
  // Favicon if user doesnt have notification
  var iconOrig = 'https://files-and-media.ams3.digitaloceanspaces.com/images/Prospela_Favicon.png';

  // Replace favicon for microsoft
  document.getElementById('favicon-ms').content = iconOrig;

  // Replace all other favicons
  var favicons = document.querySelectorAll('.favicon');
  for (let i = 0; i < favicons.length; ++i) {
    favicons[i].href = iconOrig;
  }

  changeTitle(0);
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

function checkMobile() {
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const isMobile = w <= 600 && h <= 800
  return isMobile
}

function checkDevice() {
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const isDevice = w <= 832 && h <= 1025
  return isDevice
}

function isURL(url) {
  var expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  var regExp = new RegExp(expression);
  return regExp.test(url);
}

function nthCalc(date) {
  if (date > 3 && date < 21) return 'th';
  switch (date % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function TimeCalc(props) {
  var ts = new Date(props.time);
  var hour = ts.getHours();
  var min = ts.getMinutes();
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  min = min >= 0 && min < 10 ? '0'+min : min;
  var timeTxt = hour + ':' + min + ' ' + ampm;
  return timeTxt;
}

function DateCalc(props) {
  const timestamp = props.time ? props.time : props
  var ts = new Date(timestamp);
  var today = new Date();
  var tsDate = ts.toDateString()
  var todayDate = today.toDateString();

  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
  var month = months[ts.getMonth()];
  var date = ts.getDate();
  let time
  let year

  // Show format May 2, 2020 i.e. Don't show things like "today" "yesterday" etc
  if (props.showPureDate == true) {
    year = ts.getFullYear()
    time = month + ' ' + (props.dontShowDay == true ? '' : (date + ", ")) + year
    return time;
  } else {
    var yestDate = new Date((today.setDate(today.getDate()-1))).toDateString()
    var isToday = tsDate == todayDate
    if (isToday) {
      return "Today"
    } else if(tsDate == yestDate) {
      return "Yesterday"
    } else {
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var day = days[ts.getDay()];
      var nth = nthCalc(date);
      year = ((ts.getFullYear()===new Date().getFullYear()) ? '' : ' '+ts.getFullYear());
      time = day + ', ' + month + ' ' + date + nth + year
      return time;
    }
  }
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function getUnreadIndicator(unreadCount, isGroupChannel, hasTooltip) {
  let text

  switch(true) {
    case (unreadCount == null):
      text = 'New';
      break;
    case (unreadCount > 9 && unreadCount != null):
      text = '9+'
      break;
    case (unreadCount > 0 && unreadCount <= 9 && unreadCount != null):
      text = {unreadCount}
      break;
    default:
      text = {unreadCount}
      break;
  }

  return (
    <span className={"notificationNum" + (hasTooltip == true ? ' hasTooltip' : '') + (isGroupChannel == true ? ' channel' : '')}>{text}</span>
  )
}

function percentageCircle(pct, colour) {
  return (
    <div className="circular-chart">
      <svg viewBox="0 0 36 36" className={"circular-chart " + colour}>
        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className="circle" strokeDasharray={pct + ", 100"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <text x="18" y="20.35" className="percentage">{pct}%</text>
      </svg>
    </div>
  )
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
  <svg viewBox="0 0 16 16" className="cross">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 16 16" className="tick">
    <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
  </svg>
)

const PenIcon = () => (
  <svg viewBox="0 0 16 16" className="penIcon">
    <path d="M11.1979 2.09354L9.90646 0.802123C9.50363 0.399292 8.8503 0.399292 8.44746 0.802123L7.23253 2.01706L9.98295 4.76748L11.1979 3.55254C11.6007 3.14971 11.6007 2.49659 11.1979 2.09354ZM5.89556 1.65247C5.55997 1.31689 5.01599 1.31689 4.68041 1.65247L2.1285 4.20459C1.99422 4.33887 1.99422 4.55651 2.1285 4.69057L2.61469 5.17676C2.74897 5.31103 2.9666 5.31103 3.10088 5.17676L5.28841 2.98923L5.7746 3.4752L2.51844 6.73115C1.39059 7.85901 0.68005 9.33706 0.503642 10.9223L0.502997 10.9272C0.466474 11.2555 0.743836 11.5331 1.07212 11.4968C2.6594 11.3215 4.13963 10.6107 5.26886 9.48157L9.49676 5.25367L7.7185 3.47542L5.89556 1.65247Z" transform="translate(0 4)" />
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


function sortTable(n, sortType, tableId, callback) {

  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableId);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (sortType == 'byStatus') {
          // grab last letter of classname which is H/M/L priority
          const xStatus = x.getElementsByClassName("userToMatch-changeStatus")[0].className
          const yStatus = y.getElementsByClassName("userToMatch-changeStatus")[0].className
          const xPriority = xStatus.substr(xStatus.length - 1)
          const yPriority = yStatus.substr(yStatus.length - 1)

          if ((xPriority == 'H' && (yPriority == 'M' || yPriority == 'L')) || (xPriority == 'M' && yPriority == 'L')) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }

        } else if (sortType == "alphabetically"){
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'date') {
          // convert to Date format and compare
          const xString = x.getElementsByTagName("i")[0].innerHTML
          const yString = y.getElementsByTagName("i")[0].innerHTML
          const xDate = new Date(xString)
          const yDate = new Date(yString)

          if (xDate > yDate) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'role') {
          // grab last letter of classname which is H/M/L priority
          const xRole = x.getElementsByClassName("rolebadge")[0].innerHTML
          const yRole = y.getElementsByClassName("rolebadge")[0].innerHTML

          if (xRole == 'mentee' && yRole == 'mentor') {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'byIcon') {
          // grab last letter of classname which is H/M/L priority
          const xTick = x.getElementsByClassName("tick")[0]
          const yTick = y.getElementsByClassName("tick")[0]
          const xCross = x.getElementsByClassName("cross")[0]
          const yCross = y.getElementsByClassName("cross")[0]
          const xTimeout = x.getElementsByClassName("timeout")[0]
          const yTimeout = y.getElementsByClassName("timeout")[0]

          if ((yTick && (xCross || xTimeout || ((xCross == undefined && xTimeout == undefined && xTick == undefined)))) || (yTimeout && (xCross || (xTimeout == undefined && xTick == undefined))) || (yCross && (xCross == undefined && xTimeout == undefined && xTick == undefined))) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'checked') {
          // grab last letter of classname which is H/M/L priority

          const xCheck = x.getElementsByClassName("checkbox")[0]
          const yCheck = y.getElementsByClassName("checkbox")[0]

          if (yCheck.checked && !xCheck.checked) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        // by date
      //  .sort(function(a, b){
      // var dateA=new Date(a.retiredate), dateB=new Date(b.retiredate)
      // return dateA-dateB //sort by date ascending
      // })
      } else if (dir == "desc") {
        if (sortType == 'byStatus') {
          // grab last letter of classname which is H/M/L priority
          const xStatus = x.getElementsByClassName("userToMatch-changeStatus")[0].className
          const yStatus = y.getElementsByClassName("userToMatch-changeStatus")[0].className
          const xPriority = xStatus.substr(xStatus.length - 1)
          const yPriority = yStatus.substr(yStatus.length - 1)

          if ((xPriority == 'L' && (yPriority == 'M' || yPriority == 'H')) || (xPriority == 'M' && yPriority == 'H')) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'alphabetically'){
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'date') {
          // convert to Date format and compare
          const xString = x.getElementsByTagName("i")[0].innerHTML
          const yString = y.getElementsByTagName("i")[0].innerHTML
          const xDate = new Date(xString)
          const yDate = new Date(yString)

          if (xDate < yDate) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'role') {
          // grab last letter of classname which is H/M/L priority
          const xRole = x.getElementsByClassName("rolebadge")[0].innerHTML
          const yRole = y.getElementsByClassName("rolebadge")[0].innerHTML

          if (xRole == 'mentor' && yRole == 'mentee') {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'byIcon') {
          // grab last letter of classname which is H/M/L priority
          const xTick = x.getElementsByClassName("tick")[0]
          const yTick = y.getElementsByClassName("tick")[0]
          const xCross = x.getElementsByClassName("cross")[0]
          const yCross = y.getElementsByClassName("cross")[0]
          const xTimeout = x.getElementsByClassName("timeout")[0]
          const yTimeout = y.getElementsByClassName("timeout")[0]

          if (((yCross == undefined && yTimeout == undefined && yTick == undefined) && xCross) || (xTimeout && (yCross || (yTimeout == undefined && yTick == undefined))) || (xTick && (yCross || yTimeout || ((yCross == undefined && yTimeout == undefined && yTick == undefined))))) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (sortType == 'checked') {
          // grab last letter of classname which is H/M/L priority
          const xCheck = x.getElementsByClassName("checkbox")[0]
          const yCheck = y.getElementsByClassName("checkbox")[0]

          if (!yCheck.checked && xCheck.checked) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  if (callback) {
    callback()
  }
}

export {removeHash, isIE, isEdge, isURL, escapeHTML, metaAdder, getIcon, getUnreadIndicator, showNotifFavicon, hideNotifFavicon, getChannelAbout, whichBrowser, checkMobile, checkDevice, DateCalc, TimeCalc, percentageCircle, ChevronDown, ChevronUp, X, Check, PenIcon, LoadingSpinner, sortTable, monthDiff};
