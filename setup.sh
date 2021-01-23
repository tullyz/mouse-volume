#!/bin/sh
echo "installing mouse for Volumio"
npm install node-mouse
npm install socket.io-client@2.3.1
npm install input-event
npm install -g forever
/lib/node_modules/forever/bin/forever start /home/volumio/mouse-volume/index.js
cp rc.local /etc
chmod 755 /etc/rc.local

