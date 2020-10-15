/* merged this code on 15th oct 2020 */

var password = document.getElementById("password");
var email = document.getElementById("email");
var loginbtn = document.getElementById("login-btn");
var loginbtnText = document.getElementById("login-btnText");
var spinnerWrapper = document.getElementById("spinnerWrapper-login");
var formControl = document.getElementsByClassName("form-control-std");
//var form = document.getElementById("form-login");

// Disable the button on initial page load
loginbtn.disabled = true;
spinnerWrapper.style.display = 'none';

// add event listener
/*password.addEventListener('input', function(event) {
  if( this.value.length > 0 ){
    loginbtn.disabled = false;
  }else{
    loginbtn.disabled = true;
  }
});*/

function emailCheck() {
 if (email.checkValidity()) {
   email.classList.remove('error');
 } else {
   email.classList.add('error');
 }
}

loginbtn.addEventListener('click', function() {
  loginbtn.disabled = true;
  loginbtnText.style.display = 'none';
  spinnerWrapper.style.display = 'inline-block';
}, false)

email.addEventListener('keyup', function(e) {
  clearTimeout(this.timerHandle);

  this.timerHandle = setTimeout(() => {
    emailCheck()
    this.timerHandle = 0;
  }, 800);
})

password.addEventListener('invalid', function(event) {
  password.classList.add('error');
}, false);

// check validity of inputs when submit & onBlur i.e. after clicing away
for(let input of formControl) {
  /*input.addEventListener('invalid', function(event) {
    input.classList.add('error');
  }, false);*/

  input.addEventListener('blur', function(event) {
    if(input.checkValidity()) {
      input.classList.remove('error');
    }
  });

 /*input.addEventListener('input', function(event) {
   if(input.checkValidity()){
     input.classList.remove('error');
   }
 });*/

 input.addEventListener('input', function(event) {
   if(email.checkValidity() && password.value.length > 0){
     loginbtn.disabled = false;
   }else{
     loginbtn.disabled = true;
   }
 });

  /* Check validity onblur (i.e. click away)
  input.addEventListener('blur', (event) => {
    input.checkValidity();
  })*/
}
