import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`https://minilinkedinn.onrender.com/api/posts/user/${id}`);

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }

      const sortedPosts = (response.data.posts || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
      setError("Failed to load profile.");
      setUser(null);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  if (loading) return <div className="text-center mt-6">Loading profile...</div>;

  if (error) return <div className="text-red-500 mt-6 text-center">{error}</div>;

  if (!user) return <div className="text-gray-500 text-center mt-6">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
        <p className="text-gray-600">{user?.bio || "No bio Provided."}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Profile;
