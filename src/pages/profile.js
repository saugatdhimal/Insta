import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FallbackLoading from "../components/fallbackLoading";
import Footer from "../components/footer";
import Header from "../components/header";
import ProfilePostImages from "../components/profile/profilePostImages";
import UserContext from "../context/UserContext";
import { db, storage } from "../firebase/firebase";
import {
  getUserById,
  getUserByUsername,
  getUserPosts,
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../firebase/service";
import { NOT_FOUND } from "../routes";
import "../styles/profile.scss";

function Profile({ user }) {
  const { setActiveUser } = useContext(UserContext);
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState("");
  const [followed, setFollowed] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [userPosts, setUserPosts] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let mount = true;
    async function checkUserExists() {
      const User = await getUserByUsername(username);
      if (User) {
        if (User.followers.includes(user.userId)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
        setProfileUser(User);
        document.title = `@${username} - Instagram`;
      } else {
        history.push(NOT_FOUND);
      }
    }

    async function letsGetUserPosts() {
      const userPostss = await getUserPosts(username);
      if(userPostss){
        setUserPosts(userPostss)
      }
    }

    if(mount) {
      checkUserExists();
    letsGetUserPosts();
    }

    return () => {
      mount = false
      setUserPosts('')
      setProfileUser('')
      setFollowed(false)
    };
  }, [username, history, user.userId]);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleChange2 = (event) => {
    if (event.target.files[0]) {
      setPostImage(event.target.files[0]);
    }
  };

  async function refreshUser() {
    const User = await getUserById(user.userId);
    setActiveUser(User);
    setProfileUser(User);
  }

  async function refreshUserPosts() {
    const post = await getUserPosts(username)
    if(post) {
      setUserPosts(post)
    }
  }

  async function handleToggle() {
    await updateLoggedInUserFollowing(
      user.userId,
      profileUser.userId,
      followed
    );
    await updateFollowedUserFollowers(
      user.userId,
      profileUser.userId,
      followed
    );
    setFollowed(!followed);
    const loggedUser = await getUserById(user.userId);
    const profilePageUser = await getUserById(profileUser.userId);
    setActiveUser(loggedUser);
    setProfileUser(profilePageUser);
  }

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
          setImage(null);
        });
      }
    );
  };

  const handleUpload2 = () => {
    const uploadTask = storage.ref(`postImages/${postImage.name}`).put(postImage);
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
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("posts").add({
            caption: caption,
            postImageUrl: downloadURL,
            profileImageUrl: profileUser.imageUrl,
            username: profileUser.username,
            userId: profileUser.userId,
            dateCreated: Date.now(),
            comments: [],
            likes: []
          });
          refreshUserPosts();
          setPostImage(null);
          setCreateUser(false);
          setCaption('')
        });
      }
    );
  };

  return profileUser && userPosts? (
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
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <div className="profile__button">
              {user.userId === profileUser.userId ? (
                <>
                  <label htmlFor="image">
                    {image ? image.name : "Change Image"}
                  </label>
                  <input
                    id="image"
                    type="file"
                    onChange={handleChange}
                    hidden
                  />
                  {image && (
                    <button onClick={handleUpload} disabled={!image}>
                      Upload
                    </button>
                  )}
                </>
              ) : (
                <button onClick={handleToggle}>
                  {!followed ? "Follow" : "Unfollow"}
                </button>
              )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                cursor="pointer"
                className="dot__svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <div className="profile__pff">
              <p>
                <span>500</span> posts
              </p>
              <p>
                <span>{profileUser.followers.length}</span> followers
              </p>
              <p>
                <span>{profileUser.following.length}</span> following
              </p>
            </div>
            <p className="profile__fullName">{profileUser.fullName}</p>
            {user.userId === profileUser.userId && !createUser ? (
              <button
                className="profile__cpButton"
                onClick={() => setCreateUser(true)}
              >
                Create Post
              </button>
            ) :  createUser ? (
              <div className="profile__createPost">
                <label htmlFor="createUser">{postImage ? postImage.name : 'Choose Image'}</label>
                <input type="file" id="createUser" onChange={handleChange2} hidden />
                <input type="text" placeholder="Enter a caption..." value={caption} onChange={e => setCaption(e.target.value)}/>
                <button onClick={handleUpload2} disabled={!postImage}>Upload</button>
              </div>
            ): ''}
          </div>
        </div>
        <div className="profile__post">
          <div className="profile__postTop">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              posts
            </p>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </span>
              igtv
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
              tagged
            </p>
          </div>
          <ProfilePostImages userPosts={userPosts}/>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <FallbackLoading />
  );
}

export default Profile;
