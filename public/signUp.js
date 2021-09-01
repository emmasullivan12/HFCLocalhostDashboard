/* merged this code on 31st aug 2021 */
//import { personalEmails } from './PersonalEmails.js';

var formControlStd = document.getElementsByClassName("form-control-std");

var progLogoContainer = document.getElementById("progLogoContainer");
var progInviteLogo = document.getElementById("progInvite-logo");

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
var getStartedbtnText = document.getElementById("getStarted-btnText");
var spinnerWrapper = document.getElementById("spinnerWrapper-signUp");

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

progLogoContainer.style.display = 'none';

// Check for source in URL
const string = window.location.href;
var isSource = string.includes("source")
let getSource
let getProgName
let source
let query

if(isSource) {
  query = string.split("?source=")
  getSource = query[1]
//  source = encodeURIComponent(getSource);
  var progLogoURL = 'https://files-and-media.ams3.digitaloceanspaces.com/progImages/' + getSource + '.png'
  progLogoContainer.style.display = 'block';
  progInviteLogo.src = progLogoURL
}

// hide on intiial page load
names.style.display = 'none';
emailContainer.style.display = 'none';
// codeInput.style.display = 'none';
dob.style.display = 'none';
pwdContainer.style.display = 'none';
tncText.style.display = 'none';
getStartedbtn.style.display = 'none';
spinnerWrapper.style.display = 'none';
emailPrompt.style.visibility = 'hidden';
emailConfiPrompt.style.visibility = 'hidden';
emailConfiContainer.style.display = 'none';
dobPrompt.style.visibility = 'hidden';

menteeradio.checked = false;
mentorradio.checked = false;

var dobIsValid = false;
var pwdIsValid = false;
let personalEmails;
let userType;

// add event listeners
menteebtn.addEventListener('click', function(event) {
  userType = 'mentee';
  fname.value = '';
  lname.value = '';
  email.value = '';
  emailConfi.required = true;
  dDOB.value = '';
  mDOB.value = '';
  yDOB.value = '';
  dobPrompt.style.visibility = 'hidden';
  pwd.value = '';
  tncCheckbox.checked = false;

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

  menteebtn.style.backgroundColor = '#58d2bb';
  menteebtn.style.color = '#fff';
  mentorbtn.style.backgroundColor = '#fff';
  mentorbtn.style.color = '#15b395';
  menteeradio.checked = true;
  mentorradio.checked = false;
  names.style.display = 'flex';
  emailContainer.style.display = 'block';
  dob.style.display = 'block';
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  getStartedbtn.style.display = 'block';
  getStartedbtnText.innerHTML = 'Get Started as a Mentee';
  getStartedbtn.disabled = true;
  workEmailTooltip.style.display = 'none';
  emailText.innerHTML = 'Personal Email';
//  codeTooltip.style.display = 'block';
//  emailPrompt.innerHTML = 'You\'ll need to verify your school or university email address';
  emailPrompt.innerHTML = '';
  fname.focus();
  for(let input of formControlStd) {
    input.classList.remove('error');
  }
  pwd.classList.remove('error');
  dDOB.classList.remove('error');
  mDOB.classList.remove('error');
  yDOB.classList.remove('error');
  tncText.classList.remove('error');
  tncStyle.classList.remove('error');
});

