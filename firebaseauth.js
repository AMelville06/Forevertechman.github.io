import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import capidToEmailMap from './capid_to_email.js'; // Import the CAPID-to-email mapping

const firebaseConfig = {

    apiKey: "AIzaSyA8eNKm8fBaUcKJy0jozX4U_0VqCHS2WvQ",

    authDomain: "forevertechman-website.firebaseapp.com",

    projectId: "forevertechman-website",

    storageBucket: "forevertechman-website.firebasestorage.app",

    messagingSenderId: "318552507372",

    appId: "1:318552507372:web:75bf8c8e432157e32736c9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   setTimeout(function(){
       messageDiv.style.opacity=0;
   },5000);
}

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, setDoc, doc };

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('rEmail').value;
   const password=document.getElementById('rPassword').value;
   const firstName=document.getElementById('fName').value;
   const lastName=document.getElementById('lName').value;
   const capid=document.getElementById('capid').value;


   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
       const user=userCredential.user;
       const userData={
           email: email,
           firstName: firstName,
           lastName:lastName,
           capid:capid,
           staff:false,
           admin:false,
           accountActive:false,
           profile: {
               rank: "Cadet",  // Default value, user can edit later
               profilePictureUrl: "assets/Profile Pictures/"+{firstName}+{lastName}+".jpg", // Empty for now, can be updated later
               bio: "", // Empty bio
           }
       };
       showMessage('Account Created Successfully', 'signUpMessage');
       const docRef=doc(db, "users", user.uid);
       setDoc(docRef,userData)
       .then(()=>{
           window.location.href='index.html';
       })
       .catch((error)=>{
           console.error("error writing document", error);

       });
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode=='auth/email-already-in-use'){
           showMessage('Email Address Already Exists !!!', 'signUpMessage');
       }
       else{
           showMessage('unable to create User', 'signUpMessage');
       }
   })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event)=>{
   event.preventDefault();
     const capidOrEmail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  let email;
    if (capidToEmailMap[capidOrEmail]) {
       
        email = capidToEmailMap[capidOrEmail];
    } else {
       
        email = capidOrEmail;
    }
 try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.accountActive) {
                showMessage('login is successful', 'signInMessage');
                 localStorage.setItem('loggedInUserId', user.uid);
                 window.location.href='homepage.html';

            }
             else {
                showMessage("Please contact IT Staff for account activation", 'signInMessage');
                  await signOut(auth);
            }
        } else {
            showMessage('Account does not Exist', 'signInMessage');
        }
  }  catch (error) {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login failed:", errorCode, errorMessage);
        showMessage('Login failed: ' + errorMessage, 'signInMessage');
        // Show error messages.
      }
   })

document.addEventListener("DOMContentLoaded", () => {
    const reset = document.getElementById("reset");
    reset.addEventListener("click", function(event){
        event.preventDefault();

        const email = document.getElementById("email").value;

        // ✅ Check if the email field is empty
        if (!email) {
            alert("Please enter your email address first.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent to " + email);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
});
