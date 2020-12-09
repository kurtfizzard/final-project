require("dotenv").config({ path: `${__dirname}/.env` });
require("isomorphic-fetch");

const consumerKey = process.env.DISCOGS_CONSUMER_ID;
const consumerSecret = process.env.DISCOGS_SECRET;

const getSearchResults = (req, res) => {
  const { value } = req.params;
  fetch(
    `https://api.discogs.com/database/search?release_title=${value}&key=${consumerKey}&secret=${consumerSecret}`
  )
    .then((res) => res.json())
    .then((data) => {
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

module.exports = {
  getReleaseById,
  getReleasesByArtist,
  getSearchResults,
};
