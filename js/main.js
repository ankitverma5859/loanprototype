
//#region Global Variables
var userAge = NaN;

//#endregion

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

//#region Check for Purpose of Loan
function checkPurposeOfLoan(){
    var purposeOfLoan = document.getElementById('purposeOfLoan').value;
    if(!purposeOfLoan.localeCompare('newVehicle')){
        document.getElementById('vatBillAmount').style.display = "block";
        document.getElementById("vatBillAmountValue").required = true;
        document.getElementById('carAge').style.display = "none";
        document.getElementById('currentValueOfCar').style.display = "none";
    }
    else{
        document.getElementById('vatBillAmount').style.display = "none";
        document.getElementById('carAge').style.display = "block";
        document.getElementById("carAgeValue").required = true;
        document.getElementById('currentValueOfCar').style.display = "block";
        document.getElementById("currentValueOfCarValue").required = true;
    }  
}
//#endregion

//#region Birthdate Validation
function validateDOB(){
    var birthdate = new Date(document.getElementById('birthday').value);

    if(birthdate != ''){
        var today = new Date();
        var timeDiff = Math.abs(today.getTime() - birthdate.getTime());
        var ageDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;
        userAge = parseInt(ageDifference.toString().split('.')[0]);

        if(userAge < 21){
            document.getElementById('birthDateErrorMessage').innerHTML = "You should be atleast 21 years to apply for loan.";
        }else{
            document.getElementById('birthDateErrorMessage').innerHTML = "";
        }
    }
}
//#endregion

function validateFloatValue(valueId ,errorMessageId){
    
    var numDecimalRegexExp = /^[1-9]\d*(\.\d+)?$/;
    var loanAmount = document.getElementById(valueId).value;

    var regResult = loanAmount.match(numDecimalRegexExp);
    var amount = parseFloat(loanAmount);
    
    
    if(isNaN(amount) || regResult == null ){
        document.getElementById(errorMessageId).innerHTML = "Invalid Value";
    }else{
        document.getElementById(errorMessageId).innerHTML = "";
    }
}

//#region Loan Amount Validation
function validateLoanTenure(){
    var loanTenure = document.getElementById('loanTenure').value;
    var amount = parseInt(loanTenure);
    if(isNaN(amount)){
        document.getElementById('loanTenureError').innerHTML = "Invalid Value";
    }
    else if(userAge + amount > 65){
        document.getElementById('loanTenureError').innerHTML = "Loan Tenure Exceeded Exceeded Limit! Loan Tenure + Age shouldn't exceed 65";
    }
    else{
        document.getElementById('loanTenureError').innerHTML = "";
    }
}
//#endregion

function calculateEMI(loanAmount, loanTenureInMonths, typeOfLoan){
    var bottomRangeInterest, topRangeInterest, bottomEmiStr, topEmiStr;
    var topRangeInterest;
    var baseInterest = 8;

   if(!typeOfLoan.localeCompare("personal")){
        bottomRangeInterest = 2.5;
        topRangeInterest = 5.0
   }else if(!typeOfLoan.localeCompare("commercial")){
        bottomRangeInterest = 4.0;
        topRangeInterest = 5.0
   }
    
    bottomEmiStr = mathEmi(loanAmount, baseInterest+bottomRangeInterest, loanTenureInMonths); 
    topEmiStr = mathEmi(loanAmount, baseInterest+topRangeInterest, loanTenureInMonths); 
    
    return [bottomEmiStr, topEmiStr];

}

function mathEmi(loanAmount, baseInterest, loanTenureInMonths){
    var monthlyInterestRatio = (baseInterest/100)/12;
    var top = Math.pow((1+monthlyInterestRatio),loanTenureInMonths);
    var bottom = top-1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var emistr = emi.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return emistr;
}

