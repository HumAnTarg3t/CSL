const loginButton = document.getElementById("button");
loginButton.addEventListener("click", () => {
  window.open(`http://localhost:8080/1`);
  window.close();
});

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
        document.getElementById("pArtist").innerHTML = `Artist: ${artist}`;
        document.getElementById("song").innerHTML = `Track: ${track}`;
        document.getElementById("pLyric").innerText = `Lyric: ${lyric}`;
        myPromise.then(async () => {
          total_Dur = 0;
          current_Pos = 0;
          await getLyr();
        });
      } else {
        document.getElementById("pArtist").innerHTML = `Artist: ${artist}`;
        document.getElementById("song").innerHTML = `Track: ${track}`;
        document.getElementById("pLyric").innerText = `Lyric: Please wait...`;
        console.error("Trying again...");
        await getLyr();
      }
    }
  } catch (err) {
    document.getElementById("pLyric").innerHTML = ''
    document.getElementById("song").innerHTML = ''
    document.getElementById("pArtist").innerText = 
    `Song not found :(
    Will check again in 10 seconds... Or change song and click "Update"`;
    console.error(err);
    const promise123 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
    promise123.then(async () => {
      await getLyr();
    });
  }
}

const updateButton = document.getElementById("button2");
updateButton.addEventListener("click", async () => {
  total_Dur;
  current_Pos;
  console.log("Pressed update");
  await getLyr();
  //startScroll()
});

/*Credit to https://www.youtube.com/watch?v=Tvem7GnMS5I */ 
let scrollerID;
let paused = true;
let speed = 3; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 50;
function startScroll() {
  let id = setInterval(function () {
    window.scrollBy(0, 1);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Reached end of page
      stopScroll();
    }
  }, interval);
  return id;
}

function stopScroll() {
  clearInterval(scrollerID);
}
const scrollButton = document.getElementById('scroll')
scrollButton.addEventListener(
  "click",
  function (event) {
    // It's the 'Enter' key
    if (paused == true) {
      scrollerID = startScroll();
      paused = false;
    } else {
      stopScroll();
      paused = true;
    }
  },
  true
);
/*Credit ends*/ 