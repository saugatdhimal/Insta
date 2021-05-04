import React from "react";
import "../../styles/postHeader.scss";

function PostHeader() {
  return (
    <div className="postHeader">
      <div className="postHeader__profile">
        <img
          src=""
          alt="profile"
          onError={(e) => {
            e.target.src = `/images/default.png`;
          }}
        />
        <p>username</p>
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
