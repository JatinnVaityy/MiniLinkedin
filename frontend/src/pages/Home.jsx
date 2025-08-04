import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://minilinkedinn.onrender.com/api/posts");
      setPosts(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    const stored = JSON.parse(localStorage.getItem("user"));
    const token = stored?.token;

    if (!token) {
      alert("You must be logged in");
      return;
    }

    if (!content.trim()) return;

    try {
      await axios.post(
        "https://minilinkedinn.onrender.com/api/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("Post failed:", err);
      alert("Failed to post. Please log in again.");
    }
  };

  return (
    <main className="max-w-3xl mx-auto mt-8 px-4 sm:px-6">
      <section className="bg-white shadow rounded-lg p-6 mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start a post..."
          className="w-full border border-gray-300 rounded-md p-4 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Post content"
        />
        <button
          onClick={handlePost}
          className="mt-4 w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          aria-label="Submit post"
        >
          Post
        </button>
      </section>

      <section>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </section>
    </main>
  );
};

export default Home;
