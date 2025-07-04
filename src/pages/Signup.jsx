import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to sign up. Email may already be in use.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-mint">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center flex-grow px-6 py-12">
        {/* Form Section */}
        <div className="lg:w-1/2 max-w-md w-full">
          <h2 className="text-3xl font-bold text-pinkAccent mb-6">Create Your Account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
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
              placeholder="Password (min 6 chars)"
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
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-pinkAccent underline hover:text-pink-500">
              Log In
            </Link>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_20824344.htm"
            alt="Signup Illustration"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
            }
