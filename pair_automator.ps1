$ErrorActionPreference = "Stop"

# Co-author definitions
$COAUTHOR_1 = "Co-authored-by: Jay Arre Talosig <flexycode.dev@gmail.com>"
$COAUTHOR_2 = "Co-authored-by: Brian De Vera <63903018+scarfer14@users.noreply.github.com>"
$COAUTHOR_3 = "Co-authored-by: Jay <flexyledger@gmail.com>"
$COAUTHOR_4 = "Co-authored-by: Flexy Zephyrus <flexyzephyrus@gmail.com>"

Write-Host "🚀 Starting Co-Author Automation (24 Cycles)..." -ForegroundColor Cyan

# Ensure clean slate for dev
Write-Host "Checking out 'dev' branch..."
git checkout main
git pull origin main
git checkout -B dev

# Ensure dummy file exists
if (-not (Test-Path "contribution_log.txt")) {
    New-Item -Path "contribution_log.txt" -ItemType File -Value "# Contribution Log`n"
    git add contribution_log.txt
    git commit -m "Initialize contribution_log.txt"
    git push origin dev
}

# Loop 24 times
for ($i = 1; $i -le 24; $i++) {
    Write-Host "`n[Cycle $i/24] Processing..." -ForegroundColor Yellow

    # 1. Modify dummy file
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "Change #$i generated at $date" | Out-File -FilePath "contribution_log.txt" -Append -Encoding utf8

    # 2. Git Add
    git add contribution_log.txt

    # 3. Git Commit
    $commitMsg = "Log contribution #$i`n`n$COAUTHOR_1`n$COAUTHOR_2`n$COAUTHOR_3`n$COAUTHOR_4"
    git commit -m $commitMsg

    # 4. Push to dev
    git push origin dev

    # 5. Create PR
    try {
        $prUrl = gh pr create --base main --head dev --title "Contribution #$i" --body "Automated contribution log update #$i."
        Write-Host "✅ Created PR: $prUrl"
    }
    catch {
        Write-Host "❌ Failed to create PR: $_" -ForegroundColor Red
        # If PR already exists, try to merge it anyway
        $prUrl = "dev" 
    }

    # 6. Merge PR
    # Using 'dev' branch name for merging if PR url missing isn't ideal, but `gh pr merge --merge dev` often works if unique
    gh pr merge dev --merge --delete-branch=false
    Write-Host "✅ Merged PR"

    # 7. Sleep
    $sleep = Get-Random -Minimum 2 -Maximum 5
    Write-Host "Sleeping for $sleep seconds..." -ForegroundColor Gray
    Start-Sleep -Seconds $sleep
}
