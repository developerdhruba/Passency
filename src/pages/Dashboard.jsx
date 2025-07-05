import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { AuthContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [encryptedList, setEncryptedList] = useState([]);
  const [decrypted, setDecrypted] = useState({});

  // Encrypt using AES-GCM + PBKDF2 + Base64
  const encrypt = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(user.uid),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("passency"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    const ivBase64 = btoa(String.fromCharCode(...iv));
    return { encrypted: `${encryptedBase64}::${ivBase64}` };
  };

  // Decrypt using same derived key and IV
  const decrypt = async (cipher) => {
    const encoder = new TextEncoder();
    const [dataStr, ivStr] = cipher.split("::");
    const encryptedData = Uint8Array.from(atob(dataStr), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivStr), c => c.charCodeAt(0));

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(user.uid),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("passency"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["decrypt"]
    );

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );
    return new TextDecoder().decode(decryptedBuffer);
  };

  const handleSave = async () => {
    if (!password.trim()) return;
    const { encrypted } = await encrypt(password.trim());
    await addDoc(collection(db, "passwords"), {
      user: user.uid,
      encrypted,
      created: Date.now(),
    });
    setPassword("");
  };

  const handleDecrypt = async (id, encrypted) => {
    const decryptedText = await decrypt(encrypted);
    setDecrypted((prev) => ({ ...prev, [id]: decryptedText }));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "passwords", id));
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  useEffect(() => {
    const q = query(collection(db, "passwords"), where("user", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEncryptedList(entries);
    });
    return () => unsub();
  }, [user]);

  const signOutNow = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellowBg">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-pinkAccent mb-6">
          Welcome, {user.email}
        </h2>

        {/* Input Section */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 font-semibold">Enter Password</label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-pinkAccent"
            />
            <button
              onClick={handleSave}
              className="bg-pinkAccent text-white px-6 py-3 rounded-lg hover:bg-pink-300"
            >
              Encrypt & Save
            </button>
          </div>
        </div>

        {/* Encrypted List */}
        <div className="grid gap-4">
          {encryptedList.map((item) => (
            <div
              key={item.id}
              className="bg-mint rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-md"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-mono text-sm text-gray-800 break-all">
                  <span className="font-bold">Encrypted:</span> {item.encrypted}
                </p>
                {decrypted[item.id] && (
                  <p className="mt-1 text-green-700">
                    <span className="font-bold">Decrypted:</span> {decrypted[item.id]}
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleDecrypt(item.id, item.encrypted)}
                  className="bg-skyBlue text-white px-3 py-1 rounded hover:bg-sky-400"
                >
                  Decrypt
                </button>
                <button
                  onClick={() => handleCopy(item.encrypted)}
                  className="bg-yellowBg border px-3 py-1 rounded hover:bg-yellow-100"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <div className="mt-10 text-center">
          <button
            onClick={signOutNow}
            className="text-sm underline text-gray-700 hover:text-pinkAccent"
          >
            Sign Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
              }
