# Base Image.
FROM debian:stretch

# Pull down Azure Cli images.
RUN apt-get update && apt-get install -qqy curl apt-transport-https lsb-release gpg jq git
RUN curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
    gpg --dearmor | \
    tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null
RUN AZ_REPO=$(lsb_release -cs) && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
    tee /etc/apt/sources.list.d/azure-cli.list
RUN apt-get update && apt-get install -qqy azure-cli

# Execute bash
ENTRYPOINT ["/bin/bash"]
