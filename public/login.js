var password = document.getElementById("password");
var loginbtn = document.getElementById("login-btn");

// Disable the button on initial page load
loginbtn.disabled = true;

// add event listener
password.addEventListener('input', function(event) {
  if( this.value.length > 0 ){
    loginbtn.disabled = false;
  }else{
    loginbtn.disabled = true;
  }
});
