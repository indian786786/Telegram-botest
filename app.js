const API_URL = "https://canvas-ai.saififiroza786.workers.dev/";

let currentTopic = "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", startQuiz);
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
});

async function startQuiz() {
  const topicInput = document.getElementById("topic").value.trim();

  if (!topicInput) {
    alert("Please enter a topic");
    return;
  }

  currentTopic = topicInput;
  loadQuestion();
}

async function nextQuestion() {
  if (!currentTopic) {
    alert("Start quiz first");
    return;
  }

  loadQuestion();
}

async function loadQuestion() {
  const output = document.getElementById("output");
  output.innerHTML = "Loading question...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: currentTopic })
    });

    const data = await res.json();

    if (data.error) {
      output.innerHTML = "Error: " + data.error;
      return;
    }

    output.innerHTML = `
      <h3>${data.question}</h3>
      <p>A. ${data.options.A}</p>
      <p>B. ${data.options.B}</p>
      <p>C. ${data.options.C}</p>
      <p>D. ${data.options.D}</p>
      <p><b>Answer:</b> ${data.answer}</p>
    `;
  } catch (e) {
    output.innerHTML = "Error loading question";
  }
}
