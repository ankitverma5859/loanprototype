const carloanForm = document.querySelector('#carLoanForm');

carloanForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    var validateResult = validateCarLoanForm();
    var error = validateResult[0];

    if(error){
        document.getElementById('error').innerHTML = error;
    }
    else{
        const user_name = carloanForm['userName'].value;
        const user_birthdata = carloanForm['birthday'].value;
        const loan_purpose =  carloanForm['purposeOfLoan'].value;
        const loan_vatamount = carloanForm['vatBillAmountValue'].value;
        const loan_type = carloanForm['typeOfLoan'].value;;
        const loan_carAge = carloanForm['carAgeValue'].value;
        const loan_currentValueOfCar = carloanForm['currentValueOfCarValue'].value;
        const loan_typeOfVehicle = carloanForm['typeOfVehicle'].value;
        const loan_amount = carloanForm['loanAmount'].value;
        const loan_tenure = carloanForm['loanTenure'].value;
        const user_grossIncome = carloanForm['grossIncome'].value;
        const user_otherLoan = carloanForm['loanObligations'].value;
    
        var firebaseCarLoan = firebaseDb.ref('Loan/CarLoan/'+user_name);
        firebaseCarLoan.set({
            name: user_name,
            birthdate: user_birthdata,
            loanPurpose: loan_purpose,
            vehicleVatAmount: loan_vatamount,
            loanType: loan_type,
            vehicleAge: loan_carAge,
            vehicleCurrentValue: loan_currentValueOfCar,
            vehicleType: loan_typeOfVehicle,
            loanAmount: loan_amount,
            loanTenure: loan_tenure,
            grossIncome: user_grossIncome,
            otherLoan: user_otherLoan
        },function(error){
            if(error){
                document.getElementById('error').innerHTML = error.message;
                
            }else{
                document.getElementById('error').innerHTML = "Your EMI Range is from Rs." + validateResult[1] + " - Rs."  + validateResult[2] +"  Loan Form Submitted Successfully for further processing from manager.";
            }
        });
    }
});