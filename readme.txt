
*** How to connect a wheel mouse to Volumio to control the volume ***

I made it easy to install software that adjusts the volume using a wheel mouse on the Volumio installed on the Raspberry Pi.
(I just put the necessary files on GitHub and bring them from there)
Raspberry Pi zero takes about 3 minutes to install 4 libraries, so please wait patiently.

Insturction:
sudo su
(Enter password. "volumio" is default)
git clone https://github.com/tullyz/mouse-volume
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

