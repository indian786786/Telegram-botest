const API_URL = "https://canvas-ai.saififiroza786.workers.dev/";

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const output = document.getElementById("output");
const topicInput = document.getElementById("topic");

async function loadQuestion() {
  const topic = topicInput.value.trim();

  if (!topic) {
    output.innerHTML = "❌ Please enter a topic";
    return;
  }

  output.innerHTML = "⏳ Loading question...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    });

    const data = await res.json();

    // 🔴 THIS WAS FAILING BEFORE
    if (!data.question || !data.options) {
      throw new Error("Invalid response");
    }

    output.innerHTML = `
      <h3>${data.question}</h3>
      <p>A. ${data.options.A}</p>
      <p>B. ${data.options.B}</p>
      <p>C. ${data.options.C}</p>
      <p>D. ${data.options.D}</p>
    `;
  } catch (err) {
    output.innerHTML = "❌ Error loading question";
    console.error(err);
  }
}

startBtn.addEventListener("click", loadQuestion);
nextBtn.addEventListener("click", loadQuestion);
