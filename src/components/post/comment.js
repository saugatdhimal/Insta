import React from "react";
import "../../styles/comment.scss";

function Comment({username, caption}) {
  return (
    <div className="comment">
      <div className="comment__display">
        <p><span>{username}</span> {caption}</p>
        <p className="gray">View more comments</p>
        <p><span>username </span>comments</p>
        <p><span>username </span>comments</p>
        <p><span>username </span>comments</p>
      </div>
      <div className="comment__input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <input type="text" placeholder="Add a comment..."/>
        <button>Post</button>
      </div>
    </div>
  );
}

export default Comment;