mentorbtn.addEventListener('click', function(event) {
  userType = 'mentor';
  fname.value = '';
  lname.value = '';
  email.value = '';
  emailConfi.value = '';
  emailConfi.required = false;
  emailConfiPrompt.style.visibility = 'hidden';
  dDOB.value = '';
  mDOB.value = '';
  yDOB.value = '';
  dobPrompt.style.visibility = 'hidden';
  pwd.value = '';
  tncCheckbox.checked = false;

/*
  import(`./PersonalEmails.js`)
    .then(component => {
      personalEmails = component.default
    })
    .catch(err => {
      email.value != '' ? emailPrompt.style.visibility = 'visible' : '';
    })
*/
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

  mentorbtn.style.backgroundColor = '#58d2bb';
  mentorbtn.style.color = '#fff';
  menteebtn.style.backgroundColor = '#fff';
  menteebtn.style.color = '#15b395';
  menteeradio.checked = false;
  mentorradio.checked = true;
  names.style.display = 'flex';
  emailContainer.style.display = 'block';
  emailConfiContainer.style.display = 'none';
  dob.style.display = 'block';
  pwdContainer.style.display = 'block';
  tncText.style.display = 'block';
  getStartedbtn.style.display = 'block';
  getStartedbtnText.innerHTML = 'Get Started as an E-Mentor';
  getStartedbtn.disabled = true;
  workEmailTooltip.style.display = 'block';
  emailText.innerHTML = 'Work (or Education) Email';
//  codeInput.style.display = 'none';
//  codeTooltip.style.display = 'none';
  emailPrompt.innerHTML = 'This must be your work (or Education) email address';
  fname.focus();
  for(let input of formControlStd) {
    input.classList.remove('error');
  }
  pwd.classList.remove('error');
  dDOB.classList.remove('error');
  mDOB.classList.remove('error');
  yDOB.classList.remove('error');
  tncText.classList.remove('error');
  tncStyle.classList.remove('error');
});

