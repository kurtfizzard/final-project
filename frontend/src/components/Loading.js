import React from "react";
import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";

const Loading = () => {
  return (
    <Wrapper>
      <GiMusicalNotes color="black" size="5em" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  position: absolute;
  width: 100vw;
`;

export default Loading;
