"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import { useAuth } from "@/context/AuthContext";
// import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, checkUserSession, login } = useAuth();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await ProxyUrl.post(`/auth/login`, {
        username,
        password,
      });
      await checkUserSession();
      toast.success("Login berhasil!");
      router.replace("/beranda");
    } catch (error) {
      setError("Login gagal. Periksa username/password.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = () => {
    login();
  };

  useEffect(() => {
    if (user) {
      router.replace("/beranda");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-8 w-screen h-screen justify-center items-center bg-[url('/bgLoginPage.png')] bg-cover bg-center">
      <div className="bg-white rounded-[32px] shadow-lg p-8 flex flex-col items-center w-full max-w-md border border-gray-200">
        <img src="/logoNavbar.png" alt="Logo" className="w-40 mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Login</h1>
        <p className="text-gray-500 mb-6 text-center text-lg">
          Identity Access Management BAg
        </p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-base text-gray-900">
              Username
            </label>
            <input
              type="text"
              className="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#65C7D5] bg-gray-50"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-base text-gray-900">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#65C7D5] bg-gray-50 pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-400"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-end mb-2">
            <Link
              href="#"
              className="text-[#65C7D5] text-sm font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {/* <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isRobot}
              onChange={(e) => setIsRobot(e.target.checked)}
              className="w-5 h-5 border-gray-300 rounded"
              id="robot-check"
            />
            <label htmlFor="robot-check" className="text-gray-700 text-base">
              I'm not a robot
            </label>
            <div className="ml-auto">
              <img
                src="/recaptcha.png"
                alt="reCAPTCHA"
                className="w-16 h-6 object-contain"
              />
            </div>
          </div> */}
          <button
            type="submit"
            className="bg-[#65C7D5] hover:bg-[#4FB3C1] cursor-pointer text-white font-semibold rounded-xl py-3 mt-2 shadow transition text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!username || !password || loading}
          >
            {loading ? (
              <span className="loader mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : null}
            Login
          </button>
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}
          <div className="flex items-center gap-2 my-2">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-400 text-sm">or continue</span>
            <hr className="flex-1 border-gray-200" />
          </div>
          <button
            type="button"
            onClick={handleSSOLogin}
            className="flex items-center cursor-pointer justify-center gap-2 w-full bg-white border border-gray-200 rounded-xl py-3 text-[#1A73E8] font-semibold shadow hover:bg-gray-50 transition text-lg"
          >
            <img
              src="/logoSSO.png"
              alt="SSO"
              className="w-4 h-auto object-center"
            />
            Login With SSO
          </button>
        </form>
      </div>
      {/* <div className="flex gap-6">
        <button className="bg-cyan-400 cursor-pointer p-4 text-white rounded-xl shadow hover:bg-cyan-500 transition">
          <Link href="/beranda">Beranda side</Link>
        </button>
        <button className="bg-cyan-400 cursor-pointer p-4 text-white rounded-xl shadow hover:bg-cyan-500 transition">
          <Link href="/helpdesk">Helpdesk Side</Link>
        </button>
      </div> */}
    </div>
  );
}
