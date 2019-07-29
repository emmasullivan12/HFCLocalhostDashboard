/* Dex last merged this code on 19th May 2019*/

var pwdByNav = document.getElementById("pwdByNav");
var menteeClick = document.getElementById("mentee-click");
var mentorClick = document.getElementById("mentor-click");
var menteeBtn = document.getElementById("mentee-btn");
var mentorBtn = document.getElementById("mentor-btn");
var menteeInfo = document.getElementById("mentee-info");
var mentorInfo = document.getElementById("mentor-info");

window.onscroll = function () {
    if (window.pageYOffset >= 450 ) {
      pwdByNav.classList.add("is-fixed");
    }
    else {
      pwdByNav.classList.remove("is-fixed");
    }
};

// Add event listenres
menteeClick.addEventListener('click', function(event) {
  mentorInfo.classList.remove("active");
  mentorBtn.classList.remove("active");
  menteeInfo.classList.add("active");
  menteeBtn.classList.add("active");
});
mentorClick.addEventListener('click', function(event) {
  menteeInfo.classList.remove("active");
  menteeBtn.classList.remove("active");
  mentorInfo.classList.add("active");
  mentorBtn.classList.add("active");
});
