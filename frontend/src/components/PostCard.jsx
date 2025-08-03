import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${post.author._id}`} className="text-blue-600 font-semibold hover:underline">
          {post.author.name}
        </Link>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="mt-3 text-gray-800">{post.content}</p>
    </div>
  );
};

export default PostCard;
