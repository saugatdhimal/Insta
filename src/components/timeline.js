import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getFollowedProfiles } from "../firebase/service";
import "../styles/timeline.scss";
import Post from "./post";

function Timeline() {
  const [followedProfiles, setFollowedProfiles] = useState();
  const {
    user: { following, username },
  } = useContext(UserContext);

  useEffect(() => {
    document.title = "Instagram";
    async function followedProfiles() {
      const FollowedProfiles = await getFollowedProfiles(following);
      setFollowedProfiles(FollowedProfiles);
    }

    if (following && following.length) {
      followedProfiles();
    } else {
      setFollowedProfiles(following)
    }
  }, [following]);
  return (
    <div className="timeline">
      <div className="timeline__top">
        {!followedProfiles ? (
          <div className="timeline__profileSkeleton">
            <Skeleton
              circle
              count={7}
              height={60}
              width={60}
              style={{ marginRight: "21px" }}
            />
            <Skeleton
              circle
              count={7}
              width={60}
              style={{ marginRight: "21px" }}
            />{" "}
          </div>
        ) : followedProfiles.length < 1 ? <p>Welcome to Instagram , You haven't followed anyone, Follow others to see their Posts.</p> : (
          followedProfiles.map((profile) => (
            <div className="timeline__profileImg" key={profile.userId}>
              <Link to={`/p/${profile.username}`}>
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = `/images/default.png`;
                  }}
                />
                <p>{profile.username}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="timeline__post">
        <Post following={following} username={username}/>
      </div>
    </div>
  );
}

export default Timeline;
