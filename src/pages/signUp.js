import React, { useEffect, useState } from "react";
import "../styles/signup.scss";
import { Link, useHistory } from "react-router-dom";
import { doesUsernameExist } from "../firebase/service";
import { auth, db } from "../firebase/firebase";
import { LOGIN } from "../routes";

function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "";
  const history = useHistory();

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExist = await doesUsernameExist(username);

    if (!usernameExist) {
      try {
        await auth
          .createUserWithEmailAndPassword(emailAddress, password)
          .then((authUser) => {
            db.collection("users").doc(authUser.user.uid).set({
              userId: authUser.user.uid,
              username: username.toLowerCase(),
              fullName: fullName,
              emailAddress: emailAddress.toLowerCase(),
              following: [],
              followers: [],
              dateCreated: Date.now(),
            })
            
          });
        history.push("/");
      } catch (error) {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

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
          {error && <p className="signup__error">{error}</p>}
          <form
            onSubmit={handleSignUp}
            method="POST"
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
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={isInvalid ? "btnInvalid" : ""}
            >
              Sign Up
            </button>
          </form>
          <div>
            Already have an account? <Link to={LOGIN}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
