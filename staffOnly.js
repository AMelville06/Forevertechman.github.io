import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {auth, db} from './firebaseauth.js';
import staffUserIds from './staff_ids.js';

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
        window.location.href = "homepage.html";
        return;
    }

    const isStaff = await isUserStaff(user);

    if (!isStaff) {
        window.location.href = "homepage.html";
    }
}

onAuthStateChanged(auth, async (user) => {
    await checkStaffStatusAndRedirect();
});
