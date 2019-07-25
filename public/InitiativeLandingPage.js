/* Dex last merged this code on 19th May 2019*/

var pwdByNav = document.getElementById("pwdByNav");

window.onscroll = function () {
    if (window.pageYOffset >= 450 ) {
      pwdByNav.classList.add("is-fixed");
    }
    else {
      pwdByNav.classList.remove("is-fixed");
    }
};
