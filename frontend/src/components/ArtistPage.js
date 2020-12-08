import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const ArtistPage = () => {
  const [artist, setArtist] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/artist/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setArtist(res.data[0]?.artist);
          setSearchResults(res.data);
        }
      });
  }, []);

  return (
    <Wrapper>
      <ArtistName>{artist}</ArtistName>
      {searchResults &&
        searchResults.map((result) => {
          return <SearchResult key={Math.random()} result={result} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ArtistName = styled.p`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

export default ArtistPage;
