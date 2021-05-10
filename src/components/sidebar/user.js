import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function User({ username, fullName, imageUrl }) {
  return (
    <div className="sidebar__top">
      <div className="sidebar__topLeft">
        {!imageUrl ? (
          <Link to={`/p/${username}`}>
          <img src='/images/default.png' alt=""/>
          </Link>
          // <Skeleton circle count={1} height={65} width={65} />
        ) : (
          <Link to={`/p/${username}`}>
            <img
              src={imageUrl}
              alt="Profile"
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
          </Link>
        )}
        <div>
          {!username ? (
            <Skeleton count={1} height={30} width={100} />
          ) : (
            <Link to={`/p/${username}`}>
              <p className="sidebar__username">{username}</p>
              <p className="sidebar__fullname">{fullName}</p>
            </Link>
          )}
        </div>
      </div>
      <div className="sidebar__topRight">
        <button>Switch</button>
      </div>
    </div>
  );
}

export default User;
