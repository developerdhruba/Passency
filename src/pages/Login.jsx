import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google Sign-in failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-mint">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center flex-grow px-6 py-12">
        {/* Text + Form */}
        <div className="lg:w-1/2 max-w-md w-full">
          <h2 className="text-3xl font-bold text-pinkAccent mb-6">Welcome Back</h2>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pinkAccent"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pinkAccent"
              required
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pinkAccent text-white font-semibold py-3 rounded-lg hover:bg-pink-300 transition"
            >
              Sign In
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full border border-pinkAccent text-pinkAccent font-semibold py-3 rounded-lg hover:bg-pink-50 transition"
          >
            Sign in with Google
          </button>
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pinkAccent underline hover:text-pink-500">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Illustration */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_10782895.htm"
            alt="Login Illustration"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
            }
