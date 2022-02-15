[CmdletBinding()]Param();

if (!(($psversiontable.Values).Major[0] -eq 5 -and ($psversiontable.Values).Minor[0] -eq 1)) {
    # Re-launch as version 5 if we're not already
    powershell -Version 5.1 -File $MyInvocation.MyCommand.Definition
    exit
}

Function _installModule {
    Param([Parameter(Mandatory = $true)][string]$moduleName);
    Write-Host "Installing module $moduleName";
    Install-Module -Name $moduleName -Scope AllUsers -Force;
}

Write-Host "Installing package provider";
Install-PackageProvider -Name NuGet -Force;
@(
    "AzureADPreview", 
    "ExchangeOnlineManagement",
    "MicrosoftTeams",
    "Microsoft.Online.SharePoint.PowerShell",
    "PnP.PowerShell") | ForEach-Object { _installModule -moduleName $_; }
