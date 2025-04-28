// staffOnly.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

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
async function isUserStaff(user) {
    if (!user) {
        return false;
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.staff === true;
    } else {
        return false;
    }
}

async function checkStaffStatusAndRedirect() {
    const user = auth.currentUser;

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const isStaff = await isUserStaff(user);

    if (!isStaff) {
        window.location.href = "index.html";
    }
}

async function updateUsernameDisplay(user) {
    if (user) {
        console.log("User is logged in:", user);
        const docRef = doc(db, "users", user.uid);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('usernameTopRight').innerText = `Hello, ${userData.firstName}`;
            } else {
                console.log("No such document!");
                document.getElementById('usernameTopRight').innerText = "Hello, User"; // Default value
            }
        } catch (error) {
            console.error("Error getting document:", error);
            document.getElementById('usernameTopRight').innerText = "Hello, User"; // Default value
        }
    } else {
        console.log("User is not logged in");
        document.getElementById('usernameTopRight').innerText = "Hello, User"; // Default value
    }
}

onAuthStateChanged(auth, async (user) => {
    await checkStaffStatusAndRedirect();
    await updateUsernameDisplay(user);
});


// Handle logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth).then(() => {
        window.location.href = 'homepage.html';
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});