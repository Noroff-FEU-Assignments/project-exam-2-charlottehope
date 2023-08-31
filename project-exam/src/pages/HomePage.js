import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/posts/PostForm";
import PostCard from "../components/posts/PostCard";
import usePosts from "../hooks/usePosts";

const HomePage = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();

  useEffect(() => {
    document.title = "konnected | Feed";
  }, []);

  const handlePostSubmit = async (newPost) => {
    try {
      const response = await fetch("/social/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { fromTitle: "Feed" } });
  };

  return (
    <div className="container">
      <PostForm onPostSubmit={handlePostSubmit} />
      <div className="card-deck">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard key={post.id} post={post} onPostClick={handlePostClick} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
