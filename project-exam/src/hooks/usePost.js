import { useState, useEffect } from "react";

const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          `/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();

        setPost(data);
        setReactions(data.reactions);
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return {
    post,
    isLoading,
    reactions,
    comments,
    setReactions,
    setComments,
    setPost,
  };
};

export default usePost;
