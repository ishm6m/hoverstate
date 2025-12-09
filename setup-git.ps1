<#
setup-git.ps1

Interactive PowerShell helper to initialize a Git repo, make an initial commit,
and optionally create & push a GitHub repository using the GitHub CLI (`gh`).

Usage:
  Open PowerShell, change to the project folder, then run:
    .\setup-git.ps1

The script checks for `git` (required) and `gh` (optional). It will prompt
for missing git user info and for creating a remote if `gh` is not available.
#>

Set-StrictMode -Version Latest
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

function Test-HasCommand($name) {
    return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

if (-not (Test-HasCommand git)) {
    Write-Error "Git is not installed or not in PATH. Install Git: https://git-scm.com/downloads"
    exit 1
}

# Ensure git user config exists (prompt to set if missing)
$gitName = git config user.name 2>$null
$gitEmail = git config user.email 2>$null
if (-not $gitName -or -not $gitEmail) {
    Write-Host "Git user.name or user.email is not configured."
    $resp = Read-Host "Would you like to set them now? (y/n)"
    if ($resp -match '^[Yy]') {
        $newName = Read-Host "Enter your name"
        $newEmail = Read-Host "Enter your email"
        git config --global user.name "$newName"
        git config --global user.email "$newEmail"
        Write-Host "Set global git user.name and user.email"
    } else {
        Write-Warning "Continuing without changing git user config. Commits may fail if identity is required."
    }
}

# Initialize repository if needed
$isRepo = $false
try {
    $isRepo = git rev-parse --is-inside-work-tree 2>$null
} catch {
    $isRepo = $false
}

if (-not $isRepo) {
    git init -b main
    Write-Host "Initialized Git repository with branch 'main'."
} else {
    Write-Host "Git repository already initialized."
}

# Stage and commit
git add -A
try {
    git commit -m "chore: initial commit"
    Write-Host "Committed files."
} catch {
    Write-Warning "Commit may have failed (no changes to commit or git identity not set)."
}

# If gh (GitHub CLI) is available, offer to create a GitHub repo and push
if (Test-HasCommand gh) {
    Write-Host "GitHub CLI detected."
    $createWithGh = Read-Host "Create repository on GitHub now using 'gh'? (y/n)"
    if ($createWithGh -match '^[Yy]') {
        gh auth status 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "You need to authenticate 'gh' first. Running 'gh auth login' now."
            gh auth login
        }
        Write-Host "Creating repository on GitHub and pushing..."
        gh repo create --source=. --public --confirm --push
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Repository created and pushed to GitHub."
        } else {
            Write-Warning "'gh repo create' failed. You can create a repo manually and push."
        }
    } else {
        Write-Host "Skipping GitHub repo creation via 'gh'."
    }
} else {
    Write-Host "GitHub CLI ('gh') not found. To push to GitHub manually, follow these steps:"
    Write-Host "  1) Create a new repo on GitHub (https://github.com/new)"
    Write-Host "  2) Add the remote: git remote add origin https://github.com/<USER>/<REPO>.git"
    Write-Host "  3) Ensure branch name: git branch -M main"
    Write-Host "  4) Push: git push -u origin main"
}

Write-Host "Setup script finished. Verify your remote with: git remote -v"
