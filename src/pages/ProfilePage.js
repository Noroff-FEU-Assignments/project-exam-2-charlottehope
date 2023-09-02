import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProfiles from "../hooks/useProfiles";
import PostCard from "../components/posts/PostCard";
import Breadcrumbs from "../components/Breadcrumbs";
import HandleBrokenBanner, {
  fallbackBanner,
} from "../components/images/HandleBrokenBanner";
import HandleBrokenAvatar, {
  fallbackAvatar,
} from "../components/images/HandleBrokenAvatar";

const ProfilePage = () => {
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
  const navigate = useNavigate();
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const title = `konnected | ${name}'s profile`;
    document.title = title;
    fetchProfile(name);

    const followingProfiles = JSON.parse(
      localStorage.getItem("followingProfiles") || "[]"
    );
    setIsFollowing(followingProfiles.includes(name));

    fetchPosts(name);
    checkFollowingStatus(name);
  }, [name, fetchProfile, checkFollowingStatus, setIsFollowing]);

  const fetchPosts = async (profileName) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/profiles/${profileName}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch posts");

      setPosts(await response.json());
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const handleFollowClick = () =>
    isFollowing ? unfollowProfile(name) : followProfile(name);

  if (loading || !profile) return <p>Loading...</p>;

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
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>
      {posts.length ? (
        <>
          <h3>Posts by {name}</h3>
          <div className="card-deck">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostClick={() =>
                  navigate(`/posts/${post.id}`, {
                    state: { fromTitle: `${name}'s profile` },
                  })
                }
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
