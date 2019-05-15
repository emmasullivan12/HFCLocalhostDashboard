var formControlStd = document.getElementsByClassName("form-control-std");

var tncCheckbox = document.getElementById("tncCheckbox");
var tncStyle = document.getElementById("tncStyle");
var tncText = document.getElementById("tncText");

var menteebtn = document.getElementById("mentee-btn");
var mentorbtn = document.getElementById("mentor-btn");

var names = document.getElementById("names");
var workEmail = document.getElementById("workEmail");
var schEmail = document.getElementById("schEmail");
var pwdContainer = document.getElementById("pwdContainer");
var submitbtn = document.getElementById("submit-btn");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var wEmail = document.getElementById("wEmail");
var sEmail = document.getElementById("sEmail");
var pwd = document.getElementById("password");

var wEmailPrompt = document.getElementById("wEmailPrompt");
var sEmailPrompt = document.getElementById("sEmailPrompt");
var numReqCrl = document.getElementById("numReq-crl");
var upCharReqCrl = document.getElementById("upCharReq-crl");
var specCharReqCrl = document.getElementById("specCharReq-crl");
var numCharReqCrl = document.getElementById("numCharReq-crl");
var numReq = document.getElementById("numReq");
var upCharReq = document.getElementById("upCharReq");
var specCharReq = document.getElementById("specCharReq");
var numCharReq = document.getElementById("numCharReq");

// hide on intiial page load
names.style.display = 'none';
workEmail.style.display = 'none';
schEmail.style.display = 'none';
pwdContainer.style.display = 'none';
tncText.style.display = 'none';
submitbtn.style.display = 'none';
wEmailPrompt.style.visibility = 'hidden';
sEmailPrompt.style.visibility = 'hidden';

numReqCrl.style.color = 'transparent';
upCharReqCrl.style.color = 'transparent';
specCharReqCrl.style.color = 'transparent';
numCharReqCrl.style.color = 'transparent';

numReqCrl.style.textShadow = '0 0 0 #cbcaca';
upCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
specCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
numCharReqCrl.style.textShadow = '0 0 0 #cbcaca';

numReq.style.color = '#cbcaca';
upCharReq.style.color = '#cbcaca';
specCharReq.style.color = '#cbcaca';
numCharReq.style.color = '#cbcaca';

// add event listeners
menteebtn.addEventListener('click', function(event) {
  menteebtn.style.backgroundColor = '#6fc3b3';
  menteebtn.style.color = '#fff';
  mentorbtn.style.backgroundColor = '#fff';
  mentorbtn.style.color = '#3baf99';
  names.style.display = 'flex';
  workEmail.style.display = 'none';
  schEmail.style.display = 'block';
  wEmail.required = false;
  sEmail.required = true;
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  submitbtn.style.display = 'block';
  fname.focus();
  for(let input of formControlStd) {
    input.classList.remove('error');
  }
});

mentorbtn.addEventListener('click', function(event) {
  mentorbtn.style.backgroundColor = '#6fc3b3';
  mentorbtn.style.color = '#fff';
  menteebtn.style.backgroundColor = '#fff';
  menteebtn.style.color = '#3baf99';
  names.style.display = 'flex';
  workEmail.style.display = 'block';
  wEmail.required = true;
  sEmail.required = false;
  schEmail.style.display = 'none';
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  submitbtn.style.display = 'block';
  fname.focus();
  for(let input of formControlStd) {
    input.classList.remove('error');
  }
});

wEmail.addEventListener('focus', function(event) {
  wEmailPrompt.style.visibility = 'visible';
},true);

wEmail.addEventListener('blur', function(event) {
  wEmailPrompt.style.visibility = 'hidden';
});

sEmail.addEventListener('focus', function(event) {
  sEmailPrompt.style.visibility = 'visible';
},true);

sEmail.addEventListener('blur', function(event) {
  sEmailPrompt.style.visibility = 'hidden';
});


// check validity of inputs when submit & onBlur i.e. after clicing away
for(let input of formControlStd) {
  input.addEventListener('invalid', function(event) {
    input.classList.add('error');
  }, false);

  // Check validity onblur (i.e. click away)
  input.addEventListener('blur', function(event) {
    if(input.checkValidity()) {
      input.classList.remove('error');
    }
 });
/*
  input.addEventListener('change', function(event) {
   if(input.checkValidity()) {
    input.classList.remove('error');
   }
 })*/
}

pwd.addEventListener('invalid', function(event) {
  pwd.classList.add('error');
}, false);

tncCheckbox.addEventListener('invalid', function(event) {
  tncText.classList.add('error');
  tncStyle.classList.add('error');
}, false);

tncCheckbox.addEventListener('change', function(event) {
  if(tncCheckbox.checkValidity()) {
    tncText.classList.remove('error');
    tncStyle.classList.remove('error');
 }
})

// Check validity onblur (i.e. click away)
pwd.addEventListener('blur', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && this.value.search(/[!@#$%^&*()_+]/) != -1) {
   pwd.classList.remove('error');
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
  if( this.value.search(/[!@#$%^&*()_+]/) != -1){
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
