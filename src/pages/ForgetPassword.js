import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBHW0kBQZMIDR2715ngfBopkWLxHe5ff0A",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            alert("Password reset request sent");
          });
        } else {
          response.json().then((data) => {
            if (data && data.error.message) {
              setError("SignUp not successful- " + data.error.message);
            } else {
              setError("Some error occured!! Please try again..");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Reset Password request not sent - " + err.message);
      });
    setEmail("");
  };
  return (
    <>
      <div>
        <form className={classes.form}>
          <h2>Forgot Password?</h2>
          <i>Enter your registered email.</i>
          <div className={classes.body}>
            <input
              type="email"
              id="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className={classes.errorMessage}>{error}</p>
          {!loading && (
            <button
              type="submit"
              onClick={passwordChangeHandler}
              className={classes.btn}>
              Send link
            </button>
          )}
          <p className={classes.para}>
            Already a user? <Link to="/login">Login</Link>
          </p>
          {loading && <h2>Submitting Data...</h2>}
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
