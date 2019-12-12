/* Dex last merged this code on 12th Dec 2019*/
var formControlStd = document.getElementsByClassName("form-control-std");

var tncCheckbox = document.getElementById("tncCheckbox");
var tncStyle = document.getElementById("tncStyle");
var tncText = document.getElementById("tncText");

var menteebtn = document.getElementById("mentee-btn");
var mentorbtn = document.getElementById("mentor-btn");
var menteeradio = document.getElementById("menteeradio");
var mentorradio = document.getElementById("mentorradio");

var names = document.getElementById("names");
var emailContainer = document.getElementById("emailContainer");
var emailConfiContainer = document.getElementById("emailConfiContainer");
var emailConfi = document.getElementById("emailConfi");
var pwdContainer = document.getElementById("pwdContainer");
var getStartedbtn = document.getElementById("getStarted-btn");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var emailText = document.getElementById("emailText");

var workEmailTooltip = document.getElementById("workEmailTooltip");
// var codeTooltip = document.getElementById("codeTooltip");
// noCodeTooltip = document.getElementById("noCodeTooltip");
// var codeInput = document.getElementById("codeInput");
// var inviteCode = document.getElementById("inviteCode");

var dob = document.getElementById("dob");
var dDOB = document.getElementById("dDOB");
var mDOB = document.getElementById("mDOB");
var yDOB = document.getElementById("yDOB");
var pwd = document.getElementById("password");

var emailPrompt = document.getElementById("emailPrompt");
var emailConfiPrompt = document.getElementById("emailConfiPrompt");
var dobPrompt = document.getElementById("dobPrompt");

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

// hide on intiial page load
names.style.display = 'none';
emailContainer.style.display = 'none';
// codeInput.style.display = 'none';
dob.style.display = 'none';
pwdContainer.style.display = 'none';
tncText.style.display = 'none';
getStartedbtn.style.display = 'none';
emailPrompt.style.visibility = 'hidden';
emailConfiPrompt.style.visibility = 'hidden';
emailConfiContainer.style.display = 'none';
dobPrompt.style.visibility = 'hidden';

menteeradio.checked = false;
mentorradio.checked = false;

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

// add event listeners
menteebtn.addEventListener('click', function(event) {
  menteebtn.style.backgroundColor = '#6fc3b3';
  menteebtn.style.color = '#fff';
  mentorbtn.style.backgroundColor = '#fff';
  mentorbtn.style.color = '#3baf99';
  menteeradio.checked = true;
  mentorradio.checked = false;
  names.style.display = 'flex';
  emailContainer.style.display = 'block';
  dob.style.display = 'block';
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  getStartedbtn.style.display = 'block';
  workEmailTooltip.style.display = 'none';
  emailText.innerHTML = 'Personal Email';
//  codeTooltip.style.display = 'block';
//  emailPrompt.innerHTML = 'You\'ll need to verify your school or university email address';
  emailPrompt.innerHTML = '';
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
  menteeradio.checked = false;
  mentorradio.checked = true;
  names.style.display = 'flex';
  emailContainer.style.display = 'block';
  emailConfiContainer.style.display = 'none';
  dob.style.display = 'block';
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  getStartedbtn.style.display = 'block';
  workEmailTooltip.style.display = 'block';
  emailText.innerHTML = 'Work Email';
//  codeInput.style.display = 'none';
//  codeTooltip.style.display = 'none';
  emailPrompt.innerHTML = 'This must be your work email address';
  fname.focus();
  for(let input of formControlStd) {
    input.classList.remove('error');
  }
});

/* codeTooltip.addEventListener('click', function(event) {
  emailText.innerHTML = 'Personal Email';
  codeTooltip.style.display = 'none';
  codeInput.style.display = 'block';
  inviteCode.focus();
  inviteCode.required = true;
});
*/

/* noCodeTooltip.addEventListener('click', function(event) {
  emailText.innerHTML = 'School or University Email';
  codeTooltip.style.display = 'block';
  codeTooltip.innerHTML = 'Don\'t have a School email?';
  codeInput.style.display = 'none';
  inviteCode.required = false;
});
*/

email.addEventListener('focus', function(event) {
  if (emailText.innerHTML === 'Personal Email') {
    emailPrompt.style.visibility = 'visible';
    emailConfiContainer.style.display = 'block';
  } else {
    emailPrompt.style.visibility = 'hidden';
  }
},true);

