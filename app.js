const API_URL = "https://canvas-ai.saififiroza786.workers.dev/";

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const output = document.getElementById("output");
const topicInput = document.getElementById("topic");

async function loadQuestion() {
  const topic = topicInput.value.trim();
  if (!topic) {
    output.innerHTML = "❌ Enter a topic";
    return;
  }

  output.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: topic })
    });

    const text = await res.text();        // 🔥 KEY CHANGE
    const data = JSON.parse(text);        // 🔥 TELEGRAM-SAFE

    output.innerHTML = `
      <b>${data.question}</b><br><br>
      A. ${data.options.A}<br>
      B. ${data.options.B}<br>
      C. ${data.options.C}<br>
      D. ${data.options.D}<br><br>
      <i>Answer: ${data.answer}</i>
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = "❌ Error loading question";
  }
}

startBtn.onclick = loadQuestion;
nextBtn.onclick = loadQuestion;
