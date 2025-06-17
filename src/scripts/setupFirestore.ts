import {  doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';

const setupFirestore = async () => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error('No user is currently logged in');
      return;
    }

    // Create users collection and add current user as admin
    await setDoc(doc(db, 'users', currentUser.uid), {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName || '',
      isAdmin: true,
      createdAt: new Date(),
    });

    console.log('Successfully created user document and made admin');
  } catch (error) {
    console.error('Error setting up Firestore:', error);
  }
};

// Run the setup
setupFirestore(); 