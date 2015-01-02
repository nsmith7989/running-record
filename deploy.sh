#!/bin/sh

mv node_modules ~/tmp
mv bower_components ~/tmp
parse deploy
mv ~/tmp/node_modules .
mv ~/tmp/bower_components .

scp server/upload.js scriptfall:/var/www/running-record/index.js
ssh scriptfall 'forever list'