function validateCarLoanForm(){
    var purposeOfLoan = document.forms["carLoanForm"]["purposeOfLoan"].value;
    var typeOfLoan = document.forms["carLoanForm"]["typeOfLoan"].value;
    var loanAmount = parseFloat(document.forms["carLoanForm"]["loanAmount"].value);
    var loanTenure = parseFloat(document.forms["carLoanForm"]["loanTenure"].value);
    var loanTenureInMonths = loanTenure*12;
    var ageOfCar = parseFloat(document.forms["carLoanForm"]["carAgeValue"].value);
    var currentValueOfCarValue = parseFloat(document.forms["carLoanForm"]["currentValueOfCarValue"].value);
    var grossIncome = parseFloat(document.forms["carLoanForm"]["grossIncome"].value);
    var otherLoanObligations = parseFloat(document.forms["carLoanForm"]["loanObligations"].value);
    var vatBillAmountValue = parseFloat(document.forms["carLoanForm"]["vatBillAmountValue"].value);
    var error = null;
    var emi1;
    var emi2;

    if(!purposeOfLoan.localeCompare("newVehicle") && !typeOfLoan.localeCompare("personal")){
        var fiftyPercentOfVatBill = vatBillAmountValue*0.5;
        if(loanAmount > fiftyPercentOfVatBill){
            error = "Loan amount cannot exceed more than 50% of the Vat Bill Value.";
        }
        else if(loanAmount > 8000000){
            error = "Loan amount cannot exceed Rs. 8,000,000.";
        }
        else if(loanTenure > 7)
        {
            error = "Loan tenure cannot exceed more than 7 years.";
        }
        else{
            emiValues = calculateEMI(loanAmount, loanTenureInMonths, typeOfLoan);
            var grossDifference = grossIncome-otherLoanObligations;
            var fiftyPercentOfGrossDifference = grossDifference*0.5;
            if(emiValues[0] > fiftyPercentOfGrossDifference){
                error = "Emi Range Values cannot exceed more than fifty percent of Gross Income - Other Loan Obligations";
            }
            else{
                emi1 = emiValues[0];
                emi2 = emiValues[1];
            }
        }
    }

    if(!purposeOfLoan.localeCompare("newVehicle") && !typeOfLoan.localeCompare("commercial")){
        var seventyPercentOfVatBill = vatBillAmountValue*0.7;
        if(loanAmount > seventyPercentOfVatBill){
            error = "Loan amount cannot exceed more than 70% of the Vat Bill Value.";
        }
        else if(loanAmount > 8000000){
            error = "Loan amount cannot exceed Rs. 8,000,000.";
        }
        else if(loanTenure > 5)
        {
            error = "Loan tenure cannot exceed more than 5 years.";
        }
        //Distress Value Coming soon!!!
        else{
            var emiValues = calculateEMI(loanAmount, loanTenureInMonths, typeOfLoan);
            var grossDifference = grossIncome-otherLoanObligations;
            var fiftyPercentOfGrossDifference = grossDifference*0.5;
            if(emiValues[0] > fiftyPercentOfGrossDifference){
                error = "Emi Range Values cannot exceed more than fifty percent of Gross Income - Other Loan Obligations";
            }else{
                //send all the values to fhirBase
                document.getElementById('error').innerHTML = "EMI Range: " + emiValues[0] + " - " + emiValues[1]+ " Gross-OtherLoan: " + grossDifference;
            }
        }
    }

    if(!purposeOfLoan.localeCompare("oldVehicle")){
        var fiftyPercentOfCurrentValueOfCarValue = currentValueOfCarValue*0.5;
        if(loanTenure + ageOfCar > 7){
            error = "Loan tenure + Age of Car cannot exceed more than 7 years.";
        }
        else if(loanTenure > 6){
            error = "Loan tenure exceed more than 6 years.";
        }
        else if(loanAmount > fiftyPercentOfCurrentValueOfCarValue){
            error = "Loan amount cannot exceed more than 50% of the Current Value of the Car.";
        }
        else if(loanAmount > 3000000){
            error = "Loan amount cannot exceed Rs. 3,000,000.";
        }
        else{
            calculateEMI(loanAmount, loanTenureInMonths, typeOfLoan);   
        }
    }

    if(!purposeOfLoan.localeCompare("refinancing")){
        var fiftyPercentOfCurrentValueOfCarValue = currentValueOfCarValue*0.5;
        if(loanAmount > fiftyPercentOfCurrentValueOfCarValue){
            error = "Loan amount cannot exceed more than 50% of the Current Value of the Car.";
        }
        else if(loanAmount > 3000000){
            error = "Loan amount cannot exceed Rs. 3,000,000.";
        }
        else if(loanTenure + ageOfCar > 7){
            error = "Loan tenure + Age of Car cannot exceed more than 7 years.";
        }
        else{
            calculateEMI(loanAmount, loanTenureInMonths, typeOfLoan);
        }
    }

    return [error, emi1, emi2];
}