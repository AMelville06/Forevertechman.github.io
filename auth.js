import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, collection, onSnapshot, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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


onAuthStateChanged(auth, (user) => {
    if (user) {
        // After login, the messages will load
        displayCode();

        console.log("User is logged in:", user);
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            console.log(user);
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
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
    } else {
        console.log("User is not logged in");
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

document.addEventListener("DOMContentLoaded", function() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    if (localStorage.getItem('reloadHomepage') === 'true') {
  
      localStorage.removeItem('reloadHomepage');
  
      window.location.reload();
  
    }
  
  });
  