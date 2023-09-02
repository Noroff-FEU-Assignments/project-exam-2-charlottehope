import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => (
  <ul className="list-group list-group-flush">
    {Array.isArray(comments) &&
      comments.map((comment) => (
        <li key={comment.id} className="list-group-item">
          <h6>
            <Link to={`/profiles/${comment.author.name}`} className="links">
              {comment.author.name}
            </Link>
          </h6>
          {comment.body}
        </li>
      ))}
  </ul>
);

export default CommentList;
