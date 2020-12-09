import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ isLikedbyCurrentUser, likeCount, likeReview }) => {
  return (
    <Wrapper>
      <HeartButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          likeReview();
        }}
      >
        {isLikedbyCurrentUser ? <FaHeart /> : <FaRegHeart />}
      </HeartButton>
      <p>{likeCount}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const HeartButton = styled.button`
  border: none;
`;

export default LikeButton;
