import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import { FaSearch } from "react-icons/fa";
import { SpotifyAuthContext } from "./reducers/auth-context";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useContext(SpotifyAuthContext);

  const replaced = value.split(" ").join("+");

  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length > 2) {
      fetch(`http://localhost:8000/search/${value}`)
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.data);
        });
      /////////////////////////// SPOTIFY ///////////////////////////
      fetch(`http://localhost:8000/spotify/search`, {
        method: "POST",
        body: JSON.stringify({ token: token.token, value: value }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.results);
        });
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <SearchBar
          type="text"
          placeholder="Search by Album or Artist"
          onChange={(ev) => setValue(ev.target.value)}
        ></SearchBar>
        <Submit type="submit">
          <FaSearch color="14213d" size="1.2em" />
        </Submit>
      </Form>
      <SearchResults>
        {searchResults &&
          searchResults.map((result) => {
            return <SearchResult key={Math.random()} result={result} />;
          })}
      </SearchResults>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  width: 100vw; */
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
`;

const SearchBar = styled.input`
  border: none;
  border-radius: 5px;
  height: 2em;

  &:focus {
    border: #fca311;
  }
`;

const Submit = styled.button`
  align-items: center;
  background: #fca311;
  border: none;
  border-radius: 5px;
  display: flex;
  height: auto;
  justify-content: center;
  margin-left: 2%;
`;

const SearchResults = styled.ul``;

export default Search;
