# escape=`
# Base Image.
FROM mcr.microsoft.com/powershell:lts-windowsservercore-20h2

# Args
ARG MYUSERNAME
ARG APPHOME=c:\App

# User Win-Posh to install.
SHELL ["C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", "-command"]

# Working folder.
RUN New-Item -Type Directory -Path $env:APPHOME
WORKDIR ${APPHOME}

# Create a new local user.
RUN NET USER "$env:MYUSERNAME" /add
RUN	NET LOCALGROUP Administrators /add "$env:MYUSERNAME"

# Copy Files.
COPY Update-Modules.ps1 ${APPHOME}
COPY Install-Modules.ps1 ${APPHOME}

# Switch user context.
USER ${MYUSERNAME}

# Pull down tools.
RUN .\Install-Modules.ps1 -Verbose;
