const loginInfo = document.getElementById('loginText')
const loginButton = document.getElementById("button");
loginButton.addEventListener("click", () => {
  window.open(`http://localhost:8080/1`);
  window.close();
});
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  window.open("http://localhost:8080/logout");
});
document.getElementById("slidecontainer").style.visibility = "hidden";

let total_Dur;
let current_Pos;
async function getLyr() {
  const endpoint = "http://localhost:8080/home";
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.status == 404) {
        loginInfo.innerText = 'Logged in'
        document.getElementById("song").innerHTML = `${data.track}`;
        document.getElementById("pArtist").innerText = `${data.artist}`;
        document.getElementById("pLyric").innerHTML = `Lyrics not found :(
        Will check again in 10 seconds... Or change song and click "Update"`;
        const promise123 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 10000);
        });
        promise123.then(async () => {
          await getLyr();
        });
      }
      if (data.status == 401) {
        loginInfo.innerText = 'Logged out'
        document.getElementById(
          "pArtist"
        ).innerHTML = `${data.statusText}, ${data.status}.`;
        document.getElementById("song").innerHTML = `You need to login again.`;
        document.getElementById("pLyric").innerText = ``;
      }

      const artist = data.result.artistName;
      const track = data.result.trackTitle;
      const lyric = data.result.lyrics || "Trying again";
      total_Dur = data.Total_duration;
      current_Pos = data.Current_progress;
      const timeLeft = total_Dur - current_Pos;
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, timeLeft + 100);
      });
      if (data.result.lyrics) {
        loginInfo.innerText = 'Logged in'
        document.getElementById("pArtist").innerHTML = `Artist: ${artist}`;
        document.getElementById("song").innerHTML = `Track: ${track}`;
        document.getElementById("pLyric").innerText = `Lyric: ${lyric}`;
        window.scrollTo(0, 0);
        myPromise.then(async () => {
          total_Dur = 0;
          current_Pos = 0;
          await getLyr();
        });
      } else {
        loginInfo.innerText = 'Logged in'
        document.getElementById("pArtist").innerHTML = `Artist: ${artist}`;
        document.getElementById("song").innerHTML = `Track: ${track}`;
        document.getElementById("pLyric").innerText = `Lyric: Please wait...`;
        console.error("Trying again...");
        await getLyr();
        window.scrollTo(0, 0);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const updateButton = document.getElementById("button2");
updateButton.addEventListener("click", async () => {
  total_Dur;
  current_Pos;
  console.log("Pressed update");
  await getLyr();
  //window.scrollTo(0, 0);
  //startScroll()
});

let howToActive = false;
let howTo = document.getElementById("how-to");
howTo.addEventListener("click", () => {
  if (!howToActive) {
    howTo.innerText = `1.Login
    2.Press update once
    3.Enjoy`;
    howTo.style.textAlign = "left";
    howTo.style.marginRight = "0px";
    howTo.style.marginLeft = "0px";
    howTo.style.paddingLeft = "10px";
    howTo.style.paddingRight = "10px";
    howToActive = true;
  } else {
    howTo.innerHTML = "How to";
    howTo.style.marginRight = "6px";
    howTo.style.marginLeft = "6px";
    howTo.style.paddingLeft = "31px";
    howTo.style.paddingRight = "31px";
    howToActive = false;
  }
});

/*Credit to https://www.youtube.com/watch?v=Tvem7GnMS5I , modified by @HumAnTarg3t */
let scrollerID;
let paused = true;
let speed = 4; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 50;
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
output.innerHTML = "";

slider.oninput = function () {
  output.innerHTML = 100 - this.value + 1;
  let intspeed = speed * slider.value;
  interval = intspeed;
};
slider.onmousedown = () => {
  stopScroll();
  paused = true;
};
slider.onmouseup = () => {
  scrollerID = startScroll();
  paused = false;
};
function startScroll() {
  let id = setInterval(function () {
    window.scrollBy(0, 1);
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   // Reached end of page
    //   //stopScroll();
    // }
  }, interval);
  return id;
}

function stopScroll() {
  clearInterval(scrollerID);
}
const scrollButton = document.getElementById("scroll");
scrollButton.addEventListener(
  "click",
  function (event) {
    if (paused == true) {
      scrollerID = startScroll();
      paused = false;
      document.getElementById("scroll1").style.filter = "brightness(60%)";
      document.getElementById("slidecontainer").style.visibility = "";
    } else {
      document.getElementById("scroll1").style.filter = "";
      document.getElementById("slidecontainer").style.visibility = "hidden";
      stopScroll();
      paused = true;
    }
  },
  true
);
/*Credit ends*/
