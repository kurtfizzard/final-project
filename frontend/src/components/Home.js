import React from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import StarRatingBar from "./StarRatingBar";

const Home = () => {
  const {
    currentUser,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    signUp,
  } = React.useContext(CurrentUserContext);
  return (
    <Wrapper>
      <button onClick={signUp}>Sign Up</button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Home;
