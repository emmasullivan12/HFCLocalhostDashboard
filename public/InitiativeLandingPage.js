/* Dex last merged this code on 15th Nov 2019*/

var cookiesBanner = document.getElementById("cookies-banner");
var cookiesYes = document.getElementById("cookies-yes");
var pwdByLogo = document.getElementById("prLogoImg-switch");
var pwdByLogoContainer = document.getElementById("pwdByContainer");
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

window.addEventListener("hashchange", function () {
    window.scrollTo({
      top: window.scrollY - 80,
      left: window.scrollX,
      behavior: 'smooth'
    });
});

window.onscroll = function () {
    if (window.pageYOffset >= 450 ) {
      pwdByNav.classList.add("is-fixed");
      if(pwdByLogo != null) {
        pwdByLogo.src = 'https://prospela.com/wp-content/uploads/2019/07/Powered-by-Prospela-Vertical_Logo_White.png';
        pwdByLogoContainer.style.cssText += ';height:50px !important;';
      }
    }
    else {
      pwdByNav.classList.remove("is-fixed");
      if(pwdByLogo != null) {
        pwdByLogo.src = 'https://prospela.com/wp-content/uploads/2019/11/Powered-by-Prospela-Vertical_Logo_Purple.png';
        pwdByLogoContainer.style.cssText += ';height:38px !important;';
      }
    }
};

// Add event listenres
cookiesYes.addEventListener('click', function(event) {
  cookiesBanner.style.display = 'none';
});

if(menteeClick != null) {
  menteeClick.addEventListener('click', function(event) {
    if(mentorClick != null) {
      mentorInfo.classList.remove("active");
      mentorBtn.classList.remove("active");
      mentorStepsList.classList.remove("active");
      mentorQuotes.classList.remove("active");
    }
    menteeQuotes.classList.add("active");
    menteeStepsList.classList.add("active");
    menteeInfo.classList.add("active");
    menteeBtn.classList.add("active");
    stepsTitle.innerHTML = 'Steps to joining as a Mentee';
  });
}
if(mentorClick != null) {
  mentorClick.addEventListener('click', function(event) {
    if(menteeClick != null) {
      menteeInfo.classList.remove("active");
      menteeBtn.classList.remove("active");
      menteeStepsList.classList.remove("active");
      menteeQuotes.classList.remove("active");
    }
    mentorQuotes.classList.add("active");
    mentorStepsList.classList.add("active");
    mentorInfo.classList.add("active");
    mentorBtn.classList.add("active");
    stepsTitle.innerHTML = 'Steps to joining as an E-Mentor';
  });
}
/*tncCheckbox.addEventListener('invalid', function(event) {
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
})*/
