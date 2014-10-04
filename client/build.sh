#!/bin/bash
mkdir -p client/build
watchify -t browserify-handlebars js/main.js -o build/hearthclone.js -v
