#!/bin/bash

function finish {
  pkill -P $$ # kills all processes that have this pid - $$ - as the parent
  echo "Done killing. Exiting..."
}

# Kill all pids on exit.
trap finish EXIT

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
nodemon ../harness/app.js "$DIR" &

# Start up Flow server
cd ~/git/forks/flow/website
jekyll serve -w
