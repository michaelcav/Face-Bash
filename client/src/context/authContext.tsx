import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import {User, LoginInput} from '../interfaces/types'

interface AuthContextProps {
  currentUser: User | null;
  login: (inputs: LoginInput) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Verifica se há um valor no localStorage antes de tentar fazer o parse
  const storedUser = localStorage.getItem('user');
  const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const login = async (inputs: LoginInput) => {
    try {
      const res = await axios.post<User>('http://localhost:8801/api/auth/login', inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      // Lide com erros de login, se necessário
      console.error(error);
    }
  };

  // Atualiza o localStorage quando currentUser muda
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
