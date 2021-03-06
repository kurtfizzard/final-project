const assert = require("assert");
const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config({ path: `${__dirname}/.env` });
const { MONGO_URI } = process.env;
const bcrypt = require("bcryptjs");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signUp = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (user) {
      res.status(200).json({
        status: 200,
        message: "This username is already in use.",
      });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 8);

      const result = await db
        .collection("users")
        .insertOne({ username: req.body.username, password: hash });
      console.log(result.ops[0]);
      res.status(201).json({
        status: 201,
        user: {
          uid: result.ops[0]._id,
          username: result.ops[0].username,
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

const signIn = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });
    console.log(user);

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(validPassword);
      if (validPassword) {
        res.status(200).json({
          status: 200,
          user: { uid: user._id, username: user.username },
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "The password that you entered was invalid.",
        });
      }
    } else {
      res.status(200).json({
        status: 200,
        message: "This is not a valid username. Please sign up.",
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const users = await db.collection("users").findOne().toArray();
    console.log(users);
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  signIn,
  signUp,
  getUsers,
};
