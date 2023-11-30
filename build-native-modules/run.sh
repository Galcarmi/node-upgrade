#!/bin/bash 

CONTAINER_NAME=build-native-module-container

docker build --progress=plain -t build-native-module -f Dockerfile .
# docker run --name $CONTAINER_NAME build-native-module
# docker cp $CONTAINER_NAME:/app/dir output