email.addEventListener('blur', function(event) {
  emailPrompt.style.visibility = 'hidden';
  if (email.value != emailConfi.value) {
    emailConfiPrompt.style.visibility = 'visible';
  } else {
    emailConfiPrompt.style.visibility = 'hidden';
  }
});

emailConfi.addEventListener('blur', function(event) {
  if (email.value != emailConfi.value) {
    emailConfiPrompt.style.visibility = 'visible';
  } else {
    emailConfiPrompt.style.visibility = 'hidden';
  }
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
}

dDOB.addEventListener('invalid', function(event) {
  dDOB.classList.add('error');
}, false);

mDOB.addEventListener('invalid', function(event) {
  mDOB.classList.add('error');
}, false);

yDOB.addEventListener('invalid', function(event) {
  yDOB.classList.add('error');
}, false);

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

function validateDay() {
  var d = dDOB.value;
  var m = mDOB.value;
  var y = yDOB.value;
  var gapyr = (y%4) === 0;

  if((m == 4 || m == 6 || m == 9 || m == 11) && d > 30) {
    return false;
    }
  if(m == 2 && !gapyr && d > 28) {
    return false;
  }
  if(m == 2 && gapyr && d > 29) {
    return false;
  }
  return true;
}

function checkAge() {
  var today = new Date();
  var d = dDOB.value;
  var m = mDOB.value-1;
  var y = yDOB.value;
  var birthDate = new Date(y,m,d);
  /*var birthDate = new Date().setFullYear(y,m,d);*/

  var age = today.getFullYear() - birthDate.getFullYear();
  var mth = today.getMonth() - birthDate.getMonth();

  if (mth < 0 || (mth === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 13) {
    return false;
  }
  return true;
}

dDOB.addEventListener('blur', function(event) {
  if(dDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
  }else{
    dDOB.classList.add('error');
  }
  if(yDOB.checkValidity()) {
   yDOB.classList.remove('error');
  }
  if(mDOB.checkValidity()) {
   mDOB.classList.remove('error');
  }
  if(dDOB.checkValidity() && mDOB.checkValidity() && yDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
   if(checkAge()){
     dDOB.classList.remove('error');
     mDOB.classList.remove('error');
     yDOB.classList.remove('error');
     dobPrompt.style.visibility = 'hidden';
   }else{
     dDOB.classList.add('error');
     mDOB.classList.add('error');
     yDOB.classList.add('error');
     dobPrompt.style.visibility = 'visible';
   }
  }else{
    dDOB.classList.add('error');
 }
})

mDOB.addEventListener('blur', function(event) {
  if(mDOB.checkValidity()) {
   mDOB.classList.remove('error');
  }
  if(yDOB.checkValidity()) {
   yDOB.classList.remove('error');
  }
  if(dDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
  }else{
    dDOB.classList.add('error');
  }
  if(dDOB.checkValidity() && mDOB.checkValidity() && yDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
   if(checkAge() && validateDay()){
     dDOB.classList.remove('error');
     mDOB.classList.remove('error');
     yDOB.classList.remove('error');
     dobPrompt.style.visibility = 'hidden';
   }else{
     dDOB.classList.add('error');
     mDOB.classList.add('error');
     yDOB.classList.add('error');
     dobPrompt.style.visibility = 'visible';
   }
  /*}else{
   mDOB.classList.add('error');*/
  }
})

yDOB.addEventListener('blur', function(event) {
  if(yDOB.checkValidity()) {
   yDOB.classList.remove('error');
  }
  if(mDOB.checkValidity()) {
   mDOB.classList.remove('error');
  }
  if(dDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
  }
  if(dDOB.checkValidity() && mDOB.checkValidity() && yDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
   if(checkAge()){
     dDOB.classList.remove('error');
     mDOB.classList.remove('error');
     yDOB.classList.remove('error');
     dobPrompt.style.visibility = 'hidden';
   }else{
     dDOB.classList.add('error');
     mDOB.classList.add('error');
     yDOB.classList.add('error');
     dobPrompt.style.visibility = 'visible';
   }
  /*}else{
   yDOB.classList.add('error');*/
  }
})

// Check validity onblur (i.e. click away)
/*inviteCode.addEventListener('input', function(event) {
  if(inviteCode.checkValidity()) {
    inviteCode.classList.remove('error');
  } else {
    inviteCode.classList.add('error');
  }
})
*/

pwd.addEventListener('blur', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && this.value.search(/[a-z]/) != -1 && this.value.search(/[!@#£$%^&*()_+]/) != -1) {
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
