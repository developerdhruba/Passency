import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-yellowBg">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-extrabold mb-6 text-pinkAccent">PassEncy</h1>
          <p className="text-lg mb-8 max-w-xl">
            Whispers of your secrets, locked in light. PassEncy is your personal password vault that safely encrypts and stores your secrets — accessible only by you.
          </p>
          <Link
            to="/login"
            className="bg-pinkAccent hover:bg-pink-300 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={() => setPopupOpen(false)}
          >
            Get Started
          </Link>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-pass-phrase-pin-verification_12145005-abstract-access-control-system_335657-1386.jpg"
            alt="Password Vault Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Popup */}
      {popupOpen && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-pinkAccent text-white rounded-xl px-6 py-4 shadow-lg flex items-center space-x-4 z-50">
          <p>Sign in or sign up to start encrypting your passwords.</p>
          <Link
            to="/login"
            className="underline font-semibold hover:text-pink-300"
            onClick={() => setPopupOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
