import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { getUserById, updateFollowedUserFollowers, updateLoggedInUserFollowing } from "../../firebase/service";
import "../../styles/sidebar.scss";

function SuggestedProfiles({userId, profileUserId, username}) {
  const { setActiveUser} = useContext(UserContext)
  async function handleFollowUser() {
    await updateLoggedInUserFollowing(userId, profileUserId, false);
    await updateFollowedUserFollowers(userId, profileUserId, false);
    const user = await getUserById(userId)
    setActiveUser(user)
    
  }
  return (
    
          <div className="sidebar__suggested">
            <div className="sidebar__suggestedProfile">
              <img
                src=""
                alt="Profile"
                onError={(e) => {
                  e.target.src = `/images/default.png`;
                }}
              />
              <div className="sidebar__suggestedUsername">
                <p>{username}</p>
                <p className="suggestedForYou">Suggested for you</p>
              </div>
            </div>
            <div className="sidebar__follow">
              <button onClick={handleFollowUser}>Follow</button>
            </div>
          </div>
  );
}

export default SuggestedProfiles;
