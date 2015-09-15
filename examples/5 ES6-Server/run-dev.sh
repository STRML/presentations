#!/bin/bash

# On exit, kill all pids.
function finish {
  pkill -P $$ # kills all processes that have this pid - $$ - as the parent
}

NODE_ENV=production webpack --config webpack.config.server.js
babel-node server
