import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';

interface Blog {
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  author: {
    name: string;
  };
}

// Single blog hook
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
       console.log(response.data);
        setBlog(response.data);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};

// Bulk blogs hook
const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export default useBlogs;
