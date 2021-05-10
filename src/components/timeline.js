import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getFollowedProfiles } from "../firebase/service";
import "../styles/timeline.scss";
import Post from "./post";
import Sidebar from "./sidebar";

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
          <>
          <div className="timeline__profileSkeleton1">
            <Skeleton
              circle
              count={6}
              height={60}
              width={60}
              style={{ marginRight: "21px", overflow: 'hidden' }}
            />
            <Skeleton
              circle
              count={6}
              width={60}
              style={{ marginRight: "21px" }}
            />{" "}
          </div>
          <div className="timeline__profileSkeleton2">
          <Skeleton
              circle
              count={2}
              height={60}
              width={60}
              style={{ marginRight: "21px", overflow: 'hidden' }}
            />
            <Skeleton
              circle
              count={2}
              width={60}
              style={{ marginRight: "21px" }}
            />{" "}
        </div>
        </>
        ) : followedProfiles.length < 1 ? <p>You haven't followed anyone, Follow others to see their Posts.</p> : (
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
      <div className="timeline__suggestions">
      {following && following.length ? <Sidebar /> : ''}
      </div>
    </div>
  );
}

export default Timeline;
