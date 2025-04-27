import { getAuth, onAuthStateChanged } from "firebase/auth";

import app from './firebaseauth.js'; // Import the initialized Firebase app

import staffUserIds from './staff_ids.js'; // Import the list of staff user IDs


const auth = getAuth(app);


function checkStaffStatusAndRedirect() {

  const user = auth.currentUser;


  if (!user) {

    // Not logged in, redirect immediately

    window.location.href = "/homepage.html";

    return;

  }


  // Check if the user's UID is in the staffUserIds array

  const isStaff = staffUserIds.includes(user.uid);


  if (!isStaff) {

    // Redirect to homepage

    window.location.href = "/homepage.html";

  }

}


onAuthStateChanged(auth, (user) => {

  checkStaffStatusAndRedirect();

});
