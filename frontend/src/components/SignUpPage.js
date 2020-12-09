import React, { useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
// import firebase from "firebase/app";

const SignUpPage = () => {
  const { currentUser, dispatchCurrentUser, signOut } = React.useContext(
    CurrentUserContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          label="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          Show Password
        </button>
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default SignUpPage;
