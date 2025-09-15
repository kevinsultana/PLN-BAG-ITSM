"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek sesi pengguna saat aplikasi dimuat
  const checkUserSession = async () => {
    try {
      const res = await fetch("/api/sso/me", {
        credentials: "include",
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Gagal memeriksa sesi pengguna:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const login = () => {
    // Langsung arahkan (redirect) browser ke halaman login SSO backend.
    // Backend akan menangani redirect kembali ke halaman aplikasi Anda setelah login.
    // window.location.href = "https://itsm-helpdesk-be.unotek.co.id/auth/login";
    window.location.href = "http://localhost:8080/auth/login";
  };

  const logout = async () => {
    try {
      await fetch("/api/sso/logout", { method: "POST" });
    } catch (error) {
      console.error("Gagal saat mencoba logout dari server:", error);
    } finally {
      await checkUserSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, checkUserSession }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
