const loginForm=document.getElementById("loginForm");
const UserNameInput=document.getElementById("username");
const passwordInput=document.getElementById("password");
loginForm.addEventListener('submit',function(event){
    event.preventDefault();
    const getusname=localStorage.getItem("loggedinuser");
    const getpass=localStorage.getItem("loggedinpass");
    const enteredusername=UserNameInput.value.trim();
    const enteredpassword=passwordInput.value;
    if(enteredusername===getusname && enteredpassword===getpass){
        alert("redirecting...");
        window.location.href="index.html";
    }else{
        alert("Invalid username and password")
    }
});