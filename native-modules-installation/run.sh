#!/bin/bash 

CONTAINER_NAME=install-native-modules-container

docker build --progress=plain -t install-native-modules -f Dockerfile .
docker run --name $CONTAINER_NAME install-native-modules
docker cp $CONTAINER_NAME:/app/dir/node_modules .