const emailInput = document.getElementById('InputEmail1');
const emailHelpLine=document.getElementById('emailHelpline');
const submitBtn= document.getElementById('submitBtn');
const numInput= document.getElementById('InputPhNum');
const numHelpline= document.getElementById('numberHelpline');
const fileInput = document.getElementById('image');
const fileHelpLine = document.getElementById('uploadHelpline');
const maxFileSize = 1000000; 
let isValid= false;

emailInput.addEventListener('keyup',function(){
    const email= emailInput.value.trim();
    //validate email
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid= regex.test(email);

    if (!isEmailValid){
        emailHelpLine.textContent="please enter a valid Email address.";
        isValid=false;
    }
    else{
        emailHelpLine.textContent="";
        isValid=true;
    }
    updateSubmitBtnState();
})
numInput.addEventListener('keyup', function(){
    const num = numInput.value.trim();
    const regexPhone=/^\d{10}$/;
    const validPh= regexPhone.test(num);
    //validate number
    if(isNaN(num)){
        numHelpline.textContent="please provide numbers not alphabets"; 
    }
    else if(!validPh){
        numHelpline.textContent="Please enter a valid 10 digit phone number";
        isValid=false;
    }
    else{
        numHelpline.textContent="";
        isValid=true;
    }
    updateSubmitBtnState();
})
var form= document.getElementById('myForm');
form.addEventListener('submit', function(event){
    event.preventDefault();
    var formData= new FormData();
    
    formData.append('name', document.getElementById('InputName').value);
    formData.append('email', document.getElementById('InputEmail1').value);
    formData.append('phone', document.getElementById('InputPhNum').value);
    formData.append('image',document.getElementById('image').files[0]);
    //alert message and clear form
    alert("Your form is successfully submitted!");
    clean();
    var xhr = new XMLHttpRequest();
    
    //Sending input data to the server
    xhr.open('POST', 'superGlobals.php', true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
        }
    };
    xhr.send(formData);
})
function updateSubmitBtnState() {
    submitBtn.disabled = !isValid;
    if (submitBtn.disabled) {
    //   alert("Please fill in all required fields correctly.");
    }
  }
function clean(){
    form.reset();
    numHelpline.textContent="";
    emailHelpLine.textContent="";
}
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    const fileSize = file.size;
  
    if (fileSize > maxFileSize) {
      fileHelpLine.textContent = 'The selected file exceeds the maximum allowed size of 1MB.';
      isValid = false;
    } else {
      fileHelpLine.textContent = '';
      isValid = true;
    }
    updateSubmitBtnState();
  });