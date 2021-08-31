const el = document.querySelector(".clock");
const bell = document.querySelector("audio");
var audio = new Audio('new sound.wav');
var audio1= new Audio('oho.wav');

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");
let menu = document.getElementById('sagnik');

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");
  if(startBtn.textContent=="start break")
    menu.innerHTML="You can enjoy your break"
    else
  menu.innerHTML="You started the session.Focus on your work"
  

  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 1;
  } else {
    mins = +localStorage.getItem("breakTime") || 1;
  }
  if (typeof audio.loop == 'boolean')
  {
      audio.loop = true;
  }
  else
  {
      audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
  }
  audio.play();
  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
});

function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
      circle.classList.add("danger");
        audio.pause()
      audio1.play()
    }
  } else {
    mins = 0;
    seconds = 0;

    bell.play();

    menu.innerHTML="Your Session Time is Over. You Can take break Now"
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      startBtn.textContent = "start break";
      menu.innerHTML="You Can take break now"
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
    } else {
      startBtn.classList.remove("break");
      menu.innerHTML="You Can start a new session now"
      startBtn.textContent = "start focus";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)";
  }
}