function canBeSubmitted() {
  if (fname.value != '' && lname.value != '' && email.checkValidity() && dobIsValid === true && pwdIsValid === true && tncCheckbox.checked === true) {
    if (menteeradio.checked === true) {
      if (email.value === emailConfi.value) {
        getStartedbtn.disabled = false;
      } else {
        getStartedbtn.disabled = true;
      }
    } else {
      getStartedbtn.disabled = false;
    }
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

email.addEventListener('focus', function(event) {
  if (emailText.innerHTML === 'Work (or Education) Email') {
    emailPrompt.style.visibility = 'visible';
  } else {
    emailPrompt.style.visibility = 'hidden';
  }
},true);

email.addEventListener('keyup', function(e) {
  console.log("keyup")
  clearTimeout(this.timerHandle);

  this.timerHandle = setTimeout(() => {
    emailCheck(e)
    this.timerHandle = 0;
  }, 800);
})

function emailCheck(e) {
  console.log(e)
  if (email.checkValidity()) {
    if (emailText.innerHTML === 'Personal Email' && e.target.value.length > 0) {
      email.classList.remove('error');
      emailConfiContainer.style.display = 'block';
      if (email.value != emailConfi.value) {
        emailConfi.value != '' ? emailConfiPrompt.style.visibility = 'visible' : '';
        emailConfi.value != '' ? emailConfi.classList.add('error') : '';
      } else {
        emailConfiPrompt.style.visibility = 'hidden';
        emailConfi.value != '' ? emailConfi.classList.remove('error') : '';
      }
    } else if (emailText.innerHTML === 'Work (or Education) Email') {
      var emailSplit = email.value.split('@')
      var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();
      var personalEmails = ['gmail.com', 'hotmail.com']
      if (personalEmails.includes(freeEmail)) {
        emailPrompt.classList.add('error')
        email.classList.add('error');
      } else {
        emailPrompt.classList.remove('error')
        email.classList.remove('error');
      }
      emailConfi.value != '' ? emailConfi.classList.remove('error') : '';
      emailConfiContainer.style.display = 'none';

    } else {
      emailConfi.value != '' ? emailConfi.classList.remove('error') : '';
      emailConfiContainer.style.display = 'none';
    }
  } else {
    email.classList.add('error');
  }
}

email.addEventListener('blur', function(e) {
  if (email.checkValidity()) {
    //email.classList.remove('error');
    if (emailText.innerHTML === 'Personal Email') {
      email.classList.remove('error');
      emailPrompt.style.visibility = 'hidden';
      if (email.value != emailConfi.value) {
        emailConfi.value != '' ? emailConfiPrompt.style.visibility = 'visible' : '';
        emailConfi.value != '' ? emailConfi.classList.add('error') : '';
      } else {
        emailConfiPrompt.style.visibility = 'hidden';
        emailConfi.value != '' ? emailConfi.classList.remove('error') : '';
      }
    } else if (emailText.innerHTML === 'Work (or Education) Email') {
      var emailSplit = email.value.split('@')
      var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();
      var personalEmails = ['gmail.com', 'hotmail.com']
      if (personalEmails.includes(freeEmail)) {
        emailPrompt.classList.add('error')
        email.classList.add('error');
        emailPrompt.style.visibility = 'visible';
      } else {
        emailPrompt.classList.remove('error')
        email.classList.remove('error');
        emailPrompt.style.visibility = 'hidden';
      }
    }
  } else {
    email.classList.add('error');
    if (email.value === '') {
      emailPrompt.style.visibility = 'hidden';
    }
  }
});

emailConfi.addEventListener('blur', function(event) {
  if (email.value != emailConfi.value) {
    emailConfiPrompt.style.visibility = 'visible';
    emailConfi.classList.add('error');
  } else {
    emailConfiPrompt.style.visibility = 'hidden';
    emailConfi.classList.remove('error');
  }
});

emailConfi.addEventListener('input', function(event) {
  if (email.value != emailConfi.value) {
    emailConfiPrompt.style.visibility = 'visible';
    emailConfi.classList.add('error');
  } else {
    emailConfiPrompt.style.visibility = 'hidden';
    emailConfi.classList.remove('error');
  }
});

// check validity of inputs when submit & onBlur i.e. after clicing away
for(let input of formControlStd) {

  input.addEventListener('input', function(e) {
    if(input.checkValidity()) {
      if(e.target.id != 'email' && e.target.id != 'emailConfi') {
        input.classList.remove('error');
      }
    }
    canBeSubmitted()
  });

  // Check validity onblur (i.e. click away)
  input.addEventListener('blur', function(e) {
    if(input.checkValidity()) {
      if(e.target.id != 'email' && e.target.id != 'emailConfi') {
        input.classList.remove('error');
      }
    }
    canBeSubmitted()
  });
}

dDOB.addEventListener('invalid', function(event) {
  dDOB.classList.add('error');
  dobIsValid = false
}, false);

mDOB.addEventListener('invalid', function(event) {
  mDOB.classList.add('error');
  dobIsValid = false
}, false);

yDOB.addEventListener('invalid', function(event) {
  yDOB.classList.add('error');
  dobIsValid = false
}, false);

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

function checkDOB() {
  if(dDOB.checkValidity() && validateDay()) {
   dDOB.classList.remove('error');
  } else {
    dobIsValid = false
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
     dobIsValid = true
     dDOB.classList.remove('error');
     mDOB.classList.remove('error');
     yDOB.classList.remove('error');
     dobPrompt.style.visibility = 'hidden';
   } else {
     dobIsValid = false
     dDOB.classList.add('error');
     mDOB.classList.add('error');
     yDOB.classList.add('error');
     dobPrompt.innerHTML = userType === 'mentee' ? 'You must be 13 or older to use Prospela' : 'You must be 18 or older to mentor with Prospela'
     dobPrompt.style.visibility = 'visible';
   }
  } else {
    dobIsValid = false
  //  dDOB.classList.add('error');
 }
 canBeSubmitted()
}

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
  var ageToCheck = userType === 'mentee' ? 13 : 18;
  /*var birthDate = new Date().setFullYear(y,m,d);*/

  var age = today.getFullYear() - birthDate.getFullYear();
  var mth = today.getMonth() - birthDate.getMonth();

  if (mth < 0 || (mth === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < ageToCheck) {
    return false;
  }
  return true;
}

dDOB.addEventListener('blur', function(event) {
  checkDOB()
})

mDOB.addEventListener('blur', function(event) {
  checkDOB()
})

yDOB.addEventListener('blur', function(event) {
  checkDOB()
})

dDOB.addEventListener('input', function(event) {
  checkDOB()
})

mDOB.addEventListener('input', function(event) {
  checkDOB()
})

yDOB.addEventListener('input', function(event) {
  checkDOB()
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
    numCharReqCrl.style.textShadow = '0 0 0 #7e7ec9';
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
    pwdIsValid = false
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
    pwdIsValid = false
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
    pwdIsValid = false
  }
});
