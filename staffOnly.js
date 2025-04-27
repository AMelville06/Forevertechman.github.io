import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA8eNKm8fBaUcKJy0jozX4U_0VqCHS2WvQ",
  authDomain: "forevertechman-website.firebaseapp.com",
  projectId: "forevertechman-website",
  storageBucket: "forevertechman-website.appspot.com",
  messagingSenderId: "318552507372",
  appId: "1:318552507372:web:75bf8c8e432157e32736c9"
};
const auth = getAuth();
const db = getFirestore();
const portal = document.getElementById("admin-portal");
const user = auth.currentUser;

if (user !== null) {
    const staff = user.staff;

    const uid = user.uid;

    user.providerData.forEach((profile) => {
        console.log("Staff: " + profile.staff);
    });
}

staff = document.getElementById('staff').value

if (!staff) {
    window.location.href = 'homepage.html';

}