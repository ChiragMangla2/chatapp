import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [loginUserId, setLoginUserId] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken, selectedUser, setSelectedUser, loginUserId, setLoginUserId}}>
      {children}
    </AuthContext.Provider>
  );
};
