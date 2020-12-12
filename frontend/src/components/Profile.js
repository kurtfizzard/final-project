import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { useHistory, useParams } from "react-router";
import { CurrentUserContext } from "./reducers/userReducer";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  console.log(id);
  console.log(reviews);

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  if (reviews.length === 0) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <Wrapper>
        <Username>{reviews[0].username}</Username>
        <Container>
          {reviews.reverse().map((review) => {
            return (
              <CoverPhoto
                key={Math.random()}
                src={review.images[1].url}
                onClick={() => {
                  history.push(`/review/${review._id}`);
                }}
              />
            );
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
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 2%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`;

const CoverPhoto = styled.img`
  margin: 0.5%;
  width: 32%;
`;

export default Profile;
