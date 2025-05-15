import React from "react";
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import useBlogs from "../hooks";

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
    loading ? ( <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse space-y-4">
        <div className="bg-gray-300 h-32 w-full rounded-md"></div>
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>):  (

    <div className=" ">
      <Appbar />
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
    </div>
  ));
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
