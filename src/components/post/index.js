import React, { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../../firebase/service";
import PostHeader from "./postHeader";
import Image from "./image";
import Icons from "./icons";
import Comment from "./comment";

function Post({ username }) {
  const [userPosts, setUserposts] = useState("");
  useEffect(() => {
    let mount = true;
    async function letsGetUserPosts() {
      if (username) {
        const userPostss = await getUserPosts(username);
        setUserposts(userPostss);
      }
    }
    if (mount) {
      letsGetUserPosts();
    }

    return () => {
      mount = false;
      setUserposts("");
    };
  }, [username]);
  return (
    <div className="post">
      {userPosts &&
        userPosts.map((post) => (
          <div className="post__cont">
            <PostHeader username={post.username} imageSrc={post.profileImageUrl}/>
            <Image imageSrc={post.postImageUrl} />
            <Icons />
            <Comment username={post.username} caption={post.caption}/>
          </div>
        ))}
    </div>
  );
}

export default Post;
