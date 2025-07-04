import React from "react";

export default function Footer() {
  return (
    <footer className="bg-lilac text-center text-gray-800 py-4 mt-auto">
      <p>© {new Date().getFullYear()} PassEncy. All rights reserved.</p>
    </footer>
  );
}
