import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Add a comment"
      />
      <button
        className="btn btn-primary add-comment"
        onClick={handleCommentSubmit}
        disabled={!commentText}
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentForm;
