var email = document.getElementById("email");
var forgotpwdbtn = document.getElementById("forgotpwd-btn");

// Disable the button on initial page load
forgotpwdbtn.disabled = true;

// add event listener
email.addEventListener('input', function(event) {
  if( this.value.length > 0 ){
    forgotpwdbtn.disabled = false;
  }else{
    forgotpwdbtn.disabled = true;
  }
});
