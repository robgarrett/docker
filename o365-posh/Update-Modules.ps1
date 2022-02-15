[CmdletBinding()]Param();

# We already installed the modules using Win-Posh.
if (!(($psversiontable.Values).Major[0] -eq 5 -and ($psversiontable.Values).Minor[0] -eq 1)) {
    # Re-launch as version 5 if we're not already
    powershell -Version 5.1 -File $MyInvocation.MyCommand.Definition
    exit
}

Function _updateModule {
    Param([Parameter(Mandatory = $true)][string]$moduleName);
    Write-Host "Updating module $moduleName";
    Update-Module -Name $moduleName -Force;
}

@(
    "AzureADPreview", 
    "ExchangeOnlineManagement",
    "MicrosoftTeams",
    "Microsoft.Online.SharePoint.PowerShell",
    "PnP.PowerShell") | ForEach-Object { _updateModule -moduleName $_; }