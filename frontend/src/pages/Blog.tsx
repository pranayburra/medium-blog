import React from "react";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import AvatarCard from "../components/Avatar";  
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const Blog = () => {
  const { id } = useParams<{
    id: string;
  }>();
  console.log(id);
  const { loading, blog } = useBlog({
    id: id!,
  });
  console.log(blog);
  if (loading) {
    return (
      <div>
        <Appbar />
     <div  className="w-full flex flex-col justify-center  p-4">
            <Skeleton variant="rectangular" height={120}  className="rounded-lg" />
            <div className="pt-4">
              <Skeleton variant="text" width="100%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          </div>
      </div>
      
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {blog &&(
        <div>
          <Appbar />
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 gap-6 p-6 w-full max-w-screen-2xl rounded shadow bg-white m-4">
              <div className="col-span-8">
                <h1 className="font-bold text-3xl mb-2">{blog.title}</h1>
                <p className="text-sm text-gray-600 mb-4">
                  Posted on 22-05-2025
                </p>
                <p>{blog.content}</p>
              </div>
              <div className="flex gap-3 mt-4 col-span-4">
                <div className="flex flex-col justify-center">
                  <AvatarCard name={blog.author.name || "Anonymous"} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase text-sm">
                    Author
                  </span>
                  <span className="text-lg font-medium">
                    {blog.author.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    random catch phrase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
};
export default Blog;
