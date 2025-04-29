import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, updateDoc, doc, collection, onSnapshot, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";


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
const storage = getStorage(app);


document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
        alert("Not logged in");
        return;
    }

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        const profile = userData.profile || {};

        document.getElementById('rank').value = profile.rank || '';
        document.getElementById('bio').value = profile.bio || '';
        document.getElementById('profilePic').src = profile.profilePictureUrl || "assets/Logo-no-background.png"
    } else {
        alert("User data not found");
    }
});

// Elements
const userNameSpan = document.getElementById("user-name");
const profilePic = document.getElementById("profile-pic");


// Set user name
userNameSpan.textContent = `${userData.firstName} ${userData.lastName}`;

// Generate the filename
const filename = `${userData.firstName}${userData.lastName}.jpg`;

// Try to load their profile picture
function loadProfilePicture() {
    const img = new Image();
    img.src = `assets/Profile Pictures/${filename}`;

    img.onload = function() {
        profilePic.src = img.src; // If found, set it
    };

    img.onerror = function() {
        console.warn("Profile picture not found, using default.");
        profilePic.src = `assets/Profile Pictures/default.png`; // Fallback if missing
    };
}

// Load the picture
loadProfilePicture();

document.getElementById('saveProfile').addEventListener('click', async () => {
    const userId = localStorage.getItem('loggedInUserId');
    const newRank = document.getElementById('rank').value;
    const newBio = document.getElementById('bio').value;

    const docRef = doc(db, "users", userId);

    await updateDoc(docRef, {
        "profile.rank": newRank,
        "profile.bio": newBio
    });

    alert('Profile updated successfully!');
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        // After login, the messages will load

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

async function checkIfLoggedIn() {
    const user = auth.currentUser;

    if (!user) {
        window.location.href = "index.html";
        return;
    }

}

onAuthStateChanged(auth, async (user) => {
    await checkIfLoggedIn();
});