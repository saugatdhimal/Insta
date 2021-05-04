import React, { useContext, useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../firebase/service";
import "../../styles/sidebar.scss";
import Skeleton from 'react-loading-skeleton'
import SuggestedProfiles from "./suggestedProfiles";
import UserContext from "../../context/UserContext";

function Sidebar() {
  const [profiles, setProfiles] = useState()
  const {activeUser} = useContext(UserContext)
  

  useEffect(() => {
    async function suggestedProfiles() {
      const Profiles = await getSuggestedProfiles(activeUser.userId, activeUser.following);
      setProfiles(Profiles);
    }
    if(activeUser.userId && activeUser.following){
      suggestedProfiles();
    }
  }, [activeUser.userId, activeUser.following]);

  
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__topLeft">
          <img
            src=""
            alt="Profile"
            onError={(e) => {
              e.target.src = `/images/default.png`;
            }}
          />
          <div>
            <p className="sidebar__username">{activeUser?.username}</p>
            <p className="sidebar__fullname">{activeUser?.fullName}</p>
          </div>
        </div>
        <div className="sidebar__topRight">
          <button>Switch</button>
        </div>
      </div>
      <div className="sidebar__suggestions">
        <p className="suggestionsForYou">Suggestions For You</p>
        {!profiles ? <Skeleton count={4} height={50} /> : profiles.map((item) => (
          <SuggestedProfiles userId={activeUser.userId} profileUserId={item.userId} username={item.username} key={item.userId}/>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
