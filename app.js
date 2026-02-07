let currentTopic = "";
let correctAnswer = "";

async function start() {
  const topicInput = document.getElementById("topic");
  currentTopic = topicInput.value.trim();
  if (!currentTopic) {
    alert("Please enter a topic");
    return;
  }
  loadQuestion();
}

async function nextQuestion() {
  if (!currentTopic) {
    alert("Start first");
    return;
  }
  loadQuestion();
}

async function loadQuestion() {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "Loading question...";

  try {
    const res = await fetch(
      "https://canvas-ai.saififiroza786.workers.dev/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentTopic })
      }
    );

    const q = await res.json();
    correctAnswer = q.answer;

    canvas.innerHTML = `
      <h3>${q.question}</h3>

      ${optionButton("A", q.options.A)}
      ${optionButton("B", q.options.B)}
      ${optionButton("C", q.options.C)}
      ${optionButton("D", q.options.D)}
    `;
  } catch (e) {
    canvas.innerHTML = "Error loading question";
  }
}

function optionButton(letter, text) {
  return `<button onclick="checkAnswer('${letter}', this)">${letter}. ${text}</button>`;
}

function checkAnswer(selected, btn) {
  const buttons = document.querySelectorAll("#canvas button");
  buttons.forEach(b => b.disabled = true);

  if (selected === correctAnswer) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }
}
