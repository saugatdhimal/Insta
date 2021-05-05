import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FallbackLoading from "../components/fallbackLoading";
import Header from "../components/header";
import { getUserByUsername } from "../firebase/service";
import { NOT_FOUND } from "../routes";
import '../styles/profile.scss'

function Profile({ user }) {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const User = await getUserByUsername(username);
      if (User) {
        setProfileUser(User);
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
              src=""
              alt="Profile"
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
            <label htmlFor="file" >Change Profile Image</label>
            <input id="file" type="file" style={{display: 'none'}}/>
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
