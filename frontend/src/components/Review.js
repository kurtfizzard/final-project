import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import LikeButton from "./LikeButton";
import ReviewRating from "./ReviewRating";

const Review = ({ props }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    artists,
    date,
    _id,
    likeCount,
    likes,
    rating,
    releaseId,
    review,
    title,
    year,
  } = props;
  let history = useHistory();
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    likes.includes(currentUser.user.uid)
  );

  console.log(props);

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
    <Wrapper onClick={() => history.push(`/release/${releaseId}`)}>
      <div>
        {artists[0].name} - {title} ({year})
      </div>
      <ReviewRating rating={rating} />
      <p>{review}</p>
      <p>{date}</p>
      <LikeButton
        isLikedbyCurrentUser={isLikedbyCurrentUser}
        likeCount={likeCount}
        likeReview={likeReview}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Review;
