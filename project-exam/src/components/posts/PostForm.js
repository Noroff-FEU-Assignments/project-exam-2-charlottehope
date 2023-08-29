import React, { useState } from "react";

const PostForm = ({ onPostSubmit }) => {
  const [newPost, setNewPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      body: newPost,
      media: imageUrl,
    };

    onPostSubmit(post);
    setNewPost("");
    setImageUrl("");
    setTitle("");
  };

  return (
    <div className="card post-form">
      <form onSubmit={handlePostSubmit} className="post-form">
        <h3>Write something...</h3>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <textarea
            value={newPost}
            onChange={handlePostChange}
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="form-control"
            placeholder="Image URL"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
