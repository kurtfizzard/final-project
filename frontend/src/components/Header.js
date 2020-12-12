import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { AiFillBackward } from "react-icons/ai";
import { CurrentUserContext } from "./reducers/userReducer";

const Header = () => {
  const { currentUser, signOut } = useContext(CurrentUserContext);
  let history = useHistory();

  console.log(currentUser);

  return (
    <Wrapper>
      <HeaderLink onClick={() => history.goBack()}>
        <AiFillBackward color="FCA311" size="2em" />
        <ButtonText>Back</ButtonText>
      </HeaderLink>
      <HeaderLink to="/">
        <FaHome color="FCA311" size="2em" />
        <ButtonText>Home</ButtonText>
      </HeaderLink>
      <HeaderLink to="/search">
        <FaSearch color="FCA311" size="2em" />
        <ButtonText>Search</ButtonText>
      </HeaderLink>
      {/* <HeaderLink to="/profile"> */}
      <HeaderLink
        onClick={() => history.push(`/profile/${currentUser.user.uid}`)}
      >
        <FaUser color="FCA311" size="2em" />
        <ButtonText>Profile</ButtonText>
      </HeaderLink>
      {currentUser.user ? (
        <HeaderLink onClick={signOut}>
          <FaSignOutAlt color="FCA311" size="2em" />
          <ButtonText>Sign Out</ButtonText>
        </HeaderLink>
      ) : (
        <HeaderLink to="/signin">
          <FaSignInAlt color="FCA311" size="2em" />
          <ButtonText>Sign In</ButtonText>
        </HeaderLink>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  background: white;
  display: flex;
  height: 10%;
  justify-content: space-between;
  margin-bottom: 5%;
  padding: 2%;
`;

const HeaderLink = styled(Link)`
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonText = styled.p`
  font-size: 75%;
`;

export default Header;
