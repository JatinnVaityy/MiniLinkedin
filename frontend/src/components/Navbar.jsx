import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaSave, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setBio(storedUser.bio || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSave = async () => {
    if (!user || !user._id) {
      toast.error("User not found.");
      return;
    }

    try {
      const res = await fetch(`https://minilinkedinn.onrender.com/api/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      const data = await res.json();

      console.log("Raw response data from update:", data);  // Debug line

      if (!res.ok || !data.user?._id) {
        throw new Error("Invalid user data returned");
      }

      const updatedUser = data.user;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setBio(updatedUser.bio || "");
      setIsEditing(false);
      setShowDropdown(false);
      toast.success("Bio updated successfully!");
    } catch (err) {
      console.error("Error updating bio:", err);
      toast.error("Failed to update bio.");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-blue-600 font-bold text-xl">
          MiniLinkedIn
        </Link>

        <div className="relative">
          {user ? (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <FaUserCircle className="text-2xl" />
                {user.name}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-lg p-4 w-64 z-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUser className="text-gray-500" />
                    <Link to={`/profile/${user._id}`} className="hover:text-blue-600">
                      View Profile
                    </Link>
                  </div>

                  <div className="mb-2">
                    <label className="text-gray-700 font-semibold">Bio:</label>
                    {isEditing ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">{bio || "No bio added"}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <FaEdit /> Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1 text-green-600 hover:text-green-700"
                      >
                        <FaSave /> Save
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 ml-auto"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </nav>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Navbar;
