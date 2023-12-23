import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("⚠️All fields are mandatory!!⚠️");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHW0kBQZMIDR2715ngfBopkWLxHe5ff0A",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        dispatch(authAction.login(data.idToken));
        localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
        localStorage.setItem("token", data.idToken);
        console.log("User LoggedIn successfully");
        navigate("/home");
      } else {
        setLoading(false);
        const data = await res.json();
        if (data && data.error.message) {
          setError("❌Login not successful- " + data.error.message + "❌");
        } else {
          setError("⚠️Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("❌Error logging in :", error, "❌");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes.container}>
      <form className={classes.loginForm} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={classes.errorMessage}>{error}</p>
        {!loading && <button type="submit">Login</button>}
        {loading && <h2>Submitting Data...</h2>}
        <div className={classes.forgotPasswordLink}>
          <Link to="/forgetpassword">Forgot Password?</Link>
        </div>
        <div className={classes.signupLink}>
          <Link to="/">
            <p>Don't have an account? Sign Up.</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
