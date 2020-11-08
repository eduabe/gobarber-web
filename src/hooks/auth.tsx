import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/apiClient';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInterface {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;

}

interface AuthState {
  user: object;
  token: string;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface
);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    console.log(response);

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });

  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);

  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };

