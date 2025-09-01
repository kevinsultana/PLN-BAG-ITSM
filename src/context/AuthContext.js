"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // Langsung arahkan (redirect) browser ke halaman login SSO backend.
    // Backend akan menangani redirect kembali ke halaman aplikasi Anda setelah login.
    window.location.href = "https://itsm-helpdesk-be.unotek.co.id/auth/login";
    // window.location.href = "http://localhost:8080/auth/login";
  };

  const logout = async () => {
    try {
      // Panggil endpoint logout di proxy kita untuk memberitahu backend
      await fetch("/api/sso/logout", { method: "POST" });
    } catch (error) {
      console.error("Gagal saat mencoba logout dari server:", error);
    } finally {
      // Apapun yang terjadi, bersihkan state di frontend dan redirect
      setUser(null);
      window.location.href = "/beranda"; // Arahkan ke halaman utama
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
