#!/bin/bash

# On exit, kill all pids.
function finish {
  pkill -P $$ # kills all processes that have this pid - $$ - as the parent
  exec rm .nodemonfifo
}

# Clean up on exit.
trap finish EXIT

# Create a FIFO so that we can type 'rs' into the terminal and restart nodemon
# manually if we want to. Nodemon listens for the text 'rs'.
# If it exists, ignore the error.
mkfifo .nodemonfifo || true

rm build/*.js
NODE_ENV=production webpack --config webpack.config.server.js
nodemon server.js < .nodemonfifo &

# Set output to fifo as fd3.
exec 3> .nodemonfifo
# Listen to input; redirect to fifo.
while read x ; do echo $x >&3 ; done

wait
