#!/bin/bash

cd "$(dirname "$BASH_SOURCE")"
  echo "Connecting to Discord..."
pm2 start index.js --name "Sunset" 
