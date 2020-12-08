import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const range = (num) => {
  let array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
};

const ReleasePageReview = ({ props }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    _id,
    date,
    displayName,
    likeCount,
    likes,
    rating,
    releaseId,
    review,
  } = props;
  let history = useHistory();
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    likes.includes(currentUser.user.uid)
  );

  console.log(props);

  // THE REVIEW NEEDS TO BE ABLE TO NAVIGATE TO THE WRITER'S PROFILE

  // NEED TO TRIGGER A RERENDER

  useEffect(() => {}, [isLikedbyCurrentUser]);

  const likeReview = () => {
    fetch(`http://localhost:8000/reviews/${_id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        currentUserUID: currentUser.user.uid,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLikedbyCurrentUser(likes.includes(currentUser.user.uid));
      });
  };

  return (
    <Wrapper onClick={() => history.push(`/releasepage/${releaseId}`)}>
      <p>
        {displayName} - {date}
      </p>
      <p>{review}</p>
      <RatingDiv>
        {range(5).map((num) => {
          return num <= rating ? <AiFillStar /> : <AiOutlineStar />;
        })}
      </RatingDiv>
      <LikeButtonDiv>
        <LikeButton
          onClick={(e) => {
            e.preventDefault();
            likeReview();
          }}
        >
          {isLikedbyCurrentUser ? <FaHeart /> : <FaRegHeart />}
        </LikeButton>
        <p>{likeCount}</p>
      </LikeButtonDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid blue;
  margin-bottom: 2%;
`;

const RatingDiv = styled.div`
  display: flex;
`;

const LikeButton = styled.button`
  border: none;
`;

const LikeButtonDiv = styled.div`
  display: flex;
`;

export default ReleasePageReview;
