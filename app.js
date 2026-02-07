let currentQuestion = null;

async function startQuiz() {
  await loadQuestion();
}

async function nextQuestion() {
  await loadQuestion();
}

async function loadQuestion() {
  const topicInput = document.getElementById("topic");
  const output = document.getElementById("questionBox");

  const topic = topicInput.value.trim();

  if (!topic) {
    output.innerHTML = "❌ Please enter a topic";
    return;
  }

  output.innerHTML = "⏳ Loading question...";

  try {
    const res = await fetch("https://canvas-ai.saififiroza786.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })   // ✅ FIX IS HERE
    });

    const data = await res.json();

    if (data.error) {
      output.innerHTML = "❌ " + data.error;
      return;
    }

    currentQuestion = data;

    output.innerHTML = `
      <h3>${data.question}</h3>
      <button onclick="checkAnswer('A')">A. ${data.options.A}</button><br><br>
      <button onclick="checkAnswer('B')">B. ${data.options.B}</button><br><br>
      <button onclick="checkAnswer('C')">C. ${data.options.C}</button><br><br>
      <button onclick="checkAnswer('D')">D. ${data.options.D}</button>
    `;

  } catch (err) {
    output.innerHTML = "❌ Error loading question";
  }
}

function checkAnswer(selected) {
  if (!currentQuestion) return;

  const correct = currentQuestion.answer;

  if (selected === correct) {
    alert("✅ Correct Answer!");
  } else {
    alert("❌ Wrong! Correct answer is " + correct);
  }
}
