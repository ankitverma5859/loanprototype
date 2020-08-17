//Logout a user
const firebaseLogout = document.querySelector("#firebaseUserLogout");
firebaseLogout.addEventListener('click', (e)=>{
    e.preventDefault();
    firebaseAuth.signOut()
    .then(()=>{
        window.location.replace("index.html");
    })
})

//User Logged in
firebaseAuth.onAuthStateChanged((user) =>{
    if(user){
        const email = user.email;
        const userId = user.uid;
        document.getElementById('currentUser').innerHTML = email;
    }else{
        window.location.replace('index.html');
    }
});
