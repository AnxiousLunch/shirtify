import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiEdit, FiSave, FiUser, FiMail, FiCalendar, FiMapPin } from 'react-icons/fi';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';



const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.displayName || '');
          setAddress(data.address || '');
          setBirthDate(data.dob || '');
        }
        setEmail(currentUser.email || ''); // From Auth
      }
    };
    fetchUserData();
  }, [currentUser]);

  // Save to Firestore
  const handleSave = async () => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        name,
        address,
        birthDate,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    try {
      await deleteUser(currentUser);
      alert('Account deleted');
    } catch (err) {
      alert('Error: You may need to reauthenticate.');
      console.error(err);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!currentUser) return;
    try {
      await sendPasswordResetEmail(auth, currentUser.email!);
      alert('Password reset email sent!');
    } catch (err) {
      alert('Failed to send reset email.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-200">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-white dark:bg-gray-100 flex items-center justify-center text-blue-600 text-4xl font-bold">
                  {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{currentUser?.displayName || 'User'}</h1>
                  <p className="text-blue-100 dark:text-blue-200">{currentUser?.email}</p>
                </div>
              </div>
              <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="px-4 py-2 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 rounded-md flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-gray-200 transition-colors duration-200"
                aria-label={isEditing ? "Save profile" : "Edit profile"}
              >
                {isEditing ? (
                  <>
                    <FiSave className="h-5 w-5" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <FiEdit className="h-5 w-5" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-200">
                      <FiUser className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <label htmlFor="name" className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white transition-colors duration-200">{name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-200">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <label htmlFor="email" className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white transition-colors duration-200">{email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-200">
                      <FiCalendar className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <label htmlFor="birthDate" className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          id="birthDate"
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white transition-colors duration-200">
                          {new Date(birthDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                  Address
                </h2>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-200">
                    <FiMapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <label htmlFor="address" className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      Shipping Address
                    </label>
                    {isEditing ? (
                      <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Enter your shipping address"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white transition-colors duration-200">{address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                  aria-label="Delete account"
                >
                  Delete Account
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Change password"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;