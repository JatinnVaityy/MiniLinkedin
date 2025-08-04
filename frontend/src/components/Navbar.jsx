import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-blue-600 font-extrabold text-2xl tracking-wide hover:text-blue-700">
        MiniLinkedIn
      </Link>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition"
              aria-label="Home"
            >
              <AiFillHome className="text-2xl" />
              <span className="hidden md:inline">Home</span>
            </button>

            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition"
              aria-label="Profile"
            >
              <FaUserCircle className="text-3xl rounded-full" />
              <span className="hidden md:inline truncate max-w-xs">{user.name}</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-semibold transition"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold transition"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
