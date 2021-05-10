import React, { useContext, useEffect, useState } from "react";
import { getSuggestedProfiles, getSuggestedProfilesForNewUser } from "../../firebase/service";
import "../../styles/sidebar.scss";
import UserContext from "../../context/UserContext";
import User from "./user";
import Suggestions from "./suggestions";

function Sidebar({showUser}) {
  const [profiles, setProfiles] = useState()
  const {user: {userId, following, username, fullName, imageUrl}} = useContext(UserContext)
  

  useEffect(() => {
    async function suggestedProfiles() {
      
      const Profiles = await getSuggestedProfiles(userId,following);
      setProfiles(Profiles);
    }

    async function SuggestedProfilesForNewUser() {
      if(userId){
      const Profiless = await getSuggestedProfilesForNewUser(userId);
      setProfiles(Profiless);}
    }

    if(following && following.length){
       return suggestedProfiles();
    }else {
      return SuggestedProfilesForNewUser()
    }
  }, [userId,following]);

  
  return (
    <div className="sidebar">
      {showUser && <User username={username} fullName={fullName} imageUrl={imageUrl} />}
      <Suggestions profiles={profiles} userId={userId}/>
    </div>
  );
}

export default Sidebar;
