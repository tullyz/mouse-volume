
var Mouse = require('node-mouse');
var mouseDevice = new Mouse();

var InputEvent = require('input-event');
// find # of mouse event
const execSync = require('child_process').execSync;
const result =  execSync('cat /proc/bus/input/devices | grep mouse0').toString();
n = result.indexOf("event")
var a = result.substring(n+5, n+6)
var input = new InputEvent('/dev/input/event'+a);

var eventDevice = new InputEvent.Mouse(input);

var io=require('socket.io-client');
var socket= io.connect('http://localhost:3000');

// set initial volume value
var vol = 3 ;  
socket.emit('volume', vol);



// Create play lists if empty
socket.emit('listPlaylist');
socket.on('pushListPlaylist', function(data) {
   if (data.length == 0) {

    socket.emit('createPlaylist',{"name":"Venice Classic Radio"});
    socket.emit('addToPlaylist',{
	"name":"Venice Classic Radio", 
	"service":"webradio", 
	"uri":"http://174.36.206.197:8000"
	});
    socket.emit('createPlaylist',{"name":"Capital FM"});
    socket.emit('addToPlaylist',{
	"name":"Capital FM", 
	"service":"webradio", 
	"uri":"https://media-ssl.musicradio.com/Capital"
	});

    }
});

var playstate = 1 ;

mouseDevice.on('click', function(e){
  if (e.button === 0) {
//    console.log("left click");
    socket.emit('playPlaylist',{name:"Venice Classic Radio"});
  }
  if (e.button === 2) {
//    console.log("right click");
    socket.emit('playPlaylist',{name:"Capital FM"});
  }
  if (e.button === 1) {
//    console.log("wheel click");
//    socket.emit('prev');
//    socket.emit('next');
  if (playstate == 1) {
	socket.emit('pause');
	playstate = 0
	}
  else {
	socket.emit('play');
	playstate = 1 
	}
  }
});

// volume setting    
eventDevice.on('wheel', e => {
  var direction = e.value === 1 ? 1 : -1
// get current volume value
 socket.emit('getState', '');
 socket.on('pushState', function(data) {
   vol = data.volume ;  
 });
  vol = vol + direction ;
// volume limitter
  if (vol < 0) vol = 0 ;
  if (vol > 50) vol = 50 ;
  socket.emit('volume', vol);
})
