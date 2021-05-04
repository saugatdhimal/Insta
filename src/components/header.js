import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Dashboard from "../pages/dashboard";
import { PROFILE } from "../routes";
import "../styles/header.scss";

function Header({user}) {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="/images/logo.png" alt="instagram logo" />
          </Link>
        </div>

        {user ? (
          <div className="header__online">
            <Link to={Dashboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            </Link>
            <button onClick={() => auth.signOut()}>
              Sign Out
            </button>
            <Link to={PROFILE}>
            <img
              src=""
              alt="Profile"
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
            </Link>
          </div>
        ) : (
          <div className="header__button">
            <Link to="/login">
              <button className="header__login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="header__signup">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
