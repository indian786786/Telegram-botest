let questions = [];
let index = 0;
let answered = false;

const quiz = document.getElementById("quiz");
const explanation = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");

document.getElementById("startBtn").onclick = async () => {
  const topic = document.getElementById("topic").value.trim();
  if (!topic) return alert("Enter a topic");

  quiz.innerHTML = "Loading questions...";
  explanation.innerHTML = "";
  nextBtn.style.display = "none";
  skipBtn.style.display = "block";

  const res = await fetch("https://canvas-ai.saififiroza786.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic })
  });

  const data = await res.json();
  questions = data.questions;
  index = 0;
  showQuestion();
};

function showQuestion() {
  answered = false;
  explanation.innerHTML = "";
  nextBtn.style.display = "none";

  const q = questions[index];
  quiz.innerHTML = `<h3>${index+1}. ${q.question}</h3>`;

  for (let key in q.options) {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = `${key}. ${q.options[key]}`;
    div.onclick = () => selectOption(div, key);
    quiz.appendChild(div);
  }
}

function selectOption(div, key) {
  if (answered) return;
  answered = true;

  const q = questions[index];
  document.querySelectorAll(".option").forEach(o => o.classList.add("disabled"));

  if (key === q.answer) {
    div.classList.add("correct");
  } else {
    div.classList.add("wrong");
    document.querySelectorAll(".option").forEach(o => {
      if (o.innerText.startsWith(q.answer)) o.classList.add("correct");
    });
  }

  explanation.innerHTML = `<strong>Explanation:</strong><br>${q.explanation}`;
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    quiz.innerHTML = "<h3>✅ Test completed</h3>";
    explanation.innerHTML = "";
    nextBtn.style.display = "none";
    skipBtn.style.display = "none";
  }
};

skipBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    quiz.innerHTML = "<h3>✅ Test completed</h3>";
    skipBtn.style.display = "none";
  }
};
