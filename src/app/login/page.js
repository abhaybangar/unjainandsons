"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { registerUserAction } from "@/actions/auth";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setError("");
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const switchMode = (m) => {
    resetForm();
    setMode(m);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    if (mode === "signup") {
      const res = await registerUserAction({ name, email, password, phone });
      if (!res.success) {
        setIsSubmitting(false);
        setError(res.error || "Registration failed.");
        return;
      }

      // Auto login after registration
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setIsSubmitting(false);

      if (loginRes?.error) {
        setError(loginRes.error);
      } else {
        setIsSuccess(true);
        setTimeout(() => router.push(callbackUrl), 1500);
      }
    } else {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setIsSubmitting(false);

      if (loginRes?.error) {
        setError(loginRes.error || "Invalid email or password.");
      } else {
        setIsSuccess(true);
        setTimeout(() => router.push(callbackUrl), 1500);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    setIsSubmitting(true);
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── LEFT PANEL – Jewellery Visual (hidden on mobile) ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0C1B33 0%, #1a2e50 60%, #0C1B33 100%)",
        }}
      >
        {/* Decorative rings */}
        <div className="absolute top-[-12%] left-[-12%] w-[55vw] h-[55vw] max-w-[640px] max-h-[640px] rounded-full border border-[#C5A059]/10 pointer-events-none" />
        <div className="absolute bottom-[-8%] right-[-8%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-[#C5A059]/8 pointer-events-none" />

        {/* Gold shimmer blobs */}
        <div className="absolute top-[30%] left-[10%] w-48 h-48 rounded-full bg-[#C5A059]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full bg-[#C5A059]/6 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex flex-col">
            <span className="font-serif text-2xl xl:text-3xl tracking-[0.12em] font-bold text-white hover:text-[#C5A059] transition-colors duration-500">
              UTTAMCHAND NEMICHAND
            </span>
            <span className="text-[9px] tracking-[0.35em] font-medium text-[#C5A059] uppercase mt-1">
              JAIN &amp; SONS • JEWELLERS
            </span>
          </Link>
        </div>

        {/* Central Quote */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="h-px w-12 bg-[#C5A059] mb-8" />
          <blockquote className="font-serif text-3xl xl:text-4xl font-light text-white leading-snug mb-6 max-w-xs">
            &quot;Crafted for those who wear their story in gold.&quot;
          </blockquote>
          <p className="text-sm text-white/50 font-light tracking-wide">
            Access your exclusive designs, private bookings, and curated wishlist — all in one place.
          </p>
        </div>

        {/* Bottom trust badges */}
        <div className="relative z-10 flex items-center space-x-6">
          {["BIS Hallmarked", "IGI Certified", "Lifetime Exchange"].map((badge) => (
            <div key={badge} className="flex items-center space-x-1.5">
              <span className="text-[#C5A059] text-xs">✓</span>
              <span className="text-white/60 text-[10px] tracking-wider uppercase font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL – Form ── */}
      <div className="w-full lg:w-1/2 bg-[#FAF6EE] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile background decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full border border-[#C5A059]/8 pointer-events-none lg:hidden" />
        <div className="absolute bottom-[-8%] left-[-8%] w-[40vw] h-[40vw] rounded-full border border-[#C5A059]/8 pointer-events-none lg:hidden" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <Link href="/" className="flex flex-col items-center group text-center">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.12em] font-bold text-[#0C1B33] group-hover:text-[#C5A059] transition-colors duration-500">
                UTTAMCHAND NEMICHAND
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium text-[#C5A059] uppercase mt-1">
                JAIN &amp; SONS • JEWELLERS
              </span>
            </Link>
          </div>

          {/* Back link */}
          <button
            onClick={() => router.push("/")}
            className="mb-6 inline-flex items-center text-[10px] font-semibold uppercase tracking-widest text-[#C5A059] hover:text-[#0C1B33] transition-colors cursor-pointer group border-none bg-transparent"
          >
            <svg className="mr-1.5 h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Boutique
          </button>

          {/* Success state */}
          {isSuccess ? (
            <div className="bg-white border border-[#C5A059]/25 rounded-3xl p-10 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="h-20 w-20 mx-auto bg-[#0C1B33] border-2 border-[#C5A059] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#C5A059]/20">
                <svg className="h-9 w-9 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">
                {mode === "signup" ? "Account Created!" : "Welcome Back!"}
              </h3>
              <p className="text-xs text-[#222222]/60 tracking-widest uppercase font-semibold">
                Redirecting to your boutique...
              </p>
              {/* Loading dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-[#C5A059]/15 overflow-hidden">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 border-b border-gray-100 bg-[#FAF6EE]/50 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-2xl cursor-pointer border-none ${
                    mode === "login"
                      ? "bg-white text-[#0C1B33] shadow-sm font-bold"
                      : "text-gray-400 hover:text-[#0C1B33] bg-transparent"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className={`py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-2xl cursor-pointer border-none ${
                    mode === "signup"
                      ? "bg-white text-[#0C1B33] shadow-sm font-bold"
                      : "text-gray-400 hover:text-[#0C1B33] bg-transparent"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="p-8">
                {/* Heading */}
                <div className="mb-7">
                  <span className="text-[9px] tracking-[0.35em] font-bold uppercase text-[#C5A059] block mb-1">
                    CUSTOMER LOUNGE
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#0C1B33]">
                    {mode === "login" ? "Welcome Back" : "Register with Us"}
                  </h2>
                  <p className="text-xs text-[#222222]/50 mt-1">
                    {mode === "login"
                      ? "Sign in to access your wishlist and exclusive designs."
                      : "Create your account for personalized jewellery services & updates."}
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl text-center font-medium">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name – signup only */}
                  {mode === "signup" && (
                    <div>
                      <label className="text-[10px] font-semibold text-[#0C1B33] tracking-widest uppercase block mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF6EE]/60 text-[#0C1B33] border border-gray-200 focus:border-[#C5A059] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059]/30 transition-all duration-300 placeholder:text-gray-400"
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-semibold text-[#0C1B33] tracking-widest uppercase block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF6EE]/60 text-[#0C1B33] border border-gray-200 focus:border-[#C5A059] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059]/30 transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-semibold text-[#0C1B33] tracking-widest uppercase">
                        Password
                      </label>
                      {mode === "login" && (
                        <button type="button" className="text-[10px] text-[#C5A059] hover:text-[#0C1B33] transition-colors uppercase tracking-wider font-semibold border-none bg-transparent cursor-pointer">
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#FAF6EE]/60 text-[#0C1B33] border border-gray-200 focus:border-[#C5A059] rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059]/30 transition-all duration-300 placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C5A059] transition-colors cursor-pointer border-none bg-transparent p-0"
                      >
                        {showPassword ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0C1B33] hover:bg-[#C5A059] text-white py-3.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer min-h-[48px] mt-2 border-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2.5">
                        <svg className="animate-spin h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[9px] text-gray-400 font-semibold tracking-widest uppercase">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isSubmitting}
                    className="border border-gray-200 hover:border-[#C5A059] rounded-xl py-2.5 px-4 text-xs font-semibold text-[#222222] hover:bg-[#FAF6EE] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer bg-transparent"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("apple")}
                    disabled={isSubmitting}
                    className="border border-gray-200 hover:border-[#C5A059] rounded-xl py-2.5 px-4 text-xs font-semibold text-[#222222] hover:bg-[#FAF6EE] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer bg-transparent"
                  >
                    <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.94-1.39z" />
                    </svg>
                    <span>Apple ID</span>
                  </button>
                </div>

                {/* Mode switch */}
                <p className="text-center text-xs text-gray-400 mt-6">
                  {mode === "login" ? "New customer? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                    className="text-[#C5A059] font-semibold hover:text-[#0C1B33] transition-colors cursor-pointer border-none bg-transparent underline underline-offset-2"
                  >
                    {mode === "login" ? "Create an account" : "Sign in instead"}
                  </button>
                </p>
              </div>
            </div>
          )}

          <p className="text-[10px] text-gray-400 text-center mt-6">
            By continuing, you agree to Uttamchand Nemichand Jain &amp; Sons&apos;{" "}
            <span className="text-[#C5A059] cursor-pointer hover:underline">Privacy Policy</span> &amp;{" "}
            <span className="text-[#C5A059] cursor-pointer hover:underline">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
