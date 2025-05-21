import React from 'react';
import { personBlogs } from "../hooks/index";
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';

const PersonalBlogs = () => {
  const navigate = useNavigate();
  const { loading, data, error } = personBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-600 text-lg mb-4">Error loading blogs: {error.message}</div>
        <button
          onClick={() => navigate('/signin')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign in to view your blogs
        </button>
      </div>
    );
  }

  if (!data || !data.blogs || data.blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-gray-600 text-lg mb-4">No blogs found.</div>
        <button
          onClick={() => navigate('/publish')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Write your first blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Your Blogs</h1>
      <div className="space-y-6">
        {data.blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={String(blog.id)}
            authorName={data.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            createdAt={new Date(blog.createdAt)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalBlogs;