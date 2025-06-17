import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider, facebookProvider } from '../firebase/firebaseConfig';
import { FiMail, FiLock, FiUser, FiFacebook } from 'react-icons/fi';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        displayName: displayName,
        dob: dob,
        address: address,
        isAdmin: false, // Default to false
        createdAt: new Date(),
      });

      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleOAuthRegister = async (provider: 'google' | 'facebook') => {
    try {
      setError('');
      setLoading(true);
      const selectedProvider = provider === 'google' ? googleProvider : facebookProvider;
      const result = await signInWithPopup(auth, selectedProvider);
      const user = result.user;

      // Create user document in Firestore for OAuth users
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        isAdmin: false, // Default to false
        createdAt: new Date(),
      });

      navigate('/');
    } catch (err) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
          Or{' '}
          <Link 
            to="/login" 
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-200">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  autoComplete="name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="py-2 pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2 pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                Password must be at least 6 characters
              </p>
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 py-2 px-3 block w-full border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 py-2 px-3 block w-full border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600 transition-colors duration-200"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors duration-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthRegister('google')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {/* <FiGoogle className="h-5 w-5" /> */}
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={() => handleOAuthRegister('facebook')}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FiFacebook className="h-5 w-5" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;