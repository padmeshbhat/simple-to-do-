

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
    const newUser={
        username:NewUsername.value.trim(),
        password:npass
    };

    fetch("http://localhost:3000/api/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newUser)   
    })
    .then(response =>response.json())
    .then(data =>{
        if(data.error){
            alert("error:"+data.error);
        }
        else{
            alert("account created successfully! redirecting");
            window.location.href="login.html";
        }

    })
    .catch(error=>{
        console.error("failed to connect to the server:",error);
    });


});
