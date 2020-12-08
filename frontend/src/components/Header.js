import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaMusic, FaSearch, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <Wrapper>
      <FaMusic color="FCA311" size="2em" />
      <Link to="/search">
        <FaSearch color="FCA311" size="2em" />
      </Link>
      <Link to="/profilepage">Profile</Link>
      <Link to="/loginpage">
        <FaUser color="FCA311" size="2em" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  background: #14213d;
  display: flex;
  height: 15%;
  justify-content: space-between;
  margin-bottom: 5%;
  padding: 10px;
`;

// const SearchBar = styled.input``;

export default Header;
