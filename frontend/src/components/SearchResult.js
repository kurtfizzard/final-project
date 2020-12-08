import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SearchResult = ({ result }) => {
  let history = useHistory();

  return (
    <Wrapper
      onClick={() => {
        result.type === "artist"
          ? history.push(`/artistpage/${result.id}`)
          : history.push(`/releasepage/${result.id}`);
      }}
    >
      {result.cover_image && <Image src={result.cover_image} />}
      <Container>
        <Title>{result.title}</Title>
        {/* {result.type === "artist" && <Type>Artist</Type>}
        {result.style && <Genre>{result.style.join(", ")}</Genre>} */}
        <Info>{result.type === "artist" ? "Artist" : "Album"}</Info>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  padding: 10px;
`;

const Image = styled.img`
  height: 100px;
  margin-right: 5%;
  width: 100px;
`;

const Container = styled.div``;

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 2%;
`;

const Info = styled.p`
  font-size: 0.9em;
`;

export default SearchResult;
