const fetch = require("node-fetch");
require("dotenv").config();
const GeniusFetcher = require("genius-lyrics-fetcher");
const ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;
const client = new GeniusFetcher.Client(ACCESS_TOKEN);
//title then artist

async function getCurrentTrack(token) {
  const endpoint =
    "https://api.spotify.com/v1/me/player/currently-playing?market=NO";
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const artist = data.item.artists[0].name;
      const song = data.item.name;
      try {
        const result = await client.fetch(song, artist);
        const data1 = {
          result: result,
          Current_progress: data.progress_ms,
          Total_duration: data.item.duration_ms,
        };
        return data1;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Nothing playing now");
    }
  } catch (err) {
    console.log(err);
  }
}
//getCurrentTrack(token);
module.exports = getCurrentTrack;
