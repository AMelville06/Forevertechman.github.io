import { auth, db, onAuthStateChanged, signOut, collection, getDoc, doc, onSnapshot } from './auth.js';

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


document.getElementById('logout').addEventListener('click', () => {

    signOut(auth).then(() => {

        window.location.href = 'index.html';

    }).catch((error) => {

        console.error("Error signing out:", error);

    });

});


onAuthStateChanged(auth, async (user) => {

    await updateUsernameDisplay(user);


    const announcementsDiv = document.getElementById('announcements');


    onSnapshot(collection(db, "announcements"), (querySnapshot) => {


        announcementsDiv.innerHTML = ""; // Clear existing announcements


        querySnapshot.forEach((doc) => {


            const announcement = doc.data();


            const announcementElement = document.createElement('div');


            announcementElement.innerHTML = `


                <h3>${announcement.title}</h3>


                <p>${announcement.content}</p>


                <p>By ${announcement.author} on ${announcement.timestamp.toDate()}</p>


                <hr>


            `;


            announcementsDiv.appendChild(announcementElement);


        });


    });

});

