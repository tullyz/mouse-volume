#!/bin/sh
echo "installing mouse for Volumio"
npm install node-mouse
npm install socket.io-client
npm install input-event
node /home/volumio/mouse-volume/index.js
cp rc.local /etc
chmod 755 /etc/rc.local

