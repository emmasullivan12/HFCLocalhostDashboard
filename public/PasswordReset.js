// Dex last merged this code on 17th May 2019

var resetcode = document.getElementById("resetcode");
var pwd = document.getElementById("password");
var resetPwdBtn = document.getElementById("resetpwd-btn");
var newPwdText = document.getElementById("newPwdText");

var numReqCrl = document.getElementById("numReq-crl");
var upCharReqCrl = document.getElementById("upCharReq-crl");
var lowCharReqCrl = document.getElementById("lowCharReq-crl");
var specCharReqCrl = document.getElementById("specCharReq-crl");
var numCharReqCrl = document.getElementById("numCharReq-crl");
var numReq = document.getElementById("numReq");
var upCharReq = document.getElementById("upCharReq");
var lowCharReq = document.getElementById("lowCharReq");
var specCharReq = document.getElementById("specCharReq");
var numCharReq = document.getElementById("numCharReq");

// Disable on initial page load
pwd.disabled = true;
resetPwdBtn.disabled = true;
newPwdText.style.color = '#cfcccc';

numReqCrl.style.color = 'transparent';
upCharReqCrl.style.color = 'transparent';
lowCharReqCrl.style.color = 'transparent';
specCharReqCrl.style.color = 'transparent';
numCharReqCrl.style.color = 'transparent';

numReqCrl.style.textShadow = '0 0 0 #cbcaca';
upCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
lowCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
specCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
numCharReqCrl.style.textShadow = '0 0 0 #cbcaca';

numReq.style.color = '#cbcaca';
upCharReq.style.color = '#cbcaca';
lowCharReq.style.color = '#cbcaca';
specCharReq.style.color = '#cbcaca';
numCharReq.style.color = '#cbcaca';

resetcode.addEventListener('blur', function(event) {
  if(pwd.checkValidity() && pwd.value.length > 7 && this.value.length > 5 && pwd.value.search(/\d/) != -1 && pwd.value.search(/[A-Z]/) != -1 && pwd.value.search(/[a-z]/) != -1 && pwd.value.search(/[!@#£$%^&*()_+]/) != -1) {
   resetcode.classList.remove('error');
   resetPwdBtn.disabled = false;
 }
})

resetcode.addEventListener('input', function(event) {
  if(pwd.checkValidity() && pwd.value.length > 7 && this.value.length > 5 && pwd.value.search(/\d/) != -1 && pwd.value.search(/[A-Z]/) != -1 && pwd.value.search(/[a-z]/) != -1 && pwd.value.search(/[!@#£$%^&*()_+]/) != -1) {
   resetcode.classList.remove('error');
   resetPwdBtn.disabled = false;
 }else{
   resetPwdBtn.disabled = true;
 }
})

resetcode.addEventListener('input', function(event) {
  if( this.value.length === 6 ){
    pwd.disabled = false;
    newPwdText.style.color = '#595959';
    pwd.focus();
  }else{
    resetcode.classList.add('error');
    pwd.disabled = true;
    newPwdText.style.color = '#cfcccc';
    resetPwdBtn.disabled = true;
  }
});

resetcode.addEventListener('invalid', function(event) {
  resetcode.classList.add('error');
}, false);

resetcode.addEventListener('blur', function(event) {
  if(resetcode.checkValidity() && this.value.length > 5) {
    resetcode.classList.remove('error');
  }
});

// Check validity onblur (i.e. click away)
pwd.addEventListener('blur', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && resetcode.value.length > 5 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && pwd.value.search(/[a-z]/) != -1 && this.value.search(/[!@#£$%^&*()_+]/) != -1) {
   pwd.classList.remove('error');
   resetPwdBtn.disabled = false;
 }
})

pwd.addEventListener('input', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && resetcode.value.length > 5 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && pwd.value.search(/[a-z]/) != -1 && this.value.search(/[!@#£$%^&*()_+]/) != -1) {
   pwd.classList.remove('error');
   resetPwdBtn.disabled = false;
 }else{
   resetPwdBtn.disabled = true;
 }
})

pwd.addEventListener('input', function(event) {
  if( this.value.length > 7 ){
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    numCharReq.style.color = '#595959';
    // pwd.classList.remove('error');
  }else{
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    numCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/\d/) == -1){
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #cbcaca';
    numReq.style.color = '#cbcaca';
    pwd.classList.add('error');
  }else{
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    numReq.style.color = '#595959';
    // pwd.classList.remove('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[A-Z]/) == -1){
    upCharReqCrl.style.color = 'transparent';
    upCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    upCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
  }else{
    upCharReqCrl.style.color = 'transparent';
    upCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    upCharReq.style.color = '#595959';
    //pwd.classList.remove('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[a-z]/) == -1){
    lowCharReqCrl.style.color = 'transparent';
    lowCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    lowCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
  }else{
    lowCharReqCrl.style.color = 'transparent';
    lowCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    lowCharReq.style.color = '#595959';
    //pwd.classList.remove('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[!@#£$%^&*()_+]/) != -1){
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    specCharReq.style.color = '#595959';
    //pwd.classList.remove('error');
  }else{
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    specCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
  }
});
