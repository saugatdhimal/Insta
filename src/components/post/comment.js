import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, FieldValue } from "../../firebase/firebase";
import "../../styles/comment.scss";

function Comment({
  username,
  postUsername,
  caption,
  allComments,
  docId,
}) {
  const [comments, setComments] = useState(allComments);
  const [comment, setComment] = useState("");
  const [commentsSlice, setCommentsSlice] = useState(2);

  const viewMoreComments = () => {
    setCommentsSlice(commentsSlice + 2);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setComments([{ username, comment }, ...comments]);
    setComment("");
    await db
      .collection("posts")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ username, comment }),
      });
  };

  useState(() => {
    allComments.reverse()
  }, [allComments])

  return (
    <div className="comment">
      <div className="comment__display">
        <p>
          <span>{postUsername}</span> {caption}
        </p>
        {comments.length >= 2 && commentsSlice < comments.length && (
          <p onClick={viewMoreComments} className="gray">
            View more comments
          </p>
        )}
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.username}`} className="mb-1">
            <Link to={`/p/${item.username}`}>
              <span>{item.username} </span>
            </Link>
            {item.comment}
          </p>
        ))}
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
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          onClick={handleSubmitComment}
          type="button"
          disabled={comment.length < 1}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Comment;
