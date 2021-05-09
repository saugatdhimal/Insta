import React, { useEffect, useState } from "react";
import { getfollowingUsersPosts } from "../../firebase/service";
import PostHeader from "./postHeader";
import Image from "./image";
import Icons from "./icons";
import Comment from "./comment";
import Skeleton from "react-loading-skeleton";
import Sidebar from "../sidebar";

function Post({ following, username }) {
  const [followingUsersPosts, setFollowingUsersPosts] = useState();
  useEffect(() => {
    async function letsGetFollowingUsersPosts() {
      if (following && following.length) {
        const posts = await getfollowingUsersPosts(following);
        setFollowingUsersPosts(posts);
      } else {
        setFollowingUsersPosts(following)
      }
    }

    letsGetFollowingUsersPosts();

  }, [following]);
  return (
    <div className="post">
      {!followingUsersPosts ? (
        <Skeleton
          count={1}
          height={700}
          style={{ border: "1px solid #dbdbdb" }}
        />
      ) : followingUsersPosts.length < 1 ? '' : (
        followingUsersPosts.map((post) => (
          <div className="post__cont" key={post.dateCreated}>
            <PostHeader
              username={post.username}
              imageSrc={post.profileImageUrl}
            />
            <Image imageSrc={post.postImageUrl} />
            <Icons username={username} docId={post.docId} likes={post.likes} />
            <Comment
              postUsername={post.username}
              caption={post.caption}
              allComments={post.comments}
              username={username}
              docId={post.docId}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
