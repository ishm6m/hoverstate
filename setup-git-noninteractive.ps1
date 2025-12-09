param(
    [string]$RepoName = "",
    [string]$RemoteUrl = "",
    [switch]$Private,
    [switch]$UseGh,
    [switch]$ForceInit
)

Set-StrictMode -Version Latest

function Test-HasCommand($name) {
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

if (-not (Test-HasCommand git)) {
    Write-Error "Git is not installed or not in PATH. Install Git: https://git-scm.com/downloads"
    exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

# Initialize repo if needed or forced
$isRepo = $false
try { $out = git rev-parse --is-inside-work-tree 2>$null; $isRepo = $out -eq 'true' } catch { $isRepo = $false }
if (-not $isRepo -or $ForceInit) {
    git init -b main
    Write-Host "Initialized Git repository with branch 'main'."
} else {
    Write-Host "Git repository already initialized."
}

# Ensure git user config exists (do not prompt in non-interactive mode)
$gitName = git config user.name 2>$null
$gitEmail = git config user.email 2>$null
if (-not $gitName -or -not $gitEmail) {
    Write-Warning "Git user.name or user.email is not configured. Commits may use system/global config."
}

# Stage and commit
git add -A
try {
    git commit -m "chore: initial commit"
    Write-Host "Committed files."
} catch {
    Write-Host "No commit was created (perhaps no changes or identity not set)."
}

# If requested, create via gh
if ($UseGh) {
    if (-not (Test-HasCommand gh)) {
        Write-Error "'gh' (GitHub CLI) not found but --UseGh was specified. Install it or omit --UseGh."
        exit 1
    }
    if ($RepoName -eq "") {
        Write-Error "--UseGh requires --RepoName be specified."
        exit 1
    }
    # Determine visibility
    $vis = $Private.IsPresent ? '--private' : '--public'
    gh auth status 2>$null
    if ($LASTEXITCODE -ne 0) { gh auth login --hostname github.com --web }
    $cmd = "gh repo create $RepoName $vis --source=. --confirm --push"
    Write-Host "Running: $cmd"
    iex $cmd
    if ($LASTEXITCODE -eq 0) { Write-Host "Created and pushed repo via gh." } else { Write-Warning "gh repo create failed." }
    exit 0
}

# If RemoteUrl provided, add remote and push
if ($RemoteUrl -ne "") {
    git remote remove origin 2>$null
    git remote add origin $RemoteUrl
    git branch -M main
    git push -u origin main
    if ($LASTEXITCODE -eq 0) { Write-Host "Pushed to $RemoteUrl" } else { Write-Warning "Push failed; check credentials and remote URL." }
    exit 0
}

Write-Host "No remote actions requested. To push, either:"
Write-Host "  - Run this script with --UseGh --RepoName 'your-repo' (requires 'gh'), or"
Write-Host "  - Call: .\setup-git-noninteractive.ps1 -RemoteUrl 'https://github.com/USER/REPO.git'"
