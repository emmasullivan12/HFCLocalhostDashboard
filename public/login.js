var password = document.getElementById("password");
var email = document.getElementById("email");
var loginbtn = document.getElementById("login-btn");
var formControl = document.getElementsByClassName("form-control-std");

// Disable the button on initial page load
loginbtn.disabled = true;

// add event listener
/*password.addEventListener('input', function(event) {
  if( this.value.length > 0 ){
    loginbtn.disabled = false;
  }else{
    loginbtn.disabled = true;
  }
});*/

// check validity of inputs when submit & onBlur i.e. after clicing away
for(let input of formControl) {
  input.addEventListener('invalid', function(event) {
    input.classList.add('error');
  }, false);

  input.addEventListener('input', function(event) {
    if( email.value.length > 0 && password.value.length > 0){
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
