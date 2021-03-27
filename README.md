# Currnet-spotify-song
 Checks your current playing spotify song and tries to get the lyrics for the song.
 
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Prerequisite](#Prerequisite)
* [Installation](#Installation)
* [How to use](#How-to-use)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
 
## General info
The app uses [Spotify Api](https://developer.spotify.com/dashboard/) and [Genius API](https://docs.genius.com/) with the help of [genius-lyrics-fetcher](https://github.com/zenje/genius-lyrics-fetcher).
 
**The authorization lasts 1 hour.** After it ends you need to `Login` again to get a new token for Spotify.
 
## Technologies
* JavaScript 
     * Node.js
     * Node-fetch
     * express
     * genius-lyrics-fetcher
     * cookie-parser
     * dotenv
     * morgan

 
## Prerequisite
* **Genius**
    * Get the Genius Client ID, Genius  Secret and Client access token from [Genius Api](https://genius.com/api-clients) and paste it in `.env_sample`
        * Set the `APP WEBSITE URL` to something random, you wont need it.
* **Spotify**
     * Get the Spotify Client ID and Spotify Client Secret from [Spotify Api](https://developer.spotify.com/dashboard/).
          * Login in with your normal spotify account
          * Press "Create an App"
          * Fill out the form
          * Press `Edit settings` and fill in the `Redirect URIs` with `http://localhost:8080/login` and save at the bottom.
          * Copy the `Client ID` and `Client Secret` and paste it in the `.env_sample` file.
* **.env_sample**
     * Rename this from `.env_sample` to `.env`
 
## Installation
* `git clone https://github.com/HumAnTarg3t/CSL.git`
* `cd CSL`
* `npm install`
 
## How to use
`Node app` in the terminal.
Open `http://localhost:8080/`.
Press `Login` and `Update` once, after that it will update itself.

 
## Features
List of features ready and TODOs for future development:
The basic is working:
You can login with your spotify (lasts 1 hour) and get lyrics if the song is found.
  

 
## Issues
Later
 
## Status
Project is: _ongoing_
 
## Inspiration
The urge for learning.
 
## Contact
Created by [@HumAnTarg3t](https://github.com/HumAnTarg3t)
 
 

