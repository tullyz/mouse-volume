var inputevent = require('input_event_s');
//var inputevent = require('input-event');

// find # of PowerMate event
const execSync = require('child_process').execSync;
const result = execSync('cat /proc/bus/input/devices | grep Handlers=event').toString();
n = result.indexOf("event");
var a = result.substring(n + 5, n + 6);
var pm = new inputevent('event' + a);
//var pm = new inputevent('event1');
// 'event1' is the file corresponding to my PowerMate in /dev/input/
// cat /proc/bus/input/devices

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');

// set initial volume value
var vol = 3;
socket.emit('volume', vol);

// Function to check Volumio state and play
function checkVolumioState() {
  socket.emit('getState', '');
  socket.on('pushState', function (data) {
    if (data.status === 'play' || data.status === 'stop') {
      console.log('MPD is ready, sending play command...');
      socket.emit('play');
    } else {
      console.log('MPD not ready, retrying...');
      setTimeout(checkVolumioState, 5000); // Retry every 5 seconds
    }
  });
}

// Start checking Volumio state after ensuring WebSocket connection
socket.on('connect', function () {
  console.log('WebSocket connected! Checking Volumio state...');
  checkVolumioState();
});

// Create play lists if empty
socket.emit('listPlaylist');
socket.on('pushListPlaylist', function (data) {
  if (data.length == 0) {
    socket.emit('createPlaylist', { "name": "Venice Classic Radio" });
    socket.emit('addToPlaylist', {
      "name": "Venice Classic Radio",
      "service": "webradio",
      "uri": "https://uk2.streamingpulse.com/ssl/vcr1"
    });
    socket.emit('createPlaylist', { "name": "Capital FM" });
    socket.emit('addToPlaylist', {
      "name": "Capital FM",
      "service": "webradio",
      "uri": "https://media-ssl.musicradio.com/Capital"
    });
  }
});

var playstate = 2;

pm.on('keypress', pm => {
  if (playstate == 1) {
    socket.emit('playPlaylist', { name: "Venice Classic Radio" });
    playstate = 2;
  } else {
    socket.emit('playPlaylist', { name: "Capital FM" });
    playstate = 1;
  }
});

pm.on('rel', pm => {
  var direction = pm.value === 1 ? 1 : -1;
  // get current volume value
  socket.emit('getState', '');
  socket.on('pushState', function (data) {
    vol = data.volume;
  });
  vol = vol + direction;
  // volume limiter
  if (vol < 0) vol = 0;
  if (vol > 100) vol = 100;
  socket.emit('volume', vol);
});
