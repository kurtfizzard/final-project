import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <h1>Welcome to My App!</h1>
      <p>
        This app is designed to use the Discogs API to access albums and allow
        users to leave reviews.
      </p>
      <p>
        Search for an album or search for an artist and browse their albums,
        then leave a review.
      </p>
      <p>
        Reviews for a particular album appear on that album's release page and
        you can navigate to the reviewer's profile to see other albums they've
        reviewed.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Home;
