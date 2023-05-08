import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [flag, setFlag] = useState(true);
  return (
    <>
      {/* <div className="auth"> */}
        <div className="auth-container">
          <div className="auth-buttons">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{width:"200px", height:"30px", fontSize:"large"}}
              onClick={() => {
                setFlag(true);
              }}
            >
              {" "}
              Login
              {"   "}
            </button>
            <button
              type="button"
              style={{width:"200px", height:"30px", fontSize:"large"}}
              className="btn btn-primary"
              onClick={() => {
                setFlag(false);
              }}
            >
              {" "}
              Register{" "}
            </button>
          </div>
          {flag ? (
            <>
              <Login />
            </>
          ) : (
            <>
              <Register />
            </>
          )}
        </div>
      {/* </div> */}
    </>
    // <div className="auth">
    //   <Login />
    //   <Register />
    // </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`/api/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={handleSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/auth/register`, {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={handleSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    // <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    // </div>
  );
};
