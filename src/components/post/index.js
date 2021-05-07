import React, { useEffect, useState } from "react";
import { getfollowingUsersPosts } from "../../firebase/service";
import PostHeader from "./postHeader";
import Image from "./image";
import Icons from "./icons";
import Comment from "./comment";

function Post({ following, username }) {
  const [followingUsersPosts, setFollowingUsersPosts] = useState("");
  useEffect(() => {
    let mount = true;
    async function letsGetFollowingUsersPosts() {
      if (following) {
        const posts = await getfollowingUsersPosts(following);
        setFollowingUsersPosts(posts);
      }
    }
    if (mount) {
      letsGetFollowingUsersPosts();
    }

    return () => {
      mount = false;
      setFollowingUsersPosts("");
    };
  }, [following]);
  return (
    <div className="post">
      {followingUsersPosts &&
        followingUsersPosts.map((post) => (
          <div className="post__cont" key={post.dateCreated}>
            <PostHeader username={post.username} imageSrc={post.profileImageUrl}/>
            <Image imageSrc={post.postImageUrl} />
            <Icons username={username} docId={post.docId} likes={post.likes}/>
            <Comment postUsername={post.username} caption={post.caption} allComments={post.comments} username={username} docId={post.docId}/>
          </div>
        ))}
    </div>
  );
}

export default Post;
