npm install -g node-gyp nan

export NODE_PATH=$(npm root -g)

npm i --ignore-scripts
# export NODE_GYP_FORCE_PYTHON=/usr/bin/python3.10
node-gyp rebuild