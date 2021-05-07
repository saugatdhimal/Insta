import { db, FieldValue } from "./firebase";

export async function doesUsernameExist(username) {
  const result = await db
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length;
}

export async function getUserById(userId) {
  const result = await db
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const [user] = result.docs.map((item) => ({ ...item.data() }));
  return user;
}

export async function getUserByUsername(username) {
  const result = await db
    .collection("users")
    .where("username", "==", username)
    .get();
  const [user] = result.docs.map((item) => ({ ...item.data() }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await db
    .collection("users")
    .where("userId", "not-in", following)
    .limit(6)
    .get();

  return result.docs.map((item) => item.data()).filter((post) => post.userId !== userId)
}

export async function getFollowedProfiles(following) {
  const result = await db
    .collection("users")
    .where("userId", "in", following)
    .get();

  return result.docs.map((item) => item.data());
}

export async function updateLoggedInUserFollowing(
  loggedInUserId,
  profileUserId,
  isFollowingProfile
) {
  return await db
    .collection("users")
    .doc(loggedInUserId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileUserId)
        : FieldValue.arrayUnion(profileUserId),
    });
}

export async function updateFollowedUserFollowers(
  loggedInUserId,
  profileUserId,
  isFollowingProfile
) {
  return await db
    .collection("users")
    .doc(profileUserId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
}

export async function getUserPosts(username) {
  const result = await db
    .collection("posts")
    .where("username", "==", username)
    .orderBy("dateCreated", 'desc')
    .get();
  const userPosts = result.docs.map((item) => item.data());
  return userPosts;
}

export async function getfollowingUsersPosts(following) {
  const result = await db
    .collection("posts")
    .where("userId", "in", following)
    .limit(6)
    .orderBy("dateCreated", 'desc')
    .get();

  const followingUsersPosts = result.docs.map((item) => item.data());
  return followingUsersPosts;
}
