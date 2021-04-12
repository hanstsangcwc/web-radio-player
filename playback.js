const sources = [
  "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one", // BBC - Radio 1
  "http://media-sov.musicradio.com/HeartBristolMP3", // Heart Bristol Radio
  "http://media-sov.musicradio.com/CapitalMP3", // Capital London
];

const labels = [
  ["BBC - Radio 1", " http://www.bbc.co.uk/"],
  ["Heart Radio", " https://www.heart.co.uk/"],
  ["Capital London", " http://www.capitalfm.com/london"],
];

let playingIndex = 0; // current radio
let playing = true; // stream status
let music = null;

setTimeout(function () {
  loadStream(playingIndex);
}, 1);

function loadStream(index) {
  if (playing && music !== null) destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  pauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream() {
  music.pause();
  music.src = "";
  playIcon();
  playing = false;
}

function changePlayback() {
  if (playing) {
    destroyStream();
  } else {
    loadStream(playingIndex);
  }
}

function setLabel(index) {
  document.getElementById("label").innerHTML =
    '<h6> <a target="_blank" href="' +
    labels[index][1] +
    '">' +
    labels[index][0] +
    "</a></h6>";
}

document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
    case 32:
      changePlayback();
      break;
  }
};

// icons
function pauseIcon() {
  document.getElementById("playbackButton").className = "icon fa-pause";
}
function playIcon() {
  document.getElementById("playbackButton").className = "icon fa-play";
}
