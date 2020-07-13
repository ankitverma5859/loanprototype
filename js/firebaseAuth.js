//Create a firebase user

const signupForm = document.querySelector('#signup-form');
    
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = signupForm['usr_email'].value;
    const password = signupForm['usr_password'].value;

    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        window.location.replace("userdashboard.html");
        signupForm.reset();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if(!errorCode.localeCompare("auth/email-already-in-use")){
            firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(cred => {
                window.location.replace("userdashboard.html");
                signupForm.reset();

            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("signUpLoginError").innerHTML = error.message;
            });
        }
        else{
            document.getElementById("signUpLoginError").innerHTML = error.message;
        }
    });
})
