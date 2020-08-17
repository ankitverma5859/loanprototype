    // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLJXad79xpiYeraxhwoYrXoH9Ut5nAYQw",
    authDomain: "loanprototype.firebaseapp.com",
    databaseURL: "https://loanprototype.firebaseio.com",
    projectId: "loanprototype",
    storageBucket: "loanprototype.appspot.com",
    messagingSenderId: "997271167082",
    appId: "1:997271167082:web:16ca42a817cc163bf4aa13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseDb = firebase.database();
const firebaseConstant = firebase.firestore();