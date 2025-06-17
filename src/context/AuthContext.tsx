import React, { createContext, useContext, useEffect, useState } from 'react';
import  { onAuthStateChanged } from '../firebase/firebaseConfig';
import type {User} from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};