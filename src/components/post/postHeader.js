import React from "react";
import { Link } from "react-router-dom";
import "../../styles/postHeader.scss";

function PostHeader({username, imageSrc}) {
  return (
    <div className="postHeader">
      <div className="postHeader__profile">
        <Link to={`/p/${username}`}>
        <img
          src={imageSrc}
          alt="profile"
          onError={(e) => {
            e.target.src = `/images/default.png`;
          }}
        />
        </Link>
        <Link to={`/p/${username}`}>
        <p>{username}</p>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    </div>
  );
}

export default PostHeader;
