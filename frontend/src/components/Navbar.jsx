import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="text-blue-600 font-extrabold text-xl md:text-2xl tracking-wide hover:text-blue-700"
      >
        MiniLinkedIn
      </Link>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {user ? (
          <>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition"
              aria-label="Home"
            >
              <AiFillHome className="text-2xl" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition"
              aria-label="Profile"
            >
              <FaUserCircle className="text-2xl" />
              <span className="truncate max-w-[100px]">{user.name}</span>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded font-semibold transition"
            >
              Join Now
            </Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t z-40 flex flex-col items-start px-4 py-4 space-y-4 md:hidden">
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium w-full"
              >
                <AiFillHome className="text-xl" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium w-full"
              >
                <FaUserCircle className="text-xl" />
                <span>{user.name}</span>
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 hover:text-red-700 font-medium w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold w-full text-center"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
