"use client";
import { BACKEND_URL } from "@/api/API";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [privilege, setPrivilege] = useState(null);

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
    window.location.href = `${BACKEND_URL}/auth/login`;
  };

  const logout = async () => {
    window.location.href = `${BACKEND_URL}/auth/logout-sso`;
    // try {
    //   await fetch("/api/sso/logout-sso", { method: "GET" });
    // } catch (error) {
    //   console.error("Gagal saat mencoba logout dari server:", error);
    // } finally {
    //   await checkUserSession();
    // }
  };

  const getPrivilege = async () => {
    try {
      const res = await fetch(`/api/sso/me/permissions`, {
        credentials: "include",
      });
      const data = await res.json();

      setPrivilege(data);
    } catch (error) {
      console.error("Error fetching privilege:", error);
    }
  };

  useEffect(() => {
    getPrivilege();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, checkUserSession, privilege }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
