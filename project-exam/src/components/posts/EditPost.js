import React, { useState } from "react";

const EditPost = ({ post, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(editedPost);
    setEditing(false);
    setUpdateSuccess(true);
    setTimeout(() => {
      setUpdateSuccess(false);
    }, 2000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditing(false);
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
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={editedPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Description</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                value={editedPost.body}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="media">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="media"
                name="media"
                value={editedPost.media}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary edit-button">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary edit-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <button className="btn btn-secondary" onClick={handleStartEditing}>
            Edit post
          </button>
        </div>
      )}
      <div>
        {updateSuccess && (
          <h4 className="update-success">Post updated successfully!</h4>
        )}
      </div>
    </div>
  );
};

export default EditPost;
