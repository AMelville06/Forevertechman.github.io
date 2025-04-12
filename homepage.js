import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA8eNKm8fBaUcKJy0jozX4U_0VqCHS2WvQ",
    authDomain: "forevertechman-website.firebaseapp.com",
    projectId: "forevertechman-website",
    storageBucket: "forevertechman-website.appspot.com",
    messagingSenderId: "318552507372",
    appId: "1:318552507372:web:75bf8c8e432157e32736c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                // Username in top-right
                // Update usernameTopRight with Firebase data
                document.getElementById('usernameTopRight').innerText = `Hello, ${userData.firstName}`;
            } else {
                console.log("No document found");
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    } else {
        console.log("User ID not found in localStorage");
    }
});

// Handle logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, allow access to homepage
        console.log("User is logged in:", user);
    } else {
        // User is not signed in, redirect to login page
        window.location.href = "login.html"; // or your login page URL
    }
});
