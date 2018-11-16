#!/bin/bash
while :
do
 gnome-screenshot -f /run/user/1000/gvfs/smb-share:server=192.168.1.12,share=images/1.png
sleep 5
done
