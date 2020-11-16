FROM node:latest

# Create a persisted volume.
VOLUME /usr/app/alarmdotcom
WORKDIR /usr/app/alarmdotcom

# Install dependencies.
RUN apt-get update -y && apt-get -y upgrade

# Set up the bashrc.
RUN echo "cd /usr/app/alarmdotcom" >> /home/node/.bashrc
RUN echo "npm i" >> /home/node/.bashrc

# Run as node user
USER node

# Execute bash
ENTRYPOINT ["/bin/bash"]
