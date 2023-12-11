# Native Modules Installation


# ARG nodeVersion=16.20.2
ARG nodeVersion=18.17.1
ARG arch=x86_64
FROM --platform=linux/\${arch} node:${nodeVersion}-slim

RUN echo deb http://deb.debian.org/debian buster main>/etc/apt/sources.list\
    && echo deb http://deb.debian.org/debian-security buster/updates main>>/etc/apt/sources.list\
    && echo deb http://deb.debian.org/debian buster-updates main>>/etc/apt/sources.list

# Since we're now building native deps 😢, we'll need some build tools
RUN apt-get update && apt-get upgrade -y && apt-get install python3 pkg-config build-essential\
    # and those are the deps for "canvas" npm package
    libpixman-1-dev libcairo2-dev unixodbc-dev libpango1.0-dev libjpeg62-turbo-dev libgif-dev\
    -y



WORKDIR /app/dir
ADD install-packages.sh .


RUN chmod +x ./install-packages.sh
RUN ./install-packages.sh




RUN echo "DONE installation"

RUN cat /app/dir/failed_installs.log