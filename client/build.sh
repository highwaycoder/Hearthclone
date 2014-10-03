#!/bin/bash
mkdir -p client/build
watchify -t node-handlebarsify js/main.js -o build/hearthclone.js -v
