import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRatingBar from "./StarRatingBar";

const Review = ({ props }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    artists,
    date,
    _id,
    likeCount,
    likes,
    releaseId,
    review,
    title,
    year,
  } = props;
  let history = useHistory();
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    likes.includes(currentUser.user.uid)
  );

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
    <Wrapper>
      <Content onClick={() => history.push(`/releasepage/${releaseId}`)}>
        <div>
          {artists[0].name} - {title} ({year})
        </div>
        <p>{review}</p>
        <p>{date}</p>
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
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Content = styled.div`
  border: 2px solid blue;
  margin-bottom: 2%;
`;

const LikeButton = styled.button`
  border: none;
`;

const LikeButtonDiv = styled.div`
  display: flex;
`;

export default Review;
