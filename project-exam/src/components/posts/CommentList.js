import React from "react";

const CommentList = ({ comments }) => {
  return (
    <ul className="list-group list-group-flush">
      {Array.isArray(comments) &&
        comments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            {comment.body}
          </li>
        ))}
    </ul>
  );
};

export default CommentList;
