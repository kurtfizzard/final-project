"use strict";

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");

const {
  addReview,
  getReviews,
  getUserReviews,
  likeReview,
  getReviewsByRelease,
} = require("./review-handlers");

const {
  getReleaseById,
  getReleasesByArtist,
  getSearchResults,
} = require("./discogs-handlers");

const {
  getAccessToken,
  getSpotifySearchResults,
} = require("./spotify-handlers");

const { signIn, signUp, getUsers } = require("./user-handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cors())

  .post("/auth/signin", signIn)
  // CAN THIS POST BE A GET?

  .post("/auth/signup", signUp)

  .get("/users", getUsers)

  .post("/reviews/add", addReview)

  .get("/reviews", getReviews)

  .get("/reviews/user/:id", getUserReviews)

  .get("/search/:value", getSearchResults)

  .get("/artistbyid/:id", getReleasesByArtist)

  .get("/releasebyid/:id", getReleaseById)

  .get("/reviews/release/:id", getReviewsByRelease)

  .put("/reviews/:id/like", likeReview)

  /////////////////// SPOTIFY /////////////////////

  .get("/spotify_access_token", getAccessToken)

  .post("/spotify/search", getSpotifySearchResults)

  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
