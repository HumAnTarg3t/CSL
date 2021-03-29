require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { static } = require("express");
const morgan = require("morgan");

const fetch = require("node-fetch");
const getCurrentTrack = require("./currentSpotTrack");
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const tokenLink = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin&scope=user-read-currently-playing`;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/1", (req, res) => {
  res.redirect(tokenLink);
});
app.get("/login*", async (req, res) => {
  let token = await req.query.code;
  const endpoint = "https://accounts.spotify.com/api/token";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${token}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin`,
    });

    const data = await response.json();
    token = data.access_token;
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
    });
    res.redirect("http://localhost:8080");
  } catch (error) {
    console.log(error);
  }
});

app.get("/home", async (req, res) => {
  const { cookies } = req;
  res.json(await getCurrentTrack(cookies.token));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});