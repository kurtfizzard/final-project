const assert = require("assert");
const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config({ path: `${__dirname}/.env` });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const signIn = async (req, res) => {
//   const { displayName, email, photoURL, uid } = req.body;

//   const client = await MongoClient(MONGO_URI, options);

//   try {
//     await client.connect();
//     const db = client.db("project-database");
//     console.log("connected!");

//     const user = await db.collection("users").findOne({ email: email });
//     if (user) {
//       res.status(200).json({
//         status: 200,
//         message: "This user is already in the database.",
//       });
//       return;
//     } else {
//       const result = await db.collection("users").insertOne({
//         displayName: displayName,
//         email: email,
//         photoURL: photoURL,
//         uid: uid,
//       });
//       assert.equal(1, result.insertedCount);
//       res.status(201).json({
//         status: 201,
//         data: {
//           displayName: displayName,
//           email: email,
//           photoURL: photoURL,
//           uid: uid,
//         },
//         message: "The user has been successfully added to the database.",
//       });
//     }
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ status: 500, data: req.body, message: err.message });
//   }
//   client.close();
//   console.log("disconnected!");
// };

//// REVIEW HANDLERS

const addReview = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const result = await db.collection("reviews").insertOne(req.body);
    assert.equal(1, result.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getReviews = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const reviews = await db.collection("reviews").find().toArray();
    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getUserReviews = async (req, res) => {
  const { uid } = req.params;
  console.log(req.params);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
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
  client.close();
  console.log("disconnected!");
};

const getReviewsByUserId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const results = await db.collection("reviews").find().toArray();
    const reviews = results.filter((result) => result.releaseId === id);

    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const likeReview = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
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

const getReviewbyReviewId = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const query = { _id: ObjectID(req.params.id) };
    const review = await db.collection("reviews").findOne(query);
    res.status(200).json({ status: 200, data: review });
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
  getUserReviews,
  getReviewbyReviewId,
  getReviewsByUserId,
  likeReview,
};
