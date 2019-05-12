var formControlStd = document.getElementsByClassName("form-control-std");

var tncCheckbox = document.getElementById("tncCheckbox");
var tncStyle = document.getElementById("tncStyle");
var tncText = document.getElementById("tncText");

var menteebtn = document.getElementById("mentee-btn");
var mentorbtn = document.getElementById("mentor-btn");
var menteeForm = document.getElementById("menteeForm");
var mentorForm = document.getElementById("mentorForm");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
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
  })
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
    numCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    numCharReq.style.color = '#a3a3a3';
    pwd.classList.add('error');
  }
});

pwd.addEventListener('input', function(event) {
  if( this.value.search(/\d/) == -1){
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    numReq.style.color = '#a3a3a3';
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
    upCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    upCharReq.style.color = '#a3a3a3';
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
    specCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    specCharReq.style.color = '#a3a3a3';
    pwd.classList.add('error');
  }
});
