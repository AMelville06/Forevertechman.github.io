// set_staff.js
const admin = require('firebase-admin');

// Replace with the path to your service account key JSON file
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setStaffStatus(userId, isStaff) {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({ staff: isStaff });
    console.log(`Successfully set staff status for user ${userId} to ${isStaff}`);
  } catch (error) {
    console.error(`Error setting staff status for user ${userId}:`, error);
  }
}

// Example usage:
async function main() {
  // Replace with the actual user ID and desired staff status
  await setStaffStatus('USER_ID_TO_UPDATE', true);
  // You can add more calls to setStaffStatus for other users

  // To set multiple users
  const users = [
      { userId: 'USER_ID_1', isStaff: true },
      { userId: 'USER_ID_2', isStaff: false },
      { userId: 'USER_ID_3', isStaff: true }
  ];
  for (const user of users) {
      await setStaffStatus(user.userId, user.isStaff);
  }

  console.log('Script completed');
}

main();
