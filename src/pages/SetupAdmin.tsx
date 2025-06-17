import  {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, setDoc,  } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const SetupAdmin = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setupAdmin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setMessage('Please log in first');
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

      setMessage('Successfully created admin account! Redirecting to admin dashboard...');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error setting up admin:', error);
      setMessage('Error setting up admin account. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Setup Admin Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Click the button below to make your account an admin
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className={`mb-4 p-4 rounded ${
              message.includes('Successfully') 
                ? 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={setupAdmin}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Setting up...' : 'Make Me Admin'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupAdmin; 