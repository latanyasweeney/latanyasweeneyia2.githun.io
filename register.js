//Question 1-User Authentication(LocalStorage)
//Validating user input on Registration Page
//Daynea Chambers 2400660
document.getElementById("registerForm").addEventListener("submit", function(event){
    event.preventDefault(); 

    // Get user input
    let firstname=document.getElementById("firstname").value.trim();
    let lastname=document.getElementById("lastname").value.trim();
    let dateofbirth= document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let phonenumber = document.getElementById("tele").value;
    let email = document.getElementById("email").value.trim();
    let trn = document.getElementById("trn").value;
    let password = document.getElementById("password").value.trim();
    let confirm = document.getElementById("confirm").value.trim();
    let dateofregistration=new Date();
    let cart={};
    let invoices=[];

    // Basic validation
    if(firstname === "" || lastname===""| dateofbirth === "" || gender===""| phonenumber===""| email===""|trn=== "" || password === "" || confirm === ""){
        alert("All fields are required.");
        return;
    }
    //Check age requirement
    let today = new Date();
    let dob = new Date(dateofbirth);
    let age=today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    let d= today.getDate() - dob.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
        age--;
    }
    if(age < 18){
        alert("You must be at least 18 years old to register.");
        return;
    }
    // Validate email format
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(emailPattern)){
        alert("Please enter a valid email address.");
        return;
    }
    // Validate TRN format
    let trnPattern=/^\d{3}-\d{3}-\d{3}$/;
    if(!trn.match(trnPattern)){
        alert("TRN must be a 9-digit number.");
        return;
    }
    //Validate phone number
    let phonePattern=/^\d{3}-\d{3}-\d{4}$/;
    if(!phonenumber.match(phonePattern)){
        alert("Phone number must be an 10-digit number.");
        return;
    }
    // Check password length
    if(password.length < 8){
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Check if passwords match
    if(password !== confirm){
        alert("Passwords do not match. Please try again.");
        return;
    }
    // Store registration data
    let RegistrationData=JSON.parse(localStorage.getItem("RegistrationData")) || [];
    if (RegistrationData.some(u=>u.trn===trn))
        {
            alert("TRN already registered.");
            return;
        }
        RegistrationData.push({firstname,lastname,dateofbirth,gender,phonenumber,email,trn,password,dateofregistration,cart,invoices});
        try
        {
            localStorage.setItem("RegistrationData",JSON.stringify(RegistrationData));
            alert("Registration successful!");
            window.location.href="login.html";
            return;
        }
        catch(e)
        {
          alert("Error saving data. Please try again.");
          return;  
        } 
        
});
//Reset form fields
document.getElementById("cancel").addEventListener("click", function() {
    let firstname=document.getElementById("firstname").value.trim();
    let lastname=document.getElementById("lastname").value.trim();
    let dateofbirth= document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let phonenumber = document.getElementById("tele").value;
    let email = document.getElementById("email").value.trim();
    let trn = document.getElementById("trn").value;
    let password = document.getElementById("password").value.trim();
    let confirm = document.getElementById("confirm").value.trim();
    
    if(firstname === "" || lastname===""|| dateofbirth === "" || gender===""|| phonenumber===""|| email===""||trn=== "" || password === "" || confirm === "")
    {
        alert("Please enter data to clear");
    }
    else
    {
        document.getElementById("registerForm").reset();
        alert("Form cleared");
    }
});



