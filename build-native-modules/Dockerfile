# Native Modules Installation


# ARG nodeVersion=16.20.2
ARG nodeVersion=18.17.1
ARG arch=x86_64
FROM --platform=linux/\${arch} node:${nodeVersion}-slim

RUN echo deb http://deb.debian.org/debian buster main>/etc/apt/sources.list\
    && echo deb http://deb.debian.org/debian-security buster/updates main>>/etc/apt/sources.list\
    && echo deb http://deb.debian.org/debian buster-updates main>>/etc/apt/sources.list

# Since we're now building native deps 😢, we'll need some build tools
RUN apt-get update && apt-get upgrade -y && apt-get install curl git-all pkg-config build-essential\
    # and those are the deps for "canvas" npm package
    libpixman-1-dev libcairo2-dev libpango1.0-dev libpq-dev libjpeg62-turbo-dev libgif-dev\
    -y

WORKDIR /app/dir
ADD package-content .
ADD build-package.sh .

RUN chmod +x ./build-package.sh
RUN ./build-package.sh

RUN echo "DONE installation"