import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ReleasePage from "./components/ReleasePage";
import ProfilePage from "./components/ProfilePage";
import CreateReview from "./components/CreateReview";
import Search from "./components/Search";
import ArtistPage from "./components/ArtistPage";
import LogInPage from "./components/LoginPage";
import GlobalStyle from "./GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
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
          <Route path="/artistpage/:id">
            <ArtistPage />
          </Route>
          <Route path="/loginpage">
            <LogInPage />
          </Route>
          <Route path="/profilepage">
            <ProfilePage />
          </Route>
          <Route path="/releasepage/:id">
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
