// staff_page.js or staff_page.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from './firebase_config.js'; // Import the initialized Firebase app

const auth = getAuth(app);
const db = getFirestore(app);

async function isUserStaff(): Promise<boolean> {
    const user = auth.currentUser;

    if (!user) {
        // Not logged in
        return false;
    }

    const userDocRef = doc(db, "users", user.uid); // "users" is your collection name
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.staff === true; // Check if 'staff' field exists and is true
    } else {
        // User document doesn't exist
        return false;
    }
}

async function checkStaffStatusAndRedirect() {
    const user = auth.currentUser;

    // Check if the user is logged in
    if (!user) {
        // Not logged in, redirect immediately
        window.location.href = "/homepage.html";
        return;
    }

    const isStaff = await isUserStaff();

    if (!isStaff) {
        // Redirect to homepage
        window.location.href = "/homepage.html"; // Or use your router's redirect method
    }
}

// Use onAuthStateChanged to ensure the user is logged in before checking staff status
onAuthStateChanged(auth, (user) => {
    checkStaffStatusAndRedirect();
});
