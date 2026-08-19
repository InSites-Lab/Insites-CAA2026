# Deploy the H40 talk site to alephplace.com/insites/heritage4.0/
#
# ASCII ONLY. PowerShell 5.1 reads .ps1 as ANSI when there is no BOM, and any
# non-ASCII character here produces parser errors that point at wrong lines.
#
# Usage:
#   .\scripts\deploy\upload-to-remote.ps1            # dry run: lists what would go
#   .\scripts\deploy\upload-to-remote.ps1 -Upload    # actually uploads
#   .\scripts\deploy\upload-to-remote.ps1 -Upload -Backup   # move the live files
#                                                           # to OLD/<stamp> first
#
# NOTE ON -RemotePath: this is the ONLY thing separating this site from the
# other sites on the same WinSCP session (dhss, shimur-workshop, workshop).
# Check it before every run.

param(
    [string]$Session    = "alephplace",
    [string]$RemotePath = "/home/yuvalsh/alephplace.com/public/insites/heritage4.0",
    [string]$LocalDist  = "",
    [switch]$Upload,
    [switch]$Backup
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($LocalDist)) {
    $repoRoot  = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
    $LocalDist = Join-Path $repoRoot "workshop-site\dist"
}

$winscp = "C:\Program Files (x86)\WinSCP\WinSCP.com"
if (-not (Test-Path $winscp)) { throw "WinSCP.com not found at $winscp" }
if (-not (Test-Path $LocalDist)) { throw "No build at $LocalDist - run 'npm run build' first" }
if (-not (Test-Path (Join-Path $LocalDist "index.html"))) { throw "No index.html in $LocalDist" }

$files = Get-ChildItem $LocalDist -Recurse -File
$bytes = ($files | Measure-Object -Property Length -Sum).Sum
Write-Output "Local  : $LocalDist"
Write-Output "Remote : $RemotePath   (session: $Session)"
Write-Output "Payload: $($files.Count) files, $([Math]::Round($bytes/1MB,2)) MB"

if (-not $Upload) {
    Write-Output ""
    Write-Output "DRY RUN - nothing sent. Re-run with -Upload to deploy."
    exit 0
}

# The saved session carries a stale LocalDirectory, so `open` emits a
# non-fatal lcd error. Start in batch-continue, switch to abort once the
# session is up, so real transfer errors still stop the script.
$stamp  = Get-Date -Format "yyyyMMdd-HHmmss"
$script = Join-Path $env:TEMP "h40-deploy-$stamp.txt"

$lines = @()
$lines += "option batch continue"
$lines += "option confirm off"
$lines += "open $Session"
$lines += "option batch abort"
$lines += "lcd ""$LocalDist"""
$lines += "cd ""$RemotePath"""
if ($Backup) {
    $lines += "option batch continue"
    $lines += "mkdir ""$RemotePath/OLD"""
    $lines += "mkdir ""$RemotePath/OLD/$stamp"""
    $lines += "mv ""$RemotePath/index.html"" ""$RemotePath/OLD/$stamp/"""
    $lines += "mv ""$RemotePath/assets"" ""$RemotePath/OLD/$stamp/"""
    $lines += "option batch abort"
}
$lines += "put -nopermissions -filemask=|OLD/ * ""$RemotePath/"""
$lines += "ls"
$lines += "exit"

Set-Content -Path $script -Value $lines -Encoding ASCII

Write-Output ""
Write-Output "Uploading..."
& $winscp /script="$script" /log=NUL
$code = $LASTEXITCODE
Remove-Item $script -ErrorAction SilentlyContinue

# WinSCP returns 1 if ANY error occurred in the session, and the stale
# LocalDirectory on the saved site guarantees one at `open`. So the exit code
# cannot distinguish "benign lcd warning" from "transfer failed" - verify the
# live URL instead, which is the thing we actually care about.
if ($code -ne 0) { Write-Output "WinSCP exit code $code (expected: the lcd warning above). Verifying live..." }

Write-Output ""
$live = "https://alephplace.com/insites/heritage4.0/"
try {
    $r = Invoke-WebRequest -Uri $live -UseBasicParsing -TimeoutSec 30
    $m = [regex]::Match($r.Content, 'assets/(index-[A-Za-z0-9_\-]+\.js)')
    if (-not $m.Success) { throw "index.html served but names no JS bundle" }
    $a = Invoke-WebRequest -Uri ($live + "assets/" + $m.Groups[1].Value) -Method Head -UseBasicParsing -TimeoutSec 30
    $localName = (Get-ChildItem (Join-Path $LocalDist "assets") -Filter "index-*.js" | Select-Object -First 1).Name
    if ($m.Groups[1].Value -ne $localName) {
        throw "Live index.html points at $($m.Groups[1].Value) but this build produced $localName - the upload did not land"
    }
    Write-Output "VERIFIED: $live serves this build ($localName, HTTP $($a.StatusCode))"
} catch {
    throw "Deploy verification FAILED: $($_.Exception.Message)"
}

# Without this the script inherits WinSCP's non-zero code and a successful
# deploy still looks like a failure to the caller.
exit 0
