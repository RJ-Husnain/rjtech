// "Start Writing JS here"
let currentSong = new Audio();
let songs;
let curFolder;
function convertToMinuteSecond(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs(folder) {
    curFolder = folder;
    let a = await fetch(`http://127.0.0.1:3004/${folder}/`);
    // let a = await fetch(`http://127.0.0.1:3000/songs/Playlist1/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.includes(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
            // songs.push(element.href);
        }
    }
    let songul = document.querySelector(".lblist").getElementsByTagName("ul")[0];
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> <img class="in-filter" src="/svg/music.svg" alt="">
                            <div class="info">
                                <p>${(song.replaceAll("%20", " ")).replaceAll(".mp3", " ")}</p>
                            </div>
                            <div class="lbplay flex">
                            <span>Play Now</span>
                            <img class="in-filter" src="/svg/lbplay.svg" alt="">
                            </div></li>`;
    }
    // var audio = new Audio(songs[1]);
    // audio.play();
    // audio.addEventListener("loadeddata", ()=>{
    //   let duration = audio.duration;
    //   console.log(duration);
    // });
    Array.from(document.querySelector(".lblist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim() + ".mp3");
        })
    });
    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/"+track);
    currentSong.src = `/${curFolder}/` + track;
    // console.log(currentSong.src)
    if (!pause) {
        currentSong.play();
        play.src = "/svg/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track.replace(".mp3", "").replaceAll("%20", " ");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

}

async function DisplayAlbums() {
    let a = await fetch(`http://127.0.0.1:3004/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            let a = await fetch(`http://127.0.0.1:3004/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                        <div class="plbtn">
                            <img src="/svg/playlistbtn.svg" alt="" id="plbtn">
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="" id="img_playlist">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`

        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        })
    })

}


async function main() {
    await getsongs("songs/Playlist2");
    // console.log(songs);
    playMusic(songs[0], true)

    // Display All the Album
    DisplayAlbums();

    let play = document.querySelector("#play");
    play.addEventListener("click", (event) => {
        event.stopPropagation(); // 
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/svg/pause.svg";
            // console.log("Playing");
        } else {
            currentSong.pause();
            play.src = "/svg/play.svg";
            // console.log("Paused");
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${convertToMinuteSecond(currentSong.currentTime)} / ${convertToMinuteSecond(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })
    document.querySelector("#hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })
    previous.addEventListener("click", () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })
    next.addEventListener("click", () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    })
    volume.addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    })
    volumeMute.addEventListener("click", e => {
        if(e.target.src.includes("volume.svg")){
            e.target.src= e.target.src.replace("volume.svg","mute.svg")
            volume.value=0;
            currentSong.volume = 0
        } else{
            e.target.src= "volume.svg"
            volume.value=40;
            currentSong.volume = 0.1
        }

    })

}
main();


