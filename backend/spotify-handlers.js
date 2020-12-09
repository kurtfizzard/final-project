require("dotenv").config({ path: `${__dirname}/.env` });
require("isomorphic-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_SECRET;

const getAccessToken = async (req, res, next) => {
  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  // TODO: use authString in a request to Spotify!
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const json = await response.json();

  return res.send(json);
};

module.exports = {
  getAccessToken,
};
