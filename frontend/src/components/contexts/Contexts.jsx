import React, { createContext, useEffect, useState } from "react";

const defaultUser = {
  _id: '',
  username: '',
  cart: [],
}

export const UserContext = createContext([]);

export function UserProvider ({ children }) {
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    function logoutUser() {
      setUser(defaultUser);
    }

    return (
      <UserContext.Provider value={{ user, setUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    );
};