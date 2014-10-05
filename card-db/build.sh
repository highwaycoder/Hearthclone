#!/bin/bash
mkdir -p client/build
watchify -t hbsfy js/main.js -o build/hearthclone.js -v --debug
