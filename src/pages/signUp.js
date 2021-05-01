import React, { useState } from "react";
import "../styles/signup.scss";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "";
  const history = useHistory();

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__iphone">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="iphone-with-profile"
          />
        </div>
        <div className="signup__form">
          <img src="/images/logo.png" alt="instagram logo" />
          <form
            onSubmit={() =>
              console.log(username, fullName, emailAddress, password)
            }
          >
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              required={true}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
              required={true}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required={true}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
