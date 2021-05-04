import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/UserContext";
import { getFollowedProfiles } from "../firebase/service";
import "../styles/timeline.scss";
import Post from "./post";

function Timeline() {
  const [followedProfiles, setFollowedProfiles] = useState();
  const { activeUser } = useContext(UserContext);

  useEffect(() => {
    async function followedProfiles() {
      const FollowedProfiles = await getFollowedProfiles(
        activeUser.userId,
        activeUser.following
      );
      setFollowedProfiles(FollowedProfiles);
    }

    if (activeUser.userId && activeUser.following) {
      followedProfiles();
    }
  }, [activeUser.userId, activeUser.following]);
  return (
    <div className="timeline">
      <div className="timeline__top">
        {!followedProfiles ? <div className="timeline__profileSkeleton">
          <Skeleton circle count={2} height={60}  width={60} style={{marginRight: '20px'}}/> 
          <Skeleton circle  count={2} width={60} style={{marginRight: '20px'}}/> </div>: 
          followedProfiles.map((profile) => (
            <div className="timeline__profileImg" key={profile.userId}>
              <img
                src=""
                alt="Profile"
                onError={(e) => {
                  e.target.src = `/images/default.png`;
                }}
              />
              <p>{profile.username}</p>
            </div>
          ))}
      </div>
      <div className="timeline__post">
        <Post />
      </div>
    </div>
  );
}

export default Timeline;
