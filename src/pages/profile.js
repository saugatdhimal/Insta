import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FallbackLoading from "../components/fallbackLoading";
import Header from "../components/header";
import { db, storage } from "../firebase/firebase";
import { getUserByUsername } from "../firebase/service";
import { NOT_FOUND } from "../routes";
import "../styles/profile.scss";

function Profile({ user }) {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("users")
            .doc(profileUser.userId)
            .update({
              imageUrl: downloadURL
            });
        });
      }
    );
  };

  useEffect(() => {
    async function checkUserExists() {
      const User = await getUserByUsername(username);
      if (User) {
        setProfileUser(User);
        document.title = `@${username} - Instagram`;
      } else {
        history.push(NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return profileUser ? (
    <div className="profile">
      <Header user={user} />
      <div className="profile__body">
        <div className="profile__user">
          <div className="profile__img">
            <img
              src={profileUser?.imageUrl}
              alt="Profile"
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
            {user.userId === profileUser.userId ? <><label htmlFor="file">Change Profile Image</label>
            <input id="file" type="file" onChange={handleChange} hidden />
            <button onClick={handleUpload}>Upload</button></> : ''}
          </div>
          <div>
            <p>{profileUser.username}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <FallbackLoading />
  );
}

export default Profile;
