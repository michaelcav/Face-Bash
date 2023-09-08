export interface User {
  id: number;
  name: string;
  profilePic: string;
  currentUser: string | null; 
}

export interface LoginInput {
  username: string;
  password: string;
}



export interface Inputs {
  username: string;
  email: string;
  password: string;
  name: string;
}
