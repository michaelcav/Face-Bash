import { ReactNode, createContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface AuthContextProps {
  currentUser: User | null;
  login: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Verifica se há um valor no localStorage antes de tentar fazer o parse
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const login = () => {
    //TO DO
    setCurrentUser({
      id: 1,
      name: "John Doe",
      profilePic:
        "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
