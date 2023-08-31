import React, { useState } from "react";

const EditPost = ({ post, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = () => {
    onUpdate(editedPost);
    setEditing(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 2000);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const placeholders = {
    title: "Title",
    body: "Description",
    media: "Image URL",
  };

  return (
    <div>
      {editing ? (
        <div className="edit-post">
          <h3>Edit Post</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            {["title", "body", "media"].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>{placeholders[field]}</label>
                <input
                  type={field === "body" ? "textarea" : "text"}
                  className="form-control"
                  id={field}
                  name={field}
                  value={editedPost[field]}
                  onChange={handleInputChange}
                  placeholder={placeholders[field]}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary edit-button">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary edit-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button className="btn btn-secondary" onClick={() => setEditing(true)}>
          Edit post
        </button>
      )}
      {updateSuccess && (
        <h4 className="update-success">Post updated successfully!</h4>
      )}
    </div>
  );
};

export default EditPost;
