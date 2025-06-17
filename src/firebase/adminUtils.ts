import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const makeUserAdmin = async (userId: string) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isAdmin: true
    });
    return true;
  } catch (error) {
    console.error('Error making user admin:', error);
    return false;
  }
};

export const makeUserAdminByEmail = async (email: string) => {
  try {
    // Query users collection to find the user with the given email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No user found with email:', email);
      return false;
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    
    // Update the user document to make them an admin
    await updateDoc(doc(db, 'users', userDoc.id), {
      isAdmin: true
    });

    console.log('Successfully made user admin:', email);
    return true;
  } catch (error) {
    console.error('Error making user admin by email:', error);
    return false;
  }
}; 