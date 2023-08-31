import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import PostCard from "../components/posts/PostCard";
import handleBrokenBanner, {
  fallbackBanner,
} from "../components/images/HandleBrokenBanner";
import handleBrokenAvatar, {
  fallbackAvatar,
} from "../components/images/HandleBrokenAvatar";

const MyProfilePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    banner: "",
  });
  const [posts, setPosts] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    document.title = "konnected | My profile";
    const storedProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      fetchPosts(storedProfile.name);
    }
  }, []);

  const fetchPosts = async (name) => {
    const token = sessionStorage.getItem("accessToken");
    const response = await fetch(`/social/profiles/${name}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPosts(Array.isArray(data) ? data : []);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    onLogout();
    navigate("/login", { replace: true });
  };

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
        const updatedProfile = {
          ...JSON.parse(sessionStorage.getItem("userProfile")),
          ...responseData,
        };
        sessionStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 2000);
      }
    } catch (error) {
      setUpdateSuccess(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { fromTitle: "My profile" } });
  };

  return (
    <div className="container mt-4 profile">
      <img
        src={profile.banner || fallbackBanner}
        className="img-fluid banner-photo"
        alt={`${profile.name}'s banner`}
        onError={handleBrokenBanner}
      />
      <div className="card profile-card">
        <div className="card-body">
          <h2>Hello, {profile.name}!</h2>
          <img
            src={profile.avatar || fallbackAvatar}
            alt={`${profile.name}'s avatar`}
            className="rounded-circle avatar-photo"
            onError={handleBrokenAvatar}
          />
          <h5>{profile.email}</h5>
          <form onSubmit={handleSubmit} className="w-70 profile-photos">
            <input
              type="text"
              id="avatar"
              value={profile.avatar}
              onChange={(e) =>
                setProfile({ ...profile, avatar: e.target.value })
              }
              className="form-control mb-3"
              placeholder="Avatar URL"
            />
            <input
              type="text"
              id="banner"
              value={profile.banner}
              onChange={(e) =>
                setProfile({ ...profile, banner: e.target.value })
              }
              className="form-control mb-3"
              placeholder="Banner URL"
            />
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
      <h3>My Posts</h3>
      <div className="card-deck">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onPostClick={handlePostClick} />
        ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
