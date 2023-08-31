import { createContext, useEffect, useState, ReactNode } from "react";

interface userType {
  id: number;
  name: string;
  avatar: string
}

export const AuthContext = createContext<boolean | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') || null)
  
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
    <AuthContext.Provider value={{  currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};