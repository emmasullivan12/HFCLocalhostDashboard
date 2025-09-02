/* merged this code on 31st dec 2021 */

var formControlStd = document.getElementsByClassName("form-control-std");

var progLogoContainer = document.getElementById("progLogoContainer");
var progInviteLogo = document.getElementById("progInvite-logo");

var tncCheckbox = document.getElementById("tncCheckbox");
var tncStyle = document.getElementById("tncStyle");
var tncText = document.getElementById("tncText");

var names = document.getElementById("names");
var emailContainer = document.getElementById("emailContainer");
var pwdContainer = document.getElementById("pwdContainer");
var getStartedbtn = document.getElementById("getStarted-btn");
var getStartedbtnText = document.getElementById("getStarted-btnText");
var spinnerWrapper = document.getElementById("spinnerWrapper-signUp");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");

var pwd = document.getElementById("password");

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

progLogoContainer.style.display = 'none';

// Check for params in URL
let params = (new URL(document.location)).searchParams;
let hasSource = params.get('source')
let hasClass = params.get('isclass')
let source
let classurl
let getProgName
let progLogoURL
let query
let isClass

if (hasSource != undefined && hasClass != true) {
  source = parseInt(params.get('source'));
  progLogoURL = 'https://files-and-media.ams3.digitaloceanspaces.com/progImages/' + source + '.png'
  progLogoContainer.style.display = 'block';
  progInviteLogo.src = progLogoURL
} else if (hasSource != undefined && hasClass == true) {
  classurl = parseInt(params.get('classurl'))
  progLogoURL = 'https://files-and-media.ams3.digitaloceanspaces.com/progImages/' + classurl + '.png'
  progLogoContainer.style.display = 'block';
  progInviteLogo.src = progLogoURL
}

names.style.display = 'flex';
emailContainer.style.display = 'block';
emailContainer.style.margin = '0 0 1.5rem';
pwdContainer.style.display = 'block';
tncText.style.display = 'block';
getStartedbtn.style.display = 'block';
numReq.style.color = '#cbcaca';
upCharReq.style.color = '#cbcaca';
lowCharReq.style.color = '#cbcaca';
specCharReq.style.color = '#cbcaca';
numCharReq.style.color = '#cbcaca';
numReqCrl.style.textShadow = '0 0 0 #cbcaca';
upCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
lowCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
specCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
numCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
numReqCrl.style.color = 'transparent';
upCharReqCrl.style.color = 'transparent';
lowCharReqCrl.style.color = 'transparent';
specCharReqCrl.style.color = 'transparent';
numCharReqCrl.style.color = 'transparent';

// hide or disable on intiial page load
spinnerWrapper.style.display = 'none';
getStartedbtn.disabled = true;

var pwdIsValid = false;
let userType;

function canBeSubmitted() {
  if (fname.value != '' && lname.value != '' && email.checkValidity() && pwdIsValid === true && tncCheckbox.checked === true) {
    getStartedbtn.disabled = false;
  } else {
    getStartedbtn.disabled = true;
  }
}

getStartedbtn.addEventListener('click', function() {
  getStartedbtn.disabled = true;
  getStartedbtnText.style.display = 'none';
  spinnerWrapper.style.display = 'inline-block';
}, false)

fname.addEventListener('invalid', function(e) {
  fname.classList.add('error');
}, false)

lname.addEventListener('invalid', function(e) {
  lname.classList.add('error');
}, false)

email.addEventListener('keyup', function(e) {
  clearTimeout(this.timerHandle);

  this.timerHandle = setTimeout(() => {
    emailCheck(e)
    this.timerHandle = 0;
  }, 800);
})

function emailCheck(e) {
  if (email.checkValidity() && e.target.value.length > 0) {
    email.classList.remove('error');
  } else {
    email.classList.add('error');
  }
}

email.addEventListener('blur', function(e) {
  if (email.checkValidity()) {
      email.classList.remove('error');
  } else {
    email.classList.add('error');
  }
});


// check validity of inputs when submit & onBlur i.e. after clicing away
for(let input of formControlStd) {

  input.addEventListener('input', function(e) {
    if(input.checkValidity()) {
      if(e.target.id != 'email') {
        input.classList.remove('error');
      }
    }
    canBeSubmitted()
  });

  // Check validity onblur (i.e. click away)
  input.addEventListener('blur', function(e) {
    if(input.checkValidity()) {
      if(e.target.id != 'email') {
        input.classList.remove('error');
      }
    }
    canBeSubmitted()
  });
}

pwd.addEventListener('invalid', function(event) {
  pwd.classList.add('error');
  pwdIsValid = false
}, false);

tncCheckbox.addEventListener('invalid', function(event) {
  tncText.classList.add('error');
  tncStyle.classList.add('error');
}, false);

tncCheckbox.addEventListener('change', function(event) {
  canBeSubmitted()
  if(tncCheckbox.checkValidity()) {
    tncText.classList.remove('error');
    tncStyle.classList.remove('error');
 }
})

pwd.addEventListener('blur', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && this.value.length <= 50 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && this.value.search(/[a-z]/) != -1 && this.value.search(/[!@#£$%^&*()_+]/) != -1) {
   pwd.classList.remove('error')
   pwdIsValid = true
   canBeSubmitted()
 } else {
   pwdIsValid = false
   canBeSubmitted()
 }
})

pwd.addEventListener('input', function(event) {
  if(pwd.checkValidity() && this.value.length > 7 && this.value.length <= 50 && this.value.search(/\d/) != -1 && this.value.search(/[A-Z]/) != -1 && this.value.search(/[a-z]/) != -1 && this.value.search(/[!@#£$%^&*()_+]/) != -1) {
   pwd.classList.remove('error');
   pwdIsValid = true
   canBeSubmitted()
 } else {
   pwdIsValid = false
   canBeSubmitted()
 }
})

pwd.addEventListener('input', function(event) {
  if( this.value.length > 7 && this.value.length <= 50){
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #e86ae9';
    numCharReq.style.color = '#595959';
    // pwd.classList.remove('error');
  }else{
    numCharReqCrl.style.color = 'transparent';
    numCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    numCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
    pwdIsValid = false
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/\d/) == -1){
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #cbcaca';
    numReq.style.color = '#cbcaca';
    pwd.classList.add('error');
    pwdIsValid = false
  }else{
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #e86ae9';
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
    pwdIsValid = false
  }else{
    upCharReqCrl.style.color = 'transparent';
    upCharReqCrl.style.textShadow = '0 0 0 #e86ae9';
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
    pwdIsValid = false
  }else{
    lowCharReqCrl.style.color = 'transparent';
    lowCharReqCrl.style.textShadow = '0 0 0 #e86ae9';
    lowCharReq.style.color = '#595959';
    //pwd.classList.remove('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/[!@#£$%^&*()_+]/) != -1){
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #e86ae9';
    specCharReq.style.color = '#595959';
    //pwd.classList.remove('error');
  }else{
    specCharReqCrl.style.color = 'transparent';
    specCharReqCrl.style.textShadow = '0 0 0 #cbcaca';
    specCharReq.style.color = '#cbcaca';
    pwd.classList.add('error');
    pwdIsValid = false
  }
});
