import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("https://minilinkedinn.onrender.com/api/posts");
    setPosts(res.data.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!content.trim()) return;

    await axios.post(
      "http://localhost:5000/api/posts",
      { content },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setContent("");
    fetchPosts();
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start a post..."
          className="w-full border border-gray-300 rounded p-3 resize-none h-24 focus:outline-blue-500"
        />
        <button
          onClick={handlePost}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
        >
          Post
        </button>
      </div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
