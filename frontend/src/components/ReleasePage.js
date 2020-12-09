import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateReview from "./CreateReview";
import Loading from "./Loading";
import ReleasePageReview from "./ReleasePageReview";
import Track from "./Track";

const ReleasePage = () => {
  const [release, setRelease] = React.useState(null);
  const { id } = useParams();
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/releasebyid/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRelease(res.data);
      });
    fetch(`http://localhost:8000/reviews/release/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  // NEED TO TRIGGER A RERENDER TO UPDATE THE REVIEWS WHEN A NEW ONE IS SUBMITTED

  if (release) {
    const { artists, styles, title, tracklist, year } = release;

    return (
      <Wrapper>
        <InfoHeader>
          {artists[0].name} - {title} ({year})
        </InfoHeader>
        <Genre>Genre: {styles && styles.join(", ")}</Genre>
        <TrackList>
          {tracklist.map((track) => (
            <Track key={Math.random()} track={track} />
          ))}
        </TrackList>
        <ReviewContainer>
          <ReviewHeader>Reviews:</ReviewHeader>
          {reviews.map((review) => {
            return <ReleasePageReview key={Math.random()} props={review} />;
          })}
        </ReviewContainer>
        <CreateReview release={release} />
      </Wrapper>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoHeader = styled.p`
  font-size: 1.2em;
  margin-bottom: 3%;
`;

const Genre = styled.p`
  margin-bottom: 2%;
`;

const TrackListContainer = styled.div`
  margin-bottom: 2%;
  width: 80%;
`;

const TrackList = styled.ul`
  margin-bottom: 2%;
  width: 80%;
`;

const ReviewContainer = styled.div`
  width: 80%;
`;

const ReviewHeader = styled.p`
  margin-bottom: 2%;
`;

export default ReleasePage;
