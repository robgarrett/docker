# Base image
FROM mcr.microsoft.com/dotnet/sdk:3.1-bullseye

# Pull down Azure Cli images.
RUN apt-get update && apt-get install -qqy curl apt-transport-https lsb-release gpg jq git
RUN curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
    gpg --dearmor | \
    tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null
RUN AZ_REPO=$(lsb_release -cs) && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
    tee /etc/apt/sources.list.d/azure-cli.list
RUN apt-get update && apt-get install -qqy azure-cli

# Install Az Module
RUN pwsh -NoLogo -NoProfile -Command "Set-PSRepository -Name PSGallery -InstallationPolicy Trusted"
RUN pwsh -NoLogo -NoProfile -Command "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Confirm:\$false -Force"

# Execute shell
CMD ["pwsh", "-NoExit", "-Command", "'Import-Module Az'"]
