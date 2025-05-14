

// Initialize Firebase
const auth = getAuth();
const db = getFirestore();

function formatDate(date) {

    const options = {

        year: 'numeric',

        month: 'long',

        day: 'numeric',

        hour: 'numeric',

        minute: 'numeric',

        hour12: true

    };

    return date.toLocaleDateString('en-US', options);

}

//I have put all of the display code into it's own function to make sure it is ran as soon as the authentication completes.

document.readyState(async function displayCode() {
    const announcementsDiv = document.getElementById('announcements');
    const recentMessagesQuery = query(collection(db, "announcements"), orderBy('timestamp', 'desc'), limit(5));

    onSnapshot(recentMessagesQuery, async (querySnapshot) => {
        announcementsDiv.innerHTML = ""; // Clear existing announcements

        for (const docSnapshot of querySnapshot.docs) {
            const announcement = docSnapshot.data();

            // Fetch user data to get the last name
            let authorLastName = announcement.author; // Default to the author in announcement

            // Get document information
            if (announcement.uid) {
                const userDocRef = doc(db, "users", announcement.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    authorLastName = userData.lastName || announcement.author; // If last name exists, use it
                }
            }

            const announcementElement = document.createElement('div');
            announcementElement.classList.add("announcement");

            const formattedDate = formatDate(announcement.timestamp.toDate());

            announcementElement.innerHTML = `
                <div class="author">${authorLastName}</div>
                <div class="content">${announcement.content}</div>
                <div class="timestamp">${formattedDate}</div>
            `;

            announcementsDiv.appendChild(announcementElement);
        }
    });
});


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
  