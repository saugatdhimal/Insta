import React, { useEffect, useState } from "react";
import "../styles/login.scss";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { SIGN_UP } from "../routes";

function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Login - Instagram";
  })

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
        history.push('/') 
    } catch (error) {
      setEmailAddress("")
      setPassword("");
      setError(error.message);
    }
  }

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
          {error && <p className="login__error">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              Log In
            </button>
          </form>
          <div>
            Don't have an account? <Link to={SIGN_UP}> Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
