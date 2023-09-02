import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeletePost = ({ postId, onDelete }) => {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        onDelete();
        navigate(-1);
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const renderConfirm = () => (
    <div className="delete-post">
      <p>Are you sure you want to delete this post?</p>
      <button className="btn btn-primary" onClick={handleDelete}>
        Yes, delete
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </button>
    </div>
  );

  const renderDelete = () => (
    <button className="btn btn-secondary" onClick={() => setConfirming(true)}>
      Delete post
    </button>
  );

  return <div>{confirming ? renderConfirm() : renderDelete()}</div>;
};

export default DeletePost;
