import React from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";

const LogInPage = () => {
  const { currentUser, signInWithGoogle, signOut } = React.useContext(
    CurrentUserContext
  );
  return (
    <Wrapper>
      {!currentUser.user ? (
        <button onClick={signInWithGoogle}>Login</button>
      ) : (
        <button onClick={signOut}>Logout</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default LogInPage;
