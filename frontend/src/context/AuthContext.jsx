import { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleStorageChange = () => {
    setToken(localStorage.getItem('token'));
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const authValue = useMemo(() => ({ token, updateToken }), [token]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
}