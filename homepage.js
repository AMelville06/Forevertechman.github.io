import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, allow access to homepage
        console.log("User is logged in:", user);

        // Fetch the user's information from Firestore
        const userId = user.uid; // Firebase gives you the user's UID
        const docRef = doc(db, "users", userId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Username in top-right
                    document.getElementById('usernameTopRight').innerText = `Hello, ${userData.firstName}`;
                } else {
                    console.log("No document found for user");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });

    } else {
        // User is not signed in, redirect to login page
        window.location.href = "login.html";
    }
});

// Handle logout
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html'; // Redirect to the homepage or any other page after sign-out
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});
