import React from "react";
import { Link } from "react-router-dom";

function User({ username, fullName, imageUrl }) {
  return (
    <div className="sidebar__top">
      <div className="sidebar__topLeft">
        <Link to={`/p/${username}`}>
          <img
            src={imageUrl}
            alt="Profile"
            onError={(e) => {
              e.target.src = `/images/default.png`;
            }}
          />
        </Link>
        <div>
          <Link to={`/p/${username}`}>
            <p className="sidebar__username">{username}</p>
            <p className="sidebar__fullname">{fullName}</p>
          </Link>
        </div>
      </div>
      <div className="sidebar__topRight">
        <button>Switch</button>
      </div>
    </div>
  );
}

export default User;
