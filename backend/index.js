"use strict";

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const {
  addReview,
  getReviews,
  getUserById,
  getUserReviews,
  getReleaseById,
  getReleasesByArtist,
  getSearchResults,
  getUsers,
  likeReview,
  signIn,
  getReviewsByRelease,
} = require("./handlers");

const PORT = process.env.PORT || 8000;

// const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
// const consumerSecret = process.env.DISCOGS_SECRET;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cors())

  .post("/auth/signin", signIn)

  .get("/users", getUsers)

  .get("/user/:id", getUserById)

  .post("/reviews/add", addReview)

  .get("/reviews", getReviews)

  .get("/reviews/user/:id", getUserReviews)

  .get("/search/:value", getSearchResults)

  .get("/artist/:id", getReleasesByArtist)

  .get("/release/:id", getReleaseById)

  .get("/reviews/release/:id", getReviewsByRelease)

  .put("/reviews/:id/like", likeReview)

  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
