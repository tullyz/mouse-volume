
*** How to connect a wheel mouse to Volumio to control the volume ***

I made it easy to install software that adjusts the volume using a wheel mouse on the Volumio installed on the Raspberry Pi.
(I just put the necessary files on GitHub and bring them from there)
Raspberry Pi zero takes about 3 minutes to install 4 libraries, so please wait patiently.

Insturction:
sudo su
(Enter password. "volumio" is default)
git clone https://github.com/tullyz/mouse-volume
(If 'fatal: destination path 'mouse-volume' already exists and is not an empty directory.' message appears, type 
rm -r mouse-volume 
and try again.)
cd mouse-volume
chmod u+x setup.sh
./setup.sh


Specification:
Adjust the volume with the mouse wheel.
Toggle pause / play when mouse wheel is pressed.
Left click to select Venice Classic Radio.
Right click to select Capital London.
Automatically start this software at startup.
Since the initial volume is 3 and the maximum volume is 50,
if you want to change it, change the value of ~/mouse-volume/index.js






*** How to add AutoAtart feature to Volumio 3 ***    (added 13/3/2022)


1. First of all, install "mouse-volume" in your raspberry pi. 

2. Then, add 　socket.emit('play');　 in   ~/mouse-volume/index.js . 

// set initial volume value
var vol = 10;
socket.emit('volume', vol);

// auto start
socket.emit('play');

3. Finally add  sleep 30s  in /etc/rc.local .

sleep 30s
node /home/volumio/mouse-volume/index.js &


Note) It took 30 seconds for Raspberry Pi 4, but if it is not automatically played on a slow model such as zero, it needs to be longer. 

4. After restarting it, you should be able to play the stations or songs in the playlist (Queue) at startup automatically. 

