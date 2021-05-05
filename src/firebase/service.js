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
  const result = await db.collection("users").limit(5).get();

  return result.docs
    .map((user) => user.data())
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function getFollowedProfiles(userId, following) {
  const result = await db.collection("users").limit(5).get();
  
  return result.docs
    .map((user) => user.data())
    .filter(
      (profile) =>
        profile.userId !== userId && following.includes(profile.userId)
    );
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
