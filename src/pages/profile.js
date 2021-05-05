import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FallbackLoading from "../components/fallbackLoading";
import Header from "../components/header";
import UserContext from "../context/UserContext";
import { db, storage } from "../firebase/firebase";
import { getUserById, getUserByUsername } from "../firebase/service";
import { NOT_FOUND } from "../routes";
import "../styles/profile.scss";

function Profile({ user }) {
  const { setActiveUser } = useContext(UserContext);
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  async function refreshUser() {
    const User = await getUserById(user.userId);
    setActiveUser(User);
    setProfileUser(User);
  }

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
          db.collection("users").doc(user.userId).update({
            imageUrl: downloadURL,
          });
          refreshUser();
        });
      }
    );
  };

  return profileUser ? (
    <div className="profile">
      <Header user={user} />
      <div className="profile__body">
        <div className="profile__user">
          <div className="profile__img">
            <img
              src={profileUser.imageUrl}
              alt="Profile"
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
          </div>
          <div className="profile__info">
            <div className="profile__infoTop">
              <p className="profile__username">
                {profileUser.username}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#03a7e2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </p>
              {user.userId === profileUser.userId ? (
                <>
                  <label htmlFor="file">
                    {!image ? (
                      "Change Image"
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                  <input id="file" type="file" onChange={handleChange} hidden />
                  {image && (
                    <button onClick={handleUpload} disabled={!image}>
                      Upload
                    </button>
                  )}
                </>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div className="profile__pff">
              <p>
                <span>500</span> posts
              </p>
              <p>
                <span>500</span> followers
              </p>
              <p>
                <span>500</span> following
              </p>
            </div>
            <p className="profile__fullName">{profileUser.fullName}</p>
          </div>
        </div>
        <div className="profile__post">
          <div className="profile__postTop">
            <p>posts</p>
            <p>igtv</p>
            <p>tagged</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <FallbackLoading />
  );
}

export default Profile;
