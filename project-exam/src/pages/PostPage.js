import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentList from "../components/posts/CommentList";
import CommentForm from "../components/posts/CommentForm";
import Reactions from "../components/posts/Reactions";
import usePost from "../hooks/usePost";
import Breadcrumbs from "../components/Breadcrumbs";
import EditPost from "../components/posts/EditPost";
import DeletePost from "../components/posts/DeletePost";
import { Link } from "react-router-dom";

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
    if (post) {
      document.title = `konnected | ${post.title} | post by ${post.author.name}`;
    }
    const storedClickedSymbols = JSON.parse(
      localStorage.getItem("clickedSymbols")
    );
    if (storedClickedSymbols) {
      setClickedSymbols(storedClickedSymbols);
    }
  }, [post]);

  useEffect(() => {
    localStorage.setItem("clickedSymbols", JSON.stringify(clickedSymbols));
  }, [clickedSymbols]);

  const handleReact = async (symbol) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const hasReacted = clickedSymbols.some(
        (click) => click.symbol === symbol && click.id === id
      );

      if (!hasReacted) {
        const response = await fetch(
          `/social/posts/${id}/react/${encodeURIComponent(symbol)}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          setClickedSymbols((prevSymbols) => [...prevSymbols, { id, symbol }]);

          setReactions((prevReactions) => {
            const reactionExists = prevReactions.find(
              (r) => r.symbol === symbol
            );

            if (reactionExists) {
              return prevReactions.map((r) =>
                r.symbol === symbol ? { ...r, count: r.count + 1 } : r
              );
            } else {
              return [...prevReactions, { symbol, count: 1 }];
            }
          });
        } else {
          console.error("Error reacting to post: Response was not OK.");
        }
      }
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  const handleOptionalReact = (emoji) => {
    handleReact(emoji.native);
    setPickerVisible(false);
  };

  const handlePostUpdate = async (updatedPost) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`/social/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        setPost(updatedPost);
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handlePostDelete = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch(`/social/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate(-1);
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCommentSubmit = async (commentText) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`/social/posts/${id}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: commentText,
        }),
      });
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const { title, body, media } = post;

  return (
    <div className="container">
      <Breadcrumbs title={title} />
      <div className="card post-card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h6>
            by{" "}
            <Link to={`/profiles/${post.author.name}`} className="links">
              {post.author.name}
            </Link>
          </h6>
          {media && (
            <img src={media} className="card-img-top" alt="Post media" />
          )}
          <p className="card-description">{body}</p>
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
