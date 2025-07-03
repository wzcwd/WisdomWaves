"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        // registration success, redirect to login page
        window.location.href = "/login";
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F7F1] flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#A7B8CC] rounded-[2rem] mx-4 mt-4 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="WisdomWaves Logo" width={48} height={48} />
            <span className="font-semibold text-[#253047] text-lg">WisdomWaves</span>
          </Link>
        </div>
        <div className="flex items-center gap-8 text-[#253047] font-semibold text-lg">
          <Link href="/signup" className="hover:underline">Sign up</Link>
          <Link href="#" className="hover:underline">Learn More</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
        </div>
      </nav>

      {/* Signup Form */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#232946] text-center mb-6 leading-tight">
          Create your account
        </h1>
        <p className="text-lg font-semibold text-[#232946] text-center mb-8 max-w-xl">
          Join WisdomWaves and start your journey from research idea to publication, proposal, or patent.
        </p>
        <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded bg-white font-bold text-[#232946] border-none outline-none focus:ring-2 focus:ring-[#A7B8CC]"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded bg-white font-bold text-[#232946] border-none outline-none focus:ring-2 focus:ring-[#A7B8CC]"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#253047] text-white font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2 text-lg hover:bg-[#1a2233] transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
            <span className="ml-2">→</span>
          </button>
        </form>
        <div className="mt-6 text-center text-[#232946] font-semibold">
          Already have an account?{' '}
          <Link href="/login" className="text-[#3B6C8E] hover:underline">Login</Link>
        </div>
      </main>
    </div>
  );
} 