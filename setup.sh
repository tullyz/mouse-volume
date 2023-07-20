#!/bin/sh
echo "installing mouse for Volumio"
npm install node-mouse
npm install socket.io-client@2.3.1
npm install input-event
npm install --save-dev webpack-remove-debug
node /home/volumio/mouse-volume/index.js &
cp rc.local /etc
chmod 755 /etc/rc.local
touch /data/manifestUI
