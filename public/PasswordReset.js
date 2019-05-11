var resetcode = document.getElementById("resetcode");
var newPwd = document.getElementById("newPwd");
var resetPwdBtn = document.getElementById("resetpwd-btn");
var newPwdText = document.getElementById("newPwdText");

// Disable on initial page load
newPwd.disabled = true;
resetPwdBtn.disabled = true;
newPwdText.style.color = '#cfcccc';

// add event listener
resetcode.addEventListener('input', function(event) {
  if( this.value.length < 6 ){
    newPwd.disabled = true;
    newPwdText.style.color = '#cfcccc';
  }else{
    newPwd.disabled = false;
    newPwdText.style.color = '#595959';
  }
});

newPwd.addEventListener('input', function(event) {
  if( this.value.length < 8 ){
    resetPwdBtn.disabled = true;
  }else{
    resetPwdBtn.disabled = false;
  }
});
