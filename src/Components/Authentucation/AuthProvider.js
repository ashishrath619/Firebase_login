import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../Utils/Firebase/index";
import { useHistory } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user);
    });
  }, []);
  const history = useHistory();

  const logout = () => {
    auth.signOut().then(() => {
      setuser(null);
      history.push("/SignUp");
    });
  };
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
