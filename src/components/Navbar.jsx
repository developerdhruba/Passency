import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-pinkAccent text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-xl">PassEncy</Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
            <span>{user.email}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
