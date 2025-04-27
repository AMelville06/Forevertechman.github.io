import { getAuth, onAuthStateChanged } from "firebase/auth";

import app from './firebase_config.js'; // Import the initialized Firebase app


const auth = getAuth(app);


function checkStaffStatusAndRedirect() {

  const user = auth.currentUser;


  if (!user) {

    // Not logged in, redirect immediately

    window.location.href = "/homepage.html";

    return;

  }


  // Access the custom claim

  const isStaff = user?.claims?.staff === true;


  if (!isStaff) {

    // Redirect to homepage

    window.location.href = "/homepage.html";

  }

}


onAuthStateChanged(auth, (user) => {

  // Force refresh the token

  user?.getIdToken(true).then(() => {

    checkStaffStatusAndRedirect();

  });

});
