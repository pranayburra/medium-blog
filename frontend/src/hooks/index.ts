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

interface UserBlog {
  id: number;
  title: string;
  content: string;
  publisher: boolean;
  createdAt: string;
}

interface UserData {
  name: string;
  email: string;
  blogs: UserBlog[];
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
    // console.log("data",response.data.blogs);
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
export const personBlogs = () => {
  const fetchBlogs = async (): Promise<UserData> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      throw error;
    }
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<UserData, Error>({
    queryKey: ["userBlogs"],
    queryFn: fetchBlogs,
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    loading,
    data,
    error,
  };
};



export const fetchbytitle=async (searchQuery:string)=>{
    try{
  const res=await axios.get(`${BACKEND_URL}/api/v1/blog/search/${searchQuery}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
        
      }
    })
    console.log(res.data);
    }catch(err){
      console.log(err);
    }
    
  
  }




