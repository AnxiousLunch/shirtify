import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from './AuthContext';

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false, loading: true });

export function useAdmin() {
  return useContext(AdminContext);
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.data();
        setIsAdmin(userData?.isAdmin === true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [currentUser]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}; 