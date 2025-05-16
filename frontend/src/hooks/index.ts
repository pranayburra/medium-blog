import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
  // const [loading, setLoading] = useState(true);
  // const [blog, setBlog] = useState<Blog>();

  const fetchBlog =
    async () => {
      const response=await axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      return response.data;
    }
    const {data: blog,isLoading: loading} = useQuery({
      queryKey: ["blog", id],
      queryFn: fetchBlog
    }
    )
    

  return { loading, blog };
};

// Bulk blogs hook
const useBlogs = () => {
  const fetchBlogs = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.blogs;
  };

  const {
    data: blogs = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    // staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return {
    loading,
    blogs,
    error,
  };
};

export default useBlogs;
