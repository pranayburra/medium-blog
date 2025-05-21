import React, { useState, useEffect } from "react";
import { useBlog } from "../hooks";
import { useParams, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import AvatarCard from "../components/Avatar";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Comment {
  id: number;
  content: string;
  user: {
    name: string;
  };
  createdAt: string;
}

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, blog } = useBlog({ id: id! });
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      // Fetch likes count and status
      fetchLikes();
      // Fetch comments
      fetchComments();
    }
  }, [blog]);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/interactions/${id}/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLikesCount(response.data.likesCount);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/interactions/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/interactions/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked(!isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/interactions/${id}/comment`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton variant="rectangular" height={120} className="rounded-lg mb-6" />
            <div className="space-y-4">
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="90%" height={24} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog not found</h1>
          <button
            onClick={() => navigate("/blogs")}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="pt-20 px-4">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <AvatarCard name={blog.author.name || "Anonymous"} />
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {blog.author.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              {blog.content}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? "text-yellow-500 hover:bg-yellow-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isLiked ? "scale-110" : ""
                  }`}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className={`mt-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  isSubmitting || !newComment.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <AvatarCard name={comment.user.name} />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
