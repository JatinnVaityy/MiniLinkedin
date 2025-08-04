import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  if (!post.author) {
    return (
      <article className="bg-white shadow rounded-lg p-5 mb-5 border border-red-200">
        <p className="text-red-600 font-semibold mb-2">Author info not available</p>
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
        <time className="block mt-3 text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </time>
      </article>
    );
  }

  return (
    <article className="bg-white shadow rounded-lg p-5 mb-5 border border-gray-200 hover:shadow-md transition-shadow">
      <header className="flex items-center justify-between mb-3">
        <Link
          to={`/profile/${post.author._id}`}
          className="text-blue-600 font-semibold hover:underline truncate max-w-xs"
          title={post.author.name}
        >
          {post.author.name}
        </Link>
        <time className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </time>
      </header>
      <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
    </article>
  );
};

export default PostCard;
