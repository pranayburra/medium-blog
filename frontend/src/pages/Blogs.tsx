import React from "react";
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import useBlogs from "../hooks";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


type Blog = {
  author: { name: string };
  title: string;
  content: string;
  id: string;
  publishedDate: string;
  // Add other fields as needed
};

const Blogs = () => {
  const { loading, blogs } = useBlogs() as { loading: boolean; blogs: Blog[] };
  console.log(blogs);
  

  return (
    <div>
      <Appbar />
      {loading ? (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Show 3 skeleton blog cards as placeholders */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full max-w-3xl p-4">
            <Skeleton variant="rectangular" height={120} className="rounded-lg" />
            <div className="pt-4">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          </div>
        ))}
      </div>
      ) : (
      <div className=" ">
        <div className="flex flex-col items-center   justify-center">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex flex-col justify-center p-4">
              <BlogCard
                id={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate="2023-10-01"
              />
            </div>
          ))}
        </div>
      </div>)}
    </div>
  )
};

{
  /* <div className="flex flex-col justify-center p-4">
          <BlogCard
            authorName="John Doe"
            title="My First Blog"
            content="This is the content of my first blog. It is very interesting and informative."
            publishedDate="2023-10-01"
          />
          <BlogCard
            authorName="John Doe"
            title="My First Blog"
            content="This is the content of my first blog. It is very interesting and informative."
            publishedDate="2023-10-01"
          />
          <BlogCard
            authorName="John Doe"
            title="My First Blog"
            content="This is the content of my first blog. It is very interesting and informative."
            publishedDate="2023-10-01"
          />
        </div> */
}

export default Blogs;
