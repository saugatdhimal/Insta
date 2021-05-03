import { auth, db, FieldValue } from "./firebase";

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
