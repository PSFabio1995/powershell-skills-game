// ============================
// Self-contained questions array
// ============================
let questions = [
  {
    "question": "Which cmdlet lists all running services?",
    "options": ["Get-Process", "Get-Service", "Get-EventLog", "Get-Task"],
    "answer": 1
  },
  {
    "question": "Which cmdlet displays running processes?",
    "options": ["Get-Service", "Get-Process", "Start-Process", "Stop-Process"],
    "answer": 1
  },
  {
    "question": "Which cmdlet is used to retrieve help for other cmdlets?",
    "options": ["Get-Command", "Get-Help", "Help-File", "Show-Help"],
    "answer": 1
  },
  {
    "question": "What does the pipe (|) symbol do in PowerShell?",
    "options": ["Ends a command", "Runs commands in parallel", "Passes output to another command", "Redirects errors"],
    "answer": 2
  },
  {
    "question": "Which cmdlet stops a running process?",
    "options": ["End-Process", "Kill-Process", "Stop-Process", "Close-Process"],
    "answer": 2
  },
  {
    "question": "Which cmdlet lists files in a directory?",
    "options": ["List-Item", "Show-Item", "Get-ChildItem", "Get-File"],
    "answer": 2
  },
  {
    "question": "What file extension is used for PowerShell scripts?",
    "options": [".ps", ".ps1", ".bat", ".cmd"],
    "answer": 1
  },
  {
    "question": "Which cmdlet creates a new directory?",
    "options": ["New-Folder", "Make-Directory", "New-Item", "Create-Item"],
    "answer": 2
  },
  {
    "question": "Which cmdlet outputs text to the console?",
    "options": ["Write-Host", "Show-Text", "Echo-Text", "Print-Output"],
    "answer": 0
  },
  {
    "question": "Which cmdlet retrieves event logs?",
    "options": ["Get-Logs", "Read-Event", "Get-EventLog", "Show-Event"],
    "answer": 2
  },
  {
    "question": "What does Get-Command do?",
    "options": ["Runs a command", "Lists available commands", "Edits scripts", "Stops commands"],
    "answer": 1
  },
  {
    "question": "Which cmdlet sets a variable value?",
    "options": ["Set-Item", "New-Variable", "Set-Variable", "Assign-Variable"],
    "answer": 2
  },
  {
    "question": "Which symbol is used for variables in PowerShell?",
    "options": ["%", "$", "#", "&"],
    "answer": 1
  },
  {
    "question": "Which cmdlet deletes a file?",
    "options": ["Delete-Item", "Remove-Item", "Erase-File", "Destroy-Item"],
    "answer": 1
  },
  {
    "question": "Which cmdlet starts a service?",
    "options": ["Run-Service", "Start-Process", "Enable-Service", "Start-Service"],
    "answer": 3
  },
  {
    "question": "What does Get-Member do?",
    "options": ["Lists object properties and methods", "Gets users", "Lists cmdlets", "Displays variables"],
    "answer": 0
  },
  {
    "question": "Which cmdlet pauses script execution?",
    "options": ["Pause-Script", "Wait", "Start-Sleep", "Hold-Process"],
    "answer": 2
  },
  {
    "question": "Which cmdlet retrieves system information?",
    "options": ["Get-ComputerInfo", "Get-System", "Show-Info", "Get-OS"],
    "answer": 0
  },
  {
    "question": "Which cmdlet is used to import a module?",
    "options": ["Load-Module", "Use-Module", "Import-Module", "Add-Module"],
    "answer": 2
  },
  {
    "question": "Which execution policy allows locally created scripts only?",
    "options": ["Unrestricted", "RemoteSigned", "Restricted", "Bypass"],
    "answer": 1
  }
];

// ============================
// Game Logic
// ============================
let current = 0;
let score = 0;

shuffle(questions);
showQuestion();

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => answer(i);
    answers.appendChild(btn);
  });

  document.getElementById("progress").innerText =
    `Question ${current + 1} of ${questions.length}`;
}

function answer(choice) {
  if (choice === questions[current].answer) {
    score++;
  }

  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.querySelector(".card").innerHTML = `
    <h2>🏁 Final Score</h2>
    <p>${score} / ${questions.length}</p>
    <p>${score === questions.length ? "🔥 PowerShell Pro!" : "👍 Keep Going!"}</p>
  `;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}