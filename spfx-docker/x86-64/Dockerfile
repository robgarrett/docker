# Get the base image.
ARG core=mcr.microsoft.com/windows/servercore:ltsc2019
ARG posh=mcr.microsoft.com/powershell:nanoserver
FROM $core as download

# Default Shell is PowerShell.
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Download NodeJS (SPFx does not support 11.x and 12.x).
ENV NODE_VERSION 10.20.0
RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing $('https://nodejs.org/dist/v{0}/node-v{0}-win-x64.zip' -f $env:NODE_VERSION); \
    `Expand-Archive nodejs.zip -DestinationPath C:\; \
    `Rename-Item $('C:\\node-v{0}-win-x64' -F $ENV:NODE_VERSION) c:\nodejs
RUN Remove-Item nodejs.zip

# Download Git.
ENV GIT_VERSION 2.26.0
ENV GIT_DOWNLOAD_URL https://github.com/git-for-windows/git/releases/download/v${GIT_VERSION}.windows.1/MinGit-${GIT_VERSION}-busybox-64-bit.zip
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 ; \
    Invoke-WebRequest -UseBasicParsing $env:GIT_DOWNLOAD_URL -OutFile git.zip; \
    Expand-Archive git.zip -DestinationPath C:\git; \
    Remove-Item git.zip

# Next stage.
FROM $posh as posh-env

# Download PowerShell Core.
ARG PS_VERSION=7.0.0
ARG PS_PACKAGE_URL=https://github.com/PowerShell/PowerShell/releases/download/v$PS_VERSION/PowerShell-$PS_VERSION-win-x64.zip
SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 ; \ 
    New-Item -ItemType Directory /installer | Out-Null; \
    Invoke-WebRequest -Uri ` $env:PS_PACKAGE_URL ` -outfile /installer/powershell.zip -verbose; \
    Expand-Archive /installer/powershell.zip -DestinationPath \PowerShell

# Next stage.
FROM $core

# Setup target environment container.
ENV NPM_CONFIG_LOGLEVEL error
ENV PSCORE="c:\\PowerShell\\pwsh.exe"

COPY --from=download /nodejs /nodejs
COPY --from=download /git /git
COPY --from=posh-env /PowerShell /PowerShell

# Run as container admin.
USER ContainerAdministrator

# Set the path.
ARG SETX=/M
RUN setx %SETX% PATH "%PATH%;C:\\nodejs;C:\\git\\cmd;C:\\git\\mingw64\\bin;C:\\git\\usr\\bin;c:\\PowerShell"

# Run as user.
USER ContainerUser

# Pull down tools.
RUN npm i -g --no-optional gulp@3 yo @microsoft/generator-sharepoint && npm cache verify
RUN CMD gulp trust-dev-cert

# Expose ports.
EXPOSE 5432 4321 35729

# Create a persisted volume.
VOLUME c:\\app\\spfx
WORKDIR c:\\app\\spfx

# Use the new PowerShell.
SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
ENTRYPOINT [ "pwsh" ]
