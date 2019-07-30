/* Dex last merged this code on 19th May 2019*/

var pwdByNav = document.getElementById("pwdByNav");
var menteeClick = document.getElementById("mentee-click");
var mentorClick = document.getElementById("mentor-click");
var menteeBtn = document.getElementById("mentee-btn");
var mentorBtn = document.getElementById("mentor-btn");
var menteeInfo = document.getElementById("mentee-info");
var mentorInfo = document.getElementById("mentor-info");
var stepsTitle = document.getElementById("stepsTitle");
var menteeStepsList = document.getElementById("menteeStepsList");
var mentorStepsList = document.getElementById("mentorStepsList");
var mentorQuotes = document.getElementById("mentorQuotes");
var menteeQuotes = document.getElementById("menteeQuotes");

var tncText = document.getElementById("tncText");
var tncStyle = document.getElementById("tncStyle");
var tncCheckbox = document.getElementById("tncCheckbox");
var tncTextFooter = document.getElementById("tncTextFooter");
var tncStyleFooter = document.getElementById("tncStyleFooter");
var tncCheckboxFooter = document.getElementById("tncCheckboxFooter");

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
  mentorStepsList.classList.remove("active");
  mentorQuotes.classList.remove("active");
  menteeQuotes.classList.add("active");
  menteeStepsList.classList.add("active");
  menteeInfo.classList.add("active");
  menteeBtn.classList.add("active");
  stepsTitle.innerHTML = 'Steps to joining as a Mentee';
});
mentorClick.addEventListener('click', function(event) {
  menteeInfo.classList.remove("active");
  menteeBtn.classList.remove("active");
  menteeStepsList.classList.remove("active");
  menteeQuotes.classList.remove("active");
  mentorQuotes.classList.add("active");
  mentorStepsList.classList.add("active");
  mentorInfo.classList.add("active");
  mentorBtn.classList.add("active");
  stepsTitle.innerHTML = 'Steps to joining as an E-Mentor';
});

tncCheckbox.addEventListener('invalid', function(event) {
  tncText.classList.add('error');
  tncStyle.classList.add('error');
}, false);

tncCheckbox.addEventListener('change', function(event) {
  if(tncCheckbox.checkValidity()) {
    tncText.classList.remove('error');
    tncStyle.classList.remove('error');
 }
})

tncCheckboxFooter.addEventListener('invalid', function(event) {
  tncTextFooter.classList.add('error');
  tncStyleFooter.classList.add('error');
}, false);

tncCheckboxFooter.addEventListener('change', function(event) {
  if(tncCheckboxFooter.checkValidity()) {
    tncTextFooter.classList.remove('error');
    tncStyleFooter.classList.remove('error');
 }
})
