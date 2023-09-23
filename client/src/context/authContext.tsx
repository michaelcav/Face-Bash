import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  // Defina aqui as propriedades do objeto de usuário, por exemplo:
  id: number;
  username: string;
  // ...
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: Record<string, string>) => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs: Record<string, string>) => {
    try {
      const res = await axios.post<User>(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data);
    } catch (error) {
      // Trate erros de autenticação aqui
      console.error("Erro durante o login:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const contextValue: AuthContextType = {
    currentUser,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
