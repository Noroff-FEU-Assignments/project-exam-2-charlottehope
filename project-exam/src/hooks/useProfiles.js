import { useState, useEffect, useCallback } from "react";

const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowingStatus = useCallback(async (name) => {
    try {
      const response = await fetch(`/social/profiles/${name}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check following status");
      }

      const data = await response.json();
      if (data._count && data._count.followers) {
        const currentUser = sessionStorage.getItem("currentUser");
        setIsFollowing(
          data._count.followers.some((f) => f.name === currentUser)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/social/profiles", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }

      const data = await response.json();
      setProfiles(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const fetchProfile = useCallback(async (name) => {
    try {
      setLoading(true);
      const response = await fetch(`/social/profiles/${name}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const updateProfileMedia = async (name, avatar, banner) => {
    try {
      const response = await fetch(`/social/profiles/${name}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ avatar, banner }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile media");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile media:", error);
      setError("Failed to update profile media");
    }
  };

  const handleFollower = (name, isFollowing) => {
    let followingProfiles = JSON.parse(
      localStorage.getItem("followingProfiles") || "[]"
    );
    if (isFollowing) {
      followingProfiles.push(name);
    } else {
      followingProfiles = followingProfiles.filter(
        (profile) => profile !== name
      );
    }
    localStorage.setItem(
      "followingProfiles",
      JSON.stringify(followingProfiles)
    );
  };

  const followProfile = async (name) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await fetch(`/social/profiles/${name}/follow`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const data = await response.json();
        console.log("Server responded with:", data);
        throw new Error("Failed to follow profile");
      }

      const data = await response.json();
      setProfile(data);
      await fetchProfile(name);
      await checkFollowingStatus(name);
    } catch (error) {
      console.error("Error following profile:", error);
      setError("Failed to follow profile");
    }
    setIsFollowing(true);
    handleFollower(name, true);
  };

  const unfollowProfile = async (name) => {
    try {
      const response = await fetch(`/social/profiles/${name}/unfollow`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow profile");
      }

      const data = await response.json();
      setProfile(data);
      fetchProfile(name);
      checkFollowingStatus(name);
    } catch (error) {
      console.error("Error unfollowing profile:", error);
      setError("Failed to unfollow profile");
    }
    setIsFollowing(false);
    handleFollower(name, false);
  };

  return {
    profiles,
    profile,
    loading,
    error,
    isFollowing,
    fetchProfiles,
    fetchProfile,
    updateProfileMedia,
    followProfile,
    unfollowProfile,
    checkFollowingStatus,
    setIsFollowing,
  };
};

export default useProfiles;
