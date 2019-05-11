var menteebtn = document.getElementById("mentee-btn");
var mentorbtn = document.getElementById("mentor-btn");
var menteeForm = document.getElementById("menteeForm");
var mentorForm = document.getElementById("mentorForm");

var password = document.getElementById("password");

var numReqCrl = document.getElementById("numReq-crl");
var upCharReqCrl = document.getElementById("upCharReq-crl");
var specCharReqCrl = document.getElementById("specCharReq-crl");
var noCharReqCrl = document.getElementById("noCharReq-crl");
var numReq = document.getElementById("numReq");
var upCharReq = document.getElementById("upCharReq");
var specCharReq = document.getElementById("specCharReq");
var noCharReq = document.getElementById("noCharReq");

// hide on intiial page load
mentorForm.style.display = 'none';
menteeForm.style.display = 'none';

numReqCrl.style.color = 'transparent';
upCharReqCrl.style.color = 'transparent';
specCharReqCrl.style.color = 'transparent';
noCharReqCrl.style.color = 'transparent';
numReqCrl.style.textShadow = '0 0 0 #a3a3a3';
upCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
specCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
noCharReqCrl.style.textShadow = '0 0 0 #a3a3a3';
numReq.style.color = '#a3a3a3';
upCharReq.style.color = '#a3a3a3';
specCharReq.style.color = '#a3a3a3';
noCharReq.style.color = '#a3a3a3';

// add event listener
password.addEventListener('input', function(event) {
  if( this.value.length > 7 ){
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #7e7ec9';
    numReq.style.color = '#595959';
  }else{
    numReqCrl.style.color = 'transparent';
    numReqCrl.style.textShadow = '0 0 0 #a3a3a3';
    numReq.style.color = '#a3a3a3';
  }
});

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
