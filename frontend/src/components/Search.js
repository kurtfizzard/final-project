import React from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  console.log(searchResults);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length > 2) {
      fetch(`http://localhost:8000/search/${value}`)
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.data);
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
