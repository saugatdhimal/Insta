import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { auth } from "../firebase/firebase";
import { DASHBOARD, LOGIN, SIGN_UP } from "../routes";
import "../styles/header.scss";

function Header({ user }) {
  const {
    user: { username, imageUrl },
  } = useContext(UserContext);
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={DASHBOARD}>
            <img src="/images/logo.png" alt="instagram logo" />
          </Link>
        </div>

        {user ? (
          <div className="header__online">
            <Link to={DASHBOARD}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            {!imageUrl ? (
              <Skeleton circle count={1} height={30} width={30} />
            ) : (
              <Link to={`/p/${username}`}>
                <img
                  src={imageUrl}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = `/images/default.png`;
                  }}
                />
              </Link>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => auth.signOut()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        ) : (
          <div className="header__button">
            <Link to={LOGIN}>
              <button className="header__login">Login</button>
            </Link>
            <Link to={SIGN_UP}>
              <button className="header__signup">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
