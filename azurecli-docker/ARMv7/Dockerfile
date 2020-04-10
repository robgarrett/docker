# Base Image
FROM balenalib/raspberrypi3-debian:latest

# Dependencies
ARG PYTHONWARNINGS=ignore:DEPRECATION
RUN apt-get -qq update && apt-get install -qqy \
    curl \
    apt-transport-https \
    python-pip \
    python3-pip \
    python-setuptools \
    python3-setuptools \
    libffi-dev \
    lsb-release \
    build-essential \
    libssl-dev \
    python-dev \
    python3-dev \
    gpg \
    jq \
    git

# Get Azure-Cli
RUN pip3 install wheel
RUN pip3 install azure-cli

# Create a persisted volume.
VOLUME /usr/app/azurelabs
WORKDIR /usr/app/azurelabs

# Execute bash
ENTRYPOINT ["/bin/bash"]
