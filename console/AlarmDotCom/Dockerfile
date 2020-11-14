FROM node:latest

# Create a persisted volume.
VOLUME /usr/app/alarmdotcom
WORKDIR /usr/app/alarmdotcom

# Install dependencies.
RUN apt-get update -y && apt-get -y upgrade

# Dependent files.
COPY git-prompt.sh /root

# Set up the bashrc.
RUN echo "source ~/git-prompt.sh" >> /root/.bashrc
RUN echo "cd /usr/app/alarmdotcom" >> /root/.bashrc
RUN echo "npm i" >> /root/.bashrc

ENV PROMPT_COMMAND='__posh_git_ps1 "\u@\h:\w " "\\\$ ";'

# Execute bash
ENTRYPOINT ["/bin/bash"]
