import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import app from './firebaseauth.js'; // Import the initialized Firebase app
import staffUserIds from './staff_ids.js'; // Import the list of staff user IDs

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

async function checkStaffStatusAndRedirect(user) {
    if (!user) {
        // Not logged in, redirect immediately
        window.location.href = "/homepage.html";
        return;
    }

    // Check if the user's UID is in the staffUserIds array
    if (staffUserIds.includes(user.uid)) {
        // User is a staff member, no need to redirect
        console.log("Staff Member");
        return;
    } else {
        // User is not a staff member, redirect
        console.log("Not A Staff Member");
        window.location.href = "/homepage.html";
    }
}

onAuthStateChanged(auth, async (user) => {
    await checkStaffStatusAndRedirect(user);
});
