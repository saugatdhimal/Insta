import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function ProfilePostImages({ userPosts }) {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 100);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(userPosts.map((post) => loadImage(post.postImageUrl)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, [userPosts]);

  return (
    <div className="profile__postGrid">
      {imgsLoaded ?
        userPosts.map((post) => (
          <img src={post.postImageUrl} alt="" key={post.dateCreated} />
        )) : <><Skeleton height={300}/><Skeleton height={300}/><Skeleton height={300}/></>}
    </div>
  );
}

export default ProfilePostImages;
