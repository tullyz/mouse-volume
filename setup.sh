#!/bin/sh
echo "installing mouse for Volumio"
npm install node-mouse
npm install socket.io-client@2.3.1
npm install input-event
node /home/volumio/mouse-volume/index.js &
#cp rc.local /etc
APPEND_TEXT="sleep 40s\nnode /home/volumio/mouse-volume/index.js &"
sudo sed -i -e "/exit 0/i $APPEND_TEXT" "/etc/rc.local"
#chmod 755 /etc/rc.local
touch /data/manifestUI
