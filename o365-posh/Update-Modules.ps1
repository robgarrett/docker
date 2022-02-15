[CmdletBinding()]Param();

# We already installed the modules using Win-Posh.
if (!(($psversiontable.Values).Major[0] -eq 5 -and ($psversiontable.Values).Minor[0] -eq 1)) {
    # Re-launch as version 5 if we're not already
    powershell -Version 5.1 -File $MyInvocation.MyCommand.Definition
    exit
}

Update-Module AzureADPreview -Force;
Update-Module ExchangeOnlineManagement -Force;
Update-Module MicrosoftTeams -Force;
Update-Module Microsoft.Online.SharePoint.PowerShell -Force;
Update-Module PnP.PowerShell -Force;