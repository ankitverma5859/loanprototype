// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDLJXad79xpiYeraxhwoYrXoH9Ut5nAYQw",
    authDomain: "loanprototype.firebaseapp.com",
    databaseURL: "https://loanprototype.firebaseio.com",
    projectId: "loanprototype",
    storageBucket: "loanprototype.appspot.com",
    messagingSenderId: "997271167082",
    appId: "1:997271167082:web:16ca42a817cc163bf4aa13"
  };
// Initialize Firebase
firebase.initializeApp(config);

//Reference for CarLoan
var carLoanRef = firebase.database().ref('carLoan');

//Listen for form submit
document.getElementById('carLoanForm').addEventListener('submit', submitForm);

//Sumbit Form
function submitForm(e){
    e.preventDefault();

    //Get Values
    var ownerTypeOfCar = getInputVal('ownerTypeOfCar');
    var carMarketValue = getInputVal('carMarketValue');
    var requestedLoanAmount = getInputVal('requestedLoanAmount');
    var grossIncome = getInputVal('grossIncome');

    //Save Message
    saveCarLoanForm(ownerTypeOfCar, carMarketValue, requestedLoanAmount, grossIncome)
    document.querySelector('.alert').style.display = 'block';

    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 3000);
    
}

//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save the message to firebase
function saveCarLoanForm(ownerTypeOfCar, carMarketValue, requestedLoanAmount, grossIncome){
    var newCarLoanRef = carLoanRef.push();
    newCarLoanRef.set({
        ownerTypeOfCar : ownerTypeOfCar,
        carMarketValue : carMarketValue,
        requestedLoanAmount : requestedLoanAmount,
        grossIncome : grossIncome
    });
}