var menteebtn = document.getElementById("mentee-btn");
var mentorbtn = document.getElementById("mentor-btn");
var menteeForm = document.getElementById("menteeForm");
var mentorForm = document.getElementById("mentorForm");

var email = document.getElementById("email");
var pwd = document.getElementById("password");

var emailPrompt = document.getElementById("emailPrompt");
var numReqCrl = document.getElementById("numReq-crl");
var upCharReqCrl = document.getElementById("upCharReq-crl");
var specCharReqCrl = document.getElementById("specCharReq-crl");
var numCharReqCrl = document.getElementById("numCharReq-crl");
var numReq = document.getElementById("numReq");
var upCharReq = document.getElementById("upCharReq");
var specCharReq = document.getElementById("specCharReq");
var numCharReq = document.getElementById("numCharReq");

// hide on intiial page load
mentorForm.style.display = 'none';
menteeForm.style.display = 'none';
emailPrompt.style.visibility = 'hidden';

numReqCrl.style.color = 'transparent';
upCharReqCrl.style.color = 'transparent';
specCharReqCrl.style.color = 'transparent';
numCharReqCrl.style.color = 'transparent';

numReqCrl.style.textShadow = '0 0 0 #a3a3a3';
upCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
specCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
numCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';

numReq.style.color = '#a3a3a3';
upCharReq.style.color = '#a3a3a3';
specCharReq.style.color = '#a3a3a3';
numCharReq.style.color = '#a3a3a3';

// add event listeners
menteebtn.addEventListener('click', function(event) {
  menteebtn.style.backgroundColor = '#6fc3b3';
  menteebtn.style.color = '#fff';
  mentorbtn.style.backgroundColor = '#fff';
  mentorbtn.style.color = '#3baf99';
  menteeForm.style.display = 'block';
  mentorForm.style.display = 'none';
});

mentorbtn.addEventListener('click', function(event) {
  mentorbtn.style.backgroundColor = '#6fc3b3';
  mentorbtn.style.color = '#fff';
  menteebtn.style.backgroundColor = '#fff';
  menteebtn.style.color = '#3baf99';
  mentorForm.style.display = 'block';
  menteeForm.style.display = 'none';
});

email.addEventListener('focus', function(event) {
  emailPrompt.style.visibility = 'visible';
},true);

email.addEventListener('blur', function(event) {
  emailPrompt.style.visibility = 'hidden';
});

pwd.addEventListener('input', function(event) {
  if( this.value.length > 7 ){
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    numCharReq.style.color = '#595959';
  }else{
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    numCharReq.style.color = '#a3a3a3';
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/\d/) == -1){
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    numReq.style.color = '#a3a3a3';
  }else{
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    numReq.style.color = '#595959';
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[A-Z]/) == -1){
    upCharReqCrl.style.color = 'transparent';
    upCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    upCharReq.style.color = '#a3a3a3';
  }else{
    upCharReqCrl.style.color = 'transparent';
    upCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    upCharReq.style.color = '#595959';
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[!@#$%^&*()_+]/) != -1){
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    specCharReq.style.color = '#595959';
  }else{
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    specCharReq.style.color = '#a3a3a3';
  }
});
