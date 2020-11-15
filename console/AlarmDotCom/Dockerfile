FROM node:latest

# Create a persisted volume.
VOLUME /usr/app/alarmdotcom
WORKDIR /usr/app/alarmdotcom

# Install dependencies.
RUN apt-get update -y && apt-get -y upgrade

# Dependent files.
COPY git-prompt.sh /home/node

# Set up the bashrc.
RUN echo "source ~/git-prompt.sh" >> /home/node/.bashrc
RUN echo "cd /usr/app/alarmdotcom" >> /home/node/.bashrc
RUN echo "npm i" >> /home/node/.bashrc

ENV PROMPT_COMMAND='__posh_git_ps1 "\u@\h:\w " "\\\$ ";'

# Run as node user
USER node

# Execute bash
ENTRYPOINT ["/bin/bash"]
