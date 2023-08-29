import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import PostCard from "../components/posts/PostCard";

const MyProfilePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    banner: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "konnected | My profile";
    const storedProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile({
        name: storedProfile.name,
        email: storedProfile.email,
        avatar: storedProfile.avatar,
        banner: storedProfile.banner,
      });
      fetchPosts(storedProfile.name);
    }
  }, []);

  const fetchPosts = async (name) => {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch(`/social/profiles/${name}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setPosts(data);
    } else {
      setPosts([]);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    onLogout();
    navigate("/login", { replace: true });
  };

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");

    try {
      const response = await fetch(`/social/profiles/${profile.name}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: profile.avatar,
          banner: profile.banner,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setProfile((prevState) => ({
          ...prevState,
          avatar: responseData.avatar,
          banner: responseData.banner,
        }));
        const updatedProfile = {
          ...JSON.parse(sessionStorage.getItem("userProfile")),
          avatar: responseData.avatar,
          banner: responseData.banner,
        };
        sessionStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 2000);
      } else {
        setUpdateSuccess(false);
      }
    } catch (error) {
      console.error("There was an error updating the profile:", error);
      setUpdateSuccess(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { fromTitle: "My profile" } });
  };

  return (
    <div className="container mt-4 profile">
      <div className="d-flex flex-column align-items-center mb-5">
        <img
          src={profile.banner}
          className="img-fluid banner-photo"
          alt={`${profile.name}'s banner`}
        />
      </div>
      <div className="card profile-card">
        <div className="card-body">
          <h2 className="card-title">Hello, {profile.name}!</h2>
          <img
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            className="rounded-circle avatar-photo"
          />
          <h5>{profile.email}</h5>
          <div className="d-flex flex-column align-items-center mb-5">
            <form onSubmit={handleSubmit} className="w-70 profile-photos">
              <div className="mb-3">
                <label htmlFor="avatar">Avatar photo URL</label>
                <input
                  type="text"
                  id="avatar"
                  value={profile.avatar}
                  onChange={(e) =>
                    setProfile({ ...profile, avatar: e.target.value })
                  }
                  className="form-control"
                  placeholder="Avatar URL"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="banner">Banner photo URL</label>
                <input
                  type="text"
                  id="banner"
                  value={profile.banner}
                  onChange={(e) =>
                    setProfile({ ...profile, banner: e.target.value })
                  }
                  className="form-control"
                  placeholder="Banner URL"
                />
              </div>
              {updateSuccess && (
                <p className="update-success">Profile updated!</p>
              )}
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>
      </div>

      <h3>My Posts</h3>
      <div className="card-deck">
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard key={post.id} post={post} onPostClick={handlePostClick} />
          ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
