import React, { useEffect, useState } from "react";
import { db, FieldValue } from "../../firebase/firebase";
import "../../styles/icons.scss";

function Icons({ username, docId, likes }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  useEffect(() => {
    if (likes.includes(username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [username, likes]);

  const handleLike = async (e) => {
    e.preventDefault()
    setLiked((liked) => !liked);
    setLikesCount((likesCount) => (liked ? likesCount - 1 : likesCount + 1));
    await db
      .collection("posts")
      .doc(docId)
      .update({
        likes: liked
          ? FieldValue.arrayRemove(username)
          : FieldValue.arrayUnion(username),
      });
  };

  return (
    <div className="icons">
      <div className="icons__all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={`${liked ? "red" : "none"}`}
          style={{color: `${liked ? 'red' : 'black'}`}}
          viewBox="0 0 24 24"
          stroke="currentColor"
          cursor="pointer"
          onClick={handleLike}
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          cursor="pointer"
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div>
        <p>{likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}</p>
      </div>
    </div>
  );
}

export default Icons;
