"use client";

import React, { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  token: string | null
  setToken: (token: string | null) => void
  isLoggedIn: boolean
  logout: () => void
  setRole: (role: string) => void
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isLoggedIn: false,
  logout: () => {},
  setRole: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token");
    if (storedToken) setTokenState(storedToken);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem("access_token", token);
    } else {
      sessionStorage.removeItem("access_token");
    }
    setTokenState(token);
  }

  const setRole = (role: string) => {
    if (token) {
      sessionStorage.setItem("user_role", role);
    }
    else {
      sessionStorage.removeItem("user_role");
    }
  }

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setTokenState(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn: !!token, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);