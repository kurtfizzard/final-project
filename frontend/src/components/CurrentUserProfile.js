import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import { CurrentUserContext } from "./reducers/userReducer";
import Loading from "./Loading";

const CurrentUserProfile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/user/${currentUser.user.uid}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  if (currentUser.loading === true) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    const { username } = currentUser.user;

    return (
      <Wrapper>
        <Username>{username}</Username>
        <Container>
          {reviews.reverse().map((review) => {
            return <Review key={Math.random()} props={review} />;
          })}
        </Container>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 2%;
`;

const Container = styled.div`
  width: 80%;
`;

export default CurrentUserProfile;
