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

      const response = await axios.get(
        `https://minilinkedinn.onrender.com/api/posts/user/${id}`
      );

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

  if (loading)
    return <div className="text-center mt-8 text-lg text-gray-600">Loading profile...</div>;

  if (error)
    return <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>;

  if (!user)
    return (
      <div className="text-center mt-8 text-gray-500 font-medium">
        User not found.
      </div>
    );

  return (
    <main className="max-w-3xl mx-auto mt-8 px-4 sm:px-6">
      <section className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 truncate">{user.name}</h1>
        <p className="text-gray-600 whitespace-pre-wrap">
          {user.bio?.trim() || "Bio not available."}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </section>
    </main>
  );
};

export default Profile;
