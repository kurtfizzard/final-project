import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import LikeButton from "./LikeButton";
import ReviewRating from "./ReviewRating";
import Loading from "./Loading";

const LargeReview = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [currentReview, setCurrentReview] = useState(null);
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    currentReview?.likes
      ? currentReview.likes.includes(currentUser.user._id)
      : false
  );
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCurrentReview(res.data);
      });
  }, [isLikedbyCurrentUser]);

  const likeReview = () => {
    fetch(`http://localhost:8000/reviews/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        currentUserUID: currentUser.user._id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLikedbyCurrentUser(!isLikedbyCurrentUser);
      });
  };

  const handleFollow = () => {
    fetch(`http://localhost:8000/user/follow/${currentReview.uid}`, {
      method: "POST",
      body: JSON.stringify({
        currentUserUID: currentUser.user._id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLikedbyCurrentUser(!isLikedbyCurrentUser);
      });
  };

  if (!currentUser || !currentReview) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const {
    artists,
    date,
    images,
    likeCount,
    likes,
    name,
    rating,
    releaseId,
    release_date,
    review,
    uid,
    username,
  } = currentReview;

  const size = "2em";
  return (
    <Wrapper>
      <Header
        onClick={() => {
          history.push(`/profile/${uid}`);
        }}
      >
        <Author>{username}</Author> <span>{date}</span>
      </Header>
      <ReleaseInfo>
        {artists[0].name} - {name} ({release_date.slice(0, 4)})
      </ReleaseInfo>
      <CoverPhoto
        src={images[1].url}
        onClick={() => history.push(`/release/${releaseId}`)}
      />
      <ReviewRating rating={rating} size={size} />
      <Review>{review}</Review>
      <LikeButton
        isLikedbyCurrentUser={currentReview.likes.includes(
          currentUser.user._id
        )}
        likeCount={likeCount}
        likeReview={likeReview}
      />
      <button onClick={handleFollow}>FOLLOW</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
  width: 90%;
`;

const Author = styled.span`
  /* font-size: 1.2em; */
  font-weight: bold;
`;

const ReleaseInfo = styled.p`
  margin-bottom: 2%;
`;

const CoverPhoto = styled.img`
  margin-bottom: 2%;
`;

const Review = styled.p`
  margin-bottom: 2%;
  margin-top: 2%;
  text-align: center;
  width: 90%;
`;

export default LargeReview;
