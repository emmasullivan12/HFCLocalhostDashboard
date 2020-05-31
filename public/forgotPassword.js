/* Dex last merged this code on 16th May 2019 */

var email = document.getElementById("email");
var forgotpwdbtn = document.getElementById("forgotpwd-btn");
var form = document.getElementById("form-forgotpwd");
const isValidEmail = email.checkValidity();

// Disable the button on initial page load
forgotpwdbtn.disabled = true;
console.log("Hello")
console.log("form.checkValidity: "+form.checkValidity())
//console.log(checkEmail())

email.addEventListener('invalid', function(event) {
  email.classList.add('error');
}, false);

// add event listener
email.addEventListener('input', function(event) {
  console.log("form.checkValidity: "+form.checkValidity())
//  console.log(checkEmail())
  if(isValidEmail){
    forgotpwdbtn.disabled = false;
  }else{
    forgotpwdbtn.disabled = true;
  }
});

/*function checkEmail() {
  if (
    email.includes(".") &&
    email.includes("@") &&
    email.indexOf("@") != 0 &&
    /^[a-zA-Z()]+$/.test(email.charAt(email.indexOf("@") + 1)) != false &&
    /^[a-zA-Z()]+$/.test(email.charAt(email.length - 1)) != false &&
    email.checkValidity()
  ) {
    return true
  } else {
    return false
  }
}*/
