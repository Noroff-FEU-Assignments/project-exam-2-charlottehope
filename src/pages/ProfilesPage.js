import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProfiles from "../hooks/useProfiles";
import handleBrokenAvatar, {
  fallbackAvatar,
} from "../components/images/HandleBrokenAvatar";

const ProfilesPage = () => {
  const { profiles, fetchProfiles, loading, error } = useProfiles();

  useEffect(() => {
    document.title = "konnected | Profiles";
    fetchProfiles();
  }, [fetchProfiles]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Profiles</h1>
      <div className="row">
        {profiles.map(({ name, avatar }) => (
          <div key={name} className="col-md-6 profiles-card">
            <div className="card mb-4">
              <img
                src={avatar || fallbackAvatar}
                className="card-img-top profiles-images"
                alt={`${name}'s avatar`}
                onError={handleBrokenAvatar}
              />
              <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <Link
                  to={`/profiles/${name}`}
                  className="btn btn-primary profiles-button"
                >
                  <span className="profile-button-text">View Profile</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;
