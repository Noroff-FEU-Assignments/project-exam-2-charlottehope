import React from "react";

const PostCard = ({ post, onPostClick }) => {
  return (
    <div className="card post-card">
      <div className="card-body" onClick={() => onPostClick(post.id)}>
        <h4 className="card-title">{post.title}</h4>
        {post.media && (
          <img src={post.media} className="card-img-top" alt="Post media" />
        )}
        <p className="card-description">{post.body}</p>
        <div className="card-feedback">
          <h5>Comments: {post._count?.comments || 0}</h5>
          <h5>Reactions: {post._count?.reactions || 0}</h5>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
