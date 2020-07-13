
//#region  SignUp Modal Close Logic
// Get the modal
var modal = document.getElementById('signUpModal');
              
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//#endregion


//#region Validate Birthdate
function validateDOB(){
    var minAge = 18;
    var birthdate = new Date(document.getElementById('birthday').value);

    if(birthdate != ''){
        var today = new Date();
        var timeDiff = Math.abs(today.getTime() - birthdate.getTime());
        var ageDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;
        var ageDiffInYear = parseInt(ageDifference.toString().split('.')[0]);

        if(ageDiffInYear < 21){
            document.getElementById('birthDateErrorMessage').innerHTML = "You should be atleast 21 years to apply for loan.";
        }else{
            document.getElementById('birthDateErrorMessage').innerHTML = "";
        }
    }
}

//#endregion


// //Reference for CarLoan
// var carLoanRef = firebase.database().ref('carLoan');
// var firebaseAuth = firebase.auth();

// //Listen for form submit
// //document.getElementById('carLoanForm').addEventListener('submit', submitForm);

// //Sumbit Form
// function submitForm(e){
//     e.preventDefault();

//     //Get Values
//     var ownerTypeOfCar = getInputVal('ownerTypeOfCar');
//     var carMarketValue = getInputVal('carMarketValue');
//     var requestedLoanAmount = getInputVal('requestedLoanAmount');
//     var grossIncome = getInputVal('grossIncome');

//     //Save Message
//     saveCarLoanForm(ownerTypeOfCar, carMarketValue, requestedLoanAmount, grossIncome)
//     document.querySelector('.alert').style.display = 'block';

//     setTimeout(function(){
//         document.querySelector('.alert').style.display = 'none';
//     }, 3000);
    
// }

// //Function to get form values
// function getInputVal(id){
//     return document.getElementById(id).value;
// }

// //Save the message to firebase
// function saveCarLoanForm(ownerTypeOfCar, carMarketValue, requestedLoanAmount, grossIncome){
//     var newCarLoanRef = carLoanRef.push();
//     newCarLoanRef.set({
//         ownerTypeOfCar : ownerTypeOfCar,
//         carMarketValue : carMarketValue,
//         requestedLoanAmount : requestedLoanAmount,
//         grossIncome : grossIncome
//     });
// }




// //Login 
// function login(){
//     var userEmail = document.getElementById("usr_email").value;
//     var userPassword = document.getElementById("usr_password").value;

//     firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
        
//         window.alert("Error Message: " + errorMessage)
//         //window.location.replace("index.html");
//     });

//     window.alert("Login Successful")
//    // window.location.replace("user.html");
// }

// // function logout(){
// //     firebaseAuth.signOut().then(function() {
// //         window.location.replace("./index.html");
// //       }).catch(function(error) {
// //         // An error happened.
// //     });
// //     //window.location.replace("index.html");
// // }