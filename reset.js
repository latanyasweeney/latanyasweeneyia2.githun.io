/*==================================
  Reseting Password Functionality Handling JavaScript
  ==================================*/

document.getElementById('resetForm').addEventListener("submit",function(event)
{
    event.preventDefault();
    const trn=document.getElementById("n-trn").value;
    const newPassword=document.getElementById("new-password").value;
    const confirmPassword=document.getElementById("confirm-password").value;

    if(!trn || !newPassword || !confirmPassword)
    {
        alert("Please fill in all fields.");
        return;
    }

    if(newPassword.length<8)
    {
        alert("Password must be atleast 8 characters long");
        return;
    }

    if(newPassword!==confirmPassword)
    {
        alert("Passwords do not match.");
        return;
    }
    
    let RegistrationData=JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let user=RegistrationData.find(u=>u.trn===trn);

    if(!user)
    {
        alert("TRN not found.");
        return;
    }
    else
    {
        if (user.password==newPassword)
        {
            alert("New password must be different from the old password.");
            return;
        }
        else
        {
            user.password=newPassword;

            try
            {
                localStorage.setItem("RegistrationData",JSON.stringify(RegistrationData));
                alert("Password reset successful!");
                window.location.href="login.html";
                return;
            }
            catch(e)
            {
                alert("Error saving data. Please try again.");
                return;  
            }    
        }         
    }
});
