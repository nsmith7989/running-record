#!/bin/sh

npm run build
rsync -rvl --exclude-from ./exclued-files.txt . nathanael@scriptfall.com:/var/www/running-record.com/




scp server/upload.js scriptfall:/var/www/running-record/index.js
ssh scriptfall 'forever list'