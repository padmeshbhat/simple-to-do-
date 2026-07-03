const Signupform=document.getElementById("signupForm");
const NewUsername=document.getElementById("newUsername");
const Newpassword=document.getElementById("newPassword");
const ConfirmPassword=document.getElementById("confirmPassword");

Signupform.addEventListener('submit',function(event) {
    event.preventDefault();
    const npass=Newpassword.value;
    const cpass=ConfirmPassword.value;
    if(npass!==cpass){
        return alert("Password not matches");
    }
    localStorage.setItem("loggedinuser",NewUsername.value.trim());
    localStorage.setItem("loggedinpass",npass);
    alert("Account created...Redirecting...");
    window.location.href="login.html";

});
