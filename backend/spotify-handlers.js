require("dotenv").config({ path: `${__dirname}/.env` });
require("isomorphic-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_SECRET;

const getAccessToken = async (req, res) => {
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

const getSpotifySearchResults = async (req, res) => {
  console.log(req.body);
  const { token, value } = req.body;
  const replaced = value.split(" ").join("%20");

  console.log(replaced);

  fetch(
    `https://api.spotify.com/v1/search?q=${replaced}&type=album,artist&market=CA`,
    // "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // const {
      //   albumsArtists: artists,
      //   albumsId: id,
      //   albumsImages: images,
      //   albumsName: name,
      //   albumsReleaseDate: release_date,
      //   albumsType: type,
      // } = res.albums.items;
      // const { artistsId: id, artistsImages: images, artistsName: name, artistsType: type } = res.artists.items;
      res.status(200).json({
        status: 200,
        results: { albums: data.albums.items, artists: data.artists.items },
      });
    });
};

module.exports = {
  getAccessToken,
  getSpotifySearchResults,
};
