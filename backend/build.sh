#!/bin/bash
###########

git checkout backend
git reset --hard
git pull

chmod +x ./build.sh

docker compose up --force-recreate --build -d

echo "Server is rebuild!"