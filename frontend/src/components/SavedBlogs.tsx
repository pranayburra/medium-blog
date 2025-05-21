import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link } from 'react-router-dom';

interface SavedBlog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState<SavedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching saved blogs...');
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Saved blogs response:', response.data);
        setSavedBlogs(response.data.blogs);
      } catch (err: any) {
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers,
        });
        setError(err.response?.data?.error || err.message || 'Failed to fetch saved blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBlogs();
  }, []);

  if (loading) {
    return (
      <div className="p-4 min-w-[300px] max-h-[400px] overflow-y-auto">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (savedBlogs.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        No saved blogs yet
      </div>
    );
  }

  return (
    <div className="p-4 min-w-[300px] max-h-[400px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Blogs</h3>
      <div className="space-y-3">
        {savedBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 line-clamp-1">{blog.title}</h4>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.content}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <span>{blog.author.name}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedBlogs; 