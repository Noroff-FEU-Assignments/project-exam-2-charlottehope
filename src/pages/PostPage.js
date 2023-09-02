import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentList from "../components/posts/CommentList";
import CommentForm from "../components/posts/CommentForm";
import Reactions from "../components/posts/Reactions";
import usePost from "../hooks/usePost";
import Breadcrumbs from "../components/Breadcrumbs";
import EditPost from "../components/posts/EditPost";
import DeletePost from "../components/posts/DeletePost";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    post,
    isLoading,
    reactions,
    comments,
    setReactions,
    setComments,
    setPost,
  } = usePost(id);
  const [clickedSymbols, setClickedSymbols] = useState([]);
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    if (post)
      document.title = `konnected | ${post.title} | post by ${post.author.name}`;
    const storedSymbols = JSON.parse(localStorage.getItem("clickedSymbols"));
    if (storedSymbols) setClickedSymbols(storedSymbols);
  }, [post]);

  useEffect(() => {
    localStorage.setItem("clickedSymbols", JSON.stringify(clickedSymbols));
  }, [clickedSymbols]);

  const makeRequest = async (url, options) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    options.headers = { Authorization: `Bearer ${token}`, ...options.headers };
    return fetch(url, options);
  };

  const handleReact = async (symbol) => {
    const hasReacted = clickedSymbols.some(
      (click) => click.symbol === symbol && click.id === id
    );
    if (!hasReacted) {
      const response = await makeRequest(
        `https://api.noroff.dev/api/v1/social/posts/${id}/react/${encodeURIComponent(
          symbol
        )}`,
        { method: "PUT" }
      );
      if (response.ok) updateReactions(symbol);
    }
  };

  const handleOptionalReact = (emoji) => {
    handleReact(emoji.native);
    setPickerVisible(false);
  };

  const updateReactions = (symbol) => {
    setClickedSymbols((prev) => [...prev, { id, symbol }]);
    const reactionExists = reactions.find((r) => r.symbol === symbol);
    setReactions((prev) =>
      reactionExists
        ? prev.map((r) =>
            r.symbol === symbol ? { ...r, count: r.count + 1 } : r
          )
        : [...prev, { symbol, count: 1 }]
    );
  };

  const handlePostUpdate = async (updatedPost) => {
    const response = await makeRequest(
      `https://api.noroff.dev/api/v1/social/posts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      }
    );
    if (response.ok) setPost(updatedPost);
  };

  const handlePostDelete = async () => {
    const response = await makeRequest(
      `https://api.noroff.dev/api/v1/social/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) navigate(-1);
  };

  const handleCommentSubmit = async (text) => {
    const response = await makeRequest(
      `https://api.noroff.dev/api/v1/social/posts/${id}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      }
    );
    const data = await response.json();
    setComments((prev) => [...prev, data]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="container">
      <Breadcrumbs title={post.title} />
      <div className="card post-card">
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <h6>
            by{" "}
            <Link to={`/profiles/${post.author.name}`} className="links">
              {post.author.name}
            </Link>
          </h6>
          {post.media && (
            <img src={post.media} className="card-img-top" alt="Post media" />
          )}
          <p className="card-description">{post.body}</p>
          <div className="post-feedback">
            {sessionStorage.getItem("userProfile") &&
              JSON.parse(sessionStorage.getItem("userProfile")).name ===
                post.author.name && (
                <div className="d-flex">
                  <EditPost post={post} onUpdate={handlePostUpdate} />
                  <DeletePost postId={post.id} onDelete={handlePostDelete} />
                </div>
              )}
            <h5>Reactions:</h5>
            <Reactions
              reactions={reactions}
              handleReact={handleReact}
              clickedSymbols={clickedSymbols}
              id={id}
              handleOptionalReact={handleOptionalReact}
              isPickerVisible={isPickerVisible}
              setPickerVisible={setPickerVisible}
            />
            <h5>Comments:</h5>
            <CommentList comments={comments} />
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
