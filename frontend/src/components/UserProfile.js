import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import { CurrentUserContext } from "./reducers/userReducer";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviews, setReviews] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/user/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
        console.log(res);
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

export default UserProfile;
