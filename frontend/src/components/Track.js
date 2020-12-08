import React from "react";
import styled from "styled-components";

const Track = ({ track }) => {
  const { position, title, duration } = track;
  return (
    <Wrapper>
      <Position>
        {position}. {title}
      </Position>
      {/* <Title>{title}</Title> */}
      <Duration>{duration}</Duration>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  font-size: 0.8em;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const Position = styled.div``;

const Title = styled.div``;

const Duration = styled.div``;

export default Track;
