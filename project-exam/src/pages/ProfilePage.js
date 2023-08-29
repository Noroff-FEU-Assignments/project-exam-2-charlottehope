import React, { useEffect, useState } from "react";
import useProfiles from "../hooks/useProfiles";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/posts/PostCard";
import Breadcrumbs from "../components/Breadcrumbs";
import HandleBrokenBanner, {
  fallbackBanner,
} from "../components/images/HandleBrokenBanner";
import HandleBrokenAvatar, {
  fallbackAvatar,
} from "../components/images/HandleBrokenAvatar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    profile,
    loading,
    fetchProfile,
    followProfile,
    unfollowProfile,
    isFollowing,
    checkFollowingStatus,
    setIsFollowing,
  } = useProfiles();

  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = `konnected | ${name}'s profile`;
    fetchProfile(name);
    fetchPosts(name);

    const followingProfiles = JSON.parse(
      localStorage.getItem("followingProfiles") || "[]"
    );
    const isUserFollowing = followingProfiles.includes(name);

    setIsFollowing(isUserFollowing);

    checkFollowingStatus(name);
  }, [name, fetchProfile, checkFollowingStatus, setIsFollowing]);

  const fetchPosts = async (name) => {
    try {
      const response = await fetch(`/social/profiles/${name}/posts`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  if (loading || profile === null) {
    return <p>Loading...</p>;
  }

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`, {
      state: { fromTitle: `${name}'s profile` },
    });
  };

  return (
    <div className="container mt-4 profile">
      <Breadcrumbs title={`${name}'s profile`} />
      <div className="d-flex flex-column align-items-center mb-5">
        <img
          src={profile.banner || fallbackBanner}
          className="img-fluid banner-photo"
          alt={`${profile.name}'s banner`}
          onError={HandleBrokenBanner}
        />
      </div>
      <div className="card profile-card">
        <div className="card-body">
          <h2 className="card-title">{profile.name}</h2>
          <img
            src={profile.avatar || fallbackAvatar}
            alt={`${profile.name}'s avatar`}
            className="rounded-circle avatar-photo"
            onError={HandleBrokenAvatar}
          />
          <div className="d-flex flex-column align-items-center mb-5">
            <h5>{profile.email}</h5>
            <button
              className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`}
              onClick={
                isFollowing
                  ? () => unfollowProfile(name)
                  : () => followProfile(name)
              }
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      {Array.isArray(posts) && posts.length > 0 ? (
        <>
          <h3>Posts by {name}</h3>
          <div className="card-deck">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostClick={handlePostClick}
              />
            ))}
          </div>
        </>
      ) : (
        <h3>No posts by {name}</h3>
      )}
    </div>
  );
};

export default ProfilePage;
