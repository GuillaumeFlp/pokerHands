#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Veuillez specifier une version !"
    exit 1
fi

cd frontend/

[ -d "node_modules" ] && rm -rf node_modules/

npm install
npm run build

mv build ../backend/src/frontend

cd ..

docker build . -t poker-hands --no-cache --network=host

exit 0
