import React, { useContext, useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../firebase/service";
import "../../styles/sidebar.scss";
import UserContext from "../../context/UserContext";
import User from "./user";
import Suggestions from "./suggestions";

function Sidebar() {
  const [profiles, setProfiles] = useState()
  const {user: {userId, following, username, fullName, imageUrl}} = useContext(UserContext)
  

  useEffect(() => {
    async function suggestedProfiles() {
      const Profiles = await getSuggestedProfiles(following);
      setProfiles(Profiles);
    }
    if(following){
      suggestedProfiles();
    }
  }, [following]);

  
  return (
    <div className="sidebar">
      <User username={username} fullName={fullName} imageUrl={imageUrl} />
      <Suggestions profiles={profiles} userId={userId}/>
    </div>
  );
}

export default Sidebar;
