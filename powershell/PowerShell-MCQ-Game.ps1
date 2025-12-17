Clear-Host
$score = 0

# Load JSON questions
$questionsPath = Join-Path -Path (Split-Path -Parent $MyInvocation.MyCommand.Path) -ChildPath "questions.json"
if (-not (Test-Path $questionsPath)) {
    Write-Host "Error: questions.json not found in script folder." -ForegroundColor Red
    exit
}

try {
    $questions = Get-Content -Raw -Path $questionsPath | ConvertFrom-Json
} catch {
    Write-Host "Error reading JSON. Check formatting!" -ForegroundColor Red
    exit
}

# Game header
Write-Host "=====================================" -ForegroundColor Yellow
Write-Host " 🎮 PowerShell Skills Game" -ForegroundColor Yellow
Write-Host " Multiple Choice Edition" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Loop through all questions
foreach ($q in $questions) {
    Write-Host "`n$q.question" -ForegroundColor Cyan
    for ($i=0; $i -lt $q.options.Count; $i++) {
        Write-Host "$($i+1). $($q.options[$i])"
    }

    # Input loop (safe)
    $validInput = $false
    while (-not $validInput) {
        $choice = Read-Host "Select your answer (1-$($q.options.Count))"
        $num = 0  # <-- Declare variable before using [ref]
        if ([int]::TryParse($choice, [ref]$num) -and $num -ge 1 -and $num -le $q.options.Count) {
            $choiceIndex = $num - 1
            $validInput = $true
        } else {
            Write-Host "Invalid input. Enter a number between 1 and $($q.options.Count)." -ForegroundColor Yellow
        }
    }

    # Check answer
    if ($choiceIndex -eq $q.answer) {
        Write-Host "✅ Correct!" -ForegroundColor Green
        $score++
    } else {
        Write-Host "❌ Incorrect. Correct answer: $($q.options[$q.answer])" -ForegroundColor Red
    }
}

# Final Score
Write-Host "`n=====================================" -ForegroundColor Yellow
Write-Host "🏁 Final Score: $score / $($questions.Count)" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Feedback
switch ($score) {
    {$_ -eq $questions.Count} {Write-Host "🔥 Expert PowerShell!" -ForegroundColor Green}
    {$_ -ge 4} {Write-Host "👍 Strong foundation." -ForegroundColor Yellow}
    default {Write-Host "📘 Keep learning — you're getting there." -ForegroundColor Red}
}
