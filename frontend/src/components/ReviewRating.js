import React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const range = (num) => {
  let array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
};

const ReviewRating = ({ rating }) => {
  return (
    <Wrapper>
      {range(5).map((num) => {
        return num <= rating ? (
          <AiFillStar key={Math.random()} />
        ) : (
          <AiOutlineStar key={Math.random()} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default ReviewRating;
