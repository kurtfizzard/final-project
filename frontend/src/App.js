import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ReleasePage from "./components/ReleasePage";
import CurrentUserProfile from "./components/CurrentUserProfile";
import CreateReview from "./components/CreateReview";
import Search from "./components/Search";
import ArtistPage from "./components/ArtistPage";
import SignIn from "./components/SignIn";
import GlobalStyle from "./GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import SignUpPage from "./components/SignUpPage";
import UserProfile from "./components/UserProfile";
import { SpotifyAuthContext } from "./components/reducers/auth-context";

const App = () => {
  const { token, dispatchToken } = useContext(SpotifyAuthContext);

  console.log(token);

  useEffect(() => {
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatchToken({
          type: "RECEIVE_ACCESS_TOKEN",
          token: json.access_token,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/artist/:id">
            <ArtistPage />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/profile">
            <CurrentUserProfile />
          </Route>
          <Route path="/profile/:id">
            <UserProfile />
          </Route>
          <Route path="/release/:id">
            <ReleasePage />
          </Route>
          <Route path="/review">
            <CreateReview />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
