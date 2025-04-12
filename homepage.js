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

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, fetch user info
        const docRef = doc(db, "users", user.uid); // Use Firebase user ID
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('usernameTopRight').innerText = `Hello, ${userData.firstName}`;
            } else {
                console.log("No document found for the user");
            }
        }).catch((error) => {
            console.error("Error getting user document:", error);
        });
    } else {
        // User is not logged in, redirect to login page
        window.location.href = "login.html";
    }
});

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';  // Redirect to login after logout
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});
