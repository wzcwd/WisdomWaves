"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        // login success, redirect to workspace page
        window.location.href = "/workspace";
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      {/* Login Form */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-[#232946] text-center mb-6 leading-tight">
        Welcome to<br />WisdomWaves
      </h1>
      <p className="text-lg font-semibold text-[#232946] text-center mb-8 max-w-xl">
        Supporting your journey from research idea to thesis defense, publication, proposal, or patent.
      </p>
      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-white font-bold text-[#232946] border-none outline-none focus:ring-2 focus:ring-[#A7B8CC]"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-white font-bold text-[#232946] border-none outline-none focus:ring-2 focus:ring-[#A7B8CC]"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Link href="#" className="text-[#3B6C8E] font-semibold text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#253047] text-white font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2 text-lg hover:bg-[#1a2233] transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-6 text-center text-[#232946] font-semibold">
        New to WisdomWaves?{' '}
        <Link href="/signup" className="text-[#3B6C8E] hover:underline">
          Sign up
        </Link>
      </div>
    </main>
  );
} 