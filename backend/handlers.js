const assert = require("assert");
const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config({ path: `${__dirname}/.env` });
const { MONGO_URI } = process.env;

require("isomorphic-fetch");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const consumerKey = process.env.DISCOGS_CONSUMER_ID;
const consumerSecret = process.env.DISCOGS_SECRET;

const getUsers = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("project-database");
    console.log("connected!");
    const users = await db.collection("users").findOne().toArray();
    console.log(users);
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    console.log(err.message);
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const getUserById = (req, res) => {
  const { id } = req.params;
  // // creates a new client
  // const client = await MongoClient(MONGO_URI, options);

  // try {
  //   // connect to the client
  //   await client.connect();
  //   // connect to the database (db name is provided as an argument to the function)
  //   const db = client.db("project-database");
  //   console.log("connected!");
  //   const user = await db.collection("users").findOne({id});
  //   console.log(user);
  //   res.status(200).json({ status: 200, data: users });
  // } catch (err) {
  //   console.log(err.message);
  // }
  // // close the connection to the database server
  // client.close();
  // console.log("disconnected!");
};

const signIn = async (req, res) => {
  const { displayName, email, photoURL } = req.body;

  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db.collection("users").findOne({ email: email });
    if (user) {
      res.status(200).json({
        status: 200,
        message: "This user is already in the database.",
      });
      return;
    } else {
      const result = await db.collection("users").insertOne({
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      });
      assert.equal(1, result.insertedCount);
      res.status(201).json({
        status: 201,
        data: {
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        },
        message: "The user has been successfully added to the database.",
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const getSearchResults = (req, res) => {
  const { value } = req.params;
  fetch(
    `https://api.discogs.com/database/search?release_title=${value}&key=${consumerKey}&secret=${consumerSecret}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      // const results = data.results;
      const results = data.results.filter(
        (result) => result.type === "artist" || result.type === "master"
      );
      res.status(200).json({
        status: 200,
        data: results,
      });
    });
};

const getReleaseById = (req, res) => {
  const { id } = req.params;
  fetch(`https://api.discogs.com//masters/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // const results = data.releases.filter(
      //   (result) => result.type === "master"
      // );
      res.status(200).json({
        status: 200,
        data: data,
      });
    });
};

const getReleasesByArtist = (req, res) => {
  const { id } = req.params;
  fetch(`https://api.discogs.com/artists/${id}/releases?yearasc`)
    .then((res) => res.json())
    .then((data) => {
      const results = data.releases.filter(
        (result) => result.type === "master"
      );
      res.status(200).json({
        status: 200,
        data: results,
      });
    });
};

//// REVIEW HANDLERS

const addReview = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");
    // and creating a new collection 'greetings'
    const result = await db.collection("reviews").insertOne(req.body);
    assert.equal(1, result.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const getReviews = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const reviews = await db.collection("reviews").find().toArray();
    // .find(userId && { userId: ObjectId(userId) });
    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const getUserReviews = async (req, res) => {
  const { uid } = req.params;
  const client = await MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const reviews = await db
      .collection("reviews")
      .find(uid && { uid: uid })
      .toArray();
    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const getReviewsByRelease = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const client = await MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const results = await db.collection("reviews").find().toArray();
    const reviews = results.filter((result) => result.releaseId === Number(id));

    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const likeReview = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const query = { _id: ObjectID(req.params.id) };
    const foundReview = await db.collection("reviews").findOne(query);

    if (foundReview.likes.includes(req.body.currentUserUID)) {
      const result = await db.collection("reviews").findOneAndUpdate(query, {
        $inc: { likeCount: -1 },
        $pull: { likes: req.body.currentUserUID },
      });
      res.status(200).json({ status: 200, data: result });
      console.log(result);
    } else {
      const result = await db.collection("reviews").findOneAndUpdate(query, {
        $inc: { likeCount: 1 },
        $push: { likes: req.body.currentUserUID },
      });
      res.status(200).json({ status: 200, data: result });
      console.log(result);
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  addReview,
  getReviews,
  getUserById,
  getUserReviews,
  getReviewsByRelease,
  getReleaseById,
  getReleasesByArtist,
  getSearchResults,
  getUsers,
  likeReview,
  signIn,
};
