import React, { useState } from "react";
import "../styles/login.scss";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const history = useHistory();

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__iphone">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="iphone-with-profile"
          />
        </div>
        <div className="login__form">
          <img src="/images/logo.png" alt="instagram logo" />
          <form onSubmit={() => console.log(emailAddress, password)}>
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
              Log In
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
