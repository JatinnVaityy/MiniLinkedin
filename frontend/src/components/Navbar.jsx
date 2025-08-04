import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext"; // adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-blue-600 font-bold text-xl">
        MiniLinkedIn
      </Link>

      {/* Mobile & Desktop Button Container */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
            >
              <AiFillHome className="text-xl" />
              <span className="hidden sm:inline">Home</span>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline">{user.name}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded"
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
