"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  // Cek sesi pengguna saat aplikasi dimuat
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Panggil endpoint /me melalui proxy kita
        const res = await fetch("/api/sso/me");

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

    checkUserSession();
  }, []);

  const login = () => {
    // Langsung arahkan ke halaman login SSO backend
    // Backend akan menangani redirect kembali ke halaman ini setelah login berhasil
    window.location.href = "https://itsm-helpdesk-be.unotek.co.id/auth/login";
  };

  const logout = async () => {
    try {
      // Panggil endpoint logout di proxy kita
      await fetch("/api/sso/logout", { method: "POST" });
      setUser(null);
      // Arahkan kembali ke halaman utama setelah logout
      window.location.href = "/";
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
