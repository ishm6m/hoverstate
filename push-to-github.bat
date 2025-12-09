@echo off
REM Push the local repository to GitHub
REM This script requires git to be installed and accessible from the command line

cd /d "%~dp0"

echo Initializing git repository...
git init -b main 2>nul

echo Staging files...
git add -A

echo Creating initial commit...
git commit -m "chore: initial commit" 2>nul || echo No new files to commit

echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/ishm6m/hoverstate.git

echo Ensuring main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo Success! Repository pushed to GitHub.
    echo Remote URL: https://github.com/ishm6m/hoverstate.git
    git remote -v
) else (
    echo.
    echo Push failed. Check your credentials and internet connection.
)

pause
