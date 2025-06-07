"use client";

import React, { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  token: string | null
  setToken: (token: string | null) => void
  isLoggedIn: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isLoggedIn: false,
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access_token")
    if (storedToken) setTokenState(storedToken)
  }, [])

  const setToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem("access_token", token)
    } else {
      sessionStorage.removeItem("access_token")
    }
    setTokenState(token)
  }

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setTokenState(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn: !!token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)