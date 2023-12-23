import React, { useState } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimrPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("⚠️All fields are mandatory!!⚠️");
      return;
    }
    if (password !== confirmPassword) {
      setError("❌Passwords do not match❌");
      setPassword("");
      setConfimrPassword("");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHW0kBQZMIDR2715ngfBopkWLxHe5ff0A",
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
        // const data= await res.json()
        navigate("/login");
        console.log("User registered successfully");
      } else {
        const data = await res.json(); //in case the POST method fails, catch the response like this
        if (data && data.error.message) {
          setError("❌SignUp not successful- " + data.error.message + "❌");
        } else {
          setError("⚠️Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("❌Error signing up:", error + "❌");
    }
    setEmail("");
    setPassword("");
    setConfimrPassword("");
    alert("signup done");
  };

  return (
    <>
      <div className={classes.container}>
        <form className={classes.signupForm} onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-type Password"
            value={confirmPassword}
            onChange={(e) => setConfimrPassword(e.target.value)}
            required
          />
          <p className={classes.errorMessage}>{error}</p>
          {!loading && <button type="submit">Sign Up</button>}
          <p className={classes.loginLink}>
            <Link to="/login">Have an account?Login</Link>
          </p>
          {loading && <h2>Submitting Data...</h2>}
        </form>
      </div>
    </>
  );
}

export default Signup;
