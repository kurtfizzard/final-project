import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Header>Welcome to My App!</Header>
      <List>
        <ListItem>
          This app uses the spotify API to access albums which allow users to
          leave reviews which other users can in turn read and like.
        </ListItem>
        <ListItem>
          Search for an artist and browse their albums, then rate and review
          them.
        </ListItem>
        <ListItem>
          A review for a particular album appear on that album's release page as
          well as that user's profile. You can navigate to the reviewer's
          profile via their review to see a list of other albums they've
          reviewed.
        </ListItem>
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 5%;
  text-align: center;
`;

const List = styled.ul`
  width: 90%;
`;

const ListItem = styled.li`
  margin-bottom: 2%;
`;

export default Home;
