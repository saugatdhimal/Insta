import React from "react";
import Skeleton from "react-loading-skeleton";
import SuggestedProfiles from "./suggestedProfiles";

function Suggestions({profiles, userId}) {
  return (
    <div className="sidebar__suggestions">
      <p className="suggestionsForYou">Suggestions For You</p>
      {!profiles ? (
        <Skeleton count={6} height={50} style={{marginBottom: '10px'}}/>
      ) : (
        profiles.map((item) => (
          <SuggestedProfiles
            userId={userId}
            profileUserId={item.userId}
            username={item.username}
            imageUrl={item.imageUrl}
            key={item.userId}
          />
        ))
      )}
    </div>
  );
}

export default Suggestions;
