import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import { CurrentUserContext } from "./reducers/userReducer";
import Loading from "./Loading";

const ProfilePage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviews, setReviews] = useState([]);

  // CAN THIS DOUBLE AS A PAGE TO DISPLAY ANOTHER USER'S PROFILE?

  // HOW TO QUERY FIREBASE FOR USER INFO?

  // NEED TO INCLUDE PROFILE PICTURE

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
    const { displayName } = currentUser.user;
    console.log(currentUser);

    return (
      <Wrapper>
        <Username>{displayName}</Username>
        <Container>
          {reviews.reverse().map((review) => {
            // console.log(review);
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

export default ProfilePage;
