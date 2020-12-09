import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import ReviewRating from "./ReviewRating";
import LikeButton from "./LikeButton";

const ReleasePageReview = ({ props }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    _id,
    date,
    likeCount,
    likes,
    rating,
    releaseId,
    review,
    username,
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
    <Wrapper>
      <p onClick={() => history.push(`/release/${releaseId}`)}>
        {username} - {date}
      </p>
      <p>{review}</p>
      <ReviewRating rating={rating} />
      <LikeButton
        likeReview={likeReview}
        isLikedbyCurrentUser={isLikedbyCurrentUser}
        likeCount={likeCount}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid blue;
  margin-bottom: 2%;
`;

export default ReleasePageReview;
