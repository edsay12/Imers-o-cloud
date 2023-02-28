import { useState } from "react";
import AuthContext from "../context/authContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState(null);
  
  function signIn(email:string,password:string){

  }
  
  function signOut(){

  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
