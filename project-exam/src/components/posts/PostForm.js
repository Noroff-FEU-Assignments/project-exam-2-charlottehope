import React, { useState } from "react";

const PostForm = ({ onPostSubmit }) => {
  const [formData, setFormData] = useState({ title: "", body: "", media: "" });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostSubmit(formData);
    setFormData({ title: "", body: "", media: "" });
  };

  const placeholders = {
    title: "Title",
    body: "Description",
    media: "Image URL",
  };

  return (
    <div className="card post-form">
      <form onSubmit={handleSubmit} className="post-form">
        <h3>Write something...</h3>
        {Object.keys(formData).map((field) => (
          <div className="form-group" key={field}>
            <input
              type={field === "body" ? "textarea" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="form-control"
              placeholder={placeholders[field]}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
