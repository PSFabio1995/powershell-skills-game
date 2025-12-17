let questions = [];
let current = 0;
let score = 0;

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    shuffle(questions);
    showQuestion();
  });

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