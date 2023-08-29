import React, { useEffect } from "react";
import useProfiles from "../hooks/useProfiles";
import { Link } from "react-router-dom";
import HandleBrokenBanner, {
  fallbackBanner,
} from "../components/images/HandleBrokenBanner";

const ProfilesPage = () => {
  const { profiles, fetchProfiles, loading, error } = useProfiles();

  useEffect(() => {
    document.title = "konnected | Profiles";

    fetchProfiles();
  }, [fetchProfiles]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Profiles</h1>
      <div className="row">
        {profiles.map((profile) => (
          <div className="col-md-4" key={profile.name}>
            <div className="card mb-4">
              <img
                src={profile.banner || fallbackBanner}
                className="card-img-top"
                alt={`${profile.name}'s banner`}
                onError={HandleBrokenBanner}
              />
              <div className="card-body">
                <h4 className="card-title">{profile.name}</h4>
                <Link
                  to={`/profiles/${profile.name}`}
                  className="btn btn-primary"
                >
                  View Profile
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
