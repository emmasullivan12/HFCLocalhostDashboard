/* Dex last merged this code on 15th June 2020 */

var email = document.getElementById("email");
var forgotpwdbtn = document.getElementById("forgotpwd-btn");

// Disable the button on initial page load
forgotpwdbtn.disabled = true;

email.addEventListener('invalid', function(event) {
  email.classList.add('error');
}, false);

// add event listener
email.addEventListener('input', function(event) {
  if(email.checkValidity()){
    forgotpwdbtn.disabled = false;
    email.classList.remove('error');
  }else{
    forgotpwdbtn.disabled = true;
  }
});
